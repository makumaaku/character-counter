'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Document, Page, pdfjs } from 'react-pdf'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
// TextLayerとAnnotationLayerのCSSをインポート
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

// PDFJSのワーカーを設定
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs'

type Props = {
  translations: {
    title: string
    description: string
    form: {
      upload: {
        label: string
        button: string
        dragDrop: string
        dragging: string
        instruction: string
        maxSize: string
      }
      convert: string
    }
    result: {
      download: string
    }
    status: {
      processing: string
      noFile: string
    }
    error: {
      fileType: string
      fileSize: string
    }
    loading: string
  }
}

// テキストアイテムの型定義
type TextItem = {
  str: string
  dir?: string
  width?: number
  height?: number
  transform?: number[]
  fontName?: string
  hasEOL?: boolean
  style?: {
    fontFamily?: string
    fontSize?: number
    fontWeight?: string
    fontStyle?: string
  }
}

// スタイル情報の型定義
type TextStyles = {
  [fontName: string]: {
    fontFamily?: string
    ascent?: number
    descent?: number
    vertical?: boolean
  }
}

// 抽出したページコンテンツの型定義
type ExtractedPageContent = {
  content: string
  styles: TextStyles
  items: TextItem[]
}

export default function PdfToEpubClient({ translations }: Props) {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [convertedEpub, setConvertedEpub] = useState<Blob | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPdfJsReady, setIsPdfJsReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const pagesContentRef = useRef<ExtractedPageContent[]>([])

  // PDFJSワーカーが正しく読み込まれているか確認
  useEffect(() => {
    const checkPdfJsWorker = async () => {
      try {
        console.log('PDF.js version:', pdfjs.version)
        
        // ワーカーファイルにアクセスできるか確認
        const response = await fetch('/pdfjs/pdf.worker.mjs', { method: 'HEAD' })
        if (response.ok) {
          console.log('PDF.js worker file is accessible')
          
          // ワーカーが完全に読み込まれるまで少し待機
          setTimeout(() => {
            setIsPdfJsReady(true)
          }, 500)
        } else {
          console.error('PDF.js worker file is not accessible')
          setError('Error loading PDF.js worker. Please try again later.')
        }
      } catch (err) {
        console.error('Error checking PDF.js worker:', err)
        setError('Error loading PDF.js worker. Please try again later.')
      }
    }
    
    checkPdfJsWorker()
  }, [])

  // ファイルドロップ処理
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    setConvertedEpub(null)
    setProgress(0)
    
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    
    // ファイルがPDFかチェック
    if (file.type !== 'application/pdf') {
      setError(translations.error.fileType)
      return
    }
    
    // ファイルサイズチェック (最大20MB)
    if (file.size > 20 * 1024 * 1024) {
      setError(translations.error.fileSize)
      return
    }
    
    setPdfFile(file)
    pagesContentRef.current = []
  }, [translations.error.fileType, translations.error.fileSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  // ドキュメント読み込み成功時の処理
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    pagesContentRef.current = Array(numPages).fill(null)
  }

  // テキスト抽出処理（スタイル情報も含む）
  const extractTextFromPage = async (pageNum: number, pdfDoc: unknown): Promise<ExtractedPageContent> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const page = await (pdfDoc as any).getPage(pageNum)
      const textContent = await page.getTextContent()
      
      // スタイル情報を保持
      const styles = textContent.styles || {}
      const items = textContent.items || []
      
      // テキストアイテムを処理して、スタイル情報を追加
      const processedItems = items.map((item: TextItem) => {
        // フォント情報を取得
        const fontStyle = styles[item.fontName || ''] || {}
        
        // フォントサイズを計算（transformの3番目の値を使用）
        const fontSize = item.transform ? Math.sqrt(item.transform[0] * item.transform[0] + item.transform[1] * item.transform[1]) : 12
        
        // スタイル情報を追加
        return {
          ...item,
          style: {
            fontFamily: fontStyle.fontFamily || 'sans-serif',
            fontSize: fontSize,
            fontWeight: fontStyle.fontFamily && fontStyle.fontFamily.toLowerCase().includes('bold') ? 'bold' : 'normal',
            fontStyle: fontStyle.fontFamily && fontStyle.fontFamily.toLowerCase().includes('italic') ? 'italic' : 'normal'
          }
        }
      })
      
      // テキストコンテンツを生成（単純な文字列結合ではなく、構造化された情報を保持）
      const content = processedItems.map((item: TextItem) => item.str).join(' ')
      
      return {
        content,
        styles,
        items: processedItems
      }
    } catch (err) {
      console.error(`Error extracting text from page ${pageNum}:`, err)
      return {
        content: '',
        styles: {},
        items: []
      }
    }
  }

  // リスト項目を検出する関数
  const detectListItems = (items: TextItem[]): TextItem[] => {
    return items.map((item: TextItem) => {
      // リスト項目のパターンを検出（例：「•」、「1.」、「-」などで始まるテキスト）
      const isListItem = /^[\s]*[•\-\*][\s]+|^[\s]*\d+\.[\s]+/.test(item.str)
      
      if (isListItem) {
        return {
          ...item,
          isListItem: true
        } as TextItem
      }
      
      return item
    })
  }

  // PDFをEPUBに変換
  const convertToEpub = async () => {
    if (!pdfFile) return
    
    try {
      setIsConverting(true)
      setConvertedEpub(null)
      setError(null)
      setProgress(0)
      
      // PDFJSドキュメントを読み込む
      const pdfData = new Uint8Array(await pdfFile.arrayBuffer())
      const loadingTask = pdfjs.getDocument({ data: pdfData })
      const pdfDoc = await loadingTask.promise
      
      const totalPages = pdfDoc.numPages
      const extractedPages: ExtractedPageContent[] = []
      
      // 各ページからテキストとスタイル情報を抽出
      for (let i = 1; i <= totalPages; i++) {
        const pageContent = await extractTextFromPage(i, pdfDoc)
        
        // リスト項目を検出
        pageContent.items = detectListItems(pageContent.items)
        
        extractedPages.push(pageContent)
        
        // 進捗状況を更新
        setProgress(Math.floor((i / totalPages) * 100))
      }
      
      // EPUBの生成
      const title = pdfFile.name.replace('.pdf', '')
      
      // EPUBを生成（ブラウザ環境ではJSZipを使用してEPUBを模倣）
      const zip = new JSZip()
      
      // mimetype ファイル（EPUBの必須ファイル）
      zip.file('mimetype', 'application/epub+zip')
      
      // META-INF ディレクトリ
      const metaInf = zip.folder('META-INF')
      metaInf?.file('container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`)
      
      // OEBPS ディレクトリ（コンテンツを格納）
      const oebps = zip.folder('OEBPS')
      
      // スタイルシート（拡張版）
      oebps?.file('stylesheet.css', `
body {
  font-family: Arial, sans-serif;
  margin: 5%;
  text-align: justify;
}
h1, h2, h3, h4, h5, h6 {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
p {
  margin: 0.5em 0;
  text-indent: 1em;
}
ul, ol {
  margin-left: 1em;
}
li {
  margin: 0.3em 0;
}
.list-item {
  display: list-item;
  margin-left: 1.5em;
}
.list-bullet {
  list-style-type: disc;
}
.list-number {
  list-style-type: decimal;
}
.font-small {
  font-size: 0.8em;
}
.font-large {
  font-size: 1.2em;
}
.font-xlarge {
  font-size: 1.5em;
}
.font-bold {
  font-weight: bold;
}
.font-italic {
  font-style: italic;
}
`)
      
      // 各ページのHTMLファイルを生成（スタイル情報を活用）
      extractedPages.forEach((page, index) => {
        // ページ内のテキストアイテムをHTMLに変換
        const contentHtml = generateHtmlFromItems(page.items)
        
        oebps?.file(`page${index + 1}.xhtml`, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>${title}</title>
  <link rel="stylesheet" type="text/css" href="stylesheet.css" />
</head>
<body>
  ${contentHtml}
</body>
</html>`)
      })
      
      // toc.ncx ファイル（目次）
      oebps?.file('toc.ncx', `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${Date.now()}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${title}</text>
  </docTitle>
  <navMap>
    <navPoint id="navpoint-1" playOrder="1">
      <navLabel>
        <text>${title}</text>
      </navLabel>
      <content src="page1.xhtml"/>
    </navPoint>
  </navMap>
</ncx>`)
      
      // content.opf ファイル（パッケージ情報）
      oebps?.file('content.opf', `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="BookId">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>${title}</dc:title>
    <dc:creator>PDF to EPUB Converter</dc:creator>
    <dc:identifier id="BookId">urn:uuid:${Date.now()}</dc:identifier>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">${new Date().toISOString().split('.')[0]}Z</meta>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="stylesheet" href="stylesheet.css" media-type="text/css"/>
    ${extractedPages.map((_, index) => `<item id="page${index + 1}" href="page${index + 1}.xhtml" media-type="application/xhtml+xml"/>`).join('\n    ')}
  </manifest>
  <spine toc="ncx">
    ${extractedPages.map((_, index) => `<itemref idref="page${index + 1}"/>`).join('\n    ')}
  </spine>
</package>`)
      
      // EPUBファイルを生成
      const epubBlob = await zip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' })
      setConvertedEpub(epubBlob)
      
    } catch (err) {
      console.error('Error during conversion:', err)
      setError("An error occurred during conversion. Please try again.")
    } finally {
      setIsConverting(false)
      setProgress(100)
    }
  }

  // テキストアイテムからHTMLを生成する関数
  const generateHtmlFromItems = (items: TextItem[]): string => {
    let html = ''
    let currentParagraph = ''
    let inList = false
    let lastY = -1
    let lastFontSize = -1
    
    // 同じ行にあるテキストアイテムをグループ化する
    const groupedItems: TextItem[][] = []
    let currentLine: TextItem[] = []
    
    items.forEach((item: TextItem) => {
      // Y座標を取得（transformの5番目の値）
      const currentY = item.transform ? item.transform[5] : 0
      
      // 新しい行の開始を検出（Y座標が変わった場合）
      if (lastY !== -1 && Math.abs(currentY - lastY) > 3) {
        if (currentLine.length > 0) {
          groupedItems.push([...currentLine])
          currentLine = []
        }
      }
      
      currentLine.push(item)
      lastY = currentY
    })
    
    // 最後の行を追加
    if (currentLine.length > 0) {
      groupedItems.push(currentLine)
    }
    
    // グループ化されたアイテムを処理
    groupedItems.forEach(lineItems => {
      // 行内のテキストを結合
      const lineText = lineItems.map((item: TextItem) => item.str).join(' ').trim()
      
      // 空行はスキップ
      if (!lineText) return
      
      // 最初のアイテムのスタイル情報を使用
      const firstItem = lineItems[0]
      const fontSize = firstItem.style?.fontSize || 12
      
      // フォントサイズに基づいてスタイルクラスを決定
      let fontSizeClass = ''
      
      if (fontSize < 10) {
        fontSizeClass = 'font-small'
      } else if (fontSize > 14 && fontSize <= 18) {
        fontSizeClass = 'font-large'
      } else if (fontSize > 18) {
        fontSizeClass = 'font-xlarge'
      }
      
      // フォントスタイルを決定
      const fontWeightClass = firstItem.style?.fontWeight === 'bold' ? 'font-bold' : ''
      const fontStyleClass = firstItem.style?.fontStyle === 'italic' ? 'font-italic' : ''
      
      // スタイルクラスを結合
      const styleClasses = [fontSizeClass, fontWeightClass, fontStyleClass].filter(Boolean).join(' ')
      const styleAttr = styleClasses ? ` class="${styleClasses}"` : ''
      
      // リスト項目かどうかを判断
      const isListItem = /^[\s]*[•\-\*][\s]+/.test(lineText)
      const isNumberedListItem = /^[\s]*\d+\.[\s]+/.test(lineText)
      
      if (isListItem || isNumberedListItem) {
        // 前の段落があれば追加
        if (currentParagraph) {
          html += `<p${styleAttr}>${currentParagraph}</p>\n`
          currentParagraph = ''
        }
        
        // リストを開始
        if (!inList) {
          html += isNumberedListItem ? '<ol>\n' : '<ul>\n'
          inList = true
        }
        
        // リスト項目のテキストを整形（先頭の記号や番号を削除）
        const listText = lineText.replace(/^[\s]*[•\-\*][\s]+|^[\s]*\d+\.[\s]+/, '')
        html += `<li${styleAttr}>${listText}</li>\n`
      } else {
        // リストを終了
        if (inList) {
          html += isNumberedListItem ? '</ol>\n' : '</ul>\n'
          inList = false
        }
        
        // 大きなフォントサイズの場合は見出しとして扱う
        if (fontSize > 18) {
          // 前の段落があれば追加
          if (currentParagraph) {
            html += `<p>${currentParagraph}</p>\n`
            currentParagraph = ''
          }
          
          // 見出しとして処理
          // 章タイトルのパターンを検出（例：「第X章」で始まるテキスト）
          const isChapterTitle = /^第[一二三四五六七八九十百千万]+章/.test(lineText);
          
          // 見出しテキストを保存
          let headingText = lineText;
          
          // 次の行も見出しの一部かどうかを確認するための変数
          const nextLineIndex = groupedItems.indexOf(lineItems) + 1;
          
          // 章タイトルの場合、次の行も見出しの一部かどうかを確認
          if (isChapterTitle && nextLineIndex < groupedItems.length) {
            const nextLineItems = groupedItems[nextLineIndex];
            const nextLineText = nextLineItems.map((item: TextItem) => item.str).join(' ').trim();
            const nextLineFontSize = nextLineItems[0].style?.fontSize || 12;
            
            // 次の行も大きなフォントサイズなら、見出しの一部として結合
            if (nextLineFontSize > 14) {
              headingText += ' ' + nextLineText;
              // 次の行を処理済みとしてマーク
              groupedItems[nextLineIndex] = [];
            }
          }
          
          html += `<h2${styleAttr}>${headingText}</h2>\n`;
        } else if (fontSize > 14) {
          // 前の段落があれば追加
          if (currentParagraph) {
            html += `<p>${currentParagraph}</p>\n`
            currentParagraph = ''
          }
          
          html += `<h3${styleAttr}>${lineText}</h3>\n`
        } else {
          // フォントサイズが変わった場合は新しい段落を開始
          if (lastFontSize !== -1 && Math.abs(fontSize - lastFontSize) > 2) {
            if (currentParagraph) {
              html += `<p${styleAttr}>${currentParagraph}</p>\n`
              currentParagraph = ''
            }
          }
          
          // 通常のテキスト
          if (currentParagraph) {
            currentParagraph += ' ' + lineText
          } else {
            currentParagraph = lineText
          }
        }
      }
      
      lastFontSize = fontSize
    })
    
    // 最後の段落を追加
    if (currentParagraph) {
      html += `<p>${currentParagraph}</p>\n`
    }
    
    // 最後のリストを閉じる
    if (inList) {
      html += '</ul>\n'
    }
    
    return html
  }

  // EPUBファイルをダウンロード
  const downloadEpub = () => {
    if (!convertedEpub || !pdfFile) return
    
    const fileName = pdfFile.name.replace('.pdf', '.epub')
    saveAs(convertedEpub, fileName)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{translations.title}</h1>
        <p className="text-gray-300">{translations.description}</p>
      </div>

      {!isPdfJsReady && !error ? (
        <div className="bg-gray-700 rounded-lg p-6 mb-8 text-center">
          <p className="text-gray-300 mb-2">{translations.loading}</p>
          <div className="w-full flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">
              {translations.form.upload.label}
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-gray-600' : 'border-gray-500 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-300 mb-2">
                {isDragActive
                  ? translations.form.upload.dragging
                  : translations.form.upload.instruction}
              </p>
              <p className="text-gray-400 text-sm">{translations.form.upload.maxSize}</p>
              {pdfFile && (
                <p className="text-green-400 mt-2">
                  {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>

          {pdfFile && (
            <button
              type="button"
              onClick={convertToEpub}
              disabled={isConverting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConverting ? translations.status.processing : translations.form.convert}
            </button>
          )}

          {/* 変換中のプログレスバー */}
          {isConverting && (
            <div className="mt-4">
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-300 text-center mt-2">{progress}%</p>
            </div>
          )}
        </div>
      )}

      {/* PDF Preview (hidden, used for rendering) */}
      <div className="hidden">
        {pdfFile && (
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages || 0), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={true}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        )}
      </div>

      {/* 変換結果 */}
      {convertedEpub && (
        <div className="mt-8">
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Conversion Complete</h2>
            <button
              onClick={downloadEpub}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            >
              {translations.result.download}
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 
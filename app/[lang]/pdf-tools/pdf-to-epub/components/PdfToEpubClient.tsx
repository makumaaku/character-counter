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

export default function PdfToEpubClient({ translations }: Props) {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [convertedEpub, setConvertedEpub] = useState<Blob | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPdfJsReady, setIsPdfJsReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const textContentRef = useRef<string[]>([])

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
    textContentRef.current = []
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
    textContentRef.current = Array(numPages).fill('')
  }

  // テキスト抽出処理
  const extractTextFromPage = async (pageNum: number, pdfDoc: unknown) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const page = await (pdfDoc as any).getPage(pageNum)
      const textContent = await page.getTextContent()
      const textItems = textContent.items.map((item: { str?: string }) => item.str || '').join(' ')
      return textItems
    } catch (err) {
      console.error(`Error extracting text from page ${pageNum}:`, err)
      return ''
    }
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
      const extractedText: string[] = []
      
      // 各ページからテキストを抽出
      for (let i = 1; i <= totalPages; i++) {
        const pageText = await extractTextFromPage(i, pdfDoc)
        extractedText.push(pageText)
        
        // 進捗状況を更新
        setProgress(Math.floor((i / totalPages) * 100))
      }
      
      // EPUBの生成
      const title = pdfFile.name.replace('.pdf', '')
      
      // EPUBの内容を作成
      const content = extractedText.map((text, index) => {
        return {
          title: `Page ${index + 1}`,
          data: `<div>${text.replace(/\n/g, '<br/>')}</div>`
        }
      })
      
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
      
      // スタイルシート
      oebps?.file('stylesheet.css', `
body {
  font-family: Arial, sans-serif;
  margin: 5%;
  text-align: justify;
}
h1, h2 {
  text-align: center;
}
`)
      
      // 各ページのHTMLファイル
      content.forEach((item, index) => {
        oebps?.file(`page${index + 1}.xhtml`, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>${item.title}</title>
  <link rel="stylesheet" type="text/css" href="stylesheet.css" />
</head>
<body>
  <h2>${item.title}</h2>
  ${item.data}
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
    ${content.map((item, index) => `
    <navPoint id="navpoint-${index + 1}" playOrder="${index + 1}">
      <navLabel>
        <text>${item.title}</text>
      </navLabel>
      <content src="page${index + 1}.xhtml"/>
    </navPoint>`).join('')}
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
    ${content.map((item, index) => `<item id="page${index + 1}" href="page${index + 1}.xhtml" media-type="application/xhtml+xml"/>`).join('\n    ')}
  </manifest>
  <spine toc="ncx">
    ${content.map((item, index) => `<itemref idref="page${index + 1}"/>`).join('\n    ')}
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
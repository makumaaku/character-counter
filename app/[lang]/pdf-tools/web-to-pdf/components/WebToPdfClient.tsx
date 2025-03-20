'use client'

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'
import Image from 'next/image'

type Props = {
  translations: {
    title: string
    description: string
    form: {
      url: {
        label: string
        placeholder: string
        button: string
      }
    }
    result: {
      download: string
      preview: string
    }
    status: {
      processing: string
      noUrl: string
      success: string
    }
    error: {
      invalidUrl: string
      conversionFailed: string
      networkError: string
      timeout?: string
    }
    loading?: string
    preview?: {
      loading: string
      error: string
      pageOf: string
    }
  }
  lang: string
}

// PDF.jsの基本的なインターフェース定義
interface PDFJSLib {
  getDocument: (src: string) => { promise: Promise<PDFDocumentProxy> };
  GlobalWorkerOptions: {
    workerSrc: string;
  };
}

interface PDFDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PDFPageProxy>;
}

interface PDFPageProxy {
  getViewport: (options: { scale: number }) => PDFViewport;
  render: (options: { canvasContext: CanvasRenderingContext2D; viewport: PDFViewport }) => { promise: Promise<void> };
}

interface PDFViewport {
  width: number;
  height: number;
}

export default function WebToPdfClient({ translations, lang }: Props) {
  const [url, setUrl] = useState<string>('')
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)
  const [timeoutWarning, setTimeoutWarning] = useState<boolean>(false)
  
  // PDFプレビュー関連のステート
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [previewLoading, setPreviewLoading] = useState<boolean>(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [pageNum, setPageNum] = useState<number>(1)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pdfThumbnail, setPdfThumbnail] = useState<string | null>(null)
  
  const formRef = useRef<HTMLFormElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Function to validate URL
  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setPdfUrl(null)
    setIsSuccess(false)
    setProgress(0)
    setTimeoutWarning(false)
    setShowPreview(false)
    setPdfThumbnail(null)
    setNumPages(null)
    setPageNum(1)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (!url) {
      setError(translations.status.noUrl)
      return
    }

    if (!isValidUrl(url)) {
      setError(translations.error.invalidUrl)
      return
    }

    setIsConverting(true)
    setProgress(10) // 初期進捗を設定

    // 30秒後にタイムアウト警告を表示
    timeoutRef.current = setTimeout(() => {
      setTimeoutWarning(true)
      // 進捗を更新して処理中であることを示す
      setProgress((prev) => Math.min(prev + 10, 90))
    }, 30000)

    try {
      // 実際のAPIエンドポイントを使用してPDFを生成（PCサイズのレイアウトを再現するため幅を1920pxに設定、スケールを調整）
      const apiUrl = `/${lang}/api/pdf-tools?url=${encodeURIComponent(url)}&format=a4&orientation=portrait&scale=fit`
      
      setProgress(30) // リクエスト開始時の進捗を更新
      
      // APIの応答をチェック（実際にGETリクエストを送信）
      const response = await fetch(apiUrl)
      
      // タイムアウトタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      
      setProgress(70) // レスポンス受信時の進捗を更新
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      // レスポンスをBlobとして取得
      const blob = await response.blob()
      
      // BlobからURLを生成
      const blobUrl = URL.createObjectURL(blob)
      
      // 成功した場合、PDFのURLを設定
      setPdfUrl(blobUrl)
      setIsSuccess(true)
      setProgress(100) // 完了時の進捗を100%に設定
      
      // サムネイル用のプレビューを自動生成
      generatePdfThumbnail(blobUrl)
    } catch (error) {
      console.error('Conversion error:', error)
      setError(translations.error.conversionFailed)
    } finally {
      setIsConverting(false)
      setTimeoutWarning(false)
      
      // タイムアウトタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }

  // PDFのサムネイルを生成する関数
  const generatePdfThumbnail = async (pdfUrl: string) => {
    setPreviewLoading(true)
    try {
      // PDF.jsスクリプトが読み込まれていない場合は読み込む
      if (typeof window !== 'undefined' && !('pdfjsLib' in window)) {
        await loadPdfJsLibrary()
      }
      
      // PDFドキュメントを読み込む
      const pdfjsLib = (window as unknown as { pdfjsLib: PDFJSLib }).pdfjsLib
      const loadingTask = pdfjsLib.getDocument(pdfUrl)
      const pdf = await loadingTask.promise
      setNumPages(pdf.numPages)
      
      // 最初のページを取得
      const page = await pdf.getPage(1)
      
      // サムネイルのスケールを設定（小さめのサイズ）
      const scale = 0.5
      const viewport = page.getViewport({ scale })
      
      // Canvasを作成してサムネイルをレンダリング
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      
      if (context) {
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise
        
        // CanvasからデータURLを生成
        const thumbnailUrl = canvas.toDataURL('image/png')
        setPdfThumbnail(thumbnailUrl)
      }
    } catch (error) {
      console.error('PDF thumbnail generation error:', error)
      setPreviewError(translations.preview?.error || 'Failed to generate preview')
    } finally {
      setPreviewLoading(false)
    }
  }
  
  // PDF.jsライブラリを動的に読み込む関数
  const loadPdfJsLibrary = () => {
    return new Promise<void>((resolve, reject) => {
      // すでに読み込まれている場合はすぐに解決
      if ('pdfjsLib' in window) {
        resolve()
        return
      }
      
      // PDF.jsのCDNから読み込む
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js'
      script.onload = () => {
        // PDF.jsワーカーを設定
        const pdfjsLib = (window as unknown as { pdfjsLib: PDFJSLib }).pdfjsLib
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
        resolve()
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
  
  // PDFプレビューを表示する関数
  const renderPdfPreview = async () => {
    if (!pdfUrl || !canvasRef.current) return
    
    setPreviewLoading(true)
    setPreviewError(null)
    
    try {
      // PDF.jsスクリプトが読み込まれていない場合は読み込む
      if (typeof window !== 'undefined' && !('pdfjsLib' in window)) {
        await loadPdfJsLibrary()
      }
      
      // PDFドキュメントを読み込む
      const pdfjsLib = (window as unknown as { pdfjsLib: PDFJSLib }).pdfjsLib
      const loadingTask = pdfjsLib.getDocument(pdfUrl)
      const pdf = await loadingTask.promise
      setNumPages(pdf.numPages)
      
      // 指定したページを取得
      const page = await pdf.getPage(pageNum)
      
      // 表示するスケールを設定
      const scale = 1.0
      const viewport = page.getViewport({ scale })
      
      // Canvasのサイズを設定
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      
      if (context) {
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise
      }
    } catch (error) {
      console.error('PDF rendering error:', error)
      setPreviewError(translations.preview?.error || 'Failed to preview PDF')
    } finally {
      setPreviewLoading(false)
    }
  }
  
  // プレビューの表示/非表示を切り替える関数
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }
  
  // ページを変更する関数
  const changePage = (offset: number) => {
    const newPageNum = pageNum + offset
    if (numPages && newPageNum >= 1 && newPageNum <= numPages) {
      setPageNum(newPageNum)
    }
  }

  // Function to handle URL input change
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
    if (error) setError(null)
    if (isSuccess) setIsSuccess(false)
  }

  // コンポーネントがアンマウントされる時にBlobURLを解放
  const cleanupBlobUrl = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }
  }

  // PDFプレビューが表示される時にレンダリング
  useEffect(() => {
    if (showPreview) {
      renderPdfPreview()
    }
  }, [showPreview, pageNum])

  // コンポーネントがアンマウントされる時にクリーンアップ
  useEffect(() => {
    return () => {
      cleanupBlobUrl()
      
      // タイムアウトタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Structured Data for HowTo */}
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            'name': translations.title,
            'description': translations.description,
            'step': [
              {
                '@type': 'HowToStep',
                'name': 'Enter URL',
                'text': 'Enter the URL of the website you want to convert to PDF',
                'position': 1
              },
              {
                '@type': 'HowToStep',
                'name': 'Convert',
                'text': 'Click the Convert to PDF button',
                'position': 2
              },
              {
                '@type': 'HowToStep',
                'name': 'Wait',
                'text': 'Wait for the conversion to complete',
                'position': 3
              },
              {
                '@type': 'HowToStep',
                'name': 'Preview',
                'text': 'Preview the generated PDF',
                'position': 4
              },
              {
                '@type': 'HowToStep',
                'name': 'Download',
                'text': 'Download your PDF file',
                'position': 5
              }
            ]
          })
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{translations.title}</h1>
        <p className="text-gray-300">{translations.description}</p>
      </div>

      {/* Main content */}
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              {translations.form.url.label}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                id="url"
                value={url}
                onChange={handleUrlChange}
                placeholder={translations.form.url.placeholder}
                className="flex-grow px-4 py-2 bg-gray-800 border border-gray-600 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                disabled={isConverting}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isConverting
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-500'
                }`}
                disabled={isConverting}
              >
                {isConverting ? translations.status.processing : translations.form.url.button}
              </button>
            </div>
          </div>
        </form>

        {/* 変換中のプログレスバー */}
        {isConverting && (
          <div className="mt-6">
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-300 text-sm">{translations.status.processing}</p>
              <p className="text-gray-300 text-sm">{progress}%</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            </div>
            
            {/* タイムアウト警告 */}
            {timeoutWarning && (
              <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-700 text-yellow-100 rounded-md">
                <p className="text-sm">
                  {translations.error.timeout || '変換に時間がかかっています。複雑なウェブサイトの場合は、完了までに1分以上かかることがあります。しばらくお待ちください...'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Result or Error */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {isSuccess && pdfUrl && (
        <div className="bg-purple-900/40 border border-purple-700 text-purple-100 px-4 py-3 rounded-md mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="mb-3 sm:mb-0">{translations.status.success}</p>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={togglePreview}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                  {translations.result.preview || 'Preview PDF'}
                </button>
                <a
                  href={pdfUrl}
                  download={`webpage-${new Date().getTime()}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                    />
                  </svg>
                  {translations.result.download}
                </a>
              </div>
            </div>
            
            {/* PDFサムネイル表示 */}
            {!showPreview && pdfThumbnail && (
              <div className="mt-2 flex justify-center">
                <div className="relative w-full max-w-sm">
                  <Image 
                    src={pdfThumbnail} 
                    alt="PDF Thumbnail" 
                    width={500}
                    height={700}
                    className="w-full h-auto rounded-md border-2 border-purple-500 shadow-lg cursor-pointer" 
                    onClick={togglePreview}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                    <div className="bg-purple-600 text-white px-3 py-2 rounded-md">
                      {translations.result.preview || 'Preview PDF'}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* PDF全画面プレビュー */}
            {showPreview && (
              <div className="mt-4">
                <div className="flex flex-col items-center bg-gray-800 rounded-lg p-4">
                  {previewLoading && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-400 mb-2"></div>
                      <p className="text-gray-300">{translations.preview?.loading || 'Loading preview...'}</p>
                    </div>
                  )}
                  
                  {previewError && (
                    <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-md my-2 w-full">
                      {previewError}
                    </div>
                  )}
                  
                  <canvas 
                    ref={canvasRef} 
                    className={`border border-purple-600 rounded max-w-full h-auto ${previewLoading ? 'hidden' : 'block'}`}
                  ></canvas>
                  
                  {numPages && numPages > 0 && (
                    <div className="flex items-center justify-between w-full mt-4">
                      <button 
                        onClick={() => changePage(-1)} 
                        disabled={pageNum <= 1}
                        className={`px-3 py-1 rounded ${pageNum <= 1 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
                      >
                        ← 前のページ
                      </button>
                      
                      <span className="text-gray-300">
                        {translations.preview?.pageOf ? 
                          translations.preview.pageOf.replace('{current}', pageNum.toString()).replace('{total}', numPages?.toString() || '') : 
                          `Page ${pageNum} of ${numPages}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
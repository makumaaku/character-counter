'use client'

import { useState, useRef } from 'react'
import Script from 'next/script'

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
      options: {
        label: string
        format: {
          label: string
          a4: string
          letter: string
          legal: string
        }
        orientation: {
          label: string
          portrait: string
          landscape: string
        }
        scale: {
          label: string
          default: string
          fit: string
        }
      }
    }
    result: {
      download: string
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
    }
  }
}

type PaperFormat = 'a4' | 'letter' | 'legal'
type Orientation = 'portrait' | 'landscape'
type Scale = 'default' | 'fit'

export default function WebToPdfClient({ translations }: Props) {
  const [url, setUrl] = useState<string>('')
  const [format, setFormat] = useState<PaperFormat>('a4')
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [scale, setScale] = useState<Scale>('default')
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

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

    if (!url) {
      setError(translations.status.noUrl)
      return
    }

    if (!isValidUrl(url)) {
      setError(translations.error.invalidUrl)
      return
    }

    setIsConverting(true)

    try {
      // 実際のAPIエンドポイントを使用してPDFを生成
      const apiUrl = `/api/pdf?url=${encodeURIComponent(url)}&format=${format}&orientation=${orientation}&scale=${scale}`
      
      // APIの応答をチェック（ヘッダーのみを取得）
      const response = await fetch(apiUrl, { method: 'HEAD' })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      // 成功した場合、PDFのURLを設定
      setPdfUrl(apiUrl)
      setIsSuccess(true)
    } catch (error) {
      console.error('Conversion error:', error)
      setError(translations.error.conversionFailed)
    } finally {
      setIsConverting(false)
    }
  }

  // Function to handle URL input change
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
    if (error) setError(null)
    if (isSuccess) setIsSuccess(false)
  }

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
                'name': 'Customize Options',
                'text': 'Customize the PDF options (format, orientation, scale)',
                'position': 2
              },
              {
                '@type': 'HowToStep',
                'name': 'Convert',
                'text': 'Click the Convert to PDF button',
                'position': 3
              },
              {
                '@type': 'HowToStep',
                'name': 'Wait',
                'text': 'Wait for the conversion to complete',
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
                className="flex-grow px-4 py-2 bg-gray-800 border border-gray-600 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                disabled={isConverting}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isConverting
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
                disabled={isConverting}
              >
                {isConverting ? translations.status.processing : translations.form.url.button}
              </button>
            </div>
          </div>

          {/* Options */}
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-3">
              {translations.form.options.label}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Format */}
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-gray-300 mb-2">
                  {translations.form.options.format.label}
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as PaperFormat)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  disabled={isConverting}
                >
                  <option value="a4">{translations.form.options.format.a4}</option>
                  <option value="letter">{translations.form.options.format.letter}</option>
                  <option value="legal">{translations.form.options.format.legal}</option>
                </select>
              </div>

              {/* Orientation */}
              <div>
                <label htmlFor="orientation" className="block text-sm font-medium text-gray-300 mb-2">
                  {translations.form.options.orientation.label}
                </label>
                <select
                  id="orientation"
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as Orientation)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  disabled={isConverting}
                >
                  <option value="portrait">{translations.form.options.orientation.portrait}</option>
                  <option value="landscape">{translations.form.options.orientation.landscape}</option>
                </select>
              </div>

              {/* Scale */}
              <div>
                <label htmlFor="scale" className="block text-sm font-medium text-gray-300 mb-2">
                  {translations.form.options.scale.label}
                </label>
                <select
                  id="scale"
                  value={scale}
                  onChange={(e) => setScale(e.target.value as Scale)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  disabled={isConverting}
                >
                  <option value="default">{translations.form.options.scale.default}</option>
                  <option value="fit">{translations.form.options.scale.fit}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Result or Error */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {isSuccess && pdfUrl && (
        <div className="bg-green-900/50 border border-green-700 text-green-100 px-4 py-3 rounded-md mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="mb-3 sm:mb-0">{translations.status.success}</p>
            <a
              href={pdfUrl}
              download={`webpage-${new Date().getTime()}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md transition-colors"
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
      )}
    </div>
  )
} 
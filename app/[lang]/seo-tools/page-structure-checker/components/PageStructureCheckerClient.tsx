'use client'

import { useState } from 'react'
import { SeoToolsPageStructureCheckerMessages } from '@/lib/i18n/types'

type PageStructureResult = {
  title: string | null
  description: string | null
  canonicalUrl: string | null
  headings: {
    tag: string
    text: string
    level: number
  }[]
  issues: {
    type: 'error' | 'warning'
    message: string
  }[]
  errorMessage?: string
}

interface PageStructureCheckerClientProps {
  lang: string
  messages: SeoToolsPageStructureCheckerMessages
}

export default function PageStructureCheckerClient({ lang, messages }: PageStructureCheckerClientProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PageStructureResult | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)
    setDebugInfo(null)

    try {
      if (!url) {
        throw new Error(messages.error.urlRequired)
      }

      // URLの形式チェック
      try {
        new URL(url)
      } catch {
        throw new Error(messages.error.invalidUrl)
      }

      // デバッグ情報
      console.log(`Analyzing URL: ${url}`)

      try {
        const response = await fetch(`/${lang}/api/seo-tools/analyze-page-structure`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        })

        // デバッグ情報としてステータスコードを記録
        const statusInfo = `Status: ${response.status} ${response.statusText}`
        console.log(statusInfo)

        if (!response.ok) {
          let errorMessage = messages.error.fetchFailed
          
          try {
            const errorData = await response.json()
            if (errorData && errorData.error) {
              errorMessage = errorData.error
            }
          } catch (jsonError) {
            // JSONパースエラー
            const responseText = await response.text().catch(() => 'Could not read response text')
            setDebugInfo(`Server response (${response.status}): ${responseText.substring(0, 200)}...`)
            console.error('Failed to parse error response as JSON:', jsonError)
            errorMessage = 'Invalid server response format. The server might be returning HTML instead of JSON.'
          }
          
          throw new Error(errorMessage)
        }

        // レスポンスをJSONとしてパース
        let data
        try {
          data = await response.json()
        } catch (jsonError) {
          console.error('Failed to parse success response as JSON:', jsonError)
          const responseText = await response.text().catch(() => 'Could not read response text')
          setDebugInfo(`Server response: ${responseText.substring(0, 200)}...`)
          throw new Error('Invalid response format from server')
        }

        // APIからのレスポンスにエラーメッセージが含まれている場合は表示する
        if (data.errorMessage) {
          console.warn('API returned an error message:', data.errorMessage)
        }

        setResult(data)
      } catch (fetchError) {
        // fetch APIのエラー
        console.error('Fetch error:', fetchError)
        if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          throw new Error(messages.error.networkError)
        }
        throw fetchError
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="url" className="block mb-2 text-lg font-medium">
            {messages.form.urlLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              id="url"
              placeholder={messages.form.urlPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition-colors"
            >
              {isLoading ? messages.form.analyzing : messages.form.analyze}
            </button>
          </div>
          <p className="text-sm text-gray-300 mt-2">
            {messages.form.example}: https://example.com
          </p>
        </div>
      </form>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-2">{messages.error.title}</h3>
          <p>{error}</p>
          {debugInfo && (
            <div className="mt-4 p-3 bg-gray-800 rounded overflow-auto text-xs">
              <p className="text-gray-400 mb-1">デバッグ情報:</p>
              <pre className="whitespace-pre-wrap break-all">{debugInfo}</pre>
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* エラーメッセージがある場合に表示 */}
          {result.errorMessage && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-2">{messages.error.title}</h3>
              <p>{result.errorMessage}</p>
            </div>
          )}
          
          {/* Issues Found セクション - 一番上に表示（シンプルに） */}
          {result.issues && result.issues.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                {messages.issues}
              </h2>
              <div className="space-y-2">
                <ul className="list-none space-y-2">
                  {result.issues.map((issue, index) => (
                    <li key={index} className={issue.type === 'error' ? 'text-red-300' : 'text-yellow-300'}>
                      {issue.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Meta Information セクション - 2番目に表示 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              {messages.metaTitle}
            </h2>
            
            {/* メタ情報の分析結果 */}
            <div className="mb-6 p-3 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">{messages.analysis}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.title ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>
                    Title: {result.title ? messages.good : messages.missing}
                    {!result.title && <span className="ml-2 text-red-300 font-bold">🚫 {messages.issueFound}</span>}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.description ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>
                    Description: {result.description ? messages.good : messages.missing}
                    {!result.description && <span className="ml-2 text-red-300 font-bold">🚫 {messages.issueFound}</span>}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.canonicalUrl ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span>
                    Canonical URL: {result.canonicalUrl ? messages.good : messages.missing}
                    {!result.canonicalUrl && <span className="ml-2 text-yellow-300 font-bold">⚠️ {messages.recommended}</span>}
                  </span>
                </div>
              </div>
            </div>
            
            {/* メタ情報の詳細 */}
            <div className="space-y-4">
              <div className={!result.title ? 'relative border-l-4 border-red-500 pl-3' : ''}>
                <h3 className="font-semibold text-lg flex items-center">
                  Title
                  {!result.title && <span className="ml-2 text-sm text-red-300 font-bold">{messages.importantForSeo}</span>}
                </h3>
                {result.title ? (
                  <p className="text-green-300 break-words">{result.title}</p>
                ) : (
                  <p className="text-red-400">{messages.noTitle}</p>
                )}
              </div>

              <div className={!result.description ? 'relative border-l-4 border-red-500 pl-3' : ''}>
                <h3 className="font-semibold text-lg flex items-center">
                  Description
                  {!result.description && <span className="ml-2 text-sm text-red-300 font-bold">{messages.importantForSeo}</span>}
                </h3>
                {result.description ? (
                  <p className="text-green-300 break-words">{result.description}</p>
                ) : (
                  <p className="text-red-400">{messages.missing}</p>
                )}
              </div>

              <div className={!result.canonicalUrl ? 'relative border-l-4 border-yellow-500 pl-3' : ''}>
                <h3 className="font-semibold text-lg flex items-center">
                  Canonical URL
                  {!result.canonicalUrl && <span className="ml-2 text-sm text-yellow-300 font-bold">{messages.recommended}</span>}
                </h3>
                {result.canonicalUrl ? (
                  <p className="text-green-300 break-words">{result.canonicalUrl}</p>
                ) : (
                  <p className="text-yellow-300">{messages.missing}</p>
                )}
              </div>
            </div>
          </div>

          {/* Headings Structure セクション - 3番目に表示 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              {messages.headingsStructure}
            </h2>
            
            <p className="text-gray-300 mb-4">
              {messages.headingsExplanation}
            </p>
            
            {result.headings && result.headings.length > 0 ? (
              <div className="space-y-4">
                {/* 見出しレベルの説明 */}
                <div className="p-3 bg-gray-700 rounded-lg mb-4">
                  <h3 className="font-semibold text-lg mb-3">{messages.headingsLevelsTitle}</h3>
                  <p className="text-gray-300 mb-2">
                    {messages.contentStructureTitle}
                  </p>
                  <p className="text-gray-300">
                    {messages.contentStructureExplanation}
                  </p>
                </div>
                
                {/* 見出し一覧 */}
                <div className="p-3 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">{messages.viewHeadings}</h3>
                  <ul className="space-y-2">
                    {result.headings.map((heading, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`rounded-md px-2 text-xs font-bold mr-2 mt-1 ${
                          heading.level === 1 ? 'bg-purple-600 text-white' :
                          heading.level === 2 ? 'bg-blue-600 text-white' :
                          heading.level === 3 ? 'bg-green-600 text-white' :
                          heading.level === 4 ? 'bg-yellow-600 text-white' :
                          heading.level === 5 ? 'bg-orange-600 text-white' :
                          'bg-red-600 text-white'
                        }`}>
                          {heading.tag}
                        </span>
                        <span 
                          className={
                            (heading.level === 1 && !result.headings.some(h => h.level === 2)) || 
                            (heading.level === 2 && index < result.headings.length - 1 && result.headings[index + 1].level > 3) ?
                            'text-yellow-300' : 'text-white'
                          }
                        >
                          {heading.text}
                          {(heading.level === 1 && !result.headings.some(h => h.level === 2)) && 
                            <span className="text-yellow-300 text-xs block">⚠️ {messages.headingIssue}</span>
                          }
                          {(heading.level === 2 && index < result.headings.length - 1 && result.headings[index + 1].level > 3) && 
                            <span className="text-yellow-300 text-xs block">⚠️ {messages.headingIssue}</span>
                          }
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-700 rounded-lg">
                <p className="text-yellow-300">{messages.noHeadings}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 
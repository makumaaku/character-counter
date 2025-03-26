'use client'

import { useState } from 'react'
import { translate } from '@/lib/i18n/client'

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
  errorMessage?: string,
  error :{
    title: string,
    urlRequired: string,
    invalidUrl: string,
    fetchFailed: string,
    networkError: string,
    serverError: string,
    timeoutError: string,
    parsingError: string,
  }
}

export default function PageStructureCheckerClient({ lang }: { lang: string }) {
  const t = (key: string) => translate(lang, key)
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
        throw new Error(t('page-structure-checker.error.url-required'))
      }

      // URLの形式チェック
      try {
        new URL(url)
      } catch {
        throw new Error(t('page-structure-checker.error.invalid-url'))
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
          let errorMessage = t('page-structure-checker.error.fetch-failed')
          
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
          throw new Error(t('page-structure-checker.error.network-error'))
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
            {t('page-structure-checker.form.url-label')}
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              id="url"
              placeholder={t('page-structure-checker.form.url-placeholder')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition-colors"
            >
              {isLoading ? t('page-structure-checker.form.analyzing') : t('page-structure-checker.form.analyze')}
            </button>
          </div>
          <p className="text-sm text-gray-300 mt-2">
            {t('page-structure-checker.form.example')}: https://example.com
          </p>
        </div>
      </form>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-2">{t('page-structure-checker.error.title')}</h3>
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
              <h3 className="font-bold text-lg mb-2">{t('page-structure-checker.error.title')}</h3>
              <p>{result.errorMessage}</p>
            </div>
          )}
          
          {/* Issues Found セクション - 一番上に表示（シンプルに） */}
          {result.issues && result.issues.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                {t('page-structure-checker.issues')}
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
              {t('page-structure-checker.meta-title')}
            </h2>
            
            {/* メタ情報の分析結果 */}
            <div className="mb-6 p-3 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">{t('page-structure-checker.analysis')}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.title ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>
                    Title: {result.title ? t('page-structure-checker.good') : t('page-structure-checker.missing')}
                    {!result.title && <span className="ml-2 text-red-300 font-bold">🚫 {t('page-structure-checker.issue-found')}</span>}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.description ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>
                    Description: {result.description ? t('page-structure-checker.good') : t('page-structure-checker.missing')}
                    {!result.description && <span className="ml-2 text-red-300 font-bold">🚫 {t('page-structure-checker.issue-found')}</span>}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.canonicalUrl ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span>
                    Canonical URL: {result.canonicalUrl ? t('page-structure-checker.good') : t('page-structure-checker.missing')}
                    {!result.canonicalUrl && <span className="ml-2 text-yellow-300 font-bold">⚠️ {t('page-structure-checker.recommended')}</span>}
                  </span>
                </div>
              </div>
            </div>
            
            {/* メタ情報の詳細 */}
            <div className="space-y-4">
              <div className={!result.title ? 'relative border-l-4 border-red-500 pl-3' : ''}>
                <h3 className="font-semibold text-lg flex items-center">
                  Title
                  {!result.title && <span className="ml-2 text-sm text-red-300 font-bold">{t('page-structure-checker.important-for-seo')}</span>}
                </h3>
                {result.title ? (
                  <p className="text-green-300 break-words">{result.title}</p>
                ) : (
                  <p className="text-red-400">{t('no-title')}</p>
                )}
              </div>

              <div className={!result.description ? 'relative border-l-4 border-red-500 pl-3' : ''}>
                <h3 className="font-semibold text-lg flex items-center">
                  Description
                  {!result.description && <span className="ml-2 text-sm text-red-300 font-bold">{t('page-structure-checker.important-for-seo')}</span>}
                </h3>
                {result.description ? (
                  <p className="text-green-300 break-words">{result.description}</p>
                ) : (
                  <p className="text-red-400">{t('no-description')}</p>
                )}
              </div>
              
              <div className={!result.canonicalUrl ? 'relative border-l-4 border-yellow-500 pl-3' : ''}>
                <h3 className="font-semibold text-lg flex items-center">
                  Canonical URL
                  {!result.canonicalUrl && <span className="ml-2 text-sm text-yellow-300 font-bold">{t('page-structure-checker.recommended')}</span>}
                </h3>
                {result.canonicalUrl ? (
                  <p className="text-green-300 break-words">{result.canonicalUrl}</p>
                ) : (
                  <p className="text-yellow-400">{t('no-canonical')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Heading Structure セクション - 最後に表示 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              {t('page-structure-checker.heading-structure')}
            </h2>
            
            {/* 見出し構造の分析結果 */}
            <div className="mb-6 p-3 bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">{t('page-structure-checker.analysis')}</h3>
              <div className="space-y-2">
                {result.headings && result.headings.length > 0 ? (
                  <>
                    <div className="flex items-center">
                      <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.headings.some(h => h.level === 1) ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>
                        h1: {result.headings.some(h => h.level === 1) ? t('page-structure-checker.present') : t('page-structure-checker.missing')}
                        {!result.headings.some(h => h.level === 1) && <span className="ml-2 text-red-300 font-bold">🚫 {t('page-structure-checker.no-h1')}</span>}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-block w-4 h-4 rounded-full mr-2 ${result.headings.filter(h => h.level === 1).length <= 1 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>
                        h1 {t('page-structure-checker.count')}: {result.headings.filter(h => h.level === 1).length}
                        {result.headings.filter(h => h.level === 1).length > 1 && <span className="ml-2 text-red-300 font-bold">🚫 {t('page-structure-checker.multiple-h1')}</span>}
                      </span>
                    </div>
                    
                    {/* 見出し階層の問題がある場合、1行のみ表示 */}
                    {[2, 3, 4, 5, 6].some(level => {
                      const hasCurrentLevel = result.headings.some(h => h.level === level);
                      const hasPreviousLevel = result.headings.some(h => h.level === level - 1);
                      return hasCurrentLevel && !hasPreviousLevel;
                    }) && (
                      <div className="flex items-center">
                        <span className="inline-block w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
                        <span>
                          {t('page-structure-checker.hierarchy-issue-message')} <span className="text-yellow-300 font-bold">⚠️</span>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-red-500 mr-2"></span>
                    <span>
                      {t('page-structure-checker.no-headings')}
                      <span className="ml-2 text-red-300 font-bold">🚫 {t('page-structure-checker.issue-found')}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 見出し構造の詳細 - 階層構造の問題が分かるように表示 */}
            <div className={(!result.headings || result.headings.length === 0 || 
                             !result.headings.some(h => h.level === 1) || 
                             result.headings.filter(h => h.level === 1).length > 1) 
                             ? 'relative border-l-4 border-red-500 pl-3' : ''}>
              {result.headings && result.headings.length > 0 ? (
                <div className="space-y-3">
                  {result.headings.map((heading, index) => {
                    // 現在の見出しレベルと前のレベルの差を計算
                    const previousHeading = index > 0 ? result.headings[index - 1] : null;
                    const levelSkip = previousHeading ? heading.level - previousHeading.level > 1 : false;
                    
                    // 階層の問題 (h1→h3 のようにスキップがある場合)
                    const hasHierarchyIssue = levelSkip || 
                      (heading.level > 1 && !result.headings.some(h => h.level === heading.level - 1));
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-start ${heading.level === 1 && result.headings.filter(h => h.level === 1).length > 1 ? 'bg-red-900/30 p-2 rounded' : ''}`}
                        style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
                      >
                        <span className={`bg-gray-700 text-gray-300 px-2 py-1 rounded-md mr-3 font-mono 
                                        ${heading.level === 1 && result.headings.filter(h => h.level === 1).length > 1 ? 'border border-red-500' : ''}
                                        ${hasHierarchyIssue ? 'border border-yellow-500' : ''}`}>
                          {heading.tag}
                          {(heading.level === 1 && result.headings.filter(h => h.level === 1).length > 1) && 
                            <span className="text-red-300 ml-1">🚫</span>
                          }
                          {hasHierarchyIssue && 
                            <span className="text-yellow-300 ml-1">⚠️</span>
                          }
                        </span>
                        <span className="break-words">{heading.text}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-lg flex items-center">
                    {t('page-structure-checker.headings')}
                    <span className="ml-2 text-sm text-red-300 font-bold">{t('page-structure-checker.important-for-seo')}</span>
                  </h3>
                  <p className="text-red-400">
                    {t('page-structure-checker.no-headings')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
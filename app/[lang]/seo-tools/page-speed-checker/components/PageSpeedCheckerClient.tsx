'use client'

import { useState, FormEvent, useEffect } from 'react'
import { ChartBarIcon, ClockIcon, LightBulbIcon, DocumentTextIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

type Props = {
  translations: {
    title: string
    description: string
    input: {
      url: string
      analyzeButton: string
    }
    results: {
      loading: string
      loadTime: string
      resources: string
      suggestions: string
    }
    error: {
      invalidUrl: string
      fetchFailed: string
    }
    status: {
      noUrl: string
    }
  }
}

type ResourceInfo = {
  name: string
  type: string
  size: number
  time: number
}

type PerformanceResult = {
  loadTime: number
  resources: ResourceInfo[]
  suggestions: string[]
  canAccessDetailedInfo: boolean
}

export default function PageSpeedCheckerClient({ translations }: Props) {
  const [url, setUrl] = useState<string>('')
  const [analyzing, setAnalyzing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PerformanceResult | null>(null)
  const [canRunLighthouse, setCanRunLighthouse] = useState<boolean>(false)
  
  // ブラウザ環境かどうかをチェック
  useEffect(() => {
    // Lighthouseを実行できる環境かどうかをチェック（Chrome拡張機能などが必要）
    setCanRunLighthouse(typeof window !== 'undefined' && 'chrome' in window && 'runtime' in (window as any).chrome)
  }, [])
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }
  
  const isSameOrigin = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.origin === window.location.origin
    } catch (e) {
      return false
    }
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!url) {
      setError(translations.status.noUrl)
      return
    }
    
    if (!isValidUrl(url)) {
      setError(translations.error.invalidUrl)
      return
    }
    
    setError(null)
    setAnalyzing(true)
    setResult(null)
    
    try {
      // 開始時間を記録
      const startTime = performance.now()
      
      // 現在のパフォーマンスエントリをクリア
      performance.clearResourceTimings()
      
      // URLにリクエストを送信
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors', // CORSエラーを回避
        cache: 'no-cache'
      })
      
      // 終了時間を記録
      const endTime = performance.now()
      
      // 読み込み時間を計算（ミリ秒）
      const loadTime = endTime - startTime
      
      // 同一オリジンかどうかをチェック
      const sameOrigin = isSameOrigin(url)
      
      // リソース情報を取得（可能な場合）
      const resources: ResourceInfo[] = []
      
      // Resource Timing APIからリソース情報を取得
      const resourceEntries = performance.getEntriesByType('resource')
      
      resourceEntries.forEach((entry: any) => {
        try {
          const entryUrl = entry.name
          // URLがリクエストしたURLに関連するものだけを取得
          if (entryUrl.includes(new URL(url).hostname)) {
            const urlObj = new URL(entryUrl)
            const pathParts = urlObj.pathname.split('/')
            const fileName = pathParts[pathParts.length - 1] || urlObj.hostname
            
            resources.push({
              name: fileName,
              type: entry.initiatorType || 'unknown',
              size: entry.transferSize || 0,
              time: entry.duration || 0
            })
          }
        } catch (e) {
          // エラーが発生した場合はスキップ
          console.error('Error processing resource entry:', e)
        }
      })
      
      // リソースサイズでソート（大きい順）
      resources.sort((a, b) => b.size - a.size)
      
      // パフォーマンス分析結果を生成
      const performanceData = analyzePerformance(loadTime, url, resources, sameOrigin)
      setResult(performanceData)
    } catch (error) {
      console.error('Error analyzing page:', error)
      
      // エラーが発生しても、おおよその時間を測定して結果を表示
      const endTime = performance.now()
      const loadTime = endTime - performance.now()
      
      if (loadTime > 0) {
        const performanceData = analyzePerformance(loadTime, url, [], false)
        setResult(performanceData)
      } else {
        setError(translations.error.fetchFailed)
      }
    } finally {
      setAnalyzing(false)
    }
  }
  
  const analyzePerformance = (loadTime: number, url: string, resources: ResourceInfo[], canAccessDetailedInfo: boolean): PerformanceResult => {
    // URLからドメイン名を取得
    const domain = new URL(url).hostname
    
    // 改善提案を生成
    const suggestions: string[] = []
    
    // 読み込み時間に基づく提案
    if (loadTime > 3000) {
      suggestions.push(`⚠️ ページの読み込みに${(loadTime / 1000).toFixed(2)}秒かかっています。3秒以内を目指してください。`)
    } else if (loadTime > 1000) {
      suggestions.push(`⚠️ ページの初期接続時間は${(loadTime / 1000).toFixed(2)}秒です。1秒以内を目指すとユーザー体験が向上します。`)
    } else {
      suggestions.push(`✅ ページの初期接続時間は${(loadTime).toFixed(0)}ミリ秒です。この点は良好です！`)
    }
    
    // リソース分析に基づく提案（可能な場合）
    if (resources.length > 0) {
      const totalSize = resources.reduce((sum, r) => sum + r.size, 0)
      suggestions.push(`📊 検出されたリソースの総サイズ: ${formatSize(totalSize)}`)
      
      // 大きな画像の検出
      const largeImages = resources.filter(r => r.type === 'img' && r.size > 200000)
      if (largeImages.length > 0) {
        suggestions.push(`⚠️ ${largeImages.length}個の大きな画像が見つかりました（200KB超）。以下のファイルの圧縮を検討してください：
        ${largeImages.slice(0, 3).map(img => `- ${img.name}: ${formatSize(img.size)}`).join('\n        ')}${largeImages.length > 3 ? '\n        - その他...' : ''}`)
      }
      
      // 多数のJSファイル
      const jsFiles = resources.filter(r => r.type === 'script')
      if (jsFiles.length > 10) {
        suggestions.push(`⚠️ ${jsFiles.length}個のJavaScriptファイルが読み込まれています。以下のファイルの結合を検討してください：
        ${jsFiles.slice(0, 3).map(js => `- ${js.name}: ${formatSize(js.size)}`).join('\n        ')}${jsFiles.length > 3 ? '\n        - その他...' : ''}`)
      }
      
      // 読み込み時間が長いリソース
      const slowResources = resources.filter(r => r.time > 500)
      if (slowResources.length > 0) {
        suggestions.push(`⚠️ ${slowResources.length}個のリソースの読み込みに500ms以上かかっています。以下のファイルの最適化を検討してください：
        ${slowResources.slice(0, 3).map(res => `- ${res.name}: ${formatTime(res.time)}`).join('\n        ')}${slowResources.length > 3 ? '\n        - その他...' : ''}`)
      }
    }
    
    // 同一オリジンでない場合の注意
    if (!canAccessDetailedInfo) {
      suggestions.push(`ℹ️ セキュリティ制約により、クロスオリジンのリソースの詳細情報を取得できません。より詳細な分析には、以下の方法を試してください：
      1. Google PageSpeed Insightsで分析する: https://pagespeed.web.dev/
      2. Chrome DevToolsのNetworkタブで分析する
      3. Lighthouseを使用して詳細なパフォーマンスレポートを生成する`)
    }
    
    // 画像最適化に関する詳細な提案
    suggestions.push(`📊 画像最適化: 画像は通常、ウェブページの総ダウンロードサイズの50-80%を占めています。${domain}のページで大きな画像を使用している場合：
    - WebPやAVIF形式を使用すると、JPEGやPNGと比較して30-50%のファイルサイズ削減が可能です
    - 画像の遅延読み込み（Lazy Loading）を実装して、初期表示に必要ない画像の読み込みを遅らせましょう
    - 適切なサイズの画像を提供するために、srcset属性を使用してレスポンシブ画像を実装しましょう
    - 画像圧縮ツール（TinyPNG、Squooshなど）を使用して、品質をほとんど損なわずに画像を圧縮しましょう`)
    
    // JavaScriptの最適化に関する詳細な提案
    suggestions.push(`⚡ JavaScript最適化: JavaScriptの実行はレンダリングをブロックし、ページの読み込み時間を大幅に増加させる可能性があります：
    - コード分割（Code Splitting）を実装して、必要なJavaScriptのみを読み込むようにしましょう
    - 重要でないスクリプトには defer または async 属性を使用しましょう
    - 未使用のJavaScriptコードを削除するためにツリーシェイキングを活用しましょう
    - 大きなサードパーティライブラリの使用を最小限に抑えましょう
    - JavaScriptバンドルを最小化し、圧縮しましょう`)
    
    // CSSの最適化に関する詳細な提案
    suggestions.push(`🎨 CSS最適化: レンダリングブロッキングリソースを減らすことでページの表示速度が向上します：
    - クリティカルCSSをインライン化して、初期表示に必要なスタイルを即座に適用しましょう
    - 未使用のCSSを削除して、CSSファイルのサイズを削減しましょう
    - CSSファイルを最小化し、圧縮しましょう
    - メディアクエリを使用して、デバイスに必要なCSSのみを読み込むようにしましょう
    - CSSアニメーションよりもtransformとopacityプロパティを優先して使用しましょう`)
    
    // フォントの最適化に関する提案
    suggestions.push(`📝 Webフォント最適化: カスタムフォントはページの読み込み時間に大きな影響を与えることがあります：
    - font-display: swap を使用して、フォントの読み込み中にシステムフォントを表示しましょう
    - 必要なフォントウェイトとスタイルのみを読み込みましょう
    - WOFFまたはWOFF2フォント形式を使用して、ファイルサイズを削減しましょう
    - 可能であれば、システムフォントを使用することを検討しましょう`)
    
    // サーバーとネットワークの最適化に関する提案
    suggestions.push(`🌐 サーバー/ネットワーク最適化: サーバーのレスポンス時間とコンテンツ配信を改善しましょう：
    - コンテンツ配信ネットワーク（CDN）を使用して、ユーザーに近い場所からコンテンツを配信しましょう
    - HTTPキャッシュヘッダーを適切に設定して、リピートビジットでのパフォーマンスを向上させましょう
    - GZIPまたはBrotli圧縮を有効にして、転送されるデータ量を削減しましょう
    - HTTP/2またはHTTP/3を使用して、複数のリクエストを効率的に処理しましょう
    - DNSプリフェッチ、プリコネクト、プリロードなどのリソースヒントを使用して、重要なリソースの読み込みを最適化しましょう`)
    
    // モバイルパフォーマンスに関する提案
    suggestions.push(`📱 モバイルパフォーマンス: モバイルユーザーは通常、より制約のあるデバイスとネットワーク条件で閲覧しています：
    - モバイルファーストのアプローチを採用して、モバイルユーザー向けに最適化しましょう
    - タッチターゲットのサイズを適切に設定して（少なくとも48x48ピクセル）、ユーザビリティを向上させましょう
    - ビューポートを適切に設定して、モバイルデバイスでの表示を最適化しましょう
    - 複雑なアニメーションや重いインタラクションを減らして、低スペックデバイスでのパフォーマンスを向上させましょう`)
    
    // Core Web Vitalsに関する提案
    suggestions.push(`📊 Core Web Vitals: Googleのランキング要因として重要な指標を改善しましょう：
    - LCP（Largest Contentful Paint）: メインコンテンツの読み込み時間を2.5秒以内に抑えましょう
    - FID（First Input Delay）: ユーザーの最初のインタラクションへの応答時間を100ミリ秒以内に抑えましょう
    - CLS（Cumulative Layout Shift）: 視覚的な安定性を確保し、予期しないレイアウトシフトを防ぎましょう
    - これらの指標を測定するために、Google PageSpeed InsightsやChrome User Experience Reportを使用しましょう`)
    
    // 具体的なツールの推奨
    suggestions.push(`🛠️ 推奨ツール: より詳細な分析と改善のために、以下のツールを使用することをお勧めします：
    - Google PageSpeed Insights: 詳細なパフォーマンス分析とCore Web Vitalsの測定
    - Lighthouse: ブラウザ内でのパフォーマンス、アクセシビリティ、SEO、ベストプラクティスの分析
    - WebPageTest: 様々な条件下でのパフォーマンステスト
    - Chrome DevTools: ネットワーク、パフォーマンス、メモリの詳細な分析
    - GTmetrix: ページの読み込み時間と最適化の機会の分析`)
    
    return {
      loadTime,
      resources,
      suggestions,
      canAccessDetailedInfo
    }
  }
  
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }
  
  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms.toFixed(0)} ms`
    return `${(ms / 1000).toFixed(2)} s`
  }
  
  const openPageSpeedInsights = () => {
    if (!url) return
    window.open(`https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`, '_blank')
  }

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{translations.title}</h1>
          <p className="text-xl text-gray-300">
            {translations.description}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-lg font-medium mb-2">
                {translations.input.url}
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={analyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-md font-medium transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
                >
                  {analyzing ? translations.results.loading : translations.input.analyzeButton}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-red-400">{error}</p>
              )}
              <p className="mt-2 text-sm text-gray-400">
                注意: ブラウザのセキュリティ制約により、正確な測定ができない場合があります。
              </p>
            </div>
          </form>
        </div>

        {analyzing && (
          <div className="bg-gray-700 rounded-lg p-6 mb-8 text-center">
            <div className="animate-pulse">
              <ClockIcon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <p className="text-xl">{translations.results.loading}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-gray-700 rounded-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <ClockIcon className="h-6 w-6 mr-2 text-blue-400" />
                {translations.results.loadTime}
              </h2>
              <div className="bg-gray-600 rounded-lg p-4">
                <p className="text-3xl font-bold text-center">
                  {formatTime(result.loadTime)}
                </p>
                <p className="text-center text-gray-400 mt-2">
                  (初期接続時間のみ - 実際のページ読み込み時間はこれより長い場合があります)
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={openPageSpeedInsights}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    Google PageSpeed Insightsで詳細分析
                  </button>
                </div>
              </div>
            </div>

            {result.resources.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <DocumentTextIcon className="h-6 w-6 mr-2 text-green-400" />
                  検出されたリソース
                </h2>
                <div className="bg-gray-600 rounded-lg p-4 overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-500">
                        <th className="px-4 py-2 text-left">ファイル名</th>
                        <th className="px-4 py-2 text-left">タイプ</th>
                        <th className="px-4 py-2 text-left">サイズ</th>
                        <th className="px-4 py-2 text-left">読み込み時間</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.resources.map((resource, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="px-4 py-2 truncate max-w-[200px]">{resource.name}</td>
                          <td className="px-4 py-2">{resource.type}</td>
                          <td className="px-4 py-2">{formatSize(resource.size)}</td>
                          <td className="px-4 py-2">{formatTime(resource.time)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
                {translations.results.suggestions}
              </h2>
              <div className="bg-gray-600 rounded-lg p-4">
                <ul className="list-disc pl-5 space-y-4">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="whitespace-pre-line">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
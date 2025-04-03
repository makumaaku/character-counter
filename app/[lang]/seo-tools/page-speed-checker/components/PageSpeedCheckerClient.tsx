'use client'

import { useState, FormEvent } from 'react'
import { ClockIcon, LightBulbIcon, DocumentTextIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/button'
import { SeoToolsPageSpeedCheckerMessages } from '@/lib/i18n/types'

type Props = {
  messages: SeoToolsPageSpeedCheckerMessages
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

export default function PageSpeedCheckerClient({ messages }: Props) {
  const [url, setUrl] = useState<string>('')
  const [analyzing, setAnalyzing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PerformanceResult | null>(null)
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  const isSameOrigin = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.origin === window.location.origin
    } catch {
      return false
    }
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!url) {
      setError(messages.status.noUrl)
      return
    }
    
    if (!isValidUrl(url)) {
      setError(messages.error.invalidUrl)
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
      await fetch(url, {
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
      
      interface ResourceEntry {
        name: string;
        initiatorType?: string;
        transferSize?: number;
        duration?: number;
      }
      
      resourceEntries.forEach((entry: ResourceEntry) => {
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
        setError(messages.error.fetchFailed)
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
      suggestions.push((messages.analysis?.loadTime.slow || `⚠️ Page loading took ${(loadTime / 1000).toFixed(2)} seconds. Aim for under 3 seconds.`).replace('{{seconds}}', (loadTime / 1000).toFixed(2)))
    } else if (loadTime > 1000) {
      suggestions.push((messages.analysis?.loadTime.medium || `⚠️ Initial connection time is ${(loadTime / 1000).toFixed(2)} seconds. Aim for under 1 second for better user experience.`).replace('{{seconds}}', (loadTime / 1000).toFixed(2)))
    } else {
      suggestions.push((messages.analysis?.loadTime.fast || `✅ Initial connection time is ${loadTime.toFixed(0)} milliseconds. This is good!`).replace('{{milliseconds}}', loadTime.toFixed(0)))
    }
    
    // リソース分析に基づく提案（可能な場合）
    if (resources.length > 0) {
      const totalSize = resources.reduce((sum, r) => sum + r.size, 0)
      suggestions.push((messages.analysis?.resources.totalSize || `📊 Total size of detected resources: ${formatSize(totalSize)}`).replace('{{size}}', formatSize(totalSize)))
      
      // 大きな画像の検出
      const largeImages = resources.filter(r => r.type === 'img' && r.size > 200000)
      if (largeImages.length > 0) {
        const filesList = largeImages.slice(0, 3).map(img => `- ${img.name}: ${formatSize(img.size)}`).join('\n        ')
        const othersText = largeImages.length > 3 ? `\n        ${messages.analysis?.resources.others || '- Others...'}` : ''
        suggestions.push((messages.analysis?.resources.largeImages || 
          `⚠️ Found ${largeImages.length} large images (over 200KB). Consider compressing the following files:\n        {{files}}`)
          .replace('{{count}}', largeImages.length.toString())
          .replace('{{files}}', filesList + othersText))
      }
      
      // 多数のJSファイル
      const jsFiles = resources.filter(r => r.type === 'script')
      if (jsFiles.length > 10) {
        const filesList = jsFiles.slice(0, 3).map(js => `- ${js.name}: ${formatSize(js.size)}`).join('\n        ')
        const othersText = jsFiles.length > 3 ? `\n        ${messages.analysis?.resources.others || '- Others...'}` : ''
        suggestions.push((messages.analysis?.resources.manyJs || 
          `⚠️ ${jsFiles.length} JavaScript files are loaded. Consider combining the following files:\n        {{files}}`)
          .replace('{{count}}', jsFiles.length.toString())
          .replace('{{files}}', filesList + othersText))
      }
      
      // 読み込み時間が長いリソース
      const slowResources = resources.filter(r => r.time > 500)
      if (slowResources.length > 0) {
        const filesList = slowResources.slice(0, 3).map(res => `- ${res.name}: ${formatTime(res.time)}`).join('\n        ')
        const othersText = slowResources.length > 3 ? `\n        ${messages.analysis?.resources.others || '- Others...'}` : ''
        suggestions.push((messages.analysis?.resources.slowResources || 
          `⚠️ ${slowResources.length} resources took over 500ms to load. Consider optimizing the following files:\n        {{files}}`)
          .replace('{{count}}', slowResources.length.toString())
          .replace('{{files}}', filesList + othersText))
      }
    }
    
    // 同一オリジンでない場合の注意
    if (!canAccessDetailedInfo) {
      suggestions.push(messages.analysis?.security || `ℹ️ Due to security constraints, we cannot access detailed information about cross-origin resources. For a more detailed analysis, try:
      1. Analyze with Google PageSpeed Insights: https://pagespeed.web.dev/
      2. Analyze with Chrome DevTools Network tab
      3. Generate a detailed performance report using Lighthouse`)
    }
    
    // 画像最適化に関する詳細な提案
    suggestions.push((messages.analysis?.imageOptimization || `📊 Image Optimization: Images typically account for 50-80% of a web page's total download size. If you're using large images on ${domain} pages:
    - Using WebP or AVIF formats can reduce file sizes by 30-50% compared to JPEG or PNG
    - Implement lazy loading for images to delay loading images that aren't needed for initial display
    - Implement responsive images using the srcset attribute to provide appropriately sized images
    - Use image compression tools (like TinyPNG, Squoosh) to compress images with minimal quality loss`).replace('{{domain}}', domain))
    
    // JavaScriptの最適化に関する詳細な提案
    suggestions.push(messages.analysis?.javascriptOptimization || `⚡ JavaScript Optimization: JavaScript execution can block rendering and significantly increase page load times:
    - Implement code splitting to load only the JavaScript that's needed
    - Use defer or async attributes for non-critical scripts
    - Utilize tree shaking to remove unused JavaScript code
    - Minimize use of large third-party libraries
    - Minify and compress JavaScript bundles`)
    
    // CSSの最適化に関する詳細な提案
    suggestions.push(messages.analysis?.cssOptimization || `🎨 CSS Optimization: Reducing render-blocking resources improves page display speed:
    - Inline critical CSS to apply essential styles immediately for initial display
    - Remove unused CSS to reduce CSS file size
    - Minify and compress CSS files
    - Use media queries to load only the CSS needed for the device
    - Prefer using transform and opacity properties over CSS animations`)
    
    // フォントの最適化に関する提案
    suggestions.push(messages.analysis?.fontOptimization || `📝 Web Font Optimization: Custom fonts can significantly impact page load time:
    - Use font-display: swap to show system fonts while loading custom fonts
    - Load only the font weights and styles you need
    - Use WOFF or WOFF2 font formats to reduce file size
    - Consider using system fonts when possible`)
    
    // サーバーとネットワークの最適化に関する提案
    suggestions.push(messages.analysis?.serverOptimization || `🌐 Server/Network Optimization: Improve server response time and content delivery:
    - Use a Content Delivery Network (CDN) to serve content from locations closer to users
    - Set proper HTTP cache headers to improve performance for repeat visits
    - Enable GZIP or Brotli compression to reduce data transferred
    - Use HTTP/2 or HTTP/3 to handle multiple requests efficiently
    - Use resource hints like DNS prefetch, preconnect, and preload to optimize loading of critical resources`)
    
    // モバイルパフォーマンスに関する提案
    suggestions.push(messages.analysis?.mobileOptimization || `📱 Mobile Performance: Mobile users typically browse on more constrained devices and network conditions:
    - Adopt a mobile-first approach to optimize for mobile users
    - Set proper touch target sizes (at least 48x48 pixels) to improve usability
    - Configure the viewport properly to optimize display on mobile devices
    - Reduce complex animations and heavy interactions to improve performance on low-spec devices`)
    
    // Core Web Vitalsに関する提案
    suggestions.push(messages.analysis?.coreWebVitals || `📊 Core Web Vitals: Improve these metrics that are important ranking factors for Google:
    - LCP (Largest Contentful Paint): Keep main content loading time under 2.5 seconds
    - FID (First Input Delay): Keep response time to user's first interaction under 100ms
    - CLS (Cumulative Layout Shift): Ensure visual stability and prevent unexpected layout shifts
    - Use Google PageSpeed Insights and Chrome User Experience Report to measure these metrics`)
    
    // 具体的なツールの推奨
    suggestions.push(messages.analysis?.recommendedTools || `🛠️ Recommended Tools: For more detailed analysis and improvement, we recommend using these tools:
    - Google PageSpeed Insights: Detailed performance analysis and Core Web Vitals measurement
    - Lighthouse: In-browser analysis of performance, accessibility, SEO, and best practices
    - WebPageTest: Performance testing under various conditions
    - Chrome DevTools: Detailed analysis of network, performance, and memory
    - GTmetrix: Analysis of page load time and optimization opportunities`)
    
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
    if (url) {
      window.open(`https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`, '_blank')
    }
  }

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{messages.title}</h1>
          <p className="text-xl text-gray-300">
            {messages.description}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-lg font-medium mb-2">
                {messages.input.url}
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
                <Button
                  type="submit"
                  disabled={analyzing}
                  variant="purple"
                >
                  {analyzing ? messages.results.loading : messages.input.analyzeButton}
                </Button>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                {messages.input.securityNote}
              </p>
            </div>
          </form>
        </div>

        {analyzing && (
          <div className="bg-gray-700 rounded-lg p-6 mb-8 text-center">
            <div className="animate-pulse">
              <ClockIcon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <p className="text-xl">{messages.results.loading}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-gray-700 rounded-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <ClockIcon className="h-6 w-6 mr-2 text-blue-400" />
                {messages.results.loadTime}
              </h2>
              <div className="bg-gray-600 rounded-lg p-4">
                <p className="text-2xl font-bold mb-1">{(result.loadTime / 1000).toFixed(2)}s</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${result.loadTime < 1000 ? 'bg-green-500' : result.loadTime < 3000 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(100, result.loadTime / 50)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {result.resources.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <DocumentTextIcon className="h-6 w-6 mr-2 text-purple-400" />
                  {messages.results.resources}
                </h2>
                <div className="bg-gray-600 rounded-lg p-4">
                  <div className="space-y-3">
                    {result.resources.slice(0, 5).map((resource, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                        <div className="flex-1">
                          <div className="font-medium truncate">{resource.name}</div>
                          <div className="text-sm text-gray-400">{resource.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatSize(resource.size)}</div>
                          <div className="text-sm text-gray-400">{formatTime(resource.time)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
                {messages.results.suggestions}
              </h2>
              <div className="bg-gray-600 rounded-lg p-4">
                <div className="space-y-4">
                  {result.suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded">
                      {suggestion.split('\n').map((line, i) => (
                        <p key={i} className={line.trim().startsWith('-') ? 'pl-4 text-sm' : ''}>{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button variant="ghost" onClick={() => openPageSpeedInsights()}>
                <span className="flex items-center">
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  {messages.analysis?.tryPageSpeedInsights || "Try Google PageSpeed Insights"}
                </span>
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 text-red-200 p-4 rounded-lg mt-6">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
} 
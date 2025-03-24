'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { translate } from '@/lib/i18n/client'
import UrlForm from './UrlForm'
import HtmlViewer from './HtmlViewer'
import { extractMetadata } from '@/lib/seo/extractor'
import { generateSeoCode } from '@/lib/seo/generator'
import { InformationCircleIcon, DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline'

type GeneratedResult = {
  titleTag: string;
  metaDescription: string;
  ogTags: string;
  twitterTags: string;
  jsonLd: string;
}

export default function MetaCraftClient() {
  const params = useParams()
  const lang = params.lang as string
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null)
  
  // 翻訳配列を安全に取得するヘルパー関数
  const getSeoPoints = (): string[] => {
    const points = translate(lang, 'metaCraftForLlm.seoInfo.points');
    // 翻訳ファイルから配列が返ってきた場合はそれをそのまま使用
    // 文字列や他の型が返ってきた場合は空の配列を返す
    return Array.isArray(points) ? points : [];
  };
  
  const handleSubmit = async (url: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // APIを使用してHTMLを取得
      const response = await fetch(`/${lang}/api/crawl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || translate(lang, 'metaCraftForLlm.error.fetch'));
      }
      
      const data = await response.json();
      
      // HTMLからメタデータを抽出
      const metadata = extractMetadata(data.html, url);
      
      // メタデータからSEOコードを生成
      const seoCode = generateSeoCode(metadata);
      
      setGeneratedResult(seoCode);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : translate(lang, 'metaCraftForLlm.error.parsing'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <UrlForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
      
      {isLoading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-300">{translate(lang, 'metaCraftForLlm.loading')}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-900/40 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-6">
          <p className="font-medium">{error}</p>
        </div>
      )}
      
      {generatedResult && !isLoading && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-white">{translate(lang, 'metaCraftForLlm.result.title')}</h2>
          
          {/* JSON-LD セクションを最初に表示 */}
          <div className="mb-8 border-2 border-blue-500 rounded-lg bg-blue-900/30">
            <div className="flex items-center bg-blue-900 p-3 rounded-t-lg">
              <InformationCircleIcon className="h-6 w-6 text-blue-300 mr-2" />
              <h3 className="text-lg font-bold text-white">
                {translate(lang, 'metaCraftForLlm.result.jsonLd')} - {translate(lang, 'metaCraftForLlm.result.jsonLdImportance')}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-blue-200 mb-4">
                {translate(lang, 'metaCraftForLlm.result.jsonLdDescription')}
              </p>
              <HtmlViewer 
                title={translate(lang, 'metaCraftForLlm.result.jsonLd')} 
                htmlContent={generatedResult.jsonLd} 
              />
            </div>
          </div>
          
          {/* その他のSEO要素 */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">{translate(lang, 'metaCraftForLlm.result.otherElements')}</h3>
            
            <HtmlViewer 
              title={translate(lang, 'metaCraftForLlm.result.titleTag')} 
              htmlContent={generatedResult.titleTag} 
            />
            
            <HtmlViewer 
              title={translate(lang, 'metaCraftForLlm.result.metaDescription')} 
              htmlContent={generatedResult.metaDescription} 
            />
            
            <HtmlViewer 
              title={translate(lang, 'metaCraftForLlm.result.ogTags')} 
              htmlContent={generatedResult.ogTags} 
            />
            
            <HtmlViewer 
              title={translate(lang, 'metaCraftForLlm.result.twitterTags')} 
              htmlContent={generatedResult.twitterTags} 
            />
          </div>
        </div>
      )}
      
      {/* SEO情報セクション（常に表示） */}
      <div className="mt-16 mb-10 border border-gray-600 rounded-lg bg-gray-800/50">
        <div className="flex items-center bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
          <DocumentTextIcon className="h-6 w-6 text-yellow-400 mr-3" />
          <h2 className="text-xl font-bold text-white">
            {translate(lang, 'metaCraftForLlm.seoInfo.title')}
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-6 text-lg">
            {translate(lang, 'metaCraftForLlm.seoInfo.description')}
          </p>
          
          <ul className="space-y-3 mb-6">
            {getSeoPoints().map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <LightBulbIcon className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{point}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-blue-900/30 border border-blue-800 rounded-md p-4 mt-8">
            <p className="text-blue-200 font-medium">
              {translate(lang, 'metaCraftForLlm.seoInfo.conclusion')}
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              <span className="font-semibold">Schema.org:</span> <a href="https://schema.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://schema.org/</a>
              <span className="mx-2">|</span>
              <span className="font-semibold">JSON-LD:</span> <a href="https://json-ld.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://json-ld.org/</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
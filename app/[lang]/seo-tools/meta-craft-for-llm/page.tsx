import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import MetaCraftClient from './components/MetaCraftClient'
import { Language, SeoToolsMetaCraftForLlmMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function MetaCraftForLlm({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/meta-craft-for-llm')
  
  // サーバーコンポーネントで必要な翻訳を取得（並列処理）
  const [
    pageTitle,
    pageDescription,
    // MetaCraftClient用の翻訳
    loading,
    errorFetch,
    errorParsing,
    errorUrlRequired,
    errorInvalidUrl,
    errorFetchFailed,
    errorFetchWithStatus,
    resultTitle,
    jsonLd,
    jsonLdImportance,
    jsonLdDescription,
    otherElements,
    titleTag,
    metaDescription,
    ogTags,
    twitterTags,
    seoInfoTitle,
    seoInfoDescription,
    seoInfoConclusion,
    // URLForm用の翻訳
    urlLabel,
    urlPlaceholder,
    urlButton,
    // CopyButton用の翻訳
    copyButton
  ] = await Promise.all([
    translate(lang, 'seoTools.metaCraftForLlm.title'),
    translate(lang, 'seoTools.metaCraftForLlm.description'),
    // MetaCraftClient用の翻訳
    translate(lang, 'seoTools.metaCraftForLlm.loading'),
    translate(lang, 'seoTools.metaCraftForLlm.error.fetch'),
    translate(lang, 'seoTools.metaCraftForLlm.error.parsing'),
    translate(lang, 'seoTools.metaCraftForLlm.error.urlRequired'),
    translate(lang, 'seoTools.metaCraftForLlm.error.invalidUrl'),
    translate(lang, 'seoTools.metaCraftForLlm.error.fetchFailed'),
    translate(lang, 'seoTools.metaCraftForLlm.error.fetchWithStatus'),
    translate(lang, 'seoTools.metaCraftForLlm.result.title'),
    translate(lang, 'seoTools.metaCraftForLlm.result.jsonLd'),
    translate(lang, 'seoTools.metaCraftForLlm.result.jsonLdImportance'),
    translate(lang, 'seoTools.metaCraftForLlm.result.jsonLdDescription'),
    translate(lang, 'seoTools.metaCraftForLlm.result.otherElements'),
    translate(lang, 'seoTools.metaCraftForLlm.result.titleTag'),
    translate(lang, 'seoTools.metaCraftForLlm.result.metaDescription'),
    translate(lang, 'seoTools.metaCraftForLlm.result.ogTags'),
    translate(lang, 'seoTools.metaCraftForLlm.result.twitterTags'),
    translate(lang, 'seoTools.metaCraftForLlm.seoInfo.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoInfo.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoInfo.conclusion'),
    // URLForm用の翻訳
    translate(lang, 'seoTools.metaCraftForLlm.url.label'),
    translate(lang, 'seoTools.metaCraftForLlm.url.placeholder'),
    translate(lang, 'seoTools.metaCraftForLlm.url.button'),
    // CopyButton用の翻訳
    translate(lang, 'seoTools.metaCraftForLlm.copy.button')
  ])

  // SEOポイントの配列も取得
  const seoPoints = await translate(lang, 'seoTools.metaCraftForLlm.seoInfo.points')

  // 型安全な翻訳オブジェクトを作成
  const messages: SeoToolsMetaCraftForLlmMessages = {
    meta: {
      title: pageTitle,
      description: pageDescription,
      keywords: ""
    },
    title: pageTitle,
    description: pageDescription,
    url: {
      label: urlLabel,
      placeholder: urlPlaceholder,
      button: urlButton
    },
    result: {
      title: resultTitle,
      titleTag,
      metaDescription,
      ogTags,
      twitterTags,
      jsonLd,
      jsonLdImportance,
      jsonLdDescription,
      otherElements
    },
    copy: {
      button: copyButton
    },
    error: {
      fetch: errorFetch,
      parsing: errorParsing,
      urlRequired: errorUrlRequired,
      invalidUrl: errorInvalidUrl,
      fetchFailed: errorFetchFailed,
      fetchWithStatus: errorFetchWithStatus
    },
    loading,
    seoInfo: {
      title: seoInfoTitle,
      description: seoInfoDescription,
      conclusion: seoInfoConclusion,
      points: Array.isArray(seoPoints) ? seoPoints : []
    }
  }

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">{pageTitle}</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {pageDescription}
        </p>
      </div>

      <MetaCraftClient messages={messages} lang={lang} />
    </div>
  )
} 
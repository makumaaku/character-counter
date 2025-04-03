import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import PageSpeedCheckerClient from './components/PageSpeedCheckerClient'
import { Language, SeoToolsPageSpeedCheckerMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PageSpeedChecker({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/page-speed-checker');
  
  // サーバーコンポーネントで翻訳を取得
  const [
    title,
    description,
    inputLabel,
    analyzeButton,
    securityNote,
    loadingText,
    errorInvalidUrl,
    errorFetchFailed,
    resultLoadTimeLabel,
    resultResourcesLabel,
    resultSuggestionsLabel,
    noUrlText,
    // 分析メッセージの翻訳
    loadTimeSlow,
    loadTimeMedium,
    loadTimeFast,
    resourcesTotalSize,
    resourcesLargeImages,
    resourcesManyJs,
    resourcesSlowResources,
    resourcesOthers,
    securityMessage,
    imageOptimization,
    javascriptOptimization,
    cssOptimization,
    fontOptimization,
    serverOptimization,
    mobileOptimization,
    coreWebVitals,
    recommendedTools,
    tryPageSpeedInsights
  ] = await Promise.all([
    translate(lang, 'seoTools.pageSpeedChecker.title'),
    translate(lang, 'seoTools.pageSpeedChecker.description'),
    translate(lang, 'seoTools.pageSpeedChecker.input.url'),
    translate(lang, 'seoTools.pageSpeedChecker.input.analyzeButton'),
    translate(lang, 'seoTools.pageSpeedChecker.input.securityNote'),
    translate(lang, 'seoTools.pageSpeedChecker.results.loading'),
    translate(lang, 'seoTools.pageSpeedChecker.error.invalidUrl'),
    translate(lang, 'seoTools.pageSpeedChecker.error.fetchFailed'),
    translate(lang, 'seoTools.pageSpeedChecker.results.loadTime'),
    translate(lang, 'seoTools.pageSpeedChecker.results.resources'),
    translate(lang, 'seoTools.pageSpeedChecker.results.suggestions'),
    translate(lang, 'seoTools.pageSpeedChecker.status.noUrl'),
    // 分析メッセージの翻訳
    translate(lang, 'seoTools.pageSpeedChecker.analysis.loadTime.slow'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.loadTime.medium'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.loadTime.fast'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.resources.totalSize'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.resources.largeImages'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.resources.manyJs'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.resources.slowResources'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.resources.others'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.security'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.imageOptimization'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.javascriptOptimization'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.cssOptimization'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.fontOptimization'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.serverOptimization'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.mobileOptimization'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.coreWebVitals'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.recommendedTools'),
    translate(lang, 'seoTools.pageSpeedChecker.analysis.tryPageSpeedInsights')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: SeoToolsPageSpeedCheckerMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    input: {
      url: inputLabel,
      analyzeButton: analyzeButton,
      securityNote: securityNote
    },
    results: {
      loading: loadingText,
      loadTime: resultLoadTimeLabel,
      resources: resultResourcesLabel,
      suggestions: resultSuggestionsLabel
    },
    error: {
      invalidUrl: errorInvalidUrl,
      fetchFailed: errorFetchFailed
    },
    status: {
      noUrl: noUrlText
    },
    analysis: {
      loadTime: {
        slow: loadTimeSlow,
        medium: loadTimeMedium,
        fast: loadTimeFast
      },
      resources: {
        totalSize: resourcesTotalSize,
        largeImages: resourcesLargeImages,
        manyJs: resourcesManyJs,
        slowResources: resourcesSlowResources,
        others: resourcesOthers
      },
      security: securityMessage,
      imageOptimization: imageOptimization,
      javascriptOptimization: javascriptOptimization,
      cssOptimization: cssOptimization,
      fontOptimization: fontOptimization,
      serverOptimization: serverOptimization,
      mobileOptimization: mobileOptimization,
      coreWebVitals: coreWebVitals,
      recommendedTools: recommendedTools,
      tryPageSpeedInsights: tryPageSpeedInsights
    }
  };

  return <PageSpeedCheckerClient messages={messages} />
} 
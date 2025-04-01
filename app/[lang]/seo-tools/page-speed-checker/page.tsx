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
    loadingText,
    errorInvalidUrl,
    errorFetchFailed,
    resultLoadTimeLabel,
    resultResourcesLabel,
    resultSuggestionsLabel,
    noUrlText,
    securityNote
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
    translate(lang, 'seoTools.pageSpeedChecker.status.noUrl')
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
    }
  };

  return <PageSpeedCheckerClient messages={messages} />
} 
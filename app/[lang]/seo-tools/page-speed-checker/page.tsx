import { translate } from '@/lib/i18n/server'
import PageSpeedCheckerClient from './components/PageSpeedCheckerClient'

export default async function PageSpeedChecker({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // 翻訳を取得
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
    noUrlText
  ] = await Promise.all([
    translate(lang, 'pageSpeedChecker.title'),
    translate(lang, 'pageSpeedChecker.description'),
    translate(lang, 'pageSpeedChecker.input.url'),
    translate(lang, 'pageSpeedChecker.input.analyzeButton'),
    translate(lang, 'pageSpeedChecker.results.loading'),
    translate(lang, 'pageSpeedChecker.error.invalidUrl'),
    translate(lang, 'pageSpeedChecker.error.fetchFailed'),
    translate(lang, 'pageSpeedChecker.results.loadTime'),
    translate(lang, 'pageSpeedChecker.results.resources'),
    translate(lang, 'pageSpeedChecker.results.suggestions'),
    translate(lang, 'pageSpeedChecker.status.noUrl')
  ])

  const translations = {
    title,
    description,
    input: {
      url: inputLabel,
      analyzeButton: analyzeButton
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
  }

  return <PageSpeedCheckerClient translations={translations} />
} 
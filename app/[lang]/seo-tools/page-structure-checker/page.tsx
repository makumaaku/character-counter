import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import { Language } from '@/lib/i18n/types'
import PageStructureCheckerClient from './components/PageStructureCheckerClient'

type Props = {
  params: { lang: string }
}

export default async function PageStructureCheckerPage({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/page-structure-checker')
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    pageTitle,
    pageDescription,
    // フォーム関連
    formUrlLabel,
    formUrlPlaceholder,
    formAnalyzing,
    formAnalyze,
    formExample,
    // エラー関連
    errorTitle,
    errorUrlRequired,
    errorInvalidUrl,
    errorFetchFailed,
    errorNetworkError,
    errorServerError,
    errorTimeoutError,
    errorParsingError,
    // 結果表示関連
    issues,
    metaTitle,
    analysis,
    good,
    missing,
    issueFound,
    recommended,
    importantForSeo,
    noTitle,
    // その他必要な翻訳
    headingsStructure,
    headingsExplanation,
    headingsMissing,
    headingsLevelsTitle,
    contentStructureTitle,
    contentStructureExplanation,
    viewHeadings,
    headingIssue
  ] = await Promise.all([
    translate(lang, 'seoTools.pageStructureChecker.title'),
    translate(lang, 'seoTools.pageStructureChecker.description'),
    // フォーム関連
    translate(lang, 'seoTools.pageStructureChecker.form.urlLabel'),
    translate(lang, 'seoTools.pageStructureChecker.form.urlPlaceholder'),
    translate(lang, 'seoTools.pageStructureChecker.form.analyzing'),
    translate(lang, 'seoTools.pageStructureChecker.form.analyze'),
    translate(lang, 'seoTools.pageStructureChecker.form.example'),
    // エラー関連
    translate(lang, 'seoTools.pageStructureChecker.error.title'),
    translate(lang, 'seoTools.pageStructureChecker.error.urlRequired'),
    translate(lang, 'seoTools.pageStructureChecker.error.invalidUrl'),
    translate(lang, 'seoTools.pageStructureChecker.error.fetchFailed'),
    translate(lang, 'seoTools.pageStructureChecker.error.networkError'),
    translate(lang, 'seoTools.pageStructureChecker.error.serverError'),
    translate(lang, 'seoTools.pageStructureChecker.error.timeoutError'),
    translate(lang, 'seoTools.pageStructureChecker.error.parsingError'),
    // 結果表示関連
    translate(lang, 'seoTools.pageStructureChecker.issues'),
    translate(lang, 'seoTools.pageStructureChecker.metaTitle'),
    translate(lang, 'seoTools.pageStructureChecker.analysis'),
    translate(lang, 'seoTools.pageStructureChecker.good'),
    translate(lang, 'seoTools.pageStructureChecker.missing'),
    translate(lang, 'seoTools.pageStructureChecker.issueFound'),
    translate(lang, 'seoTools.pageStructureChecker.recommended'),
    translate(lang, 'seoTools.pageStructureChecker.importantForSeo'),
    translate(lang, 'seoTools.pageStructureChecker.noTitle'),
    // その他必要な翻訳
    translate(lang, 'seoTools.pageStructureChecker.headingsStructure'),
    translate(lang, 'seoTools.pageStructureChecker.headingsExplanation'),
    translate(lang, 'seoTools.pageStructureChecker.headingsMissing'),
    translate(lang, 'seoTools.pageStructureChecker.headingsLevelsTitle'),
    translate(lang, 'seoTools.pageStructureChecker.contentStructureTitle'),
    translate(lang, 'seoTools.pageStructureChecker.contentStructureExplanation'),
    translate(lang, 'seoTools.pageStructureChecker.viewHeadings'),
    translate(lang, 'seoTools.pageStructureChecker.headingIssue')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクト
  const messages = {
    title: pageTitle,
    description: pageDescription,
    form: {
      urlLabel: formUrlLabel,
      urlPlaceholder: formUrlPlaceholder,
      analyzing: formAnalyzing,
      analyze: formAnalyze,
      example: formExample
    },
    error: {
      title: errorTitle,
      urlRequired: errorUrlRequired,
      invalidUrl: errorInvalidUrl,
      fetchFailed: errorFetchFailed,
      networkError: errorNetworkError,
      serverError: errorServerError,
      timeoutError: errorTimeoutError,
      parsingError: errorParsingError
    },
    issues,
    metaTitle,
    analysis,
    good,
    missing,
    issueFound,
    recommended,
    importantForSeo,
    noTitle,
    headingsStructure,
    headingsExplanation,
    headingsMissing,
    headingsLevelsTitle,
    contentStructureTitle,
    contentStructureExplanation,
    viewHeadings,
    headingIssue
  }

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen p-4">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-lg text-gray-300">
          {pageDescription}
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <PageStructureCheckerClient lang={lang} messages={messages} />
      </main>
    </div>
  )
} 
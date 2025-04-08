import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import { Language, SeoToolsPageStructureCheckerMessages } from '@/lib/i18n/types'
import PageStructureCheckerClient from './components/PageStructureCheckerClient'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PageStructureCheckerPage({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/page-structure-checker')
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    pageTitle,
    pageDescription,
    // メタ情報
    metaTitle,
    metaDescription,
    metaKeywords,
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
    errorInvalidJson,
    errorFetchWithStatus,
    errorEmptyHtml,
    errorTimeout,
    errorFetchError,
    errorUnknownFetchError,
    errorUnknownServerError,
    // 結果表示関連
    issues,
    metaTitleLabel,
    analysis,
    good,
    missing,
    present,
    tag,
    count,
    hierarchyIssue,
    headingIssue,
    noH1,
    multipleH1,
    skippedLevel,
    issueFound,
    hierarchyIssueMessage,
    recommended,
    importantForSeo,
    noTitle,
    noDescription,
    noCanonical,
    noHeadings,
    warning,
    headingStructure,
    headings,
    // その他必要な翻訳
    headingsStructure,
    headingsExplanation,
    headingsLevelsTitle,
    contentStructureTitle,
    contentStructureExplanation,
    viewHeadings,
    // SEOテキスト関連の翻訳
    seoOverviewTitle,
    seoOverviewContent,
    seoHowToTitle,
    seoHowToStep1Title,
    seoHowToStep1Desc,
    seoHowToStep2Title,
    seoHowToStep2Desc,
    seoHowToStep3Title,
    seoHowToStep3Desc,
    seoTestimonialsTitle,
    seoTestimonialsUser1Name,
    seoTestimonialsUser1Comment,
    seoTestimonialsUser2Name,
    seoTestimonialsUser2Comment,
    seoTestimonialsUser3Name,
    seoTestimonialsUser3Comment,
    seoFeaturesTitle,
    seoFeaturesItem1Title,
    seoFeaturesItem1Desc,
    seoFeaturesItem2Title,
    seoFeaturesItem2Desc,
    seoFeaturesItem3Title,
    seoFeaturesItem3Desc,
    seoFeaturesItem4Title,
    seoFeaturesItem4Desc,
    seoFaqTitle,
    seoFaqQ1,
    seoFaqA1,
    seoFaqQ2,
    seoFaqA2,
    seoFaqQ3,
    seoFaqA3,
    seoFaqQ4,
    seoFaqA4,
    seoFaqQ5,
    seoFaqA5
  ] = await Promise.all([
    translate(lang, 'seoTools.pageStructureChecker.title'),
    translate(lang, 'seoTools.pageStructureChecker.description'),
    // メタ情報
    translate(lang, 'seoTools.pageStructureChecker.meta.title'),
    translate(lang, 'seoTools.pageStructureChecker.meta.description'),
    translate(lang, 'seoTools.pageStructureChecker.meta.keywords'),
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
    translate(lang, 'seoTools.pageStructureChecker.error.invalidJson'),
    translate(lang, 'seoTools.pageStructureChecker.error.fetchWithStatus'),
    translate(lang, 'seoTools.pageStructureChecker.error.emptyHtml'),
    translate(lang, 'seoTools.pageStructureChecker.error.timeout'),
    translate(lang, 'seoTools.pageStructureChecker.error.fetchError'),
    translate(lang, 'seoTools.pageStructureChecker.error.unknownFetchError'),
    translate(lang, 'seoTools.pageStructureChecker.error.unknownServerError'),
    // 結果表示関連
    translate(lang, 'seoTools.pageStructureChecker.issues'),
    translate(lang, 'seoTools.pageStructureChecker.metaTitle'),
    translate(lang, 'seoTools.pageStructureChecker.analysis'),
    translate(lang, 'seoTools.pageStructureChecker.good'),
    translate(lang, 'seoTools.pageStructureChecker.missing'),
    translate(lang, 'seoTools.pageStructureChecker.present'),
    translate(lang, 'seoTools.pageStructureChecker.tag'),
    translate(lang, 'seoTools.pageStructureChecker.count'),
    translate(lang, 'seoTools.pageStructureChecker.hierarchyIssue'),
    translate(lang, 'seoTools.pageStructureChecker.headingIssue'),
    translate(lang, 'seoTools.pageStructureChecker.noH1'),
    translate(lang, 'seoTools.pageStructureChecker.multipleH1'),
    translate(lang, 'seoTools.pageStructureChecker.skippedLevel'),
    translate(lang, 'seoTools.pageStructureChecker.issueFound'),
    translate(lang, 'seoTools.pageStructureChecker.hierarchyIssueMessage'),
    translate(lang, 'seoTools.pageStructureChecker.recommended'),
    translate(lang, 'seoTools.pageStructureChecker.importantForSeo'),
    translate(lang, 'seoTools.pageStructureChecker.noTitle'),
    translate(lang, 'seoTools.pageStructureChecker.noDescription'),
    translate(lang, 'seoTools.pageStructureChecker.noCanonical'),
    translate(lang, 'seoTools.pageStructureChecker.noHeadings'),
    translate(lang, 'seoTools.pageStructureChecker.warning'),
    translate(lang, 'seoTools.pageStructureChecker.headingStructure'),
    translate(lang, 'seoTools.pageStructureChecker.headings'),
    // その他必要な翻訳
    translate(lang, 'seoTools.pageStructureChecker.headingsStructure'),
    translate(lang, 'seoTools.pageStructureChecker.headingsExplanation'),
    translate(lang, 'seoTools.pageStructureChecker.headingsLevelsTitle'),
    translate(lang, 'seoTools.pageStructureChecker.contentStructureTitle'),
    translate(lang, 'seoTools.pageStructureChecker.contentStructureExplanation'),
    translate(lang, 'seoTools.pageStructureChecker.viewHeadings'),
    // SEOテキスト関連の翻訳
    translate(lang, 'seoTools.pageStructureChecker.seoText.overview.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.overview.content'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.howTo.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.howTo.steps.0.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.howTo.steps.0.description'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.howTo.steps.1.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.howTo.steps.1.description'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.howTo.steps.2.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.howTo.steps.2.description'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.testimonials.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.testimonials.users.0.name'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.testimonials.users.0.comment'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.testimonials.users.1.name'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.testimonials.users.1.comment'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.testimonials.users.2.name'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.testimonials.users.2.comment'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.0.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.0.description'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.1.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.1.description'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.2.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.2.description'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.3.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.features.items.3.description'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.title'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.0.question'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.0.answer'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.1.question'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.1.answer'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.2.question'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.2.answer'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.3.question'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.3.answer'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.4.question'),
    translate(lang, 'seoTools.pageStructureChecker.seoText.faq.questions.4.answer')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: SeoToolsPageStructureCheckerMessages = {
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords
    },
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
      parsingError: errorParsingError,
      invalidJson: errorInvalidJson,
      fetchWithStatus: errorFetchWithStatus,
      emptyHtml: errorEmptyHtml,
      timeout: errorTimeout,
      fetchError: errorFetchError,
      unknownFetchError: errorUnknownFetchError,
      unknownServerError: errorUnknownServerError
    },
    issues,
    metaTitle: metaTitleLabel,
    analysis,
    good,
    missing,
    present,
    tag,
    count,
    hierarchyIssue,
    headingIssue,
    noH1,
    multipleH1,
    skippedLevel,
    noTitle,
    noDescription,
    noCanonical,
    noHeadings,
    warning,
    hierarchyIssueMessage,
    headingStructure,
    headings,
    recommended,
    importantForSeo,
    issueFound,
    headingsStructure,
    headingsExplanation,
    headingsLevelsTitle,
    contentStructureTitle,
    contentStructureExplanation,
    viewHeadings,
    seoText: {
      overview: {
        title: seoOverviewTitle,
        content: seoOverviewContent
      },
      howTo: {
        title: seoHowToTitle,
        steps: [
          {
            title: seoHowToStep1Title,
            description: seoHowToStep1Desc
          },
          {
            title: seoHowToStep2Title,
            description: seoHowToStep2Desc
          },
          {
            title: seoHowToStep3Title,
            description: seoHowToStep3Desc
          }
        ]
      },
      testimonials: {
        title: seoTestimonialsTitle,
        users: [
          {
            name: seoTestimonialsUser1Name,
            comment: seoTestimonialsUser1Comment
          },
          {
            name: seoTestimonialsUser2Name,
            comment: seoTestimonialsUser2Comment
          },
          {
            name: seoTestimonialsUser3Name,
            comment: seoTestimonialsUser3Comment
          }
        ]
      },
      features: {
        title: seoFeaturesTitle,
        items: [
          {
            title: seoFeaturesItem1Title,
            description: seoFeaturesItem1Desc
          },
          {
            title: seoFeaturesItem2Title,
            description: seoFeaturesItem2Desc
          },
          {
            title: seoFeaturesItem3Title,
            description: seoFeaturesItem3Desc
          },
          {
            title: seoFeaturesItem4Title,
            description: seoFeaturesItem4Desc
          }
        ]
      },
      faq: {
        title: seoFaqTitle,
        questions: [
          {
            question: seoFaqQ1,
            answer: seoFaqA1
          },
          {
            question: seoFaqQ2,
            answer: seoFaqA2
          },
          {
            question: seoFaqQ3,
            answer: seoFaqA3
          },
          {
            question: seoFaqQ4,
            answer: seoFaqA4
          },
          {
            question: seoFaqQ5,
            answer: seoFaqA5
          }
        ]
      }
    }
  }

  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <div className="text-center mb-8 mt-8">
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-lg text-gray-300">
          {pageDescription}
        </p>
      </div>

      <main>
        <PageStructureCheckerClient lang={lang} messages={messages} />
        <SeoText content={seoTextContent}/>
      </main>
    </PageContainer>
  )
} 
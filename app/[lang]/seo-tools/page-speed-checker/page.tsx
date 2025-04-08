import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import PageSpeedCheckerClient from './components/PageSpeedCheckerClient'
import { Language, SeoToolsPageSpeedCheckerMessages } from '@/lib/i18n/types'
import PageContainer from '@/components/PageContainer'
import SeoText from '@/components/SeoText'

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
    tryPageSpeedInsights,
    // SEOテキスト用の翻訳
    seoOverviewTitle,
    seoOverviewContent,
    seoHowToTitle,
    seoHowToStep1Title,
    seoHowToStep1Description,
    seoHowToStep2Title,
    seoHowToStep2Description,
    seoHowToStep3Title,
    seoHowToStep3Description,
    seoTestimonialsTitle,
    seoTestimonialsUser1Name,
    seoTestimonialsUser1Comment,
    seoTestimonialsUser2Name,
    seoTestimonialsUser2Comment,
    seoTestimonialsUser3Name,
    seoTestimonialsUser3Comment,
    seoFeaturesTitle,
    seoFeaturesItem1Title,
    seoFeaturesItem1Description,
    seoFeaturesItem2Title,
    seoFeaturesItem2Description,
    seoFeaturesItem3Title,
    seoFeaturesItem3Description,
    seoFeaturesItem4Title,
    seoFeaturesItem4Description,
    seoFaqTitle,
    seoFaqQuestion1,
    seoFaqAnswer1,
    seoFaqQuestion2,
    seoFaqAnswer2,
    seoFaqQuestion3,
    seoFaqAnswer3,
    seoFaqQuestion4,
    seoFaqAnswer4,
    seoFaqQuestion5,
    seoFaqAnswer5
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
    translate(lang, 'seoTools.pageSpeedChecker.analysis.tryPageSpeedInsights'),
    // SEOテキスト用の翻訳
    translate(lang, 'seoTools.pageSpeedChecker.seoText.overview.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.overview.content'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.howTo.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.howTo.steps.0.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.howTo.steps.0.description'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.howTo.steps.1.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.howTo.steps.1.description'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.howTo.steps.2.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.howTo.steps.2.description'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.testimonials.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.testimonials.users.0.name'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.testimonials.users.0.comment'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.testimonials.users.1.name'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.testimonials.users.1.comment'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.testimonials.users.2.name'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.testimonials.users.2.comment'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.0.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.0.description'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.1.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.1.description'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.2.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.2.description'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.3.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.features.items.3.description'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.title'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.0.question'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.0.answer'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.1.question'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.1.answer'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.2.question'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.2.answer'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.3.question'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.3.answer'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.4.question'),
    translate(lang, 'seoTools.pageSpeedChecker.seoText.faq.questions.4.answer')
  ]);

  // SEOテキスト用のオブジェクトを作成
  const seoTextContent = {
    overview: {
      title: seoOverviewTitle,
      content: seoOverviewContent
    },
    howTo: {
      title: seoHowToTitle,
      steps: [
        {
          title: seoHowToStep1Title,
          description: seoHowToStep1Description
        },
        {
          title: seoHowToStep2Title,
          description: seoHowToStep2Description
        },
        {
          title: seoHowToStep3Title,
          description: seoHowToStep3Description
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
          description: seoFeaturesItem1Description
        },
        {
          title: seoFeaturesItem2Title,
          description: seoFeaturesItem2Description
        },
        {
          title: seoFeaturesItem3Title,
          description: seoFeaturesItem3Description
        },
        {
          title: seoFeaturesItem4Title,
          description: seoFeaturesItem4Description
        }
      ]
    },
    faq: {
      title: seoFaqTitle,
      questions: [
        {
          question: seoFaqQuestion1,
          answer: seoFaqAnswer1
        },
        {
          question: seoFaqQuestion2,
          answer: seoFaqAnswer2
        },
        {
          question: seoFaqQuestion3,
          answer: seoFaqAnswer3
        },
        {
          question: seoFaqQuestion4,
          answer: seoFaqAnswer4
        },
        {
          question: seoFaqQuestion5,
          answer: seoFaqAnswer5
        }
      ]
    }
  };

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
    },
    seoText: seoTextContent
  };

  return (
    <PageContainer>
      <PageSpeedCheckerClient messages={messages} />
      <SeoText content={seoTextContent} />
    </PageContainer>
  );
} 
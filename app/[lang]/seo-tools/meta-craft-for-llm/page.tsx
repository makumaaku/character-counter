import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import MetaCraftClient from './components/MetaCraftClient'
import { Language, SeoToolsMetaCraftForLlmMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

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
    copyButton,
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
    translate(lang, 'seoTools.metaCraftForLlm.copy.button'),
    // SEOテキスト関連の翻訳
    translate(lang, 'seoTools.metaCraftForLlm.seoText.overview.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.overview.content'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.howTo.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.howTo.steps.0.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.howTo.steps.0.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.howTo.steps.1.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.howTo.steps.1.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.howTo.steps.2.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.howTo.steps.2.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.testimonials.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.testimonials.users.0.name'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.testimonials.users.0.comment'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.testimonials.users.1.name'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.testimonials.users.1.comment'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.testimonials.users.2.name'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.testimonials.users.2.comment'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.0.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.0.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.1.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.1.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.2.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.2.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.3.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.features.items.3.description'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.title'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.0.question'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.0.answer'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.1.question'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.1.answer'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.2.question'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.2.answer'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.3.question'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.3.answer'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.4.question'),
    translate(lang, 'seoTools.metaCraftForLlm.seoText.faq.questions.4.answer')
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
    },
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
  const seoTextContent: SeoTextContent = messages.seoText

  return (
    <PageContainer>
      <div className="py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{pageTitle}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {pageDescription}
          </p>
        </div>

        <MetaCraftClient messages={messages} lang={lang} />
        <SeoText content={seoTextContent} />
      </div>
    </PageContainer>
  )
} 
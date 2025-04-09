import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import NameGeneratorClient from './components/NameGeneratorClient'
import { Language, WordGenNameGeneratorMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function NameGenerator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/name-generator');
  
  // サーバーコンポーネントで翻訳を取得
  const [
    // タイトルと説明
    title,
    description,
    // フォームの要素
    formCountLabel,
    formGenerate,
    // 結果セクション
    resultTitle,
    resultEmpty,
    resultCopy,
    resultCopied,
    resultCopyTitle,
    resultDownload,
    resultDownloaded,
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
    seoFaqA3
  ] = await Promise.all([
    // タイトルと説明
    translate(lang, 'wordGen.nameGenerator.title'),
    translate(lang, 'wordGen.nameGenerator.description'),
    // フォームの要素
    translate(lang, 'wordGen.nameGenerator.form.count.label'),
    translate(lang, 'wordGen.nameGenerator.form.generate'),
    // 結果セクション
    translate(lang, 'wordGen.nameGenerator.result.title'),
    translate(lang, 'wordGen.nameGenerator.result.empty'),
    translate(lang, 'wordGen.nameGenerator.result.copy'),
    translate(lang, 'wordGen.nameGenerator.result.copied'),
    translate(lang, 'wordGen.nameGenerator.result.copyTitle'),
    translate(lang, 'wordGen.nameGenerator.result.download'),
    translate(lang, 'wordGen.nameGenerator.result.downloaded'),
    // SEOテキスト関連の翻訳
    translate(lang, 'wordGen.nameGenerator.seoText.overview.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.overview.content'),
    translate(lang, 'wordGen.nameGenerator.seoText.howTo.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.howTo.steps.0.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.howTo.steps.0.description'),
    translate(lang, 'wordGen.nameGenerator.seoText.howTo.steps.1.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.howTo.steps.1.description'),
    translate(lang, 'wordGen.nameGenerator.seoText.howTo.steps.2.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.howTo.steps.2.description'),
    translate(lang, 'wordGen.nameGenerator.seoText.testimonials.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.testimonials.users.0.name'),
    translate(lang, 'wordGen.nameGenerator.seoText.testimonials.users.0.comment'),
    translate(lang, 'wordGen.nameGenerator.seoText.testimonials.users.1.name'),
    translate(lang, 'wordGen.nameGenerator.seoText.testimonials.users.1.comment'),
    translate(lang, 'wordGen.nameGenerator.seoText.testimonials.users.2.name'),
    translate(lang, 'wordGen.nameGenerator.seoText.testimonials.users.2.comment'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.0.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.0.description'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.1.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.1.description'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.2.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.2.description'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.3.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.features.items.3.description'),
    translate(lang, 'wordGen.nameGenerator.seoText.faq.title'),
    translate(lang, 'wordGen.nameGenerator.seoText.faq.questions.0.question'),
    translate(lang, 'wordGen.nameGenerator.seoText.faq.questions.0.answer'),
    translate(lang, 'wordGen.nameGenerator.seoText.faq.questions.1.question'),
    translate(lang, 'wordGen.nameGenerator.seoText.faq.questions.1.answer'),
    translate(lang, 'wordGen.nameGenerator.seoText.faq.questions.2.question'),
    translate(lang, 'wordGen.nameGenerator.seoText.faq.questions.2.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenNameGeneratorMessages = {
    meta: {
      title: "", // メタデータはlayoutで管理するため空文字
      description: "",
      keywords: ""
    },
    title,
    description,
    form: {
      count: {
        label: formCountLabel
      },
      generate: formGenerate,
    },
    result: {
      title: resultTitle,
      empty: resultEmpty,
      copy: resultCopy,
      copied: resultCopied,
      copyTitle: resultCopyTitle,
      download: resultDownload,
      downloaded: resultDownloaded
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
          }
        ]
      }
    }
  };

  // SEO用のテキストコンテンツを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <div className="bg-gray-700 p-6 rounded-lg text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-300 mb-6">
          {description}
        </p>
        <NameGeneratorClient messages={messages} lang={lang} />
      </div>
      <SeoText content={seoTextContent} />
    </PageContainer>
  )
} 
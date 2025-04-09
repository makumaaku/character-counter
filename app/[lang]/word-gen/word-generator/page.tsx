import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import WordGeneratorClient from './components/WordGeneratorClient'
import { Language, WordGenWordGeneratorMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function WordGenerator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/word-generator');
  
  // サーバーコンポーネントで翻訳を取得
  const [
    // タイトルと説明
    title,
    description,
    // フォームの要素
    formLengthLabel,
    formLengthMin,
    formLengthMax,
    formCountLabel,
    formCountPlaceholder,
    formGenerate,
    formClear,
    // 結果セクション
    resultTitle,
    resultEmpty,
    resultCopy,
    resultCopied,
    resultDownload,
    resultDownloaded,
    // SEOテキスト関連の翻訳
    seoTextOverviewTitle,
    seoTextOverviewContent,
    seoTextHowToTitle,
    seoTextHowToStep1Title,
    seoTextHowToStep1Desc,
    seoTextHowToStep2Title,
    seoTextHowToStep2Desc,
    seoTextHowToStep3Title,
    seoTextHowToStep3Desc,
    seoTextTestimonialsTitle,
    seoTextTestimonialsUser1Name,
    seoTextTestimonialsUser1Comment,
    seoTextTestimonialsUser2Name,
    seoTextTestimonialsUser2Comment,
    seoTextTestimonialsUser3Name,
    seoTextTestimonialsUser3Comment,
    seoTextFeaturesTitle,
    seoTextFeaturesItem1Title,
    seoTextFeaturesItem1Desc,
    seoTextFeaturesItem2Title,
    seoTextFeaturesItem2Desc,
    seoTextFeaturesItem3Title,
    seoTextFeaturesItem3Desc,
    seoTextFaqTitle,
    seoTextFaqQ1,
    seoTextFaqA1,
    seoTextFaqQ2,
    seoTextFaqA2,
    seoTextFaqQ3,
    seoTextFaqA3,
    seoTextFaqQ4,
    seoTextFaqA4
  ] = await Promise.all([
    // タイトルと説明
    translate(lang, 'wordGen.wordGenerator.title'),
    translate(lang, 'wordGen.wordGenerator.description'),
    // フォームの要素
    translate(lang, 'wordGen.wordGenerator.form.length.label'),
    translate(lang, 'wordGen.wordGenerator.form.length.min'),
    translate(lang, 'wordGen.wordGenerator.form.length.max'),
    translate(lang, 'wordGen.wordGenerator.form.count.label'),
    translate(lang, 'wordGen.wordGenerator.form.count.placeholder'),
    translate(lang, 'wordGen.wordGenerator.form.generate'),
    translate(lang, 'wordGen.wordGenerator.form.clear'),
    // 結果セクション
    translate(lang, 'wordGen.wordGenerator.result.title'),
    translate(lang, 'wordGen.wordGenerator.result.empty'),
    translate(lang, 'wordGen.wordGenerator.result.copy'),
    translate(lang, 'wordGen.wordGenerator.result.copied'),
    translate(lang, 'wordGen.wordGenerator.result.download'),
    translate(lang, 'wordGen.wordGenerator.result.downloaded'),
    // SEOテキスト関連の翻訳
    translate(lang, 'wordGen.wordGenerator.seoText.overview.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.overview.content'),
    translate(lang, 'wordGen.wordGenerator.seoText.howTo.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.howTo.steps.0.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.howTo.steps.0.description'),
    translate(lang, 'wordGen.wordGenerator.seoText.howTo.steps.1.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.howTo.steps.1.description'),
    translate(lang, 'wordGen.wordGenerator.seoText.howTo.steps.2.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.howTo.steps.2.description'),
    translate(lang, 'wordGen.wordGenerator.seoText.testimonials.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.testimonials.users.0.name'),
    translate(lang, 'wordGen.wordGenerator.seoText.testimonials.users.0.comment'),
    translate(lang, 'wordGen.wordGenerator.seoText.testimonials.users.1.name'),
    translate(lang, 'wordGen.wordGenerator.seoText.testimonials.users.1.comment'),
    translate(lang, 'wordGen.wordGenerator.seoText.testimonials.users.2.name'),
    translate(lang, 'wordGen.wordGenerator.seoText.testimonials.users.2.comment'),
    translate(lang, 'wordGen.wordGenerator.seoText.features.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.features.items.0.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.features.items.0.description'),
    translate(lang, 'wordGen.wordGenerator.seoText.features.items.1.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.features.items.1.description'),
    translate(lang, 'wordGen.wordGenerator.seoText.features.items.2.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.features.items.2.description'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.title'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.0.question'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.0.answer'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.1.question'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.1.answer'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.2.question'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.2.answer'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.3.question'),
    translate(lang, 'wordGen.wordGenerator.seoText.faq.questions.3.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenWordGeneratorMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    form: {
      length: {
        label: formLengthLabel,
        min: formLengthMin,
        max: formLengthMax
      },
      count: {
        label: formCountLabel,
        placeholder: formCountPlaceholder
      },
      generate: formGenerate,
      clear: formClear
    },
    result: {
      title: resultTitle,
      empty: resultEmpty,
      copy: resultCopy,
      copied: resultCopied,
      download: resultDownload,
      downloaded: resultDownloaded
    },
    seoText: {
      overview: {
        title: seoTextOverviewTitle,
        content: seoTextOverviewContent
      },
      howTo: {
        title: seoTextHowToTitle,
        steps: [
          {
            title: seoTextHowToStep1Title,
            description: seoTextHowToStep1Desc
          },
          {
            title: seoTextHowToStep2Title,
            description: seoTextHowToStep2Desc
          },
          {
            title: seoTextHowToStep3Title,
            description: seoTextHowToStep3Desc
          }
        ]
      },
      testimonials: {
        title: seoTextTestimonialsTitle,
        users: [
          {
            name: seoTextTestimonialsUser1Name,
            comment: seoTextTestimonialsUser1Comment
          },
          {
            name: seoTextTestimonialsUser2Name,
            comment: seoTextTestimonialsUser2Comment
          },
          {
            name: seoTextTestimonialsUser3Name,
            comment: seoTextTestimonialsUser3Comment
          }
        ]
      },
      features: {
        title: seoTextFeaturesTitle,
        items: [
          {
            title: seoTextFeaturesItem1Title,
            description: seoTextFeaturesItem1Desc
          },
          {
            title: seoTextFeaturesItem2Title,
            description: seoTextFeaturesItem2Desc
          },
          {
            title: seoTextFeaturesItem3Title,
            description: seoTextFeaturesItem3Desc
          }
        ]
      },
      faq: {
        title: seoTextFaqTitle,
        questions: [
          {
            question: seoTextFaqQ1,
            answer: seoTextFaqA1
          },
          {
            question: seoTextFaqQ2,
            answer: seoTextFaqA2
          },
          {
            question: seoTextFaqQ3,
            answer: seoTextFaqA3
          },
          {
            question: seoTextFaqQ4,
            answer: seoTextFaqA4
          }
        ]
      }
    }
  };

  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <WordGeneratorClient messages={messages} />
      <SeoText content={seoTextContent} />
    </PageContainer>
  )
} 
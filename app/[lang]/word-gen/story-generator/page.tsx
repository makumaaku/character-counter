import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import StoryGeneratorClient from './components/StoryGeneratorClient'
import { Language, WordGenStoryGeneratorMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function StoryGenerator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/story-generator');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    // メタ情報
    metaTitle,
    metaDescription,
    metaKeywords,
    // タイトルと説明
    title,
    description,
    catchphrase,
    intro,
    // フォーム部分
    formGenerate,
    // 結果セクション
    resultEmpty,
    resultCopyTitle,
    resultCopied,
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
    // メタ情報
    translate(lang, 'wordGen.storyGenerator.meta.title'),
    translate(lang, 'wordGen.storyGenerator.meta.description'),
    translate(lang, 'wordGen.storyGenerator.meta.keywords'),
    // タイトルと説明
    translate(lang, 'wordGen.storyGenerator.title'),
    translate(lang, 'wordGen.storyGenerator.description'),
    translate(lang, 'wordGen.storyGenerator.catchphrase'),
    translate(lang, 'wordGen.storyGenerator.intro'),
    // フォーム部分
    translate(lang, 'wordGen.storyGenerator.form.generate'),
    // 結果セクション
    translate(lang, 'wordGen.storyGenerator.result.empty'),
    translate(lang, 'wordGen.storyGenerator.result.copyTitle'),
    translate(lang, 'wordGen.storyGenerator.result.copied'),
    // SEOテキスト関連の翻訳
    translate(lang, 'wordGen.storyGenerator.seoText.overview.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.overview.content'),
    translate(lang, 'wordGen.storyGenerator.seoText.howTo.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.howTo.steps.0.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.howTo.steps.0.description'),
    translate(lang, 'wordGen.storyGenerator.seoText.howTo.steps.1.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.howTo.steps.1.description'),
    translate(lang, 'wordGen.storyGenerator.seoText.howTo.steps.2.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.howTo.steps.2.description'),
    translate(lang, 'wordGen.storyGenerator.seoText.testimonials.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.testimonials.users.0.name'),
    translate(lang, 'wordGen.storyGenerator.seoText.testimonials.users.0.comment'),
    translate(lang, 'wordGen.storyGenerator.seoText.testimonials.users.1.name'),
    translate(lang, 'wordGen.storyGenerator.seoText.testimonials.users.1.comment'),
    translate(lang, 'wordGen.storyGenerator.seoText.testimonials.users.2.name'),
    translate(lang, 'wordGen.storyGenerator.seoText.testimonials.users.2.comment'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.0.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.0.description'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.1.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.1.description'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.2.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.2.description'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.3.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.features.items.3.description'),
    translate(lang, 'wordGen.storyGenerator.seoText.faq.title'),
    translate(lang, 'wordGen.storyGenerator.seoText.faq.questions.0.question'),
    translate(lang, 'wordGen.storyGenerator.seoText.faq.questions.0.answer'),
    translate(lang, 'wordGen.storyGenerator.seoText.faq.questions.1.question'),
    translate(lang, 'wordGen.storyGenerator.seoText.faq.questions.1.answer'),
    translate(lang, 'wordGen.storyGenerator.seoText.faq.questions.2.question'),
    translate(lang, 'wordGen.storyGenerator.seoText.faq.questions.2.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenStoryGeneratorMessages = {
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords
    },
    title,
    description,
    catchphrase,
    intro,
    form: {
      generate: formGenerate
    },
    result: {
      empty: resultEmpty,
      copyTitle: resultCopyTitle,
      copyAlt: resultCopyTitle,
      copied: resultCopied
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

  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <StoryGeneratorClient messages={messages} lang={lang} />
      <SeoText content={seoTextContent}/>
    </PageContainer>
  )
} 
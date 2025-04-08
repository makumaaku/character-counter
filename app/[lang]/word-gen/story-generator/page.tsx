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
    // 機能セクション
    featuresTitle,
    featuresOneClickTitle,
    featuresOneClickDesc,
    featuresPatternsTitle,
    featuresPatternsDesc,
    featuresCustomizationTitle,
    featuresCustomizationDesc,
    // ユースケースセクション
    useCasesTitle,
    useCasesNovelTitle,
    useCasesNovelDesc,
    useCasesGameTitle,
    useCasesGameDesc,
    useCasesWorkshopTitle,
    useCasesWorkshopDesc,
    // 技術セクション
    technicalTitle,
    technicalAlgorithmTitle,
    technicalAlgorithmDesc,
    technicalDatabaseTitle,
    technicalDatabaseDesc,
    technicalPerformanceTitle,
    technicalPerformanceDesc,
    // FAQ
    faqTitle,
    faqQ1,
    faqA1,
    faqQ2,
    faqA2,
    faqQ3,
    faqA3,
    // まとめ
    conclusionTitle,
    conclusionDesc,
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
    // 機能セクション
    translate(lang, 'wordGen.storyGenerator.features.title'),
    translate(lang, 'wordGen.storyGenerator.features.oneClick.title'),
    translate(lang, 'wordGen.storyGenerator.features.oneClick.description'),
    translate(lang, 'wordGen.storyGenerator.features.patterns.title'),
    translate(lang, 'wordGen.storyGenerator.features.patterns.description'),
    translate(lang, 'wordGen.storyGenerator.features.customization.title'),
    translate(lang, 'wordGen.storyGenerator.features.customization.description'),
    // ユースケースセクション
    translate(lang, 'wordGen.storyGenerator.useCases.title'),
    translate(lang, 'wordGen.storyGenerator.useCases.novel.title'),
    translate(lang, 'wordGen.storyGenerator.useCases.novel.description'),
    translate(lang, 'wordGen.storyGenerator.useCases.game.title'),
    translate(lang, 'wordGen.storyGenerator.useCases.game.description'),
    translate(lang, 'wordGen.storyGenerator.useCases.workshop.title'),
    translate(lang, 'wordGen.storyGenerator.useCases.workshop.description'),
    // 技術セクション
    translate(lang, 'wordGen.storyGenerator.technical.title'),
    translate(lang, 'wordGen.storyGenerator.technical.algorithm.title'),
    translate(lang, 'wordGen.storyGenerator.technical.algorithm.description'),
    translate(lang, 'wordGen.storyGenerator.technical.database.title'),
    translate(lang, 'wordGen.storyGenerator.technical.database.description'),
    translate(lang, 'wordGen.storyGenerator.technical.performance.title'),
    translate(lang, 'wordGen.storyGenerator.technical.performance.description'),
    // FAQ
    translate(lang, 'wordGen.storyGenerator.faq.title'),
    translate(lang, 'wordGen.storyGenerator.faq.q1'),
    translate(lang, 'wordGen.storyGenerator.faq.a1'),
    translate(lang, 'wordGen.storyGenerator.faq.q2'),
    translate(lang, 'wordGen.storyGenerator.faq.a2'),
    translate(lang, 'wordGen.storyGenerator.faq.q3'),
    translate(lang, 'wordGen.storyGenerator.faq.a3'),
    // まとめ
    translate(lang, 'wordGen.storyGenerator.conclusion.title'),
    translate(lang, 'wordGen.storyGenerator.conclusion.description'),
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
      title: "",
      description: "",
      keywords: ""
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
    features: {
      title: featuresTitle,
      oneClick: {
        title: featuresOneClickTitle,
        description: featuresOneClickDesc
      },
      patterns: {
        title: featuresPatternsTitle,
        description: featuresPatternsDesc
      },
      customization: {
        title: featuresCustomizationTitle,
        description: featuresCustomizationDesc
      }
    },
    useCases: {
      title: useCasesTitle,
      novel: {
        title: useCasesNovelTitle,
        description: useCasesNovelDesc
      },
      game: {
        title: useCasesGameTitle,
        description: useCasesGameDesc
      },
      workshop: {
        title: useCasesWorkshopTitle,
        description: useCasesWorkshopDesc
      }
    },
    technical: {
      title: technicalTitle,
      algorithm: {
        title: technicalAlgorithmTitle,
        description: technicalAlgorithmDesc
      },
      database: {
        title: technicalDatabaseTitle,
        description: technicalDatabaseDesc
      },
      performance: {
        title: technicalPerformanceTitle,
        description: technicalPerformanceDesc
      }
    },
    faq: {
      title: faqTitle,
      q1: faqQ1,
      a1: faqA1,
      q2: faqQ2,
      a2: faqA2,
      q3: faqQ3,
      a3: faqA3
    },
    conclusion: {
      title: conclusionTitle,
      description: conclusionDesc
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
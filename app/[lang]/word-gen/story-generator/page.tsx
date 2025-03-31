import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import StoryGeneratorClient from './components/StoryGeneratorClient'
import { Language, WordGenStoryGeneratorMessages } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function StoryGenerator({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
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
    conclusionDesc
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
    translate(lang, 'wordGen.storyGenerator.conclusion.description')
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
    }
  };

  return <StoryGeneratorClient messages={messages} lang={lang} />
} 
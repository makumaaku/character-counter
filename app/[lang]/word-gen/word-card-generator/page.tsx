import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import WordCardGeneratorClient from './components/WordCardGeneratorClient'
import { Language, WordGenWordCardGeneratorMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function WordCardGenerator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/word-card-generator');
  
  // サーバーコンポーネントで翻訳を並列取得
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
    // カード情報
    cardLength,
    cardCategory,
    // About section
    aboutCatchphrase,
    aboutIntroduction,
    aboutFeaturesTitle,
    aboutFeaturesOneClickTitle,
    aboutFeaturesOneClickDesc,
    aboutFeaturesDatabaseTitle,
    aboutFeaturesDatabaseDesc,
    aboutFeaturesDesignTitle,
    aboutFeaturesDesignDesc,
    // Use cases
    aboutUseCasesTitle,
    aboutUseCasesVocabularyTitle,
    aboutUseCasesVocabularyDesc,
    aboutUseCasesBrainstormingTitle,
    aboutUseCasesBrainstormingDesc,
    aboutUseCasesGamesTitle,
    aboutUseCasesGamesDesc,
    // Technical
    aboutTechnicalTitle,
    aboutTechnicalAlgorithmTitle,
    aboutTechnicalAlgorithmDesc,
    aboutTechnicalDatabaseTitle,
    aboutTechnicalDatabaseDesc,
    aboutTechnicalResponsiveTitle,
    aboutTechnicalResponsiveDesc,
    // FAQ
    aboutFaqTitle,
    aboutFaqFreeQuestion,
    aboutFaqFreeAnswer,
    aboutFaqCustomizeQuestion,
    aboutFaqCustomizeAnswer,
    aboutFaqPrintQuestion,
    aboutFaqPrintAnswer,
    // Conclusion
    aboutConclusionTitle,
    aboutConclusionDesc,
    // How To
    howToTitle,
    howToDesc,
    // Use Cases
    useCasesTitle,
    useCasesVocabulary,
    useCasesTeaching,
    useCasesGames,
    useCasesWriting,
    useCasesEsl
  ] = await Promise.all([
    // タイトルと説明
    translate(lang, 'wordGen.wordCardGenerator.title'),
    translate(lang, 'wordGen.wordCardGenerator.description'),
    // フォームの要素
    translate(lang, 'wordGen.wordCardGenerator.form.count.label'),
    translate(lang, 'wordGen.wordCardGenerator.form.generate'),
    // 結果セクション
    translate(lang, 'wordGen.wordCardGenerator.result.title'),
    translate(lang, 'wordGen.wordCardGenerator.result.empty'),
    translate(lang, 'wordGen.wordCardGenerator.result.copy'),
    translate(lang, 'wordGen.wordCardGenerator.result.copied'),
    // カード情報
    translate(lang, 'wordGen.wordCardGenerator.card.length'),
    translate(lang, 'wordGen.wordCardGenerator.card.category'),
    // About section
    translate(lang, 'wordGen.wordCardGenerator.about.catchphrase'),
    translate(lang, 'wordGen.wordCardGenerator.about.introduction'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.oneClick.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.oneClick.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.database.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.database.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.design.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.design.description'),
    // Use cases
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.vocabulary.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.vocabulary.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.brainstorming.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.brainstorming.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.games.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.games.description'),
    // Technical
    translate(lang, 'wordGen.wordCardGenerator.about.technical.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.algorithm.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.algorithm.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.database.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.database.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.responsive.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.responsive.description'),
    // FAQ
    translate(lang, 'wordGen.wordCardGenerator.about.faq.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.free.question'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.free.answer'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.customize.question'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.customize.answer'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.print.question'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.print.answer'),
    // Conclusion
    translate(lang, 'wordGen.wordCardGenerator.about.conclusion.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.conclusion.description'),
    // How To
    translate(lang, 'wordGen.wordCardGenerator.howTo.title'),
    translate(lang, 'wordGen.wordCardGenerator.howTo.description'),
    // Use Cases
    translate(lang, 'wordGen.wordCardGenerator.useCases.title'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.vocabulary'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.teaching'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.games'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.writing'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.esl')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenWordCardGeneratorMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    form: {
      count: {
        label: formCountLabel
      },
      generate: formGenerate
    },
    result: {
      title: resultTitle,
      empty: resultEmpty,
      copy: resultCopy,
      copied: resultCopied
    },
    card: {
      length: cardLength,
      category: cardCategory
    },
    about: {
      catchphrase: aboutCatchphrase,
      introduction: aboutIntroduction,
      features: {
        title: aboutFeaturesTitle,
        oneClick: {
          title: aboutFeaturesOneClickTitle,
          description: aboutFeaturesOneClickDesc
        },
        database: {
          title: aboutFeaturesDatabaseTitle,
          description: aboutFeaturesDatabaseDesc
        },
        design: {
          title: aboutFeaturesDesignTitle,
          description: aboutFeaturesDesignDesc
        }
      },
      useCases: {
        title: aboutUseCasesTitle,
        vocabulary: {
          title: aboutUseCasesVocabularyTitle,
          description: aboutUseCasesVocabularyDesc
        },
        brainstorming: {
          title: aboutUseCasesBrainstormingTitle,
          description: aboutUseCasesBrainstormingDesc
        },
        games: {
          title: aboutUseCasesGamesTitle,
          description: aboutUseCasesGamesDesc
        }
      },
      technical: {
        title: aboutTechnicalTitle,
        algorithm: {
          title: aboutTechnicalAlgorithmTitle,
          description: aboutTechnicalAlgorithmDesc
        },
        database: {
          title: aboutTechnicalDatabaseTitle,
          description: aboutTechnicalDatabaseDesc
        },
        responsive: {
          title: aboutTechnicalResponsiveTitle,
          description: aboutTechnicalResponsiveDesc
        }
      },
      faq: {
        title: aboutFaqTitle,
        questions: {
          free: {
            question: aboutFaqFreeQuestion,
            answer: aboutFaqFreeAnswer
          },
          customize: {
            question: aboutFaqCustomizeQuestion,
            answer: aboutFaqCustomizeAnswer
          },
          print: {
            question: aboutFaqPrintQuestion,
            answer: aboutFaqPrintAnswer
          }
        }
      },
      conclusion: {
        title: aboutConclusionTitle,
        description: aboutConclusionDesc
      }
    },
    howTo: {
      title: howToTitle,
      description: howToDesc
    },
    useCases: {
      title: useCasesTitle,
      vocabulary: useCasesVocabulary,
      teaching: useCasesTeaching,
      games: useCasesGames,
      writing: useCasesWriting,
      esl: useCasesEsl
    }
  };

  return (
    <div className="text-gray-100 font-sans max-w-4xl mx-auto px-4 pt-10">
      <WordCardGeneratorClient messages={messages} />
    </div>
  );
} 
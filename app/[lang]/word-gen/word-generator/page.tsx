import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import WordGeneratorClient from './components/WordGeneratorClient'
import { Language } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function WordGenerator({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen');
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
    formPatternLabel,
    formPatternPlaceholder,
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
    aboutUseCasesScenesTitle,
    aboutUseCasesScenesWriter,
    aboutUseCasesScenesDesigner,
    aboutUseCasesScenesBS,
    aboutUseCasesTestimonialsTitle,
    aboutUseCasesTestimonialsWriterName,
    aboutUseCasesTestimonialsWriterQuote,
    aboutUseCasesTestimonialsDesignerName,
    aboutUseCasesTestimonialsDesignerQuote,
    // Technical
    aboutTechnicalTitle,
    aboutTechnicalAlgorithmTitle,
    aboutTechnicalAlgorithmDesc,
    aboutTechnicalDatabaseTitle,
    aboutTechnicalDatabaseDesc,
    aboutTechnicalPerformanceTitle,
    aboutTechnicalPerformanceDesc,
    // FAQ
    aboutFaqTitle,
    aboutFaqQuestionsFree,
    aboutFaqAnswersFree,
    aboutFaqQuestionsWords,
    aboutFaqAnswersWords,
    aboutFaqQuestionsCommercial,
    aboutFaqAnswersCommercial,
    aboutFaqQuestionsMobile,
    aboutFaqAnswersMobile,
    // Conclusion
    aboutConclusionTitle,
    aboutConclusionDesc
  ] = await Promise.all([
    // タイトルと説明
    translate(lang, 'wordGen.wordGenerator.title'),
    translate(lang, 'wordGen.wordGenerator.description'),
    // フォームの要素
    translate(lang, 'wordGen.wordGenerator.form.length.label'),
    translate(lang, 'wordGen.wordGenerator.form.length.min'),
    translate(lang, 'wordGen.wordGenerator.form.length.max'),
    translate(lang, 'wordGen.wordGenerator.form.pattern.label'),
    translate(lang, 'wordGen.wordGenerator.form.pattern.placeholder'),
    translate(lang, 'wordGen.wordGenerator.form.count.label'),
    translate(lang, 'wordGen.wordGenerator.form.count.placeholder'),
    translate(lang, 'wordGen.wordGenerator.form.generate'),
    translate(lang, 'wordGen.wordGenerator.form.clear'),
    // 結果セクション
    translate(lang, 'wordGen.wordGenerator.result.title'),
    translate(lang, 'wordGen.wordGenerator.result.empty'),
    translate(lang, 'wordGen.wordGenerator.result.copy'),
    translate(lang, 'wordGen.wordGenerator.result.copied'),
    translate(lang, 'wordGen.wordGenerator.result.download').catch(() => "Download"),
    translate(lang, 'wordGen.wordGenerator.result.downloaded').catch(() => "Downloaded!"),
    // About section
    translate(lang, 'wordGen.wordGenerator.about.catchphrase'),
    translate(lang, 'wordGen.wordGenerator.about.introduction'),
    translate(lang, 'wordGen.wordGenerator.about.features.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.oneClick.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.oneClick.description'),
    translate(lang, 'wordGen.wordGenerator.about.features.database.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.database.description'),
    translate(lang, 'wordGen.wordGenerator.about.features.design.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.design.description'),
    // Use cases
    translate(lang, 'wordGen.wordGenerator.about.useCases.title'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.title'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.writer'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.designer'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.brainstorming'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.title'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.writer.name'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.writer.quote'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.designer.name'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.designer.quote'),
    // Technical
    translate(lang, 'wordGen.wordGenerator.about.technical.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.algorithm.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.algorithm.description'),
    translate(lang, 'wordGen.wordGenerator.about.technical.database.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.database.description'),
    translate(lang, 'wordGen.wordGenerator.about.technical.performance.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.performance.description'),
    // FAQ
    translate(lang, 'wordGen.wordGenerator.about.faq.title'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.free.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.free.answer'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.words.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.words.answer'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.commercial.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.commercial.answer'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.mobile.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.mobile.answer'),
    // Conclusion
    translate(lang, 'wordGen.wordGenerator.about.conclusion.title'),
    translate(lang, 'wordGen.wordGenerator.about.conclusion.description')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages = {
    wordGen: {
      wordGenerator: {
        title,
        description,
        form: {
          length: {
            label: formLengthLabel,
            min: formLengthMin,
            max: formLengthMax
          },
          pattern: {
            label: formPatternLabel,
            placeholder: formPatternPlaceholder
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
            scenes: {
              title: aboutUseCasesScenesTitle,
              writer: aboutUseCasesScenesWriter,
              designer: aboutUseCasesScenesDesigner,
              brainstorming: aboutUseCasesScenesBS
            },
            testimonials: {
              title: aboutUseCasesTestimonialsTitle,
              writer: {
                name: aboutUseCasesTestimonialsWriterName,
                quote: aboutUseCasesTestimonialsWriterQuote
              },
              designer: {
                name: aboutUseCasesTestimonialsDesignerName,
                quote: aboutUseCasesTestimonialsDesignerQuote
              }
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
            performance: {
              title: aboutTechnicalPerformanceTitle,
              description: aboutTechnicalPerformanceDesc
            }
          },
          faq: {
            title: aboutFaqTitle,
            questions: {
              free: {
                question: aboutFaqQuestionsFree,
                answer: aboutFaqAnswersFree
              },
              words: {
                question: aboutFaqQuestionsWords,
                answer: aboutFaqAnswersWords
              },
              commercial: {
                question: aboutFaqQuestionsCommercial,
                answer: aboutFaqAnswersCommercial
              },
              mobile: {
                question: aboutFaqQuestionsMobile,
                answer: aboutFaqAnswersMobile
              }
            }
          },
          conclusion: {
            title: aboutConclusionTitle,
            description: aboutConclusionDesc
          }
        }
      }
    }
  };

  return (
    <div className="text-gray-100 font-sans">
      <WordGeneratorClient messages={messages} />
    </div>
  );
} 
import { translate } from '@/lib/i18n/server'
import WordGeneratorClient from './components/WordGeneratorClient'

export default async function WordGenerator({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Get translations including about section
  const [
    title,
    description,
    lengthLabel,
    lengthMin,
    lengthMax,
    patternLabel,
    patternPlaceholder,
    countLabel,
    countPlaceholder,
    generateButton,
    clearButton,
    resultTitle,
    resultEmpty,
    resultCopy,
    resultCopied,
    resultDownload,
    resultDownloaded,
    // About section translations
    aboutCatchphrase,
    aboutIntroduction,
    aboutFeaturesTitle,
    aboutFeaturesOneClickTitle,
    aboutFeaturesOneClickDesc,
    aboutFeaturesDatabaseTitle,
    aboutFeaturesDatabaseDesc,
    aboutFeaturesDesignTitle,
    aboutFeaturesDesignDesc,
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
    aboutTechnicalTitle,
    aboutTechnicalAlgorithmTitle,
    aboutTechnicalAlgorithmDesc,
    aboutTechnicalDatabaseTitle,
    aboutTechnicalDatabaseDesc,
    aboutTechnicalPerformanceTitle,
    aboutTechnicalPerformanceDesc,
    aboutFaqTitle,
    aboutFaqQuestionsFree,
    aboutFaqAnswersFree,
    aboutFaqQuestionsWords,
    aboutFaqAnswersWords,
    aboutFaqQuestionsCommercial,
    aboutFaqAnswersCommercial,
    aboutFaqQuestionsMobile,
    aboutFaqAnswersMobile,
    aboutConclusionTitle,
    aboutConclusionDesc,
  ] = await Promise.all([
    translate(lang, 'wordGenerator.title'),
    translate(lang, 'wordGenerator.description'),
    translate(lang, 'wordGenerator.form.length.label'),
    translate(lang, 'wordGenerator.form.length.min'),
    translate(lang, 'wordGenerator.form.length.max'),
    translate(lang, 'wordGenerator.form.pattern.label'),
    translate(lang, 'wordGenerator.form.pattern.placeholder'),
    translate(lang, 'wordGenerator.form.count.label'),
    translate(lang, 'wordGenerator.form.count.placeholder'),
    translate(lang, 'wordGenerator.form.generate'),
    translate(lang, 'wordGenerator.form.clear'),
    translate(lang, 'wordGenerator.result.title'),
    translate(lang, 'wordGenerator.result.empty'),
    translate(lang, 'wordGenerator.result.copy'),
    translate(lang, 'wordGenerator.result.copied'),
    translate(lang, 'wordGenerator.result.download'),
    translate(lang, 'wordGenerator.result.downloaded'),
    // About section translations
    translate(lang, 'wordGenerator.about.catchphrase'),
    translate(lang, 'wordGenerator.about.introduction'),
    translate(lang, 'wordGenerator.about.features.title'),
    translate(lang, 'wordGenerator.about.features.oneClick.title'),
    translate(lang, 'wordGenerator.about.features.oneClick.description'),
    translate(lang, 'wordGenerator.about.features.database.title'),
    translate(lang, 'wordGenerator.about.features.database.description'),
    translate(lang, 'wordGenerator.about.features.design.title'),
    translate(lang, 'wordGenerator.about.features.design.description'),
    translate(lang, 'wordGenerator.about.useCases.title'),
    translate(lang, 'wordGenerator.about.useCases.scenes.title'),
    translate(lang, 'wordGenerator.about.useCases.scenes.writer'),
    translate(lang, 'wordGenerator.about.useCases.scenes.designer'),
    translate(lang, 'wordGenerator.about.useCases.scenes.brainstorming'),
    translate(lang, 'wordGenerator.about.useCases.testimonials.title'),
    translate(lang, 'wordGenerator.about.useCases.testimonials.writer.name'),
    translate(lang, 'wordGenerator.about.useCases.testimonials.writer.quote'),
    translate(lang, 'wordGenerator.about.useCases.testimonials.designer.name'),
    translate(lang, 'wordGenerator.about.useCases.testimonials.designer.quote'),
    translate(lang, 'wordGenerator.about.technical.title'),
    translate(lang, 'wordGenerator.about.technical.algorithm.title'),
    translate(lang, 'wordGenerator.about.technical.algorithm.description'),
    translate(lang, 'wordGenerator.about.technical.database.title'),
    translate(lang, 'wordGenerator.about.technical.database.description'),
    translate(lang, 'wordGenerator.about.technical.performance.title'),
    translate(lang, 'wordGenerator.about.technical.performance.description'),
    translate(lang, 'wordGenerator.about.faq.title'),
    translate(lang, 'wordGenerator.about.faq.questions.free.question'),
    translate(lang, 'wordGenerator.about.faq.questions.free.answer'),
    translate(lang, 'wordGenerator.about.faq.questions.words.question'),
    translate(lang, 'wordGenerator.about.faq.questions.words.answer'),
    translate(lang, 'wordGenerator.about.faq.questions.commercial.question'),
    translate(lang, 'wordGenerator.about.faq.questions.commercial.answer'),
    translate(lang, 'wordGenerator.about.faq.questions.mobile.question'),
    translate(lang, 'wordGenerator.about.faq.questions.mobile.answer'),
    translate(lang, 'wordGenerator.about.conclusion.title'),
    translate(lang, 'wordGenerator.about.conclusion.description'),
  ])

  const translations = {
    title,
    description,
    form: {
      length: {
        label: lengthLabel,
        min: lengthMin,
        max: lengthMax,
      },
      pattern: {
        label: patternLabel,
        placeholder: patternPlaceholder,
      },
      count: {
        label: countLabel,
        placeholder: countPlaceholder,
      },
      generate: generateButton,
      clear: clearButton,
    },
    result: {
      title: resultTitle,
      empty: resultEmpty,
      copy: resultCopy,
      copied: resultCopied,
      download: resultDownload,
      downloaded: resultDownloaded,
    },
    about: {
      catchphrase: aboutCatchphrase,
      introduction: aboutIntroduction,
      features: {
        title: aboutFeaturesTitle,
        oneClick: {
          title: aboutFeaturesOneClickTitle,
          description: aboutFeaturesOneClickDesc,
        },
        database: {
          title: aboutFeaturesDatabaseTitle,
          description: aboutFeaturesDatabaseDesc,
        },
        design: {
          title: aboutFeaturesDesignTitle,
          description: aboutFeaturesDesignDesc,
        },
      },
      useCases: {
        title: aboutUseCasesTitle,
        scenes: {
          title: aboutUseCasesScenesTitle,
          writer: aboutUseCasesScenesWriter,
          designer: aboutUseCasesScenesDesigner,
          brainstorming: aboutUseCasesScenesBS,
        },
        testimonials: {
          title: aboutUseCasesTestimonialsTitle,
          writer: {
            name: aboutUseCasesTestimonialsWriterName,
            quote: aboutUseCasesTestimonialsWriterQuote,
          },
          designer: {
            name: aboutUseCasesTestimonialsDesignerName,
            quote: aboutUseCasesTestimonialsDesignerQuote,
          },
        },
      },
      technical: {
        title: aboutTechnicalTitle,
        algorithm: {
          title: aboutTechnicalAlgorithmTitle,
          description: aboutTechnicalAlgorithmDesc,
        },
        database: {
          title: aboutTechnicalDatabaseTitle,
          description: aboutTechnicalDatabaseDesc,
        },
        performance: {
          title: aboutTechnicalPerformanceTitle,
          description: aboutTechnicalPerformanceDesc,
        },
      },
      faq: {
        title: aboutFaqTitle,
        questions: {
          free: {
            question: aboutFaqQuestionsFree,
            answer: aboutFaqAnswersFree,
          },
          words: {
            question: aboutFaqQuestionsWords,
            answer: aboutFaqAnswersWords,
          },
          commercial: {
            question: aboutFaqQuestionsCommercial,
            answer: aboutFaqAnswersCommercial,
          },
          mobile: {
            question: aboutFaqQuestionsMobile,
            answer: aboutFaqAnswersMobile,
          },
        },
      },
      conclusion: {
        title: aboutConclusionTitle,
        description: aboutConclusionDesc,
      },
    },
  }

  return <WordGeneratorClient translations={translations} />
} 
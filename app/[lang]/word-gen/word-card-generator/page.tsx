import { translate } from '@/lib/i18n/server'
import WordCardGeneratorClient from './components/WordCardGeneratorClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function WordCardGenerator({ params }: Props) {
  const { lang } = await params

  const translations = {
    title: translate(lang, 'wordGen.title'),
    description: translate(lang, 'wordGen.description'),
    wordCardGenerator: {
      title: translate(lang, 'wordCardGenerator.title'),
      description: translate(lang, 'wordCardGenerator.description'),
      form: {
        count: {
          label: translate(lang, 'wordCardGenerator.form.count.label')
        },
        generate: translate(lang, 'wordCardGenerator.form.generate')
      },
      result: {
        title: translate(lang, 'wordCardGenerator.result.title'),
        empty: translate(lang, 'wordCardGenerator.result.empty'),
        copy: translate(lang, 'wordCardGenerator.result.copy'),
        copied: translate(lang, 'wordCardGenerator.result.copied')
      },
      card: {
        length: translate(lang, 'wordCardGenerator.card.length'),
        category: translate(lang, 'wordCardGenerator.card.category')
      },
      about: {
        catchphrase: translate(lang, 'wordCardGenerator.about.catchphrase'),
        introduction: translate(lang, 'wordCardGenerator.about.introduction'),
        features: {
          title: translate(lang, 'wordCardGenerator.about.features.title'),
          oneClick: {
            title: translate(lang, 'wordCardGenerator.about.features.oneClick.title'),
            description: translate(lang, 'wordCardGenerator.about.features.oneClick.description')
          },
          database: {
            title: translate(lang, 'wordCardGenerator.about.features.database.title'),
            description: translate(lang, 'wordCardGenerator.about.features.database.description')
          },
          design: {
            title: translate(lang, 'wordCardGenerator.about.features.design.title'),
            description: translate(lang, 'wordCardGenerator.about.features.design.description')
          }
        },
        useCases: {
          title: translate(lang, 'wordCardGenerator.about.useCases.title'),
          vocabulary: {
            title: translate(lang, 'wordCardGenerator.about.useCases.vocabulary.title'),
            description: translate(lang, 'wordCardGenerator.about.useCases.vocabulary.description')
          },
          brainstorming: {
            title: translate(lang, 'wordCardGenerator.about.useCases.brainstorming.title'),
            description: translate(lang, 'wordCardGenerator.about.useCases.brainstorming.description')
          },
          games: {
            title: translate(lang, 'wordCardGenerator.about.useCases.games.title'),
            description: translate(lang, 'wordCardGenerator.about.useCases.games.description')
          }
        },
        technical: {
          title: translate(lang, 'wordCardGenerator.about.technical.title'),
          algorithm: {
            title: translate(lang, 'wordCardGenerator.about.technical.algorithm.title'),
            description: translate(lang, 'wordCardGenerator.about.technical.algorithm.description')
          },
          database: {
            title: translate(lang, 'wordCardGenerator.about.technical.database.title'),
            description: translate(lang, 'wordCardGenerator.about.technical.database.description')
          },
          responsive: {
            title: translate(lang, 'wordCardGenerator.about.technical.responsive.title'),
            description: translate(lang, 'wordCardGenerator.about.technical.responsive.description')
          }
        },
        faq: {
          title: translate(lang, 'wordCardGenerator.about.faq.title'),
          questions: {
            free: {
              question: translate(lang, 'wordCardGenerator.about.faq.questions.free.question'),
              answer: translate(lang, 'wordCardGenerator.about.faq.questions.free.answer')
            },
            customize: {
              question: translate(lang, 'wordCardGenerator.about.faq.questions.customize.question'),
              answer: translate(lang, 'wordCardGenerator.about.faq.questions.customize.answer')
            },
            print: {
              question: translate(lang, 'wordCardGenerator.about.faq.questions.print.question'),
              answer: translate(lang, 'wordCardGenerator.about.faq.questions.print.answer')
            }
          }
        },
        conclusion: {
          title: translate(lang, 'wordCardGenerator.about.conclusion.title'),
          description: translate(lang, 'wordCardGenerator.about.conclusion.description')
        }
      },
      howTo: {
        title: translate(lang, 'wordCardGenerator.howTo.title'),
        description: translate(lang, 'wordCardGenerator.howTo.description')
      },
      useCases: {
        title: translate(lang, 'wordCardGenerator.useCases.title'),
        vocabulary: translate(lang, 'wordCardGenerator.useCases.vocabulary'),
        teaching: translate(lang, 'wordCardGenerator.useCases.teaching'),
        games: translate(lang, 'wordCardGenerator.useCases.games'),
        writing: translate(lang, 'wordCardGenerator.useCases.writing'),
        esl: translate(lang, 'wordCardGenerator.useCases.esl')
      }
    }
  }

  return <WordCardGeneratorClient translations={translations} />
} 
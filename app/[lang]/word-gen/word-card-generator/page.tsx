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
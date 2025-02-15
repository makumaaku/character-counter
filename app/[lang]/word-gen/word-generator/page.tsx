import { translate } from '@/lib/i18n/server'
import WordGeneratorClient from './components/WordGeneratorClient'

export default async function WordGenerator({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // 非同期で翻訳を取得
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
  ] = await Promise.all([
    translate(lang, 'wordGen.tools.wordGenerator.title'),
    translate(lang, 'wordGen.tools.wordGenerator.description'),
    translate(lang, 'wordGen.tools.wordGenerator.form.length.label'),
    translate(lang, 'wordGen.tools.wordGenerator.form.length.min'),
    translate(lang, 'wordGen.tools.wordGenerator.form.length.max'),
    translate(lang, 'wordGen.tools.wordGenerator.form.pattern.label'),
    translate(lang, 'wordGen.tools.wordGenerator.form.pattern.placeholder'),
    translate(lang, 'wordGen.tools.wordGenerator.form.count.label'),
    translate(lang, 'wordGen.tools.wordGenerator.form.count.placeholder'),
    translate(lang, 'wordGen.tools.wordGenerator.form.generate'),
    translate(lang, 'wordGen.tools.wordGenerator.form.clear'),
    translate(lang, 'wordGen.tools.wordGenerator.result.title'),
    translate(lang, 'wordGen.tools.wordGenerator.result.empty'),
    translate(lang, 'wordGen.tools.wordGenerator.result.copy'),
    translate(lang, 'wordGen.tools.wordGenerator.result.copied'),
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
    },
  }

  return <WordGeneratorClient translations={translations} />
} 
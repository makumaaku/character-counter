import { translate } from '@/lib/i18n/server'
import WebToPdfClient from './components/WebToPdfClient'

export default async function WebToPdf({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Get translations
  const [
    title,
    description,
    urlLabel,
    urlPlaceholder,
    convertButton,
    optionsLabel,
    formatLabel,
    formatA4,
    formatLetter,
    formatLegal,
    orientationLabel,
    orientationPortrait,
    orientationLandscape,
    scaleLabel,
    scaleDefault,
    scaleFit,
    downloadButton,
    processingText,
    noUrlText,
    successText,
    invalidUrlError,
    conversionFailedError,
    networkError,
    timeoutError,
    loadingText
  ] = await Promise.all([
    translate(lang, 'webToPdf.title'),
    translate(lang, 'webToPdf.description'),
    translate(lang, 'webToPdf.form.url.label'),
    translate(lang, 'webToPdf.form.url.placeholder'),
    translate(lang, 'webToPdf.form.url.button'),
    translate(lang, 'webToPdf.form.options.label'),
    translate(lang, 'webToPdf.form.options.format.label'),
    translate(lang, 'webToPdf.form.options.format.a4'),
    translate(lang, 'webToPdf.form.options.format.letter'),
    translate(lang, 'webToPdf.form.options.format.legal'),
    translate(lang, 'webToPdf.form.options.orientation.label'),
    translate(lang, 'webToPdf.form.options.orientation.portrait'),
    translate(lang, 'webToPdf.form.options.orientation.landscape'),
    translate(lang, 'webToPdf.form.options.scale.label'),
    translate(lang, 'webToPdf.form.options.scale.default'),
    translate(lang, 'webToPdf.form.options.scale.fit'),
    translate(lang, 'webToPdf.result.download'),
    translate(lang, 'webToPdf.status.processing'),
    translate(lang, 'webToPdf.status.noUrl'),
    translate(lang, 'webToPdf.status.success'),
    translate(lang, 'webToPdf.error.invalidUrl'),
    translate(lang, 'webToPdf.error.conversionFailed'),
    translate(lang, 'webToPdf.error.networkError'),
    translate(lang, 'webToPdf.error.timeout'),
    translate(lang, 'webToPdf.loading')
  ])

  const translations = {
    title,
    description,
    form: {
      url: {
        label: urlLabel,
        placeholder: urlPlaceholder,
        button: convertButton
      },
      options: {
        label: optionsLabel,
        format: {
          label: formatLabel,
          a4: formatA4,
          letter: formatLetter,
          legal: formatLegal
        },
        orientation: {
          label: orientationLabel,
          portrait: orientationPortrait,
          landscape: orientationLandscape
        },
        scale: {
          label: scaleLabel,
          default: scaleDefault,
          fit: scaleFit
        }
      }
    },
    result: {
      download: downloadButton
    },
    status: {
      processing: processingText,
      noUrl: noUrlText,
      success: successText
    },
    error: {
      invalidUrl: invalidUrlError,
      conversionFailed: conversionFailedError,
      networkError: networkError,
      timeout: timeoutError
    },
    loading: loadingText
  }

  return <WebToPdfClient translations={translations} lang={lang} />
} 
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
    downloadButton,
    previewButton,
    processingText,
    noUrlText,
    successText,
    invalidUrlError,
    conversionFailedError,
    networkError,
    timeoutError,
    loadingText,
    previewLoadingText,
    previewErrorText,
    previewPageOfText
  ] = await Promise.all([
    translate(lang, 'webToPdf.title'),
    translate(lang, 'webToPdf.description'),
    translate(lang, 'webToPdf.form.url.label'),
    translate(lang, 'webToPdf.form.url.placeholder'),
    translate(lang, 'webToPdf.form.url.button'),
    translate(lang, 'webToPdf.result.download'),
    translate(lang, 'webToPdf.result.preview'),
    translate(lang, 'webToPdf.status.processing'),
    translate(lang, 'webToPdf.status.noUrl'),
    translate(lang, 'webToPdf.status.success'),
    translate(lang, 'webToPdf.error.invalidUrl'),
    translate(lang, 'webToPdf.error.conversionFailed'),
    translate(lang, 'webToPdf.error.networkError'),
    translate(lang, 'webToPdf.error.timeout'),
    translate(lang, 'webToPdf.loading'),
    translate(lang, 'webToPdf.preview.loading'),
    translate(lang, 'webToPdf.preview.error'),
    translate(lang, 'webToPdf.preview.pageOf')
  ])

  const translations = {
    title,
    description,
    form: {
      url: {
        label: urlLabel,
        placeholder: urlPlaceholder,
        button: convertButton
      }
    },
    result: {
      download: downloadButton,
      preview: previewButton
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
    loading: loadingText,
    preview: {
      loading: previewLoadingText,
      error: previewErrorText,
      pageOf: previewPageOfText
    }
  }

  return <WebToPdfClient translations={translations} lang={lang} />
} 
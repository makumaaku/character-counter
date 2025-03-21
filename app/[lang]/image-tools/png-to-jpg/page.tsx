import { translate } from '@/lib/i18n/server'
import PngToJpgClient from './components/PngToJpgClient'

export default async function PngToJpg({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Get translations
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    uploadLimitText,
    convertButton,
    downloadButton,
    downloadAllButton,
    previewText,
    processingText,
    noFileText,
    successText,
    browserProcessingText,
    fileTypeError,
    fileSizeError,
    conversionFailedError
  ] = await Promise.all([
    translate(lang, 'pngToJpg.title'),
    translate(lang, 'pngToJpg.description'),
    translate(lang, 'pngToJpg.form.upload.label'),
    translate(lang, 'pngToJpg.form.upload.button'),
    translate(lang, 'pngToJpg.form.upload.dragDrop'),
    translate(lang, 'pngToJpg.form.upload.limitText'),
    translate(lang, 'pngToJpg.form.convert'),
    translate(lang, 'pngToJpg.result.download'),
    translate(lang, 'pngToJpg.result.downloadAll'),
    translate(lang, 'pngToJpg.result.preview'),
    translate(lang, 'pngToJpg.status.processing'),
    translate(lang, 'pngToJpg.status.noFile'),
    translate(lang, 'pngToJpg.status.success'),
    translate(lang, 'pngToJpg.status.browserProcessing'),
    translate(lang, 'pngToJpg.error.fileType'),
    translate(lang, 'pngToJpg.error.fileSize'),
    translate(lang, 'pngToJpg.error.conversionFailed')
  ])

  const translations = {
    title,
    description,
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText,
        limitText: uploadLimitText
      },
      convert: convertButton
    },
    result: {
      download: downloadButton,
      downloadAll: downloadAllButton,
      preview: previewText
    },
    status: {
      processing: processingText,
      noFile: noFileText,
      success: successText,
      browserProcessing: browserProcessingText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError,
      conversionFailed: conversionFailedError
    }
  }

  return <PngToJpgClient translations={translations} />
} 
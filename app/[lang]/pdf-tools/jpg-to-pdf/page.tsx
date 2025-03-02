import { translate } from '@/lib/i18n/server'
import JpgToPdfClient from './components/JpgToPdfClient'


export default async function JpgToPdf({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Get translations
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    qualityLabel,
    qualityLow,
    qualityMedium,
    qualityHigh,
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'jpgToPdf.title'),
    translate(lang, 'jpgToPdf.description'),
    translate(lang, 'jpgToPdf.form.upload.label'),
    translate(lang, 'jpgToPdf.form.upload.button'),
    translate(lang, 'jpgToPdf.form.upload.dragDrop'),
    translate(lang, 'jpgToPdf.form.quality.label'),
    translate(lang, 'jpgToPdf.form.quality.low'),
    translate(lang, 'jpgToPdf.form.quality.medium'),
    translate(lang, 'jpgToPdf.form.quality.high'),
    translate(lang, 'jpgToPdf.form.convert'),
    translate(lang, 'jpgToPdf.result.download'),
    translate(lang, 'jpgToPdf.status.processing'),
    translate(lang, 'jpgToPdf.status.noFile'),
    translate(lang, 'jpgToPdf.error.fileType'),
    translate(lang, 'jpgToPdf.error.fileSize')
  ])

  const translations = {
    title,
    description,
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText
      },
      quality: {
        label: qualityLabel,
        low: qualityLow,
        medium: qualityMedium,
        high: qualityHigh
      },
      convert: convertButton
    },
    result: {
      download: downloadButton
    },
    status: {
      processing: processingText,
      noFile: noFileText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError
    }
  }

  return <JpgToPdfClient translations={translations} />
} 
import { translate } from '@/lib/i18n/server'
import PdfToJpgClient from './components/PdfToJpgClient'

export default async function PdfToJpg({ params }: { params: Promise<{ lang: string }> }) {
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
    downloadAllButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'pdfToJpg.title'),
    translate(lang, 'pdfToJpg.description'),
    translate(lang, 'pdfToJpg.form.upload.label'),
    translate(lang, 'pdfToJpg.form.upload.button'),
    translate(lang, 'pdfToJpg.form.upload.dragDrop'),
    translate(lang, 'pdfToJpg.form.quality.label'),
    translate(lang, 'pdfToJpg.form.quality.low'),
    translate(lang, 'pdfToJpg.form.quality.medium'),
    translate(lang, 'pdfToJpg.form.quality.high'),
    translate(lang, 'pdfToJpg.form.convert'),
    translate(lang, 'pdfToJpg.result.downloadAll'),
    translate(lang, 'pdfToJpg.result.download'),
    translate(lang, 'pdfToJpg.status.processing'),
    translate(lang, 'pdfToJpg.status.noFile'),
    translate(lang, 'pdfToJpg.error.fileType'),
    translate(lang, 'pdfToJpg.error.fileSize')
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
      downloadAll: downloadAllButton,
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

  return <PdfToJpgClient translations={translations} />
} 
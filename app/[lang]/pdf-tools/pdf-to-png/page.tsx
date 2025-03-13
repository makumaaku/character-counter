import { translate } from '@/lib/i18n/server'
import PdfToPngClient from './components/PdfToPngClient'


export default async function PdfToPng({ params }: { params: Promise<{ lang: string }> }) {
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
    translate(lang, 'pdfToPng.title'),
    translate(lang, 'pdfToPng.description'),
    translate(lang, 'pdfToPng.form.upload.label'),
    translate(lang, 'pdfToPng.form.upload.button'),
    translate(lang, 'pdfToPng.form.upload.dragDrop'),
    translate(lang, 'pdfToPng.form.quality.label'),
    translate(lang, 'pdfToPng.form.quality.low'),
    translate(lang, 'pdfToPng.form.quality.medium'),
    translate(lang, 'pdfToPng.form.quality.high'),
    translate(lang, 'pdfToPng.form.convert'),
    translate(lang, 'pdfToPng.result.downloadAll'),
    translate(lang, 'pdfToPng.result.download'),
    translate(lang, 'pdfToPng.status.processing'),
    translate(lang, 'pdfToPng.status.noFile'),
    translate(lang, 'pdfToPng.error.fileType'),
    translate(lang, 'pdfToPng.error.fileSize')
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

  return (
    <div>
      <PdfToPngClient translations={translations} />
    </div>
  )
} 
import { translate } from '@/lib/i18n/server'
import PdfToEpubClient from './components/PdfToEpubClient'

export default async function PdfToEpub({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Get translations
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    draggingText,
    instructionText,
    maxSizeText,
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    loadingText
  ] = await Promise.all([
    translate(lang, 'pdfToEpub.title'),
    translate(lang, 'pdfToEpub.description'),
    translate(lang, 'pdfToEpub.form.upload.label'),
    translate(lang, 'pdfToEpub.form.upload.button'),
    translate(lang, 'pdfToEpub.form.upload.dragDrop'),
    translate(lang, 'pdfToEpub.form.upload.dragging'),
    translate(lang, 'pdfToEpub.form.upload.instruction'),
    translate(lang, 'pdfToEpub.form.upload.maxSize'),
    translate(lang, 'pdfToEpub.form.convert'),
    translate(lang, 'pdfToEpub.result.download'),
    translate(lang, 'pdfToEpub.status.processing'),
    translate(lang, 'pdfToEpub.status.noFile'),
    translate(lang, 'pdfToEpub.error.fileType'),
    translate(lang, 'pdfToEpub.error.fileSize'),
    translate(lang, 'pdfToEpub.status.loading')
  ])

  const translations = {
    title,
    description,
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText,
        dragging: draggingText,
        instruction: instructionText,
        maxSize: maxSizeText
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
    },
    loading: loadingText
  }

  return <PdfToEpubClient translations={translations} />
} 
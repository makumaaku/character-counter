import { translate } from '@/lib/i18n/server'
import PdfToWordClient from './components/PdfToWordClient'

export default async function PdfToWord({ params }: { params: Promise<{ lang: string }> }) {
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
    formatLabel,
    formatDocx,
    formatDoc,
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    loadingText
  ] = await Promise.all([
    translate(lang, 'pdfToWord.title'),
    translate(lang, 'pdfToWord.description'),
    translate(lang, 'pdfToWord.form.upload.label'),
    translate(lang, 'pdfToWord.form.upload.button'),
    translate(lang, 'pdfToWord.form.upload.dragDrop'),
    translate(lang, 'pdfToWord.form.upload.dragging'),
    translate(lang, 'pdfToWord.form.upload.instruction'),
    translate(lang, 'pdfToWord.form.upload.maxSize'),
    translate(lang, 'pdfToWord.form.format.label'),
    translate(lang, 'pdfToWord.form.format.docx'),
    translate(lang, 'pdfToWord.form.format.doc'),
    translate(lang, 'pdfToWord.form.convert'),
    translate(lang, 'pdfToWord.result.download'),
    translate(lang, 'pdfToWord.status.processing'),
    translate(lang, 'pdfToWord.status.noFile'),
    translate(lang, 'pdfToWord.error.fileType'),
    translate(lang, 'pdfToWord.error.fileSize'),
    translate(lang, 'pdfToWord.loading')
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
      format: {
        label: formatLabel,
        docx: formatDocx,
        doc: formatDoc
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

  return <PdfToWordClient translations={translations} />
} 
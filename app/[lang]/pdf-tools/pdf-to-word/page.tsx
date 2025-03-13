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
    formatLabel,
    formatDocx,
    formatDoc,
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'pdfToWord.title'),
    translate(lang, 'pdfToWord.description'),
    translate(lang, 'pdfToWord.form.upload.label'),
    translate(lang, 'pdfToWord.form.upload.button'),
    translate(lang, 'pdfToWord.form.upload.dragDrop'),
    translate(lang, 'pdfToWord.form.format.label'),
    translate(lang, 'pdfToWord.form.format.docx'),
    translate(lang, 'pdfToWord.form.format.doc'),
    translate(lang, 'pdfToWord.form.convert'),
    translate(lang, 'pdfToWord.result.download'),
    translate(lang, 'pdfToWord.status.processing'),
    translate(lang, 'pdfToWord.status.noFile'),
    translate(lang, 'pdfToWord.error.fileType'),
    translate(lang, 'pdfToWord.error.fileSize')
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
    }
  }

  return <PdfToWordClient translations={translations} />
} 
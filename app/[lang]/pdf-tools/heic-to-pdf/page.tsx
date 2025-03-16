import { translate } from '@/lib/i18n/server'
import HeicToPdfClient from './components/HeicToPdfClient'


export default async function HeicToPdf({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Get translations
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    conversionError,
    successMessage
  ] = await Promise.all([
    translate(lang, 'heicToPdf.title'),
    translate(lang, 'heicToPdf.description'),
    translate(lang, 'heicToPdf.form.upload.label'),
    translate(lang, 'heicToPdf.form.upload.button'),
    translate(lang, 'heicToPdf.form.upload.dragDrop'),
    translate(lang, 'heicToPdf.form.convert'),
    translate(lang, 'heicToPdf.result.download'),
    translate(lang, 'heicToPdf.status.processing'),
    translate(lang, 'heicToPdf.status.noFile'),
    translate(lang, 'heicToPdf.error.fileType'),
    translate(lang, 'heicToPdf.error.fileSize'),
    translate(lang, 'heicToPdf.error.conversion'),
    translate(lang, 'heicToPdf.success.message')
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
      fileSize: fileSizeError,
      conversion: conversionError
    },
    success: {
      message: successMessage
    }
  }

  return <HeicToPdfClient translations={translations} />
} 
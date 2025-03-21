import { translate } from '@/lib/i18n/server'
import HeicToWebpClient from './components/HeicToWebpClient'

export default async function HeicToWebp({ params }: { params: Promise<{ lang: string }> }) {
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
    downloadAllButton,
    processingText,
    noFileText,
    successText,
    convertingFileText,
    fileTypeError,
    fileSizeError,
    conversionError
  ] = await Promise.all([
    translate(lang, 'heicToWebp.title'),
    translate(lang, 'heicToWebp.description'),
    translate(lang, 'heicToWebp.form.upload.label'),
    translate(lang, 'heicToWebp.form.upload.button'),
    translate(lang, 'heicToWebp.form.upload.dragDrop'),
    translate(lang, 'heicToWebp.form.convert'),
    translate(lang, 'heicToWebp.result.download'),
    translate(lang, 'heicToWebp.result.downloadAll'),
    translate(lang, 'heicToWebp.status.processing'),
    translate(lang, 'heicToWebp.status.noFile'),
    translate(lang, 'heicToWebp.status.success'),
    translate(lang, 'heicToWebp.status.convertingFile'),
    translate(lang, 'heicToWebp.error.fileType'),
    translate(lang, 'heicToWebp.error.fileSize'),
    translate(lang, 'heicToWebp.error.conversion')
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
      download: downloadButton,
      downloadAll: downloadAllButton
    },
    status: {
      processing: processingText,
      noFile: noFileText,
      success: successText,
      convertingFile: convertingFileText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError,
      conversion: conversionError
    }
  }

  return <HeicToWebpClient translations={translations} />
} 
import { translate } from '@/lib/i18n/server'
import HeicToJpgClient from './components/HeicToJpgClient'

export default async function HeicToJpg({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Get translations
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    uploadLimit,
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
    translate(lang, 'heicToJpg.title'),
    translate(lang, 'heicToJpg.description'),
    translate(lang, 'heicToJpg.form.upload.label'),
    translate(lang, 'heicToJpg.form.upload.button'),
    translate(lang, 'heicToJpg.form.upload.dragDrop'),
    translate(lang, 'heicToJpg.upload.limit'),
    translate(lang, 'heicToJpg.form.convert'),
    translate(lang, 'heicToJpg.result.download'),
    translate(lang, 'heicToJpg.result.downloadAll'),
    translate(lang, 'heicToJpg.status.processing'),
    translate(lang, 'heicToJpg.status.noFile'),
    translate(lang, 'heicToJpg.status.success'),
    translate(lang, 'heicToJpg.status.convertingFile'),
    translate(lang, 'heicToJpg.error.fileType'),
    translate(lang, 'heicToJpg.error.fileSize'),
    translate(lang, 'heicToJpg.error.conversion')
  ])

  const translations = {
    title,
    description,
    upload: {
      limit: uploadLimit
    },
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

  return <HeicToJpgClient translations={translations} />
} 
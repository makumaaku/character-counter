import { translate } from '@/lib/i18n/server'
import PngToPdfClient from './components/PngToPdfClient'

export default async function PngToPdf({ params }: { params: Promise<{ lang: string }> }) {
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
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'pngToPdf.title'),
    translate(lang, 'pngToPdf.description'),
    translate(lang, 'pngToPdf.form.upload.label'),
    translate(lang, 'pngToPdf.form.upload.button'),
    translate(lang, 'pngToPdf.form.upload.dragDrop'),
    translate(lang, 'pngToPdf.form.convert'),
    translate(lang, 'pngToPdf.result.download'),
    translate(lang, 'pngToPdf.status.processing'),
    translate(lang, 'pngToPdf.status.noFile'),
    translate(lang, 'pngToPdf.error.fileType'),
    translate(lang, 'pngToPdf.error.fileSize')
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
      fileSize: fileSizeError
    }
  }

  return (
    <div>
      <PngToPdfClient translations={translations} />
    </div>
  )
} 
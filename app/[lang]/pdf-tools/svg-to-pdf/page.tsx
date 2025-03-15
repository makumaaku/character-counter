import { translate } from '@/lib/i18n/server'
import SvgToPdfClient from './components/SvgToPdfClient'

export default async function SvgToPdf({ params }: { params: Promise<{ lang: string }> }) {
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
    translate(lang, 'svgToPdf.title'),
    translate(lang, 'svgToPdf.description'),
    translate(lang, 'svgToPdf.form.upload.label'),
    translate(lang, 'svgToPdf.form.upload.button'),
    translate(lang, 'svgToPdf.form.upload.dragDrop'),
    translate(lang, 'svgToPdf.form.convert'),
    translate(lang, 'svgToPdf.result.download'),
    translate(lang, 'svgToPdf.status.processing'),
    translate(lang, 'svgToPdf.status.noFile'),
    translate(lang, 'svgToPdf.error.fileType'),
    translate(lang, 'svgToPdf.error.fileSize')
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
      <SvgToPdfClient translations={translations} />
    </div>
  )
} 
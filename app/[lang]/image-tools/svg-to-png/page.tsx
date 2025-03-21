import { translate } from '@/lib/i18n/server'
import SvgToPngClient from './components/SvgToPngClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SvgToPng({ params }: Props) {
  const { lang } = await params

  // 翻訳を取得
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    uploadLimitText,
    convertButton,
    downloadButton,
    downloadAllButton,
    previewText,
    processingText,
    noFileText,
    successText,
    browserProcessingText,
    fileTypeError,
    fileSizeError,
    conversionFailedError,
    selectedFilesText
  ] = await Promise.all([
    translate(lang, 'svgToPng.title'),
    translate(lang, 'svgToPng.description'),
    translate(lang, 'svgToPng.form.upload.label'),
    translate(lang, 'svgToPng.form.upload.button'),
    translate(lang, 'svgToPng.form.upload.dragDrop'),
    translate(lang, 'svgToPng.form.upload.limitText'),
    translate(lang, 'svgToPng.form.convert'),
    translate(lang, 'svgToPng.result.download'),
    translate(lang, 'svgToPng.result.downloadAll'),
    translate(lang, 'svgToPng.result.preview'),
    translate(lang, 'svgToPng.status.processing'),
    translate(lang, 'svgToPng.status.noFile'),
    translate(lang, 'svgToPng.status.success'),
    translate(lang, 'svgToPng.status.browserProcessing'),
    translate(lang, 'svgToPng.error.fileType'),
    translate(lang, 'svgToPng.error.fileSize'),
    translate(lang, 'svgToPng.error.conversionFailed'),
    translate(lang, 'svgToPng.result.selectedFiles')
  ])

  const translations = {
    title,
    description,
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText,
        limitText: uploadLimitText
      },
      convert: convertButton
    },
    result: {
      download: downloadButton,
      downloadAll: downloadAllButton,
      preview: previewText,
      selectedFiles: selectedFilesText
    },
    status: {
      processing: processingText,
      noFile: noFileText,
      success: successText,
      browserProcessing: browserProcessingText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError,
      conversionFailed: conversionFailedError
    }
  }

  return <SvgToPngClient translations={translations} />
} 
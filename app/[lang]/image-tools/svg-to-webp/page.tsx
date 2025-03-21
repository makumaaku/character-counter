import { translate } from '@/lib/i18n/server'
import SvgToWebpClient from './components/SvgToWebpClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SvgToWebp({ params }: Props) {
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
    translate(lang, 'svgToWebp.title'),
    translate(lang, 'svgToWebp.description'),
    translate(lang, 'svgToWebp.form.upload.label'),
    translate(lang, 'svgToWebp.form.upload.button'),
    translate(lang, 'svgToWebp.form.upload.dragDrop'),
    translate(lang, 'svgToWebp.form.upload.limitText'),
    translate(lang, 'svgToWebp.form.convert'),
    translate(lang, 'svgToWebp.result.download'),
    translate(lang, 'svgToWebp.result.downloadAll'),
    translate(lang, 'svgToWebp.result.preview'),
    translate(lang, 'svgToWebp.status.processing'),
    translate(lang, 'svgToWebp.status.noFile'),
    translate(lang, 'svgToWebp.status.success'),
    translate(lang, 'svgToWebp.status.browserProcessing'),
    translate(lang, 'svgToWebp.error.fileType'),
    translate(lang, 'svgToWebp.error.fileSize'),
    translate(lang, 'svgToWebp.error.conversionFailed'),
    translate(lang, 'svgToWebp.result.selectedFiles')
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

  return <SvgToWebpClient translations={translations} />
} 
import { translate } from '@/lib/i18n/server'
import SvgToJpgClient from './components/SvgToJpgClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SvgToJpg({ params }: Props) {
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
    translate(lang, 'svgToJpg.title'),
    translate(lang, 'svgToJpg.description'),
    translate(lang, 'svgToJpg.form.upload.label'),
    translate(lang, 'svgToJpg.form.upload.button'),
    translate(lang, 'svgToJpg.form.upload.dragDrop'),
    translate(lang, 'svgToJpg.form.upload.limitText'),
    translate(lang, 'svgToJpg.form.convert'),
    translate(lang, 'svgToJpg.result.download'),
    translate(lang, 'svgToJpg.result.downloadAll'),
    translate(lang, 'svgToJpg.result.preview'),
    translate(lang, 'svgToJpg.status.processing'),
    translate(lang, 'svgToJpg.status.noFile'),
    translate(lang, 'svgToJpg.status.success'),
    translate(lang, 'svgToJpg.status.browserProcessing'),
    translate(lang, 'svgToJpg.error.fileType'),
    translate(lang, 'svgToJpg.error.fileSize'),
    translate(lang, 'svgToJpg.error.conversionFailed'),
    translate(lang, 'svgToJpg.result.selectedFiles')
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

  return <SvgToJpgClient translations={translations} />
} 
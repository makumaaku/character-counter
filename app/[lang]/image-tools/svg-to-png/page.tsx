import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import SvgToPngClient from './components/SvgToPngClient'
import { Language, ImageToolsSvgToPngMessages } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function SvgToPng({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/svg-to-png');

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
    translate(lang, 'imageTools.svgToPng.title'),
    translate(lang, 'imageTools.svgToPng.description'),
    translate(lang, 'imageTools.svgToPng.form.upload.label'),
    translate(lang, 'imageTools.svgToPng.form.upload.button'),
    translate(lang, 'imageTools.svgToPng.form.upload.dragDrop'),
    translate(lang, 'imageTools.svgToPng.form.upload.limitText'),
    translate(lang, 'imageTools.svgToPng.form.convert'),
    translate(lang, 'imageTools.svgToPng.result.download'),
    translate(lang, 'imageTools.svgToPng.result.downloadAll'),
    translate(lang, 'imageTools.svgToPng.result.preview'),
    translate(lang, 'imageTools.svgToPng.status.processing'),
    translate(lang, 'imageTools.svgToPng.status.noFile'),
    translate(lang, 'imageTools.svgToPng.status.success'),
    translate(lang, 'imageTools.svgToPng.status.browserProcessing'),
    translate(lang, 'imageTools.svgToPng.error.fileType'),
    translate(lang, 'imageTools.svgToPng.error.fileSize'),
    translate(lang, 'imageTools.svgToPng.error.conversionFailed'),
    translate(lang, 'imageTools.svgToPng.result.selectedFiles')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsSvgToPngMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
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

  return <SvgToPngClient translations={messages} />
} 
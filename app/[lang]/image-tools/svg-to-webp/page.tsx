import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import SvgToWebpClient from './components/SvgToWebpClient'
import { Language, ImageToolsSvgToWebpMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SvgToWebp({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/svg-to-webp');
  
  // サーバーコンポーネントで翻訳を取得
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
    translate(lang, 'imageTools.svgToWebp.title'),
    translate(lang, 'imageTools.svgToWebp.description'),
    translate(lang, 'imageTools.svgToWebp.form.upload.label'),
    translate(lang, 'imageTools.svgToWebp.form.upload.button'),
    translate(lang, 'imageTools.svgToWebp.form.upload.dragDrop'),
    translate(lang, 'imageTools.svgToWebp.form.upload.limitText'),
    translate(lang, 'imageTools.svgToWebp.form.convert'),
    translate(lang, 'imageTools.svgToWebp.result.download'),
    translate(lang, 'imageTools.svgToWebp.result.downloadAll'),
    translate(lang, 'imageTools.svgToWebp.result.preview'),
    translate(lang, 'imageTools.svgToWebp.status.processing'),
    translate(lang, 'imageTools.svgToWebp.status.noFile'),
    translate(lang, 'imageTools.svgToWebp.status.success'),
    translate(lang, 'imageTools.svgToWebp.status.browserProcessing'),
    translate(lang, 'imageTools.svgToWebp.error.fileType'),
    translate(lang, 'imageTools.svgToWebp.error.fileSize'),
    translate(lang, 'imageTools.svgToWebp.error.conversionFailed'),
    translate(lang, 'imageTools.svgToWebp.result.selectedFiles')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsSvgToWebpMessages = {
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

  return <SvgToWebpClient translations={messages} />
} 
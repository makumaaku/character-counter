import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import SvgToJpgClient from './components/SvgToJpgClient'
import { Language, ImageToolsSvgToJpgMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SvgToJpg({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/svg-to-jpg');
  
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
    translate(lang, 'imageTools.svgToJpg.title'),
    translate(lang, 'imageTools.svgToJpg.description'),
    translate(lang, 'imageTools.svgToJpg.form.upload.label'),
    translate(lang, 'imageTools.svgToJpg.form.upload.button'),
    translate(lang, 'imageTools.svgToJpg.form.upload.dragDrop'),
    translate(lang, 'imageTools.svgToJpg.form.upload.limitText'),
    translate(lang, 'imageTools.svgToJpg.form.convert'),
    translate(lang, 'imageTools.svgToJpg.result.download'),
    translate(lang, 'imageTools.svgToJpg.result.downloadAll'),
    translate(lang, 'imageTools.svgToJpg.result.preview'),
    translate(lang, 'imageTools.svgToJpg.status.processing'),
    translate(lang, 'imageTools.svgToJpg.status.noFile'),
    translate(lang, 'imageTools.svgToJpg.status.success'),
    translate(lang, 'imageTools.svgToJpg.status.browserProcessing'),
    translate(lang, 'imageTools.svgToJpg.error.fileType'),
    translate(lang, 'imageTools.svgToJpg.error.fileSize'),
    translate(lang, 'imageTools.svgToJpg.error.conversionFailed'),
    translate(lang, 'imageTools.svgToJpg.result.selectedFiles')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsSvgToJpgMessages = {
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

  return <SvgToJpgClient translations={messages} />
} 
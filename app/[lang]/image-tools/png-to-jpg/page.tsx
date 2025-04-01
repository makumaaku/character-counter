import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import PngToJpgClient from './components/PngToJpgClient'
import { Language, ImageToolsPngToJpgMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PngToJpg({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/png-to-jpg');
  
  // サーバーコンポーネントで翻訳を並列取得
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
    conversionFailedError
  ] = await Promise.all([
    translate(lang, 'imageTools.pngToJpg.title'),
    translate(lang, 'imageTools.pngToJpg.description'),
    translate(lang, 'imageTools.pngToJpg.form.upload.label'),
    translate(lang, 'imageTools.pngToJpg.form.upload.button'),
    translate(lang, 'imageTools.pngToJpg.form.upload.dragDrop'),
    translate(lang, 'imageTools.pngToJpg.form.upload.limitText'),
    translate(lang, 'imageTools.pngToJpg.form.convert'),
    translate(lang, 'imageTools.pngToJpg.result.download'),
    translate(lang, 'imageTools.pngToJpg.result.downloadAll'),
    translate(lang, 'imageTools.pngToJpg.result.preview'),
    translate(lang, 'imageTools.pngToJpg.status.processing'),
    translate(lang, 'imageTools.pngToJpg.status.noFile'),
    translate(lang, 'imageTools.pngToJpg.status.success'),
    translate(lang, 'imageTools.pngToJpg.status.browserProcessing'),
    translate(lang, 'imageTools.pngToJpg.error.fileType'),
    translate(lang, 'imageTools.pngToJpg.error.fileSize'),
    translate(lang, 'imageTools.pngToJpg.error.conversionFailed')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsPngToJpgMessages = {
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
      preview: previewText
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

  return <PngToJpgClient translations={messages} />
} 
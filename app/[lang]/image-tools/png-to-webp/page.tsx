import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import PngToWebpClient from './components/PngToWebpClient'
import { Language, ImageToolsPngToWebpMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PngToWebp({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/png-to-webp');

  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    convertButton,
    downloadButton,
    downloadAllButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    uploadLimit,
    previewTitle,
    previewFilesSelected,
    resultTitle
  ] = await Promise.all([
    translate(lang, 'imageTools.pngToWebp.title'),
    translate(lang, 'imageTools.pngToWebp.description'),
    translate(lang, 'imageTools.pngToWebp.form.upload.label'),
    translate(lang, 'imageTools.pngToWebp.form.upload.button'),
    translate(lang, 'imageTools.pngToWebp.form.upload.dragDrop'),
    translate(lang, 'imageTools.pngToWebp.form.convert'),
    translate(lang, 'imageTools.pngToWebp.result.download'),
    translate(lang, 'imageTools.pngToWebp.result.downloadAll'),
    translate(lang, 'imageTools.pngToWebp.status.processing'),
    translate(lang, 'imageTools.pngToWebp.status.noFile'),
    translate(lang, 'imageTools.pngToWebp.error.fileType'),
    translate(lang, 'imageTools.pngToWebp.error.fileSize'),
    translate(lang, 'imageTools.pngToWebp.upload.limit'),
    translate(lang, 'imageTools.pngToWebp.preview.title'),
    translate(lang, 'imageTools.pngToWebp.preview.filesSelected'),
    translate(lang, 'imageTools.pngToWebp.result.title')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsPngToWebpMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
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
    preview: {
      title: previewTitle,
      filesSelected: previewFilesSelected
    },
    result: {
      title: resultTitle,
      download: downloadButton,
      downloadAll: downloadAllButton
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

  return <PngToWebpClient translations={messages} />
} 
import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import JpgToPngClient from './components/JpgToPngClient'
import { Language, ImageToolsJpgToPngMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function JpgToPng({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/jpg-to-png')
    
  // サーバーコンポーネントで翻訳を取得
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    convertButton,
    downloadButton,
    convertedResultText,
    downloadAllText,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    uploadLimit,
    previewTitle,
    fileSelectedText,
    filesSelectedText
  ] = await Promise.all([
    translate(lang, 'imageTools.jpgToPng.title'),
    translate(lang, 'imageTools.jpgToPng.description'),
    translate(lang, 'imageTools.jpgToPng.form.upload.label'),
    translate(lang, 'imageTools.jpgToPng.form.upload.button'),
    translate(lang, 'imageTools.jpgToPng.form.upload.dragDrop'),
    translate(lang, 'imageTools.jpgToPng.form.convert'),
    translate(lang, 'imageTools.jpgToPng.result.download'),
    translate(lang, 'imageTools.jpgToPng.result.convertedResult'),
    translate(lang, 'imageTools.jpgToPng.result.downloadAll'),
    translate(lang, 'imageTools.jpgToPng.status.processing'),
    translate(lang, 'imageTools.jpgToPng.status.noFile'),
    translate(lang, 'imageTools.jpgToPng.error.fileType'),
    translate(lang, 'imageTools.jpgToPng.error.fileSize'),
    translate(lang, 'imageTools.jpgToPng.upload.limit'),
    translate(lang, 'imageTools.jpgToPng.preview.title'),
    translate(lang, 'imageTools.jpgToPng.preview.fileSelected'),
    translate(lang, 'imageTools.jpgToPng.preview.filesSelected')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsJpgToPngMessages = {
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
    result: {
      download: downloadButton,
      convertedResult: convertedResultText,
      downloadAll: downloadAllText
    },
    status: {
      processing: processingText,
      noFile: noFileText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError
    },
    preview: {
      title: previewTitle,
      fileSelected: fileSelectedText,
      filesSelected: filesSelectedText
    }
  }

  return <JpgToPngClient translations={messages} />
} 
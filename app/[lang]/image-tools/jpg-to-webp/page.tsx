import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import JpgToWebpClient from './components/JpgToWebpClient'
import { Language, ImageToolsJpgToWebpMessages } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function JpgToWebp({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/jpg-to-webp');
  
  // 翻訳を取得
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
    uploadLimit
  ] = await Promise.all([
    translate(lang, 'imageTools.jpgToWebp.title'),
    translate(lang, 'imageTools.jpgToWebp.description'),
    translate(lang, 'imageTools.jpgToWebp.form.upload.label'),
    translate(lang, 'imageTools.jpgToWebp.form.upload.button'),
    translate(lang, 'imageTools.jpgToWebp.form.upload.dragDrop'),
    translate(lang, 'imageTools.jpgToWebp.form.convert'),
    translate(lang, 'imageTools.jpgToWebp.result.download'),
    translate(lang, 'imageTools.jpgToWebp.result.downloadAll'),
    translate(lang, 'imageTools.jpgToWebp.status.processing'),
    translate(lang, 'imageTools.jpgToWebp.status.noFile'),
    translate(lang, 'imageTools.jpgToWebp.error.fileType'),
    translate(lang, 'imageTools.jpgToWebp.error.fileSize'),
    translate(lang, 'imageTools.jpgToWebp.upload.limit')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsJpgToWebpMessages = {
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
  };

  return <JpgToWebpClient translations={messages} />
} 
import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import HeicToJpgClient from './components/HeicToJpgClient'
import { Language, ImageToolsHeicToJpgMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function HeicToJpg({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/heic-to-jpg');

  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    uploadLimit,
    convertButton,
    downloadButton,
    downloadAllButton,
    previewText,
    filesSelectedText,
    processingText,
    noFileText,
    successText,
    convertingFileText,
    fileTypeError,
    fileSizeError,
    conversionError
  ] = await Promise.all([
    translate(lang, 'imageTools.heicToJpg.title'),
    translate(lang, 'imageTools.heicToJpg.description'),
    translate(lang, 'imageTools.heicToJpg.form.upload.label'),
    translate(lang, 'imageTools.heicToJpg.form.upload.button'),
    translate(lang, 'imageTools.heicToJpg.form.upload.dragDrop'),
    translate(lang, 'imageTools.heicToJpg.upload.limit'),
    translate(lang, 'imageTools.heicToJpg.form.convert'),
    translate(lang, 'imageTools.heicToJpg.result.download'),
    translate(lang, 'imageTools.heicToJpg.result.downloadAll'),
    translate(lang, 'imageTools.heicToJpg.result.preview'),
    translate(lang, 'imageTools.heicToJpg.preview.filesSelected'),
    translate(lang, 'imageTools.heicToJpg.status.processing'),
    translate(lang, 'imageTools.heicToJpg.status.noFile'),
    translate(lang, 'imageTools.heicToJpg.status.success'),
    translate(lang, 'imageTools.heicToJpg.status.convertingFile'),
    translate(lang, 'imageTools.heicToJpg.error.fileType'),
    translate(lang, 'imageTools.heicToJpg.error.fileSize'),
    translate(lang, 'imageTools.heicToJpg.error.conversion')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsHeicToJpgMessages = {
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
      downloadAll: downloadAllButton,
      preview: previewText
    },
    preview: {
      filesSelected: filesSelectedText
    },
    status: {
      processing: processingText,
      noFile: noFileText,
      success: successText,
      convertingFile: convertingFileText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError,
      conversion: conversionError
    }
  };

  return <HeicToJpgClient messages={messages} />
} 
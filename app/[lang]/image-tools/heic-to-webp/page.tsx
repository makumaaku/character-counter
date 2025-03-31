import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import HeicToWebpClient from './components/HeicToWebpClient'
import { Language, ImageToolsHeicToWebpMessages } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function HeicToWebp({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/heic-to-webp');

  // サーバーコンポーネントで翻訳を取得
  const [
    title,
    description,
    // upload section
    uploadTitle,
    uploadDragndrop,
    uploadButton,
    uploadLimit,
    // form section
    formUploadLabel,
    formUploadButton,
    formUploadDragDrop,
    formConvert,
    // convert section
    convertButton,
    convertProcessing,
    convertDownload,
    convertDownloadAll,
    convertConverted,
    // preview section
    previewTitle,
    previewNofiles,
    // result section
    resultDownload,
    resultDownloadAll,
    // status section
    statusProcessing,
    statusNoFile,
    statusSuccess,
    statusConvertingFile,
    // error section
    errorInvalidFormat,
    errorTooLarge,
    errorNoFiles,
    errorFailed
  ] = await Promise.all([
    translate(lang, 'imageTools.heicToWebp.title'),
    translate(lang, 'imageTools.heicToWebp.description'),
    // upload section
    translate(lang, 'imageTools.heicToWebp.upload.title'),
    translate(lang, 'imageTools.heicToWebp.upload.dragndrop'),
    translate(lang, 'imageTools.heicToWebp.upload.button'),
    translate(lang, 'imageTools.heicToWebp.upload.limit'),
    // form section
    translate(lang, 'imageTools.heicToWebp.form.upload.label'),
    translate(lang, 'imageTools.heicToWebp.form.upload.button'),
    translate(lang, 'imageTools.heicToWebp.form.upload.dragDrop'),
    translate(lang, 'imageTools.heicToWebp.form.convert'),
    // convert section
    translate(lang, 'imageTools.heicToWebp.convert.button'),
    translate(lang, 'imageTools.heicToWebp.convert.processing'),
    translate(lang, 'imageTools.heicToWebp.convert.download'),
    translate(lang, 'imageTools.heicToWebp.convert.downloadAll'),
    translate(lang, 'imageTools.heicToWebp.convert.converted'),
    // preview section
    translate(lang, 'imageTools.heicToWebp.preview.title'),
    translate(lang, 'imageTools.heicToWebp.preview.nofiles'),
    // result section
    translate(lang, 'imageTools.heicToWebp.result.download'),
    translate(lang, 'imageTools.heicToWebp.result.downloadAll'),
    // status section
    translate(lang, 'imageTools.heicToWebp.status.processing'),
    translate(lang, 'imageTools.heicToWebp.status.noFile'),
    translate(lang, 'imageTools.heicToWebp.status.success'),
    translate(lang, 'imageTools.heicToWebp.status.convertingFile'),
    // error section
    translate(lang, 'imageTools.heicToWebp.error.invalidFormat'),
    translate(lang, 'imageTools.heicToWebp.error.tooLarge'),
    translate(lang, 'imageTools.heicToWebp.error.noFiles'),
    translate(lang, 'imageTools.heicToWebp.error.failed')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsHeicToWebpMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    upload: {
      title: uploadTitle,
      dragndrop: uploadDragndrop,
      button: uploadButton,
      limit: uploadLimit
    },
    form: {
      upload: {
        label: formUploadLabel,
        button: formUploadButton,
        dragDrop: formUploadDragDrop
      },
      convert: formConvert
    },
    convert: {
      button: convertButton,
      processing: convertProcessing,
      download: convertDownload,
      downloadAll: convertDownloadAll,
      converted: convertConverted
    },
    preview: {
      title: previewTitle,
      nofiles: previewNofiles
    },
    result: {
      download: resultDownload,
      downloadAll: resultDownloadAll
    },
    status: {
      processing: statusProcessing,
      noFile: statusNoFile,
      success: statusSuccess,
      convertingFile: statusConvertingFile
    },
    error: {
      invalidFormat: errorInvalidFormat,
      tooLarge: errorTooLarge,
      noFiles: errorNoFiles,
      failed: errorFailed
    }
  }

  // クライアントコンポーネントの props の型に合わせる
  const clientTranslations = {
    title: messages.title,
    description: messages.description,
    upload: {
      limit: messages.upload.limit
    },
    form: {
      upload: {
        label: messages.form.upload.label,
        button: messages.form.upload.button,
        dragDrop: messages.form.upload.dragDrop
      },
      convert: messages.form.convert
    },
    result: {
      download: messages.result.download,
      downloadAll: messages.result.downloadAll
    },
    status: {
      processing: messages.status.processing,
      noFile: messages.status.noFile,
      success: messages.status.success,
      convertingFile: messages.status.convertingFile
    },
    error: {
      fileType: messages.error.invalidFormat,
      fileSize: messages.error.tooLarge,
      conversion: messages.error.failed
    }
  }

  return <HeicToWebpClient translations={clientTranslations} />
} 
import { translate } from '@/lib/i18n/server'
import JpgToWebpClient from './components/JpgToWebpClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function JpgToWebp({ params }: Props) {
  const { lang } = await params

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
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'jpgToWebp.title'),
    translate(lang, 'jpgToWebp.description'),
    translate(lang, 'jpgToWebp.form.upload.label'),
    translate(lang, 'jpgToWebp.form.upload.button'),
    translate(lang, 'jpgToWebp.form.upload.dragDrop'),
    translate(lang, 'jpgToWebp.form.convert'),
    translate(lang, 'jpgToWebp.result.download'),
    translate(lang, 'jpgToWebp.result.downloadAll'),
    translate(lang, 'jpgToWebp.status.processing'),
    translate(lang, 'jpgToWebp.status.noFile'),
    translate(lang, 'jpgToWebp.error.fileType'),
    translate(lang, 'jpgToWebp.error.fileSize')
  ])

  // 最大ファイルサイズのメッセージ
  // 翻訳キーがない場合はデフォルト値を使用する
  const uploadLimit = translate(lang, 'jpgToWebp.upload.limit') === 'jpgToWebp.upload.limit'
    ? 'Maximum file size: 10MB per file'
    : translate(lang, 'jpgToWebp.upload.limit');

  const translations = {
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
  }

  return <JpgToWebpClient translations={translations} />
} 
import { translate } from '@/lib/i18n/server'
import PngToWebpClient from './components/PngToWebpClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PngToWebp({ params }: Props) {
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
    translate(lang, 'pngToWebp.title'),
    translate(lang, 'pngToWebp.description'),
    translate(lang, 'pngToWebp.form.upload.label'),
    translate(lang, 'pngToWebp.form.upload.button'),
    translate(lang, 'pngToWebp.form.upload.dragDrop'),
    translate(lang, 'pngToWebp.form.convert'),
    translate(lang, 'pngToWebp.result.download'),
    translate(lang, 'pngToWebp.result.downloadAll'),
    translate(lang, 'pngToWebp.status.processing'),
    translate(lang, 'pngToWebp.status.noFile'),
    translate(lang, 'pngToWebp.error.fileType'),
    translate(lang, 'pngToWebp.error.fileSize')
  ])

  // 最大ファイルサイズのメッセージ
  // 翻訳キーがない場合はデフォルト値を使用する
  const uploadLimit = translate(lang, 'pngToWebp.upload.limit') === 'pngToWebp.upload.limit'
    ? 'Maximum file size: 10MB per file'
    : translate(lang, 'pngToWebp.upload.limit');

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

  return <PngToWebpClient translations={translations} />
} 
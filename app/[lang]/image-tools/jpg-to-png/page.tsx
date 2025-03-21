import { translate } from '@/lib/i18n/server'
import JpgToPngClient from './components/JpgToPngClient'

type Props = {
  params: Promise<{ lang: string }>
}


export default async function JpgToPng({ params }: Props) {
  const { lang } = await params

  // Get translations
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'jpgToPng.title'),
    translate(lang, 'jpgToPng.description'),
    translate(lang, 'jpgToPng.form.upload.label'),
    translate(lang, 'jpgToPng.form.upload.button'),
    translate(lang, 'jpgToPng.form.upload.dragDrop'),
    translate(lang, 'jpgToPng.form.convert'),
    translate(lang, 'jpgToPng.result.download'),
    translate(lang, 'jpgToPng.status.processing'),
    translate(lang, 'jpgToPng.status.noFile'),
    translate(lang, 'jpgToPng.error.fileType'),
    translate(lang, 'jpgToPng.error.fileSize')
  ])

  // 最大ファイルサイズのメッセージ
  // 翻訳キーがない場合はデフォルト値を使用する
  const uploadLimit = translate(lang, 'jpgToPng.upload.limit') === 'jpgToPng.upload.limit'
    ? 'Maximum file size: 10MB per file'
    : translate(lang, 'jpgToPng.upload.limit');

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
      download: downloadButton
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

  return <JpgToPngClient translations={translations} />
} 
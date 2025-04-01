import { translate, getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import HeicToPdfClient from './components/HeicToPdfClient'
import { Language, PdfToolsHeicToPdfMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function HeicToPdf({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/heic-to-pdf');
  
  // サーバーコンポーネントで翻訳を並列取得
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
    fileSizeError,
    conversionError,
    successMessage
  ] = await Promise.all([
    translate(lang, 'pdfTools.heicToPdf.title'),
    translate(lang, 'pdfTools.heicToPdf.description'),
    translate(lang, 'pdfTools.heicToPdf.form.upload.label'),
    translate(lang, 'pdfTools.heicToPdf.form.upload.button'),
    translate(lang, 'pdfTools.heicToPdf.form.upload.dragDrop'),
    translate(lang, 'pdfTools.heicToPdf.form.convert'),
    translate(lang, 'pdfTools.heicToPdf.result.download'),
    translate(lang, 'pdfTools.heicToPdf.status.processing'),
    translate(lang, 'pdfTools.heicToPdf.status.noFile'),
    translate(lang, 'pdfTools.heicToPdf.error.fileType'),
    translate(lang, 'pdfTools.heicToPdf.error.fileSize'),
    translate(lang, 'pdfTools.heicToPdf.error.conversion'),
    translate(lang, 'pdfTools.heicToPdf.success.message')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsHeicToPdfMessages = {
    meta: {
      title: '', // layout.tsxで使用しているため、ここでは空文字を設定
      description: '',
      keywords: ''
    },
    title,
    description,
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
      fileSize: fileSizeError,
      conversion: conversionError
    },
    success: {
      message: successMessage
    }
  };

  return <HeicToPdfClient messages={messages} />
} 
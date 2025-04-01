import { translate } from '@/lib/i18n/server'
import PdfToJpgClient from './components/PdfToJpgClient'
import { getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import { Language, PdfToolsPdfToJpgMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PdfToJpg({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/pdf-to-jpg');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    metaTitle,
    metaDescription,
    metaKeywords,
    uploadLabel,
    uploadButton,
    dragDropText,
    qualityLabel,
    qualityLow,
    qualityMedium,
    qualityHigh,
    convertButton,
    downloadAllButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'pdfTools.pdfToJpg.title'),
    translate(lang, 'pdfTools.pdfToJpg.description'),
    translate(lang, 'pdfTools.pdfToJpg.meta.title'),
    translate(lang, 'pdfTools.pdfToJpg.meta.description'),
    translate(lang, 'pdfTools.pdfToJpg.meta.keywords'),
    translate(lang, 'pdfTools.pdfToJpg.form.upload.label'),
    translate(lang, 'pdfTools.pdfToJpg.form.upload.button'),
    translate(lang, 'pdfTools.pdfToJpg.form.upload.dragDrop'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.label'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.low'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.medium'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.high'),
    translate(lang, 'pdfTools.pdfToJpg.form.convert'),
    translate(lang, 'pdfTools.pdfToJpg.result.downloadAll'),
    translate(lang, 'pdfTools.pdfToJpg.result.download'),
    translate(lang, 'pdfTools.pdfToJpg.status.processing'),
    translate(lang, 'pdfTools.pdfToJpg.status.noFile'),
    translate(lang, 'pdfTools.pdfToJpg.error.fileType'),
    translate(lang, 'pdfTools.pdfToJpg.error.fileSize')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsPdfToJpgMessages = {
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords
    },
    title,
    description,
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText
      },
      quality: {
        label: qualityLabel,
        low: qualityLow,
        medium: qualityMedium,
        high: qualityHigh
      },
      convert: convertButton
    },
    result: {
      downloadAll: downloadAllButton,
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
  };

  return <PdfToJpgClient messages={messages} />
} 
import { translate, getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import PdfToPngClient from './components/PdfToPngClient'
import { Language, PdfToolsPdfToPngMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PdfToPng({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/pdf-to-png');
  
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
    translate(lang, 'pdfTools.pdfToPng.title'),
    translate(lang, 'pdfTools.pdfToPng.description'),
    translate(lang, 'pdfTools.pdfToPng.meta.title'),
    translate(lang, 'pdfTools.pdfToPng.meta.description'),
    translate(lang, 'pdfTools.pdfToPng.meta.keywords'),
    translate(lang, 'pdfTools.pdfToPng.form.upload.label'),
    translate(lang, 'pdfTools.pdfToPng.form.upload.button'),
    translate(lang, 'pdfTools.pdfToPng.form.upload.dragDrop'),
    translate(lang, 'pdfTools.pdfToPng.form.quality.label'),
    translate(lang, 'pdfTools.pdfToPng.form.quality.low'),
    translate(lang, 'pdfTools.pdfToPng.form.quality.medium'),
    translate(lang, 'pdfTools.pdfToPng.form.quality.high'),
    translate(lang, 'pdfTools.pdfToPng.form.convert'),
    translate(lang, 'pdfTools.pdfToPng.result.downloadAll'),
    translate(lang, 'pdfTools.pdfToPng.result.download'),
    translate(lang, 'pdfTools.pdfToPng.status.processing'),
    translate(lang, 'pdfTools.pdfToPng.status.noFile'),
    translate(lang, 'pdfTools.pdfToPng.error.fileType'),
    translate(lang, 'pdfTools.pdfToPng.error.fileSize')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsPdfToPngMessages = {
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

  return <PdfToPngClient messages={messages} />
} 
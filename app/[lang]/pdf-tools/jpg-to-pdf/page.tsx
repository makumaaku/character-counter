import { translate, getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import JpgToPdfClient from './components/JpgToPdfClient'
import { Language, PdfToolsJpgToPdfMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function JpgToPdf({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/jpg-to-pdf');
  
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
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    previewTitle,
    imageSelectedText,
    imagesSelectedText
  ] = await Promise.all([
    translate(lang, 'pdfTools.jpgToPdf.title'),
    translate(lang, 'pdfTools.jpgToPdf.description'),
    translate(lang, 'pdfTools.jpgToPdf.meta.title'),
    translate(lang, 'pdfTools.jpgToPdf.meta.description'),
    translate(lang, 'pdfTools.jpgToPdf.meta.keywords'),
    translate(lang, 'pdfTools.jpgToPdf.form.upload.label'),
    translate(lang, 'pdfTools.jpgToPdf.form.upload.button'),
    translate(lang, 'pdfTools.jpgToPdf.form.upload.dragDrop'),
    translate(lang, 'pdfTools.jpgToPdf.form.quality.label'),
    translate(lang, 'pdfTools.jpgToPdf.form.quality.low'),
    translate(lang, 'pdfTools.jpgToPdf.form.quality.medium'),
    translate(lang, 'pdfTools.jpgToPdf.form.quality.high'),
    translate(lang, 'pdfTools.jpgToPdf.form.convert'),
    translate(lang, 'pdfTools.jpgToPdf.result.download'),
    translate(lang, 'pdfTools.jpgToPdf.status.processing'),
    translate(lang, 'pdfTools.jpgToPdf.status.noFile'),
    translate(lang, 'pdfTools.jpgToPdf.error.fileType'),
    translate(lang, 'pdfTools.jpgToPdf.error.fileSize'),
    translate(lang, 'pdfTools.jpgToPdf.preview.title'),
    translate(lang, 'pdfTools.jpgToPdf.preview.imageSelected'),
    translate(lang, 'pdfTools.jpgToPdf.preview.imagesSelected')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsJpgToPdfMessages = {
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
      download: downloadButton
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
      imageSelected: imageSelectedText,
      imagesSelected: imagesSelectedText
    }
  };

  return <JpgToPdfClient messages={messages} />
} 
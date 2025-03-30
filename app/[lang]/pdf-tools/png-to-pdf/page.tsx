import { translate, getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import PngToPdfClient from './components/PngToPdfClient'
import { Language, PdfToolsPngToPdfMessages } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function PngToPdf({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/png-to-pdf');
  
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
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError
  ] = await Promise.all([
    translate(lang, 'pdfTools.pngToPdf.title'),
    translate(lang, 'pdfTools.pngToPdf.description'),
    translate(lang, 'pdfTools.pngToPdf.meta.title'),
    translate(lang, 'pdfTools.pngToPdf.meta.description'),
    translate(lang, 'pdfTools.pngToPdf.meta.keywords'),
    translate(lang, 'pdfTools.pngToPdf.form.upload.label'),
    translate(lang, 'pdfTools.pngToPdf.form.upload.button'),
    translate(lang, 'pdfTools.pngToPdf.form.upload.dragDrop'),
    translate(lang, 'pdfTools.pngToPdf.form.convert'),
    translate(lang, 'pdfTools.pngToPdf.result.download'),
    translate(lang, 'pdfTools.pngToPdf.status.processing'),
    translate(lang, 'pdfTools.pngToPdf.status.noFile'),
    translate(lang, 'pdfTools.pngToPdf.error.fileType'),
    translate(lang, 'pdfTools.pngToPdf.error.fileSize')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsPngToPdfMessages = {
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
  };

  return <PngToPdfClient messages={messages} />
} 
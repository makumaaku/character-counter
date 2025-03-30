import { translate } from '@/lib/i18n/server'
import SvgToPdfClient from './components/SvgToPdfClient'
import { getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import { Language, PdfToolsSvgToPdfMessages } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function SvgToPdf({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/svg-to-pdf');
  
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
    translate(lang, 'pdfTools.svgToPdf.title'),
    translate(lang, 'pdfTools.svgToPdf.description'),
    translate(lang, 'pdfTools.svgToPdf.meta.title'),
    translate(lang, 'pdfTools.svgToPdf.meta.description'),
    translate(lang, 'pdfTools.svgToPdf.meta.keywords'),
    translate(lang, 'pdfTools.svgToPdf.form.upload.label'),
    translate(lang, 'pdfTools.svgToPdf.form.upload.button'),
    translate(lang, 'pdfTools.svgToPdf.form.upload.dragDrop'),
    translate(lang, 'pdfTools.svgToPdf.form.convert'),
    translate(lang, 'pdfTools.svgToPdf.result.download'),
    translate(lang, 'pdfTools.svgToPdf.status.processing'),
    translate(lang, 'pdfTools.svgToPdf.status.noFile'),
    translate(lang, 'pdfTools.svgToPdf.error.fileType'),
    translate(lang, 'pdfTools.svgToPdf.error.fileSize')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsSvgToPdfMessages = {
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

  return <SvgToPdfClient messages={messages} />
} 
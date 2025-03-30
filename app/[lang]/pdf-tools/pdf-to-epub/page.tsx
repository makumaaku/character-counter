import { translate, getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import PdfToEpubClient from './components/PdfToEpubClient'
import { Language, PdfToolsPdfToEpubMessages } from '@/lib/i18n/types'

type Props = {
  params: { lang: string }
}

export default async function PdfToEpub({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/pdf-to-epub');
  
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
    draggingText,
    instructionText,
    maxSizeText,
    convertButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    loadingText
  ] = await Promise.all([
    translate(lang, 'pdfTools.pdfToEpub.title'),
    translate(lang, 'pdfTools.pdfToEpub.description'),
    translate(lang, 'pdfTools.pdfToEpub.meta.title'),
    translate(lang, 'pdfTools.pdfToEpub.meta.description'),
    translate(lang, 'pdfTools.pdfToEpub.meta.keywords'),
    translate(lang, 'pdfTools.pdfToEpub.form.upload.label'),
    translate(lang, 'pdfTools.pdfToEpub.form.upload.button'),
    translate(lang, 'pdfTools.pdfToEpub.form.upload.dragDrop'),
    translate(lang, 'pdfTools.pdfToEpub.form.upload.dragging'),
    translate(lang, 'pdfTools.pdfToEpub.form.upload.instruction'),
    translate(lang, 'pdfTools.pdfToEpub.form.upload.maxSize'),
    translate(lang, 'pdfTools.pdfToEpub.form.convert'),
    translate(lang, 'pdfTools.pdfToEpub.result.download'),
    translate(lang, 'pdfTools.pdfToEpub.status.processing'),
    translate(lang, 'pdfTools.pdfToEpub.status.noFile'),
    translate(lang, 'pdfTools.pdfToEpub.error.fileType'),
    translate(lang, 'pdfTools.pdfToEpub.error.fileSize'),
    translate(lang, 'pdfTools.pdfToEpub.status.loading')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsPdfToEpubMessages = {
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
        dragDrop: dragDropText,
        dragging: draggingText,
        instruction: instructionText,
        maxSize: maxSizeText
      },
      convert: convertButton
    },
    result: {
      download: downloadButton
    },
    status: {
      processing: processingText,
      noFile: noFileText,
      loading: loadingText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError
    }
  };

  return <PdfToEpubClient messages={messages} />
} 
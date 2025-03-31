// import { translate } from '@/lib/i18n/server'
// import PdfToWordClient from './components/PdfToWordClient'
// import { getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
// import { Language, PdfToolsPdfToWordMessages } from '@/lib/i18n/types'

// type Props = {
//   params: { lang: string }
// }

// export default async function PdfToWord({ params }: Props) {
//   const lang = await getLanguageFromParams(params);
  
//   // 翻訳をロード
//   await loadToolMessages(lang as Language, 'pdf-tools/pdf-to-word');
  
//   // サーバーコンポーネントで翻訳を並列取得
//   const [
//     title,
//     description,
//     metaTitle,
//     metaDescription,
//     metaKeywords,
//     uploadLabel,
//     uploadButton,
//     dragDropText,
//     draggingText,
//     instructionText,
//     maxSizeText,
//     formatLabel,
//     formatDocx,
//     formatDoc,
//     convertButton,
//     downloadButton,
//     processingText,
//     noFileText,
//     fileTypeError,
//     fileSizeError,
//     loadingText
//   ] = await Promise.all([
//     translate(lang, 'pdfTools.pdfToWord.title'),
//     translate(lang, 'pdfTools.pdfToWord.description'),
//     translate(lang, 'pdfTools.pdfToWord.meta.title'),
//     translate(lang, 'pdfTools.pdfToWord.meta.description'),
//     translate(lang, 'pdfTools.pdfToWord.meta.keywords'),
//     translate(lang, 'pdfTools.pdfToWord.form.upload.label'),
//     translate(lang, 'pdfTools.pdfToWord.form.upload.button'),
//     translate(lang, 'pdfTools.pdfToWord.form.upload.dragDrop'),
//     translate(lang, 'pdfTools.pdfToWord.form.upload.dragging'),
//     translate(lang, 'pdfTools.pdfToWord.form.upload.instruction'),
//     translate(lang, 'pdfTools.pdfToWord.form.upload.maxSize'),
//     translate(lang, 'pdfTools.pdfToWord.form.format.label'),
//     translate(lang, 'pdfTools.pdfToWord.form.format.docx'),
//     translate(lang, 'pdfTools.pdfToWord.form.format.doc'),
//     translate(lang, 'pdfTools.pdfToWord.form.convert'),
//     translate(lang, 'pdfTools.pdfToWord.result.download'),
//     translate(lang, 'pdfTools.pdfToWord.status.processing'),
//     translate(lang, 'pdfTools.pdfToWord.status.noFile'),
//     translate(lang, 'pdfTools.pdfToWord.error.fileType'),
//     translate(lang, 'pdfTools.pdfToWord.error.fileSize'),
//     translate(lang, 'pdfTools.pdfToWord.loading')
//   ]);

//   // クライアントコンポーネントに渡す翻訳オブジェクトを作成
//   const messages: PdfToolsPdfToWordMessages = {
//     meta: {
//       title: metaTitle,
//       description: metaDescription,
//       keywords: metaKeywords
//     },
//     title,
//     description,
//     form: {
//       upload: {
//         label: uploadLabel,
//         button: uploadButton,
//         dragDrop: dragDropText,
//         dragging: draggingText,
//         instruction: instructionText,
//         maxSize: maxSizeText
//       },
//       format: {
//         label: formatLabel,
//         docx: formatDocx,
//         doc: formatDoc
//       },
//       convert: convertButton
//     },
//     result: {
//       download: downloadButton
//     },
//     status: {
//       processing: processingText,
//       noFile: noFileText
//     },
//     error: {
//       fileType: fileTypeError,
//       fileSize: fileSizeError
//     },
//     loading: loadingText
//   };

//   return <PdfToWordClient translations={messages} />
// } 
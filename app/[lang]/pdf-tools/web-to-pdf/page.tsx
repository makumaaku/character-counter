// import { translate } from '@/lib/i18n/server'
// import WebToPdfClient from './components/WebToPdfClient'
// import { getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
// import { Language, PdfToolsWebToPdfMessages } from '@/lib/i18n/types'

// type Props = {
//   params: { lang: string }
// }

// export default async function WebToPdf({ params }: Props) {
//   const lang = await getLanguageFromParams(params);
  
//   // 翻訳をロード
//   await loadToolMessages(lang as Language, 'pdf-tools/web-to-pdf');
  
//   // サーバーコンポーネントで翻訳を並列取得
//   const [
//     title,
//     description,
//     urlLabel,
//     urlPlaceholder,
//     convertButton,
//     downloadButton,
//     previewButton,
//     processingText,
//     noUrlText,
//     successText,
//     invalidUrlError,
//     conversionFailedError,
//     networkError,
//     timeoutError,
//     loadingText,
//     previewLoadingText,
//     previewErrorText,
//     previewPageOfText
//   ] = await Promise.all([
//     translate(lang, 'pdfTools.webToPdf.title'),
//     translate(lang, 'pdfTools.webToPdf.description'),
//     translate(lang, 'pdfTools.webToPdf.form.url.label'),
//     translate(lang, 'pdfTools.webToPdf.form.url.placeholder'),
//     translate(lang, 'pdfTools.webToPdf.form.url.button'),
//     translate(lang, 'pdfTools.webToPdf.result.download'),
//     translate(lang, 'pdfTools.webToPdf.result.preview'),
//     translate(lang, 'pdfTools.webToPdf.status.processing'),
//     translate(lang, 'pdfTools.webToPdf.status.noUrl'),
//     translate(lang, 'pdfTools.webToPdf.status.success'),
//     translate(lang, 'pdfTools.webToPdf.error.invalidUrl'),
//     translate(lang, 'pdfTools.webToPdf.error.conversionFailed'),
//     translate(lang, 'pdfTools.webToPdf.error.networkError'),
//     translate(lang, 'pdfTools.webToPdf.error.timeout'),
//     translate(lang, 'pdfTools.webToPdf.loading'),
//     translate(lang, 'pdfTools.webToPdf.preview.loading'),
//     translate(lang, 'pdfTools.webToPdf.preview.error'),
//     translate(lang, 'pdfTools.webToPdf.preview.pageOf')
//   ])

//   // クライアントコンポーネントに渡す翻訳オブジェクトを作成
//   const messages: PdfToolsWebToPdfMessages = {
//     meta: {
//       title: title,
//       description: description,
//       keywords: ''
//     },
//     title,
//     description,
//     form: {
//       url: {
//         label: urlLabel,
//         placeholder: urlPlaceholder,
//         button: convertButton
//       },
//     },
//     result: {
//       download: downloadButton,
//       preview: previewButton
//     },
//     status: {
//       processing: processingText,
//       noUrl: noUrlText,
//       success: successText
//     },
//     error: {
//       invalidUrl: invalidUrlError,
//       conversionFailed: conversionFailedError,
//       networkError: networkError,
//       timeout: timeoutError
//     },
//     loading: loadingText,
//     preview: {
//       loading: previewLoadingText,
//       error: previewErrorText,
//       pageOf: previewPageOfText
//     }
//   }

//   return <WebToPdfClient messages={messages} lang={lang} />
// } 
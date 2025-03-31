// import { translate, loadToolMessages, getLanguageFromParams } from '@/lib/i18n/server';
// import { SITE_CONFIG } from '@/constants/constants';
// import { getCommonMetadata } from '@/lib/metadata';
// import { Metadata } from 'next';
// import Script from 'next/script';
// import { Language } from '@/lib/i18n/types';

// type Props = {
//   children: React.ReactNode;
//   params: { lang: string };
// }

// export async function generateMetadata(
//   { params }: Props
// ): Promise<Metadata> {
//   const lang = await getLanguageFromParams(params);
  
//   // PDF to Word 用の翻訳をロード
//   await loadToolMessages(lang as Language, 'pdf-tools');
//   await loadToolMessages(lang as Language, 'pdf-tools/pdf-to-word');
  
//   // 翻訳を並列で取得
//   const [
//     title,
//     description,
//     keywords
//   ] = await Promise.all([
//     translate(lang, 'pdfTools.pdfToWord.meta.title'),
//     translate(lang, 'pdfTools.pdfToWord.meta.description'),
//     translate(lang, 'pdfTools.pdfToWord.meta.keywords')
//   ]);
  
//   // 共通のメタデータ情報を設定
//   const commonMeta = {
//     siteName: SITE_CONFIG.siteName,
//     publisher: SITE_CONFIG.publisher,
//     logoAlt: SITE_CONFIG.logoAlt,
//   };

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "WebApplication",
//     "name": title,
//     "description": description,
//     "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-word`,
//     "publisher": {
//       "@type": "Organization",
//       "name": commonMeta.siteName,
//       "logo": {
//         "@type": "ImageObject",
//         "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
//         "width": SITE_CONFIG.logo.width,
//         "height": SITE_CONFIG.logo.height
//       }
//     },
//     "applicationCategory": "UtilityApplication",
//     "operatingSystem": "Any",
//     "offers": {
//       "@type": "Offer",
//       "price": "0",
//       "priceCurrency": "USD"
//     },
//     "featureList": [
//       "Convert PDF to Word",
//       "Choose output format (DOCX/DOC)",
//       "Browser-based conversion",
//       "Privacy-focused - no server uploads",
//       "Free to use",
//       "No registration required"
//     ],
//     "isAccessibleForFree": true,
//     "browserRequirements": "Requires a modern web browser with JavaScript enabled"
//   };

//   // 共通のメタデータを取得
//   const metadata = await getCommonMetadata(
//     lang,
//     commonMeta,
//     {
//       title,
//       description,
//       keywords,
//       url: `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-word`,
//     }
//   );

//   return {
//     ...metadata,
//     other: {
//       'application/ld+json': JSON.stringify(jsonLd)
//     }
//   };
// }

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <Script 
//         src="/pdfjs/pdf.mjs"
//         strategy="beforeInteractive"
//         id="pdf-lib"
//       />
//       <Script 
//         src="/pdfjs/pdf.worker.mjs"
//         strategy="beforeInteractive"
//         id="pdf-worker"
//       />
//       <Script 
//         src="/docx/docx.js"
//         strategy="afterInteractive"
//         id="docx-lib"
//       />
//       <Script 
//         src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"
//         strategy="afterInteractive"
//         id="jszip-lib"
//       />
//       {children}
//     </>
//   );
// } 
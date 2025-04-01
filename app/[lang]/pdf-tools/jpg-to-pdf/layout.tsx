import { translate, loadToolMessages, getLanguageFromParams } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Script from 'next/script';
import { Language } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // JPG to PDF 用の翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/jpg-to-pdf');
  
  // 翻訳を並列で取得
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'pdfTools.jpgToPdf.meta.title'),
    translate(lang, 'pdfTools.jpgToPdf.meta.description'),
    translate(lang, 'pdfTools.jpgToPdf.meta.keywords')
  ]);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/jpg-to-pdf`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert JPG to PDF",
      "Adjust PDF quality",
      "Browser-based conversion",
      "Privacy-focused - no server uploads",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled"
  };

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/jpg-to-pdf`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script 
        src="/pdf-lib/pdf-lib.min.js"
        strategy="afterInteractive"
        id="pdf-lib"
      />
      {children}
    </>
  );
} 
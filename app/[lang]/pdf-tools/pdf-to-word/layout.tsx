import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Script from 'next/script';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('pdfToWord.meta.title'),
    "description": t('pdfToWord.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-word`,
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
      "Convert PDF to Word",
      "Choose output format (DOCX/DOC)",
      "Browser-based conversion",
      "Privacy-focused - no server uploads",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled"
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('pdfToWord.meta.title'),
      description: t('pdfToWord.meta.description'),
      keywords: t('pdfToWord.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-word`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Script 
        src="/pdfjs/pdf.mjs"
        strategy="beforeInteractive"
        id="pdf-lib"
      />
      <Script 
        src="/pdfjs/pdf.worker.mjs"
        strategy="beforeInteractive"
        id="pdf-worker"
      />
      <Script 
        src="/docx/docx.js"
        strategy="afterInteractive"
        id="docx-lib"
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"
        strategy="afterInteractive"
        id="jszip-lib"
      />
      {children}
    </>
  );
} 
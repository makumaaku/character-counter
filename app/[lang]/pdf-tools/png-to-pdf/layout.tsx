import { translate } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  // Common metadata settings
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  // Page-specific JSON-LD definition
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('pngToPdf.meta.title'),
    "description": t('pngToPdf.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/png-to-pdf`,
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
      "Convert PNG to PDF",
      "Combine multiple PNG images",
      "Adjustable PDF quality",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled"
  };

  // Get common metadata
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('pngToPdf.meta.title'),
      description: t('pngToPdf.meta.description'),
      keywords: t('pngToPdf.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/png-to-pdf`,
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
  return children;
} 
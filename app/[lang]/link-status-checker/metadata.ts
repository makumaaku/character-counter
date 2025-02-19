import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: string }>
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
    "name": t('linkStatusChecker.meta.title'),
    "description": t('linkStatusChecker.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/link-status-checker`,
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
      "Link status checking",
      "Bulk URL validation",
      "HTTP status code detection",
      "Real-time checking",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled"
  };

  const metadata =  getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('linkStatusChecker.meta.title'),
      description: t('linkStatusChecker.meta.description'),
      keywords: t('linkStatusChecker.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/link-status-checker`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
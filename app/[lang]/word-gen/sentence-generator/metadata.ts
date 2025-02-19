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
    "name": t('sentenceGenerator.meta.title'),
    "description": t('sentenceGenerator.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/sentence-generator`,
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
    "applicationCategory": "CreativeApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Random sentence generation",
      "Grammar-based generation",
      "Multiple sentence patterns",
      "Customizable sentence length",
      "Multiple language support",
      "Real-time generation",
      "Writing practice support",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": [
      "sentence generator",
      "random sentence",
      "writing tool",
      "language practice",
      "creative writing"
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('sentenceGenerator.meta.title'),
      description: t('sentenceGenerator.meta.description'),
      keywords: t('sentenceGenerator.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/sentence-generator`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
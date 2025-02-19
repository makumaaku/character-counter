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
    "name": t('wordGenerator.meta.title'),
    "description": t('wordGenerator.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-generator`,
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
      "Random word generation",
      "Custom word patterns",
      "Multiple languages support",
      "Word length control",
      "Part of speech selection",
      "Real-time generation",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": [
      "word generator",
      "random word",
      "word creation",
      "vocabulary tool",
      "creative writing"
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('wordGenerator.meta.title'),
      description: t('wordGenerator.meta.description'),
      keywords: t('wordGenerator.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-generator`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
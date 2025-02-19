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
    "name": t('passwordGenerator.meta.title'),
    "description": t('passwordGenerator.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`,
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
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Secure password generation",
      "Customizable password length",
      "Special characters support",
      "Numbers and symbols inclusion",
      "Password strength indicator",
      "Client-side generation only",
      "No password storage",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": [
      "password generator",
      "secure password",
      "random password",
      "strong password",
      "password security"
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('passwordGenerator.meta.title'),
      description: t('passwordGenerator.meta.description'),
      keywords: t('passwordGenerator.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
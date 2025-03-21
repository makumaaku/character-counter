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
  const commonT = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: commonT('common.meta.siteName'),
    publisher: commonT('common.meta.publisher'),
    logoAlt: commonT('common.meta.logoAlt'),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('seoCannibalizationChecker.meta.title'),
    "description": t('seoCannibalizationChecker.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-cannibalization-checker`,
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
      "Keyword cannibalization detection",
      "SEO analysis",
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
      title: t('seoCannibalizationChecker.meta.title'),
      description: t('seoCannibalizationChecker.meta.description'),
      keywords: t('seoCannibalizationChecker.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-cannibalization-checker`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children }: Props) {
  return <>{children}</>;
} 
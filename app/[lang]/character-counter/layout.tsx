import CharacterCounterLayout from './components/CharacterCounterLayout'

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
    "name": t('characterCounter.meta.title'),
    "description": t('characterCounter.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter`,
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
      "Character counting",
      "Word counting",
      "Line counting",
      "Real-time counting",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('characterCounter.meta.title'),
      description: t('characterCounter.meta.description'),
      keywords: t('characterCounter.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CharacterCounterLayout>
      {children}
    </CharacterCounterLayout>
  )
} 
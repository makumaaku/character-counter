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
    "@type": "Product",
    "name": t('characterCounter.plan.meta.title'),
    "description": t('characterCounter.plan.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/plan`,
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
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "offers": [
        {
          "@type": "Offer",
          "name": t('characterCounter.plan.free.title'),
          "description": t('characterCounter.plan.free.description'),
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": t('characterCounter.plan.pro.title'),
          "description": t('characterCounter.plan.pro.description'),
          "price": "9.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('characterCounter.plan.meta.title'),
      description: t('characterCounter.plan.meta.description'),
      keywords: t('characterCounter.plan.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/plan`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
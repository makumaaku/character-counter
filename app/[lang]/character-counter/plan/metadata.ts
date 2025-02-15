import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('characterCounter.plan.meta.title'),
    "description": t('characterCounter.plan.meta.description'),
    "url": `https://boring-tool.com/${lang}/character-counter/plan`,
    "publisher": {
      "@type": "Organization",
      "name": "Boring Tool",
      "url": "https://boring-tool.com"
    },
    "mainEntity": {
      "@type": "Product",
      "name": "Character Counter Premium",
      "description": t('characterCounter.plan.meta.product.description'),
      "offers": [
        {
          "@type": "Offer",
          "name": t('characterCounter.plan.meta.product.offers.free.name'),
          "price": "0",
          "priceCurrency": "USD",
          "description": t('characterCounter.plan.meta.product.offers.free.description')
        },
        {
          "@type": "Offer",
          "name": t('characterCounter.plan.meta.product.offers.monthly.name'),
          "price": "4.80",
          "priceCurrency": "USD",
          "description": t('characterCounter.plan.meta.product.offers.monthly.description')
        },
        {
          "@type": "Offer",
          "name": t('characterCounter.plan.meta.product.offers.annual.name'),
          "price": "39.80",
          "priceCurrency": "USD",
          "description": t('characterCounter.plan.meta.product.offers.annual.description')
        }
      ]
    }
  };

  return {
    title: t('characterCounter.plan.meta.title'),
    description: t('characterCounter.plan.meta.description'),
    openGraph: {
      title: t('characterCounter.plan.meta.title'),
      description: t('characterCounter.plan.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/plan`,
      type: 'article',
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/plan`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/plan',
        'ja': 'https://boring-tool.com/ja/character-counter/plan',
      }
    },
    keywords: t('characterCounter.plan.meta.keywords'),
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
} 
import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  return {
    title: translate(lang, 'wordGen.meta.title'),
    description: translate(lang, 'wordGen.meta.description'),
    openGraph: {
      title: translate(lang, 'wordGen.meta.title'),
      description: translate(lang, 'wordGen.meta.description'),
      url: 'https://boring-tool.com/word-gen',
      type: 'website',
    },
    alternates: {
      canonical: 'https://boring-tool.com/word-gen'
    },
    keywords: translate(lang, 'wordGen.meta.keywords'),
    other: {
      script: [JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: translate(lang, 'wordGen.meta.title'),
        description: translate(lang, 'wordGen.meta.description'),
        url: 'https://boring-tool.com/word-gen',
        publisher: {
          '@type': 'Organization',
          name: translate(lang, 'home.meta.siteName'),
          url: 'https://boring-tool.com'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        featureList: translate(lang, 'wordGen.about.features.list'),
        isAccessibleForFree: true,
        browserRequirements: 'Requires a modern web browser with JavaScript enabled'
      })]
    }
  };
} 
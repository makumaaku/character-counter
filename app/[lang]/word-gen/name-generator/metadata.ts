import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  return {
    title: translate(lang, 'nameGenerator.meta.title'),
    description: translate(lang, 'nameGenerator.meta.description'),
    openGraph: {
      title: translate(lang, 'nameGenerator.meta.title'),
      description: translate(lang, 'nameGenerator.meta.description'),
      url: 'https://boring-tool.com/word-gen/name-generator',
      type: 'website',
    },
    alternates: {
      canonical: 'https://boring-tool.com/word-gen/name-generator'
    },
    keywords: translate(lang, 'nameGenerator.meta.keywords'),
    other: {
      script: [JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: translate(lang, 'nameGenerator.meta.title'),
        description: translate(lang, 'nameGenerator.meta.description'),
        url: 'https://boring-tool.com/word-gen/name-generator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        publisher: {
          '@type': 'Organization',
          name: translate(lang, 'common.meta.siteName'),
          url: 'https://boring-tool.com'
        }
      })]
    }
  };
} 
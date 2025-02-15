import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  return {
    title: translate(lang, 'wordGenerator.meta.title'),
    description: translate(lang, 'wordGenerator.meta.description'),
    openGraph: {
      title: translate(lang, 'wordGenerator.meta.title'),
      description: translate(lang, 'wordGenerator.meta.description'),
      url: 'https://boring-tool.com/word-gen/word-generator',
      type: 'website',
    },
    alternates: {
      canonical: 'https://boring-tool.com/word-gen/word-generator'
    },
    keywords: translate(lang, 'wordGenerator.meta.keywords'),
    other: {
      script: [JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: translate(lang, 'wordGenerator.meta.title'),
        description: translate(lang, 'wordGenerator.meta.description'),
        url: 'https://boring-tool.com/word-gen/word-generator',
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
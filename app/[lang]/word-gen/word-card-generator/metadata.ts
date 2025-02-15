import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  return {
    title: translate(lang, 'wordCardGenerator.meta.title'),
    description: translate(lang, 'wordCardGenerator.meta.description'),
    openGraph: {
      title: translate(lang, 'wordCardGenerator.meta.title'),
      description: translate(lang, 'wordCardGenerator.meta.description'),
      url: 'https://boring-tool.com/word-gen/word-card-generator',
      type: 'website',
    },
    alternates: {
      canonical: 'https://boring-tool.com/word-gen/word-card-generator'
    },
    keywords: translate(lang, 'wordCardGenerator.meta.keywords'),
    other: {
      script: [JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: translate(lang, 'wordCardGenerator.meta.title'),
        description: translate(lang, 'wordCardGenerator.meta.description'),
        url: 'https://boring-tool.com/word-gen/word-card-generator',
        applicationCategory: 'EducationalApplication',
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
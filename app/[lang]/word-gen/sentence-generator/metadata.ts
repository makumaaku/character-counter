import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const title = translate(lang, 'wordGen.tools.sentenceGenerator.title');
  const description = translate(lang, 'wordGen.tools.sentenceGenerator.description');
  const keywords = translate(lang, 'wordGen.tools.sentenceGenerator.keywords');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://boring-tool.com/word-gen/sentence-generator',
      images: [
        {
          url: 'https://boring-tool.com/og-sentence-generator.png',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    alternates: {
      canonical: 'https://boring-tool.com/word-gen/sentence-generator'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://boring-tool.com/og-sentence-generator.png']
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description,
        url: 'https://boring-tool.com/word-gen/sentence-generator',
        applicationCategory: 'CreativeApplication',
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
      })
    }
  };
} 
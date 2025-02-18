import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const title = translate(lang, 'wordGen.tools.storyGenerator.title');
  const description = translate(lang, 'wordGen.tools.storyGenerator.description');
  const keywords = translate(lang, 'wordGen.tools.storyGenerator.keywords');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://boring-tool.com/word-gen/story-generator',
      images: [
        {
          url: 'https://boring-tool.com/og-story-generator.png',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    alternates: {
      canonical: 'https://boring-tool.com/word-gen/story-generator'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://boring-tool.com/og-story-generator.png']
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description,
        url: 'https://boring-tool.com/word-gen/story-generator',
        applicationCategory: 'CreativeApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Boring Tool',
          url: 'https://boring-tool.com'
        }
      })
    }
  };
} 
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
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('characterCounter.column.meta.jsonLd.name'),
    description: t('characterCounter.column.meta.jsonLd.description'),
    url: `https://boring-tool.com/${lang}/character-counter/column`,
    publisher: {
      '@type': 'Organization',
      name: 'Boring Tool',
      url: 'https://boring-tool.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://boring-tool.com/boring_logo.png',
        width: 286,
        height: 286
      }
    },
    inLanguage: lang,
    isAccessibleForFree: true
  };

  return {
    title: t('characterCounter.column.meta.title'),
    description: t('characterCounter.column.meta.description'),
    keywords: t('characterCounter.column.meta.keywords'),
    openGraph: {
      title: t('characterCounter.column.meta.title'),
      description: t('characterCounter.column.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/column`,
      type: 'website',
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/column`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/column',
        'ja': 'https://boring-tool.com/ja/character-counter/column',
      }
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
} 
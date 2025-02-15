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
    "@type": "Article",
    "headline": t('characterCounter.usecase.meta.article.headline'),
    "description": t('characterCounter.usecase.meta.article.description'),
    "articleBody": t('characterCounter.usecase.meta.article.body'),
    "url": `https://boring-tool.com/${lang}/character-counter/usecase`,
    "publisher": {
      "@type": "Organization",
      "name": "Boring Tool",
      "url": "https://boring-tool.com"
    }
  };

  return {
    title: t('characterCounter.usecase.meta.title'),
    description: t('characterCounter.usecase.meta.description'),
    openGraph: {
      title: t('characterCounter.usecase.meta.title'),
      description: t('characterCounter.usecase.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/usecase`,
      type: 'article',
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/usecase`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/usecase',
        'ja': 'https://boring-tool.com/ja/character-counter/usecase',
      }
    },
    keywords: t('characterCounter.usecase.meta.keywords'),
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
} 
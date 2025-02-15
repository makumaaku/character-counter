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
    "name": t('characterCounter.privacy.meta.title'),
    "description": t('characterCounter.privacy.meta.description'),
    "url": `https://boring-tool.com/${lang}/character-counter/privacy`,
    "publisher": {
      "@type": "Organization",
      "name": "Boring Tool",
      "url": "https://boring-tool.com"
    },
    "mainEntity": {
      "@type": "Article",
      "headline": t('characterCounter.privacy.meta.article.headline'),
      "description": t('characterCounter.privacy.meta.article.description'),
      "articleBody": t('characterCounter.privacy.meta.article.body'),
      "datePublished": "2024-02-15",
      "dateModified": "2024-02-15",
      "publisher": {
        "@type": "Organization",
        "name": "Boring Tool",
        "url": "https://boring-tool.com"
      }
    }
  };

  return {
    title: t('characterCounter.privacy.meta.title'),
    description: t('characterCounter.privacy.meta.description'),
    openGraph: {
      title: t('characterCounter.privacy.meta.title'),
      description: t('characterCounter.privacy.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/privacy`,
      type: 'article',
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/privacy`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/privacy',
        'ja': 'https://boring-tool.com/ja/character-counter/privacy',
      }
    },
    keywords: t('characterCounter.privacy.meta.keywords'),
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
} 
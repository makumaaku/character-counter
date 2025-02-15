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

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
    "name": t('characterCounter.aboutUs.meta.title'),
    "description": t('characterCounter.aboutUs.meta.description'),
    "url": `https://boring-tool.com/${lang}/character-counter/about-us`,
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com",
      "description": t('characterCounter.aboutUs.meta.publisher.description'),
    "foundingDate": "2023",
    "sameAs": [
      "https://github.com/boring-inc",
      "https://twitter.com/boring_tool"
    ]
  },
  "mainEntity": {
    "@type": "Article",
      "headline": t('characterCounter.aboutUs.meta.article.headline'),
      "description": t('characterCounter.aboutUs.meta.article.description'),
      "articleBody": t('characterCounter.aboutUs.meta.article.body')
  }
};

  return {
    title: t('characterCounter.aboutUs.meta.title'),
    description: t('characterCounter.aboutUs.meta.description'),
  openGraph: {
      title: t('characterCounter.aboutUs.meta.title'),
      description: t('characterCounter.aboutUs.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/about-us`,
    type: 'website',
  },
  alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/about-us`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/about-us',
        'ja': 'https://boring-tool.com/ja/character-counter/about-us',
      }
  },
    keywords: t('characterCounter.aboutUs.meta.keywords'),
  other: {
    'application/ld+json': JSON.stringify(jsonLd)
  }
}; 
} 
import { SITE_CONFIG } from '@/constants/constants';
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
  const baseUrl = SITE_CONFIG.baseURL;

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('characterCounter.usecase.meta.article.headline'),
    "description": t('characterCounter.usecase.meta.article.description'),
    "articleBody": t('characterCounter.usecase.meta.article.body'),
    "url": `${baseUrl}${lang}/character-counter/usecase`,
    "publisher": {
      "@type": "Organization",
      "name": t('common.meta.siteName'),
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": SITE_CONFIG.logo.url,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}${lang}/character-counter/usecase`
    },
    "inLanguage": lang
  };

  return {
    metadataBase: new URL(baseUrl),
    title: t('characterCounter.usecase.meta.title'),
    description: t('characterCounter.usecase.meta.description'),
    openGraph: {
      title: t('characterCounter.usecase.meta.title'),
      description: t('characterCounter.usecase.meta.description'),
      url: `${baseUrl}${lang}/character-counter/usecase`,
      type: 'article',
      locale: lang,
      alternateLocale: [lang === 'en' ? 'ja' : 'en'],
      siteName: t('common.meta.siteName')
    },
    alternates: {
      canonical: `${baseUrl}${lang}/character-counter/usecase`,
      languages: {
        'en': `${baseUrl}en/character-counter/usecase`,
        'ja': `${baseUrl}ja/character-counter/usecase`,
        'x-default': `${baseUrl}en/character-counter/usecase`
      }
    },
    keywords: t('characterCounter.usecase.meta.keywords'),
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
} 
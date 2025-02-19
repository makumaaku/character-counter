import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  params: { lang: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t('characterCounter.aboutUs.meta.title'),
    "description": t('characterCounter.aboutUs.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/about-us`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      },
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

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('characterCounter.aboutUs.meta.title'),
      description: t('characterCounter.aboutUs.meta.description'),
      keywords: t('characterCounter.aboutUs.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/about-us`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
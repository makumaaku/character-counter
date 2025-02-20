import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('characterCounter.usecase.meta.article.headline'),
    "description": t('characterCounter.usecase.meta.article.description'),
    "articleBody": t('characterCounter.usecase.meta.article.body'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/usecase`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.baseURL}/${lang}/character-counter/usecase`
    },
    "inLanguage": lang,
    "datePublished": "2024-02-18",
    "dateModified": "2024-02-18"
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('characterCounter.usecase.meta.title'),
      description: t('characterCounter.usecase.meta.description'),
      keywords: t('characterCounter.usecase.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/usecase`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 
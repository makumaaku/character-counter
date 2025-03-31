import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/usecase');
  
  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    articleHeadline,
    articleDescription,
    articleBody,
  ] = await Promise.all([
    translate(lang, 'characterCounter.usecase.meta.title'),
    translate(lang, 'characterCounter.usecase.meta.description'),
    translate(lang, 'characterCounter.usecase.meta.keywords'),
    translate(lang, 'characterCounter.usecase.meta.article.headline'),
    translate(lang, 'characterCounter.usecase.meta.article.description'),
    translate(lang, 'characterCounter.usecase.meta.article.body'),
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleHeadline,
    "description": articleDescription,
    "articleBody": articleBody,
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
      title,
      description,
      keywords,
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
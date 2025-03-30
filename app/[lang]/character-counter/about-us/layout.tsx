import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

type JsonLdType = {
  "@context": "https://schema.org";
  "@type": string;
  name: string;
  description: string;
  url: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
      width: number;
      height: number;
    };
    description: string;
    foundingDate: string;
  };
  mainEntity: {
    "@type": "Article";
    headline: string;
    description: string;
    articleBody: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/about-us');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    publisherDescription,
    articleHeadline,
    articleDescription,
    articleBody,
  ] = await Promise.all([
    translate(lang, 'characterCounter.aboutUs.meta.title'),
    translate(lang, 'characterCounter.aboutUs.meta.description'),
    translate(lang, 'characterCounter.aboutUs.meta.keywords'),
    translate(lang, 'characterCounter.aboutUs.meta.publisher.description'),
    translate(lang, 'characterCounter.aboutUs.meta.article.headline'),
    translate(lang, 'characterCounter.aboutUs.meta.article.description'),
    translate(lang, 'characterCounter.aboutUs.meta.article.body'),
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": title,
    "description": description,
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
      "description": publisherDescription,
      "foundingDate": "2023",
    },
    "mainEntity": {
      "@type": "Article",
      "headline": articleHeadline,
      "description": articleDescription,
      "articleBody": articleBody
    }
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
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
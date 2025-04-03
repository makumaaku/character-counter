import { SITE_CONFIG } from '@/constants/constants';
import { getLanguageFromParams, loadToolMessages, translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Language } from '@/lib/i18n/types';
import { Metadata } from 'next';

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
  };
  inLanguage: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Organization";
    name: string;
    url: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/column');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
  ] = await Promise.all([
    translate(lang, 'characterCounter.column.meta.title'),
    translate(lang, 'characterCounter.column.meta.description'),
    translate(lang, 'characterCounter.column.meta.keywords'),
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/column`,
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
    "inLanguage": lang,
    "datePublished": "2024-02-18",
    "dateModified": "2024-02-18",
    "author": {
      "@type": "Organization",
      "name": commonMeta.publisher,
      "url": SITE_CONFIG.baseURL
    }
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/column`,
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
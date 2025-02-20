import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
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
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": t('characterCounter.column.meta.title'),
    "description": t('characterCounter.column.meta.description'),
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

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('characterCounter.column.meta.title'),
      description: t('characterCounter.column.meta.description'),
      keywords: t('characterCounter.column.meta.keywords'),
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
import { translate } from '@/lib/i18n/server';
import type { Metadata } from "next";

const getJsonLd = (lang: string, page: string) => {
  const t = (key: string) => translate(lang, key);
  const commonMeta = {
    siteName: t('common.meta.siteName'),
    publisher: t('common.meta.publisher'),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t(`${page}.meta.title`),
    description: t(`${page}.meta.description`),
    url: `https://boring-tool.com/${lang}`,
    potentialAction: {
      '@type': 'SearchAction',
      'target': `https://boring-tool.com/${lang}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: commonMeta.publisher,
      url: `https://boring-tool.com/${lang}`,
      logo: {
        '@type': 'ImageObject',
        url: 'https://boring-tool.com/boring_logo.png',
        width: 286,
        height: 286
      }
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true
  };
};

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  props: Props,
  page: string = 'home' // デフォルトはホームページ
): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  // 共通のメタデータを取得
  const commonMeta = {
    siteName: t('common.meta.siteName'),
    publisher: t('common.meta.publisher'),
    logoAlt: t('common.meta.logoAlt'),
  };

  // ページ固有のメタデータを取得
  const title = t(`${page}.meta.title`);
  const description = t(`${page}.meta.description`);
  const keywords = t(`${page}.meta.keywords`);

  return {
    title,
    description,
    metadataBase: new URL('https://boring-tool.com'),
    openGraph: {
      title,
      description,
      url: `https://boring-tool.com/${lang}`,
      type: 'website',
      siteName: commonMeta.siteName,
      locale: lang,
      alternateLocale: [lang === 'en' ? 'ja' : 'en'],
      images: [
        {
          url: 'https://boring-tool.com/boring_logo.png',
          width: 286,
          height: 286,
          alt: commonMeta.logoAlt,
        },
      ],
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}`,
      languages: {
        'en': 'https://boring-tool.com/en',
        'ja': 'https://boring-tool.com/ja',
      },
    },
    keywords,
    other: {
      'application/ld+json': JSON.stringify(getJsonLd(lang, page))
    },
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "any",
        },
        {
          url: "/boring-icon-192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          url: "/boring-icon-512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      apple: [
        {
          url: "/boring-icon-180.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
  };
} 
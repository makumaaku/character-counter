import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import type { Metadata } from "next";

const getJsonLd = (lang: string, page: string) => {
  const t = (key: string) => translate(lang, key);
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t(`${page}.meta.title`),
    description: t(`${page}.meta.description`),
    url: SITE_CONFIG.baseURL,
    publisher: {
      '@type': 'Organization',
      name: commonMeta.publisher,
      url: SITE_CONFIG.baseURL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        width: SITE_CONFIG.logo.width,
        height: SITE_CONFIG.logo.height
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
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t(SITE_CONFIG.logoAlt),
  };

  // ページ固有のメタデータを取得
  const title = t(`${page}.meta.title`);
  const description = t(`${page}.meta.description`);
  const keywords = t(`${page}.meta.keywords`);

  return {
    title,
    description,
    metadataBase: new URL(SITE_CONFIG.baseURL),
    openGraph: {
      title,
      description,
      url: SITE_CONFIG.baseURL,
      type: 'website',
      siteName: commonMeta.siteName,
      images: [
        {
          url: `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
          width: SITE_CONFIG.logo.width,
          height: SITE_CONFIG.logo.height,
          alt: commonMeta.logoAlt,
        },
      ],
    },
    keywords,
    other: {
      'application/ld+json': JSON.stringify(getJsonLd(lang, page))
    },
    icons: {
      icon: [
        {
          url: SITE_CONFIG.icons.favicon,
          sizes: "any",
        },
        {
          url: SITE_CONFIG.icons.icon192,
          type: "image/png",
          sizes: "192x192",
        },
        {
          url: SITE_CONFIG.icons.icon512,
          type: "image/png",
          sizes: "512x512",
        },
      ],
      apple: [
        {
          url: SITE_CONFIG.icons.appleIcon,
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
  };
} 
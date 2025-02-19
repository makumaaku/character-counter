import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  props: Props
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
  const title = t('characterCounter.meta.title');
  const description = t('characterCounter.meta.description');
  const keywords = t('characterCounter.meta.keywords');

  // Define base URL from SITE_CONFIG
  const baseUrl = SITE_CONFIG.baseURL;
  const pagePath = '/character-counter';
  const currentUrl = `${baseUrl}/${lang}${pagePath}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url: currentUrl,
      type: 'website',
      siteName: commonMeta.siteName,
      locale: lang,
      alternateLocale: [lang === 'en' ? 'ja' : 'en'],
      images: [
        {
          url: `${baseUrl}${SITE_CONFIG.logo.url}`,
          width: SITE_CONFIG.logo.width,
          height: SITE_CONFIG.logo.height,
          alt: commonMeta.logoAlt,
        },
      ],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en${pagePath}`,
        'ja': `${baseUrl}/ja${pagePath}`,
        'x-default': `${baseUrl}/en${pagePath}`
      },
    },
    keywords,
    icons: {
      icon: SITE_CONFIG.icons.icon192,
      shortcut: SITE_CONFIG.icons.favicon,
      apple: SITE_CONFIG.icons.appleIcon,
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          url: SITE_CONFIG.icons.icon192
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          url: SITE_CONFIG.icons.icon512
        }
      ]
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description,
        url: currentUrl,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        publisher: {
          '@type': 'Organization',
          name: commonMeta.publisher,
          url: baseUrl,
        },
        isAccessibleForFree: true
      })
    }
  };
} 
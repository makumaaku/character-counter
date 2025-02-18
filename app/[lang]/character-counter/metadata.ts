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

  // Define base URL
  const baseUrl = 'https://boring-tool.com';
  const pagePath = '/character-counter';

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}${pagePath}`,
      type: 'website',
      siteName: commonMeta.siteName,
      locale: lang,
      alternateLocale: [lang === 'en' ? 'ja' : 'en'],
      images: [
        {
          url: `${baseUrl}/boring_logo.png`,
          width: 286,
          height: 286,
          alt: commonMeta.logoAlt,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}${pagePath}`,
      languages: {
        'en': `${baseUrl}/en${pagePath}`,
        'ja': `${baseUrl}/ja${pagePath}`,
        'x-default': `${baseUrl}/en${pagePath}`
      },
    },
    keywords,
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description,
        url: `${baseUrl}/${lang}${pagePath}`,
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
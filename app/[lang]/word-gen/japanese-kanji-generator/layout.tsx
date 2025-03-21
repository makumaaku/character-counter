import { translate } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Script from 'next/script';

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
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  screenshot?: {
    "@type": string;
    url: string;
    width: number;
    height: number;
    caption: string;
  };
  featureList: string[];
  isAccessibleForFree: boolean;
  browserRequirements: string;
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

  const pageMeta = {
    title: t('japaneseKanjiGenerator.meta.title'),
    description: t('japaneseKanjiGenerator.meta.description'),
    keywords: t('japaneseKanjiGenerator.meta.keywords'),
    url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/japanese-kanji-generator`
  };

  // 共通のメタデータを取得
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    pageMeta
  );

  // ページ固有のJSON-LDを定義
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('japaneseKanjiGenerator.meta.title'),
    "description": t('japaneseKanjiGenerator.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/japanese-kanji-generator`,
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
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": lang === 'ja' ? [
      "ランダムな日本語の漢字を生成",
      "生成された漢字をJPGまたはPNG画像としてダウンロード",
      "512x512pxの高品質画像エクスポート"
    ] : [
      "Generate random Japanese kanji characters",
      "Download generated kanji as JPG or PNG image",
      "512x512px high-quality image export"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function JapaneseKanjiGeneratorLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  // JSON-LDデータを作成
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('japaneseKanjiGenerator.meta.title'),
    "description": t('japaneseKanjiGenerator.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/japanese-kanji-generator`,
    "publisher": {
      "@type": "Organization",
      "name": t(SITE_CONFIG.siteName),
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": lang === 'ja' ? [
      "ランダムな日本語の漢字を生成",
      "生成された漢字をJPGまたはPNG画像としてダウンロード",
      "512x512pxの高品質画像エクスポート"
    ] : [
      "Generate random Japanese kanji characters",
      "Download generated kanji as JPG or PNG image",
      "512x512px high-quality image export"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  return (
    <>
      <Script id="japanese-kanji-generator-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      {children}
    </>
  );
} 
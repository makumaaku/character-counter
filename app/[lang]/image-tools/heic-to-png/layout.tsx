import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Script from 'next/script';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: t('common.meta.siteName'),
    publisher: t('common.meta.publisher'),
    logoAlt: t('common.meta.logoAlt'),
  };

  // ページ固有のJSON-LDを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('heicToPng.title'),
    "description": t('heicToPng.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-png`,
    "applicationCategory": "Utility",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    }
  };

  // 共通のメタデータを取得
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('heicToPng.title'),
      description: t('heicToPng.description'),
      keywords: t('heicToPng.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-png`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function HeicToPngLayout({ children }: Props) {
  return (
    <>
      {children}
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "HEIC to PNG Converter",
        "description": "Convert HEIC images to PNG format online with preview and batch conversion support.",
        "applicationCategory": "Utility",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }) }} />
    </>
  )
} 
import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';


type Props = {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }

type JsonLdType = {
  "@context": "https://schema.org",
  "@type": string,
  name: string,
  description: string,
  url: string,
  publisher: {
    "@type": "Organization",
    name: string,
    logo: {
      "@type": "ImageObject",
      url: string,
      width: number,
      height: number
    }
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  // ページ固有のJSON-LDを定義
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('jpgToWebp.meta.title'),
    "description": t('jpgToWebp.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/jpg-to-webp`,
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
      title: t('jpgToWebp.meta.title'),
      description: t('jpgToWebp.meta.description'),
      keywords: t('jpgToWebp.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/image-tools/jpg-to-webp`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
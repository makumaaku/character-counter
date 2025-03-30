import { SITE_CONFIG } from '@/constants/constants'
import { translate, loadToolMessages } from '@/lib/i18n/server'
import { getCommonMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { Language } from '@/lib/i18n/types'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
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
  featureList: string[];
  isAccessibleForFree: boolean;
  browserRequirements: string;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params
  
  // Load png-to-webp translations
  await loadToolMessages(lang as Language, 'image-tools/png-to-webp');
  
  // Get translations in parallel
  const [
    title,
    description,
    keywords,
  ] = await Promise.all([
    translate(lang, 'imageTools.pngToWebp.meta.title'),
    translate(lang, 'imageTools.pngToWebp.meta.description'),
    translate(lang, 'imageTools.pngToWebp.meta.keywords'),
  ]);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt
  }

  // ページ固有のJSON-LDを定義
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/png-to-webp`,
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
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert PNG images to WebP format",
      "Free to use",
      "No registration required",
      "Instant preview",
      "Fast processing",
      "Batch conversion",
      "Browser-based conversion"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled"
  }

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/image-tools/png-to-webp`,
    }
  )

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  }
}

export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-container">
      {children}
    </div>
  );
} 
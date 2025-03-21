import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import ImageToolsLayout from './components/ImageToolsLayout';

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
  featureList: string[];
  isAccessibleForFree: boolean;
  browserRequirements: string;
  hasPart: {
    "@type": string;
    name: string;
    description: string;
    url: string;
  }[];
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
    "@type": "WebApplication",
    "name": t('imageTools.meta.title'),
    "description": t('imageTools.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools`,
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
      "JPG to PNG conversion",
      "PNG to JPG conversion",
      "HEIC to JPG conversion",
      "HEIC to PNG conversion",
      "HEIC to WebP conversion",
      "JPG to WebP conversion",
      "Free to use",
      "No registration required",
      "Fast processing",
      "Browser-based conversion"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": t('jpgToPng.meta.title'),
        "description": t('jpgToPng.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/jpg-to-png`
      },
      {
        "@type": "WebApplication",
        "name": t('pngToJpg.meta.title'),
        "description": t('pngToJpg.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/png-to-jpg`
      },
      {
        "@type": "WebApplication",
        "name": t('heicToJpg.meta.title'),
        "description": t('heicToJpg.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-jpg`
      },
      {
        "@type": "WebApplication",
        "name": t('heicToPng.meta.title'),
        "description": t('heicToPng.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-png`
      },
      {
        "@type": "WebApplication",
        "name": t('heicToWebp.meta.title'),
        "description": t('heicToWebp.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-webp`
      },
      {
        "@type": "WebApplication",
        "name": t('jpgToWebp.meta.title'),
        "description": t('jpgToWebp.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/jpg-to-webp`
      }
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('imageTools.meta.title'),
      description: t('imageTools.meta.description'),
      keywords: t('imageTools.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/image-tools`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children }: Props) {
  return (
    <ImageToolsLayout>
      {children}
    </ImageToolsLayout>
  );
} 
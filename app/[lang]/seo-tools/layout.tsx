import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import SeoToolsLayout from './components/SeoToolsLayout';

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
    "name": t('seoTools.meta.title'),
    "description": t('seoTools.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools`,
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
      "Page Speed Checker",
      "SEO Analysis",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": t('pageSpeedChecker.meta.title'),
        "description": t('pageSpeedChecker.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/page-speed-checker`
      },
      {
        "@type": "WebApplication",
        "name": t('seoCannibalizationChecker.meta.title'),
        "description": t('seoCannibalizationChecker.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-cannibalization-checker`
      }
      // 将来的に他のSEOツールを追加する場合はここに追加
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('seoTools.meta.title'),
      description: t('seoTools.meta.description'),
      keywords: t('seoTools.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools`,
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
    <SeoToolsLayout>
      {children}
    </SeoToolsLayout>
  );
} 
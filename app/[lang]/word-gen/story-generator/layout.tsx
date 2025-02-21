import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

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
  keywords: string[];
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
    "name": t('storyGenerator.meta.title'),
    "description": t('storyGenerator.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/story-generator`,
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
    "applicationCategory": "CreativeApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Story generation",
      "Plot creation",
      "Character development",
      "Multiple genres",
      "Custom story length",
      "Creative writing aid",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": [
      "story generator",
      "plot generator",
      "creative writing",
      "story ideas",
      "writing tool",
      "narrative generator"
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('storyGenerator.meta.title'),
      description: t('storyGenerator.meta.description'),
      keywords: t('storyGenerator.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/story-generator`,
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
  return <>{children}</>;
} 
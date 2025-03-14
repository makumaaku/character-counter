import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import WordGenLayout from './components/WordGenLayout';

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
    "name": t('wordGen.meta.title'),
    "description": t('wordGen.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen`,
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
      "Random word generation",
      "Name generation",
      "Password generation",
      "Story generation",
      "Sentence generation",
      "Word card generation",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": t('wordGenerator.meta.title'),
        "description": t('wordGenerator.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-generator`
      },
      {
        "@type": "WebApplication",
        "name": t('nameGenerator.meta.title'),
        "description": t('nameGenerator.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/name-generator`
      },
      {
        "@type": "WebApplication",
        "name": t('passwordGenerator.meta.title'),
        "description": t('passwordGenerator.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`
      },
      {
        "@type": "WebApplication",
        "name": t('storyGenerator.meta.title'),
        "description": t('storyGenerator.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/story-generator`
      },
      {
        "@type": "WebApplication",
        "name": t('sentenceGenerator.meta.title'),
        "description": t('sentenceGenerator.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/sentence-generator`
      },
      {
        "@type": "WebApplication",
        "name": t('wordCardGenerator.meta.title'),
        "description": t('wordCardGenerator.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-card-generator`
      }
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('wordGen.meta.title'),
      description: t('wordGen.meta.description'),
      keywords: t('wordGen.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen`,
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
    <WordGenLayout>
      {children}
    </WordGenLayout>
  );
} 
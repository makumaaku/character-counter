import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { loadToolMessages, translate } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';

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
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/password-generator');
  
  // 翻訳を並列で取得
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'wordGen.passwordGenerator.meta.title'),
    translate(lang, 'wordGen.passwordGenerator.meta.description'),
    translate(lang, 'wordGen.passwordGenerator.meta.keywords')
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };
  
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`,
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
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Secure password generation",
      "Custom password length",
      "Special characters support",
      "Password strength indicator",
      "Multiple character sets",
      "Memorable password options",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": keywords.split(',')
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
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
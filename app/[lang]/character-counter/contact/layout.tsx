import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
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
  mainEntity: {
    "@type": "ContactPoint";
    contactType: string;
    availableLanguage: string[];
    email: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/contact');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    jsonLdName,
    jsonLdDescription,
    jsonLdOrgName,
  ] = await Promise.all([
    translate(lang, 'characterCounter.contact.meta.title'),
    translate(lang, 'characterCounter.contact.meta.description'),
    translate(lang, 'characterCounter.contact.meta.keywords'),
    translate(lang, 'characterCounter.contact.meta.jsonLd.name'),
    translate(lang, 'characterCounter.contact.meta.jsonLd.description'),
    translate(lang, 'characterCounter.contact.meta.jsonLd.organization.name'),
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": jsonLdName || title,
    "description": jsonLdDescription || description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/contact`,
    "publisher": {
      "@type": "Organization",
      "name": jsonLdOrgName || commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "mainEntity": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["en", "ja", "es"],
      "email": "support@boring-tool.com"
    }
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/contact`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 
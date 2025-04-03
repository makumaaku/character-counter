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
  inLanguage: string;
  datePublished: string;
  dateModified: string;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/privacy');
  
  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
  ] = await Promise.all([
    translate(lang, 'characterCounter.privacy.meta.title'),
    translate(lang, 'characterCounter.privacy.meta.description'),
    translate(lang, 'characterCounter.privacy.meta.keywords'), 
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/privacy`,
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
    "inLanguage": lang,
    "datePublished": "2024-02-18",
    "dateModified": "2024-02-18"
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/privacy`,
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
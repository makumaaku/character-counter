import { Metadata } from 'next';
import { translate, loadToolMessages, getLanguageFromParams } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Language } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

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
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // Load SEO tools translations
  await loadToolMessages(lang as Language, 'seo-tools');
  await loadToolMessages(lang as Language, 'seo-tools/seo-volume-guess');
  
  // Get translations in parallel
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'seoTools.seoVolumeGuess.meta.title'),
    translate(lang, 'seoTools.seoVolumeGuess.meta.description'),
    translate(lang, 'seoTools.seoVolumeGuess.meta.keywords')
  ]);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };
  
  // ページ固有のJSON-LDを定義
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
    }
  );

  return {
    ...metadata,
    alternates: {
      canonical: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
      languages: {
        'en': `${SITE_CONFIG.baseURL}/en/seo-tools/seo-volume-guess`,
        'ja': `${SITE_CONFIG.baseURL}/ja/seo-tools/seo-volume-guess`,
        'es': `${SITE_CONFIG.baseURL}/es/seo-tools/seo-volume-guess`,
        'x-default': `${SITE_CONFIG.baseURL}/en/seo-tools/seo-volume-guess`
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
      siteName: commonMeta.siteName,
      locale: lang,
      alternateLocale: lang === 'en' ? ['ja', 'es'] : (lang === 'ja' ? ['en', 'es'] : ['en', 'ja']),
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        width: SITE_CONFIG.logo.width,
        height: SITE_CONFIG.logo.height,
        alt: commonMeta.logoAlt
      }]
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  
  return (
    <>{children}</>
  );
} 
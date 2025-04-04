import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

type JsonLdType = {
  "@context": string;
  "@type": string;
  "name": string;
  "description": string;
  "url": string;
  "publisher": {
    "@type": string;
    "name": string;
    "logo"?: {
      "@type": string;
      "url": string;
      "width": number;
      "height": number;
    };
  };
  [key: string]: unknown;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // privacy-policy用の翻訳をロード
  await loadToolMessages(lang as Language, 'privacy-policy');
  
  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'privacyPolicy.meta.title'),
    translate(lang, 'privacyPolicy.meta.description'),
    translate(lang, 'privacyPolicy.meta.keywords')
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
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/privacy-policy`,
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
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/privacy-policy`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {children}
    </div>
  );
} 
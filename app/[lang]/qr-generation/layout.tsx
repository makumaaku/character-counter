import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Script from 'next/script';

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
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'qr-generation');
  
  // 翻訳関数
  const t = async (key: string) => await translate(lang as Language, key);
  
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
    "name": await t('qrGeneration.meta.title'),
    "description": await t('qrGeneration.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/qr-generation`,
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
      await t('qrGeneration.features.qrGeneration'),
      await t('qrGeneration.features.textToQr'),
      await t('qrGeneration.features.urlToQr'),
      await t('qrGeneration.features.preview'),
      await t('qrGeneration.features.free'),
      await t('qrGeneration.features.noRegistration')
    ],
    "isAccessibleForFree": true,
    "browserRequirements": await t('qrGeneration.features.browserRequirements')
  };

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang as Language,
    commonMeta,
    {
      title: await t('qrGeneration.meta.title'),
      description: await t('qrGeneration.meta.description'),
      keywords: await t('qrGeneration.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/qr-generation`,
    }
  );

  return {
    ...metadata,
    alternates: {
      canonical: `${SITE_CONFIG.baseURL}/${lang}/qr-generation`,
      languages: {
        'en': `${SITE_CONFIG.baseURL}/en/qr-generation`,
        'ja': `${SITE_CONFIG.baseURL}/ja/qr-generation`,
        'es': `${SITE_CONFIG.baseURL}/es/qr-generation`,
        'x-default': `${SITE_CONFIG.baseURL}/en/qr-generation`
      }
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function QRGenerationLayout({ children, params }: Props) {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'qr-generation');

  // 必要な翻訳を一括で取得
  const translations = await Promise.all([
    translate(lang as Language, 'qrGeneration.title'),
    translate(lang as Language, 'qrGeneration.description'),
    translate(lang as Language, 'qrGeneration.ui.placeholder'),
    translate(lang as Language, 'qrGeneration.ui.emptyState'),
  ]);
  
  // 値を取り出し
  const [
    title,
    description,
    placeholder,
    emptyState,
  ] = translations;

  // クライアントコンポーネントに渡す翻訳データ
  const messages = {
    title,
    description,
    ui: {
      placeholder,
      emptyState,
    }
  };

  return (
    <>
      <Script
        id="messages"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(messages),
        }}
      />
      <div className="flex flex-col min-h-screen bg-gray-800">
        <Header title={title} homeLink={`/${lang}/qr-generation`} />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
} 
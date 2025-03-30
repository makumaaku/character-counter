import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'qr-generation');
  
  // 翻訳を並列で取得
  const [
    title,
    description,
    keywords,
    qrGeneration,
    textToQr,
    urlToQr,
    preview,
    free,
    noRegistration,
    browserRequirements
  ] = await Promise.all([
    translate(lang as Language, 'qrGeneration.meta.title'),
    translate(lang as Language, 'qrGeneration.meta.description'),
    translate(lang as Language, 'qrGeneration.meta.keywords'),
    translate(lang as Language, 'qrGeneration.features.qrGeneration'),
    translate(lang as Language, 'qrGeneration.features.textToQr'),
    translate(lang as Language, 'qrGeneration.features.urlToQr'),
    translate(lang as Language, 'qrGeneration.features.preview'),
    translate(lang as Language, 'qrGeneration.features.free'),
    translate(lang as Language, 'qrGeneration.features.noRegistration'),
    translate(lang as Language, 'qrGeneration.features.browserRequirements')
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
      qrGeneration,
      textToQr,
      urlToQr,
      preview,
      free,
      noRegistration
    ],
    "isAccessibleForFree": true,
    "browserRequirements": browserRequirements
  };

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang as Language,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/qr-generation`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function QRGenerationLayout({ children, params }: Props) {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'qr-generation');
  
  // タイトルを取得
  const title = await translate(lang as Language, 'qrGeneration.title');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={title} homeLink={`/${lang}/qr-generation`} />
      <main className="flex-1 px-4 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
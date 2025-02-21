import { translate } from '@/lib/i18n/client';
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
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('qrGeneration.meta.title'),
    "description": t('qrGeneration.meta.description'),
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
      "QR code generation",
      "Text to QR code conversion",
      "URL to QR code conversion",
      "Real-time QR code preview",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled"
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('qrGeneration.meta.title'),
      description: t('qrGeneration.meta.description'),
      keywords: t('qrGeneration.meta.keywords'),
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
  const t = (key: string) => translate(lang, key);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={t('qrGeneration.title')} homeLink={`/${lang}/qr-generation`} />
      <main className="flex-1 px-4 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
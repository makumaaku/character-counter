import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    "name": t('link-status-checker.meta.title'),
    "description": t('link-status-checker.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/link-status-checker`,
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
      "Link status checking",
      "Bulk URL validation",
      "HTTP status code detection",
      "Real-time checking",
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
      title: t('link-status-checker.meta.title'),
      description: t('link-status-checker.meta.description'),
      keywords: t('link-status-checker.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/link-status-checker`,
    }
  );

  return {
    ...metadata,
    alternates: {
      canonical: `${SITE_CONFIG.baseURL}/${lang}/link-status-checker`,
      languages: {
        'en': `${SITE_CONFIG.baseURL}/en/link-status-checker`,
        'ja': `${SITE_CONFIG.baseURL}/ja/link-status-checker`,
        'x-default': `${SITE_CONFIG.baseURL}/en/link-status-checker`
      }
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={t('home.tools.linkStatusChecker')} homeLink={`/${lang}/link-status-checker`}>
        <div className="flex items-center gap-2">
          {/* Left side content removed */}
        </div>
      </Header>
      <main className="flex-1 bg-gray-800">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
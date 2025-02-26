import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  // ページ固有のJSON-LDを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('countryData.meta.title'),
    "description": t('countryData.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/country-data`,
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
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('countryData.meta.title'),
      description: t('countryData.meta.description'),
      keywords: t('countryData.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/country-data`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function CountryDataLayout({ children, params }: Props) {
  const { lang } = await params;

  const messages = {
    countryData: {
      title: translate(lang, 'countryData.title'),
      states: {
        loading: translate(lang, 'countryData.states.loading'),
        error: translate(lang, 'countryData.states.error'),
        noData: translate(lang, 'countryData.states.noData'),
      },
      search: {
        label: translate(lang, 'countryData.search.label'),
        placeholder: translate(lang, 'countryData.search.placeholder'),
      },
      filter: {
        label: translate(lang, 'countryData.filter.label'),
        allRegions: translate(lang, 'countryData.filter.allRegions'),
      },
      table: {
        headers: {
          name: translate(lang, 'countryData.table.headers.name'),
          officialName: translate(lang, 'countryData.table.headers.officialName'),
          area: translate(lang, 'countryData.table.headers.area'),
          capital: translate(lang, 'countryData.table.headers.capital'),
          languages: translate(lang, 'countryData.table.headers.languages'),
          currency: translate(lang, 'countryData.table.headers.currency'),
          region: translate(lang, 'countryData.table.headers.region'),
          source: translate(lang, 'countryData.table.headers.source'),
          lastUpdated: translate(lang, 'countryData.table.headers.lastUpdated'),
        },
      },
    },
  };

  return (
    <>
      <script
        id="messages"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(messages),
        }}
      />
      <div className="flex flex-col min-h-screen bg-gray-800">
        <Header title={translate(lang, 'countryData.ui.title')} homeLink={`/${lang}/country-data`}>
          <div className="flex items-center gap-2">
            {/* Left side content removed */}
          </div>
        </Header>
        <main className="flex-1 bg-gray-800">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
} 
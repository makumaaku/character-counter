import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
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
  
  // country-data用の翻訳をロード
  await loadToolMessages(lang as Language, 'country-data');
  
  // 翻訳関数
  const t = async (key: string) => await translate(lang, key);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: await t('siteName'),
    publisher: await t('publisher'),
    logoAlt: await t('common.meta.logoAlt'),
  };

  // ページ固有のJSON-LDを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": await t('countryData.meta.title'),
    "description": await t('countryData.meta.description'),
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
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title: await t('countryData.meta.title'),
      description: await t('countryData.meta.description'),
      keywords: await t('countryData.meta.keywords'),
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
  
  // country-data用の翻訳をロード
  await loadToolMessages(lang as Language, 'country-data');

  // 翻訳を一括で取得
  const translations = await Promise.all([
    translate(lang, 'countryData.title'),
    translate(lang, 'countryData.states.loading'),
    translate(lang, 'countryData.states.error'),
    translate(lang, 'countryData.states.noData'),
    translate(lang, 'countryData.search.label'),
    translate(lang, 'countryData.search.placeholder'),
    translate(lang, 'countryData.filter.label'),
    translate(lang, 'countryData.filter.allRegions'),
    translate(lang, 'countryData.table.headers.name'),
    translate(lang, 'countryData.table.headers.officialName'),
    translate(lang, 'countryData.table.headers.area'),
    translate(lang, 'countryData.table.headers.capital'),
    translate(lang, 'countryData.table.headers.languages'),
    translate(lang, 'countryData.table.headers.currency'),
    translate(lang, 'countryData.table.headers.region'),
    translate(lang, 'countryData.table.headers.source'),
    translate(lang, 'countryData.table.headers.lastUpdated'),
    translate(lang, 'countryData.ui.title')
  ]);
  
  // 配列から値を取り出し
  const [
    title,
    loadingState,
    errorState,
    noDataState,
    searchLabel,
    searchPlaceholder,
    filterLabel,
    allRegions,
    headerName,
    headerOfficialName,
    headerArea,
    headerCapital,
    headerLanguages,
    headerCurrency,
    headerRegion,
    headerSource,
    headerLastUpdated,
    uiTitle
  ] = translations;

  const messages = {
    countryData: {
      title,
      states: {
        loading: loadingState,
        error: errorState,
        noData: noDataState,
      },
      search: {
        label: searchLabel,
        placeholder: searchPlaceholder,
      },
      filter: {
        label: filterLabel,
        allRegions,
      },
      table: {
        headers: {
          name: headerName,
          officialName: headerOfficialName,
          area: headerArea,
          capital: headerCapital,
          languages: headerLanguages,
          currency: headerCurrency,
          region: headerRegion,
          source: headerSource,
          lastUpdated: headerLastUpdated,
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
        <Header title={uiTitle} homeLink={`/${lang}/country-data`}>
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
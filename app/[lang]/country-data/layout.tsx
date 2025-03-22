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

  const messages = {
    countryData: {
      title: await translate(lang, 'countryData.title'),
      states: {
        loading: await translate(lang, 'countryData.states.loading'),
        error: await translate(lang, 'countryData.states.error'),
        noData: await translate(lang, 'countryData.states.noData'),
      },
      search: {
        label: await translate(lang, 'countryData.search.label'),
        placeholder: await translate(lang, 'countryData.search.placeholder'),
      },
      filter: {
        label: await translate(lang, 'countryData.filter.label'),
        allRegions: await translate(lang, 'countryData.filter.allRegions'),
      },
      table: {
        headers: {
          name: await translate(lang, 'countryData.table.headers.name'),
          officialName: await translate(lang, 'countryData.table.headers.officialName'),
          area: await translate(lang, 'countryData.table.headers.area'),
          capital: await translate(lang, 'countryData.table.headers.capital'),
          languages: await translate(lang, 'countryData.table.headers.languages'),
          currency: await translate(lang, 'countryData.table.headers.currency'),
          region: await translate(lang, 'countryData.table.headers.region'),
          source: await translate(lang, 'countryData.table.headers.source'),
          lastUpdated: await translate(lang, 'countryData.table.headers.lastUpdated'),
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
        <Header title={await translate(lang, 'countryData.ui.title')} homeLink={`/${lang}/country-data`}>
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
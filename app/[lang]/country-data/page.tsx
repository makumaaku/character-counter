import { translate, loadToolMessages, getLanguageFromParams } from '@/lib/i18n/server'
import CountryDataClient from './components/CountryDataClient'
import { Language } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function CountryDataPage({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'country-data');
    
  // サーバーコンポーネントで翻訳を並列取得
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
    headerLastUpdated
  ] = await Promise.all([
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
    translate(lang, 'countryData.table.headers.lastUpdated')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages = {
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
  };

  return (
    <CountryDataClient messages={messages} />
  );
} 
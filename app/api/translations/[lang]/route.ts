import { translate } from '@/lib/i18n/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { lang: string } }
) {
  const { lang } = params;

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

  return NextResponse.json(messages);
} 
'use client';

import { useEffect, useState, useCallback } from 'react';

type CountryData = {
  name: string;
  officialName: string;
  area: number;
  capital: string;
  languages: string;
  currency: string;
  region: string;
  source: string;
  lastUpdated: string;
};

type APICountryData = {
  name?: {
    common?: string;
    official?: string;
  };
  area?: number;
  capital?: string[];
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
  region?: string;
};

const TABLE_HEADERS: (keyof CountryData)[] = [
  'name',
  'officialName',
  'area',
  'capital',
  'languages',
  'currency',
  'region',
  'source',
  'lastUpdated'
];

// サーバーコンポーネントから渡される翻訳データの型
type Messages = {
  countryData: {
    title: string;
    states: {
      loading: string;
      error: string;
      noData: string;
    };
    search: {
      label: string;
      placeholder: string;
    };
    filter: {
      label: string;
      allRegions: string;
    };
    table: {
      headers: {
        name: string;
        officialName: string;
        area: string;
        capital: string;
        languages: string;
        currency: string;
        region: string;
        source: string;
        lastUpdated: string;
      };
    };
  };
};

function useMessages() {
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    const messagesScript = document.getElementById('messages');
    if (messagesScript) {
      const messages = JSON.parse(messagesScript.textContent || '{}');
      setMessages(messages);
    }
  }, []);

  return messages;
}

export default function CountryDataPage() {
  const [allCountriesData, setAllCountriesData] = useState<CountryData[]>([]);
  const [filteredData, setFilteredData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const messages = useMessages();

  // Convert filterData to useCallback with dependencies
  const filterData = useCallback(() => {
    const filtered = allCountriesData.filter(country => {
      const matchRegion = selectedRegion === 'all' || country.region === selectedRegion;
      const keyword = searchKeyword.toLowerCase();
      const matchKeyword =
        country.name.toLowerCase().includes(keyword) ||
        country.officialName.toLowerCase().includes(keyword) ||
        country.capital.toLowerCase().includes(keyword) ||
        country.languages.toLowerCase().includes(keyword) ||
        country.currency.toLowerCase().includes(keyword) ||
        country.region.toLowerCase().includes(keyword);
      return matchRegion && matchKeyword;
    });
    setFilteredData(filtered);
  }, [allCountriesData, selectedRegion, searchKeyword]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  // Update the useEffect to call filterData when dependencies change
  useEffect(() => {
    if (allCountriesData.length > 0) {
      filterData();
    }
  }, [allCountriesData, selectedRegion, searchKeyword, filterData]);

  const fetchCountryData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      const formattedData = data.map((country: APICountryData) => ({
        name: country.name?.common || "N/A",
        officialName: country.name?.official || "N/A",
        area: country.area || 0,
        capital: Array.isArray(country.capital) ? country.capital.join(", ") : "N/A",
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        currency: country.currencies ? Object.keys(country.currencies).join(", ") : "N/A",
        region: country.region || "N/A",
        source: "RestCountries",
        lastUpdated: new Date().toISOString().slice(0, 10)
      }));

      setAllCountriesData(formattedData);
      setFilteredData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };

  const sortDataByKey = (key: keyof CountryData) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (key === 'area') {
        return (a[key] - b[key]) * sortOrder;
      }
      return a[key].toString().localeCompare(b[key].toString()) * sortOrder;
    });
    setSortOrder(prev => prev * -1);
    setFilteredData(sorted);
  };

  const uniqueRegions = [...new Set(allCountriesData.map(c => c.region))].sort();

  if (!messages) {
    return <div className="text-center my-8 font-bold text-gray-600">Loading translations...</div>;
  }

  if (loading) {
    return <div className="text-center my-8 font-bold text-gray-600">{messages.countryData.states.loading}</div>;
  }

  if (error) {
    return <div className="text-center my-8 font-bold text-red-600">{messages.countryData.states.error}</div>;
  }

  return (
    <main className="p-4 max-w-7xl mx-auto bg-white dark:bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">{messages.countryData.title}</h1>
      
      <nav className="flex flex-wrap gap-4 items-center mb-6">
        <div>
          <label htmlFor="searchInput" className="mr-2 text-gray-900">{messages.countryData.search.label}</label>
          <input
            type="text"
            id="searchInput"
            className="px-3 py-1 border border-gray-300 rounded text-gray-900 bg-white"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            placeholder={messages.countryData.search.placeholder}
          />
        </div>

        <div>
          <label htmlFor="regionFilter" className="mr-2 text-gray-900">{messages.countryData.filter.label}</label>
          <select
            id="regionFilter"
            className="px-3 py-1 border border-gray-300 rounded text-gray-900 bg-white"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
            }}
          >
            <option value="all">{messages.countryData.filter.allRegions}</option>
            {uniqueRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </nav>

      {filteredData.length === 0 ? (
        <p className="text-red-600 font-bold">{messages.countryData.states.noData}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {TABLE_HEADERS.map((key) => (
                  <th
                    key={key}
                    onClick={() => sortDataByKey(key)}
                    className="p-3 text-left bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-900"
                  >
                    {messages.countryData.table.headers[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((country, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-900">{country.name}</td>
                  <td className="p-3 text-gray-900">{country.officialName}</td>
                  <td className="p-3 text-gray-900">{country.area.toLocaleString()}</td>
                  <td className="p-3 text-gray-900">{country.capital}</td>
                  <td className="p-3 text-gray-900">{country.languages}</td>
                  <td className="p-3 text-gray-900">{country.currency}</td>
                  <td className="p-3 text-gray-900">{country.region}</td>
                  <td className="p-3 text-gray-900">{country.source}</td>
                  <td className="p-3 text-gray-900">{country.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
} 
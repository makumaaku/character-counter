'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/i18n/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/loading-dots';
import { analyzeSEOVolume, CountryCode } from '../actions';

type SuggestResult = {
  keyword: string;
  originalKeyword: string; // 元のキーワード
  translatedKeyword: string; // 翻訳されたキーワード
  suggestions: string[];
  volumeScore: number;
  country: CountryCode;
};

type TranslationKeys = {
  placeholder: string;
  analyzeButton: string;
  volumeScore: string;
  suggestions: string;
  allSuggestions: string;
  errorEmptyKeyword: string;
  errorUnknown: string;
  scoreDescriptions: Record<number, string>;
  countrySelector: string;
  countryResult: string;
  countries: Record<CountryCode, string>;
  notice?: {
    title: string;
    language: string;
    location: string;
  };
};

type Props = {
  lang: Language;
  translations: TranslationKeys;
};

export default function SEOVolumeGuessForm({ lang, translations }: Props) {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState<CountryCode>(lang === 'ja' ? 'jp' : 'us'); // デフォルトは言語に応じて設定
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuggestResult | null>(null);
  const [previousCountry, setPreviousCountry] = useState<CountryCode | null>(null);

  // キーワード分析を実行する関数
  const analyzeKeyword = async (searchKeyword: string, targetCountry: CountryCode) => {
    if (!searchKeyword.trim()) {
      setError(translations.errorEmptyKeyword);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await analyzeSEOVolume(searchKeyword, lang, targetCountry);
      setResult(result);
      setPreviousCountry(targetCountry);
    } catch (error) {
      setError(error instanceof Error ? error.message : translations.errorUnknown);
    } finally {
      setIsLoading(false);
    }
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    analyzeKeyword(keyword, country);
  };

  // 国が変更されたら、現在のキーワードで再検索
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value as CountryCode;
    setCountry(newCountry);
    
    // キーワードが入力済みで、以前に検索結果がある場合のみ自動検索
    if (keyword.trim() && result) {
      analyzeKeyword(keyword, newCountry);
    }
  };

  // 星評価を表示する関数
  const renderStars = (score: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-2xl ${i < score ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      ));
  };

  return (
    <div>
      {/* 注意事項の表示 */}
      {translations.notice && (
        <div className="mb-8 p-4 bg-gray-800 border-l-4 border-yellow-500 rounded-md">
          <h3 className="text-lg font-medium text-white mb-2">{translations.notice.title}</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-300 text-sm">{translations.notice.language}</li>
            <li className="text-gray-300 text-sm">{translations.notice.location}</li>
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col gap-4 mb-4">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={translations.placeholder}
            className="flex-1 bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            disabled={isLoading}
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2">
              <label htmlFor="country-select" className="block mb-2 text-sm font-medium text-white">
                {translations.countrySelector}
              </label>
              <select
                id="country-select"
                value={country}
                onChange={handleCountryChange}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled={isLoading}
              >
                {Object.entries(translations.countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="sm:w-1/2 flex items-end">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <LoadingDots /> : translations.analyzeButton}
              </Button>
            </div>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>

      {result && (
        <div className="space-y-6">
          <Card className="bg-gray-700 border border-gray-600">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2 text-white">{translations.volumeScore}</h2>
              <div className="flex items-center mb-4">
                <div className="mr-2">{renderStars(result.volumeScore)}</div>
                <span className="text-sm text-gray-300">
                  ({result.suggestions.length} {translations.suggestions})
                </span>
              </div>
              <p className="text-sm text-gray-300">{translations.scoreDescriptions[result.volumeScore]}</p>
              <p className="text-sm text-gray-300 mt-2">
                {translations.countryResult.replace('{country}', translations.countries[result.country])}
              </p>
              
              {/* 翻訳されたキーワードの表示 */}
              {result.translatedKeyword && result.translatedKeyword !== result.originalKeyword && (
                <p className="text-sm text-gray-300 mt-2 border-t border-gray-600 pt-2">
                  検索キーワード: {result.originalKeyword} → {result.translatedKeyword}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-700 border border-gray-600">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2 text-white">{translations.allSuggestions}</h2>
              <div className="max-h-60 overflow-y-auto">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-gray-200 truncate">• {suggestion}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 
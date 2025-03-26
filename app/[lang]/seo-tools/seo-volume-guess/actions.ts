'use server'

import { Language } from '@/lib/i18n/types';

// 国コードの型定義
export type CountryCode = 'jp' | 'us' | 'gb' | 'au' | 'ca' | 'de' | 'fr' | 'in';

// 国コードに対応する言語コード
const countryToLanguage: Record<CountryCode, string> = {
  jp: 'ja', // 日本語
  us: 'en', // 英語
  gb: 'en', // 英語
  au: 'en', // 英語
  ca: 'en', // 英語
  de: 'de', // ドイツ語
  fr: 'fr', // フランス語
  in: 'en'  // 英語（インド）
};

// 「パン」に対する各国言語での翻訳例（本来は翻訳APIを使うべき）
const commonWordExamples: Record<string, Record<CountryCode, string>> = {
  'パン': {
    jp: 'パン',
    us: 'bread',
    gb: 'bread',
    au: 'bread',
    ca: 'bread',
    de: 'brot',
    fr: 'pain',
    in: 'bread'
  },
  'ラーメン': {
    jp: 'ラーメン',
    us: 'ramen',
    gb: 'ramen',
    au: 'ramen',
    ca: 'ramen',
    de: 'ramen',
    fr: 'ramen',
    in: 'ramen'
  },
  'コーヒー': {
    jp: 'コーヒー',
    us: 'coffee',
    gb: 'coffee',
    au: 'coffee',
    ca: 'coffee',
    de: 'kaffee',
    fr: 'café',
    in: 'coffee'
  }
};

// ユーザーの検索キーワードを対象国の言語に変換する
function translateKeyword(keyword: string, country: CountryCode): string {
  // よく使われる単語の翻訳例があればそれを使う
  if (commonWordExamples[keyword] && commonWordExamples[keyword][country]) {
    return commonWordExamples[keyword][country];
  }
  
  // 本来は翻訳APIを使用するべきだが、ここでは簡易的な実装
  // 日本語キーワードが多いと想定し、日本語以外の国では検索しにくいのでそのまま返す
  return keyword;
}

type SuggestResult = {
  keyword: string;
  originalKeyword: string; // 元のキーワード
  translatedKeyword: string; // 翻訳されたキーワード（表示用）
  suggestions: string[];
  volumeScore: number;
  country: CountryCode; // 使用した国コード
};

/**
 * Google検索サジェストを取得する関数
 */
async function fetchGoogleSuggestions(keyword: string, prefix: string, country: CountryCode = 'us'): Promise<string[]> {
  try {
    // 国に対応する言語コードを取得
    const language = countryToLanguage[country];
    
    // キャッシュ回避のためのランダムパラメータ
    const timestamp = Date.now();
    
    // キーワードを対象国の言語に翻訳
    const translatedKeyword = translateKeyword(keyword, country);
    
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
      `${translatedKeyword} ${prefix}`
    )}&gl=${country}&hl=${language}&_=${timestamp}`;
    
    console.log(`Fetching suggestions for: ${url}`);
    
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const data = await response.json();
    return data[1] || [];
  } catch (error) {
    console.error('Error fetching Google suggestions:', error);
    return [];
  }
}

/**
 * すべてのアルファベットのサジェストを取得
 */
async function fetchAllSuggestions(keyword: string, country: CountryCode): Promise<string[]> {
  // 国の言語に応じてプレフィックスを変更
  let prefixes: string[] = [];
  
  // 言語によってプレフィックスを変える（アルファベット以外の言語への対応）
  if (country === 'jp') {
    // 日本語のプレフィックス（あいうえお + アルファベット）
    prefixes = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'.split('');
    // 一部のアルファベットも追加
    prefixes = [...prefixes, ...('abcdefghijklmnopqrstuvwxyz'.split(''))];
  } else {
    // 基本はアルファベット
    prefixes = 'abcdefghijklmnopqrstuvwxyz'.split('');
  }
  
  // 同時リクエスト数を制限してAPIの制限を避ける
  const allSuggestions: string[] = [];
  const batchSize = 5; // 一度に処理するプレフィックスの数
  
  for (let i = 0; i < prefixes.length; i += batchSize) {
    const batch = prefixes.slice(i, i + batchSize);
    const promises = batch.map(prefix => fetchGoogleSuggestions(keyword, prefix, country));
    const results = await Promise.all(promises);
    
    results.forEach(suggestions => {
      allSuggestions.push(...suggestions);
    });
    
    // APIの制限を避けるために少し待機
    if (i + batchSize < prefixes.length) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  // 重複を削除
  return [...new Set(allSuggestions)];
}

/**
 * 検索ボリュームのスコアを計算（1〜5）
 */
function calculateVolumeScore(suggestions: string[]): number {
  const count = suggestions.length;
  
  if (count >= 200) return 5;
  if (count >= 150) return 4;
  if (count >= 100) return 3;
  if (count >= 50) return 2;
  return 1;
}

/**
 * キーワード解析メイン関数
 */
export async function analyzeSEOVolume(
  keyword: string, 
  lang: Language,
  country: CountryCode = 'us' // デフォルトは米国
): Promise<SuggestResult> {
  if (!keyword.trim()) {
    throw new Error(lang === 'ja' ? 'キーワードを入力してください' : 'Please enter a keyword');
  }
  
  // キーワードを対象国の言語に翻訳
  const translatedKeyword = translateKeyword(keyword, country);
  
  // 翻訳後のキーワードを使ってサジェストを取得
  const suggestions = await fetchAllSuggestions(keyword, country);
  const volumeScore = calculateVolumeScore(suggestions);
  
  return {
    keyword,
    originalKeyword: keyword,
    translatedKeyword: translatedKeyword !== keyword ? translatedKeyword : keyword,
    suggestions,
    volumeScore,
    country
  };
} 
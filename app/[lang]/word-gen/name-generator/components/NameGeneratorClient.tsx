'use client';

import { useState, useEffect } from 'react';
import DownloadButton from '../../components/DownloadButton';
import { WordGenNameGeneratorMessages } from '@/lib/i18n/types';

type Props = {
  messages: WordGenNameGeneratorMessages;
  lang: string;
};

type NameData = {
  male_first_names: string[];
  female_first_names: string[];
  last_names: string[];
};

// 名前データを保持するステート
const useNameData = (lang: string) => {
  const [nameData, setNameData] = useState<NameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNameData = async () => {
      try {
        setLoading(true);
        // APIルートを使用してデータを取得
        const response = await fetch(`/${lang}/api/word-gen/name-generator`);
        
        if (!response.ok) {
          throw new Error(`Failed to load name data: ${response.status}`);
        }
        
        const data = await response.json();
        setNameData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading name data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchNameData();
  }, [lang]);

  return { nameData, loading, error };
};

// 名前生成のためのヘルパー関数
const generateRandomName = (nameData: NameData | null, language: string) => {
  if (!nameData) {
    return 'Loading...';
  }
  
  // 男性名と女性名を合わせる
  const firstNames = [...nameData.male_first_names, ...nameData.female_first_names];
  const lastNames = nameData.last_names;

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  // 日本語の場合は姓名の順（lastname firstname）、それ以外は名姓の順（firstname lastname）
  return language === 'ja' ? `${lastName} ${firstName}` : `${firstName} ${lastName}`;
};

export default function NameGeneratorClient({ messages, lang }: Props) {  
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameCount, setNameCount] = useState(10);
  const [copied, setCopied] = useState(false);
  const { nameData, loading, error } = useNameData(lang);

  const generateNames = () => {
    if (!nameData) return;
    
    const names = Array.from({ length: nameCount }, () => generateRandomName(nameData, lang));
    setGeneratedNames(names);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedNames.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // messagesから各セクションの翻訳を取得
  const {  form, result } = messages;

  return (
    <div>
      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="nameCount" className="block text-sm font-medium mb-2">
            {form.count.label}
          </label>
          <input
            type="number"
            id="nameCount"
            min="1"
            max="100"
            value={nameCount}
            onChange={(e) => setNameCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="bg-gray-800 text-white px-3 py-2 rounded w-32"
          />
        </div>
        <button
          onClick={generateNames}
          disabled={loading || !!error}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {form.generate}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-800 text-white rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{result.title}</h2>
          {generatedNames.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
                title={result.copyTitle}
              >
                {copied ? result.copied : result.copy}
              </button>
              <DownloadButton
                content={generatedNames.join('\n')}
                filename="generated-names.txt"
                downloadText={result.download}
                downloadedText={result.downloaded}
              />
            </div>
          )}
        </div>
        {loading ? (
          <p className="text-gray-400">Loading name data...</p>
        ) : generatedNames.length > 0 ? (
          <div className="bg-gray-800 p-4 rounded max-h-96 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {generatedNames.map((name, index) => (
                <span key={index} className="inline-block bg-gray-700 text-white px-3 py-1 rounded">
                  {name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">{result.empty}</p>
        )}
      </div>
    </div>
  );
} 
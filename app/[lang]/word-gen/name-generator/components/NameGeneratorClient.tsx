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
  const { title, form, result, about } = messages;

  return (
    <div>
      <div className="mb-6">
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
          className="bg-gray-800 text-white px-3 py-2 rounded w-32 mr-4"
        />
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

      {/* About Section */}
      <div className="mt-12 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-300 mb-6">{about.catchphrase}</p>
          <p className="text-gray-400">{about.introduction}</p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{about.features.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.features.oneClick.title}</h4>
              <p className="text-gray-400">{about.features.oneClick.description}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.features.patterns.title}</h4>
              <p className="text-gray-400">{about.features.patterns.description}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.features.categories.title}</h4>
              <p className="text-gray-400">{about.features.categories.description}</p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{about.useCases.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.useCases.character.title}</h4>
              <p className="text-gray-400">{about.useCases.character.description}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.useCases.branding.title}</h4>
              <p className="text-gray-400">{about.useCases.branding.description}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.useCases.personal.title}</h4>
              <p className="text-gray-400">{about.useCases.personal.description}</p>
            </div>
          </div>
        </div>

        {/* Technical Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{about.technical.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.technical.algorithm.title}</h4>
              <p className="text-gray-400">{about.technical.algorithm.description}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.technical.updates.title}</h4>
              <p className="text-gray-400">{about.technical.updates.description}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.technical.responsive.title}</h4>
              <p className="text-gray-400">{about.technical.responsive.description}</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{about.faq.title}</h3>
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.faq.commercial.question}</h4>
              <p className="text-gray-400">{about.faq.commercial.answer}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.faq.categories.question}</h4>
              <p className="text-gray-400">{about.faq.categories.answer}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{about.faq.retry.question}</h4>
              <p className="text-gray-400">{about.faq.retry.answer}</p>
            </div>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{about.conclusion.title}</h3>
          <p className="text-gray-400">{about.conclusion.description}</p>
        </div>
      </div>
    </div>
  );
} 
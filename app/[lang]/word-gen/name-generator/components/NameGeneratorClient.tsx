'use client';

import { useState } from 'react';
import { translate } from '@/lib/i18n/client';

type Props = {
  lang: string;
};

// 名前生成のためのヘルパー関数
const generateRandomName = () => {
  const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn',
    '太郎', '次郎', '三郎', '四郎', '五郎', '一郎', '正', '誠', '勇', '優',
    '花子', '桜', '梅', '菊', '椿', '紅', '愛', '美', '優', '真'];
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    '田中', '鈴木', '佐藤', '高橋', '渡辺', '伊藤', '山本', '中村', '小林', '加藤'];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

export default function NameGeneratorClient({ lang }: Props) {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameCount, setNameCount] = useState(10);
  const [copied, setCopied] = useState(false);

  const generateNames = () => {
    const names = Array.from({ length: nameCount }, () => generateRandomName());
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

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="nameCount" className="block text-sm font-medium mb-2">
          {translate(lang, 'nameGenerator.form.count.label')}
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
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded transition-colors"
        >
          {translate(lang, 'nameGenerator.form.generate')}
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{translate(lang, 'nameGenerator.result.title')}</h2>
          {generatedNames.length > 0 && (
            <button
              onClick={copyToClipboard}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
              title={translate(lang, 'nameGenerator.result.copyTitle')}
            >
              {copied ? translate(lang, 'nameGenerator.result.copied') : translate(lang, 'nameGenerator.result.copy')}
            </button>
          )}
        </div>
        {generatedNames.length > 0 ? (
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
          <p className="text-gray-400">{translate(lang, 'nameGenerator.result.empty')}</p>
        )}
      </div>
    </div>
  );
} 
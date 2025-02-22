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

      {/* About Section */}
      <div className="mt-12 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{translate(lang, 'nameGenerator.title')}</h2>
          <p className="text-xl text-gray-300 mb-6">{translate(lang, 'nameGenerator.about.catchphrase')}</p>
          <p className="text-gray-400">{translate(lang, 'nameGenerator.about.introduction')}</p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{translate(lang, 'nameGenerator.about.features.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.features.oneClick.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.features.oneClick.description')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.features.patterns.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.features.patterns.description')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.features.categories.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.features.categories.description')}</p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{translate(lang, 'nameGenerator.about.useCases.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.useCases.character.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.useCases.character.description')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.useCases.branding.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.useCases.branding.description')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.useCases.personal.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.useCases.personal.description')}</p>
            </div>
          </div>
        </div>

        {/* Technical Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{translate(lang, 'nameGenerator.about.technical.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.technical.algorithm.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.technical.algorithm.description')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.technical.updates.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.technical.updates.description')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.technical.responsive.title')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.technical.responsive.description')}</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{translate(lang, 'nameGenerator.about.faq.title')}</h3>
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.faq.commercial.question')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.faq.commercial.answer')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.faq.categories.question')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.faq.categories.answer')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'nameGenerator.about.faq.retry.question')}</h4>
              <p className="text-gray-400">{translate(lang, 'nameGenerator.about.faq.retry.answer')}</p>
            </div>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{translate(lang, 'nameGenerator.about.conclusion.title')}</h3>
          <p className="text-gray-400">{translate(lang, 'nameGenerator.about.conclusion.description')}</p>
        </div>
      </div>
    </div>
  );
} 
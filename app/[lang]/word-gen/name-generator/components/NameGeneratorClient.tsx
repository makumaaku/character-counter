'use client';

import { useState } from 'react';
import { translate } from '@/lib/i18n/client';

type Props = {
  lang: string;
};

export default function NameGeneratorClient({ lang }: Props) {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameCount, setNameCount] = useState(10);
  const [copied, setCopied] = useState(false);

  const generateNames = () => {
    // Name generation logic here
    const names = ['John Smith', 'Jane Doe', 'Bob Johnson']; // Placeholder
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
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
            >
              {copied ? translate(lang, 'nameGenerator.result.copied') : translate(lang, 'nameGenerator.result.copy')}
            </button>
          )}
        </div>
        {generatedNames.length > 0 ? (
          <div className="bg-gray-800 p-4 rounded">
            {generatedNames.map((name, index) => (
              <span key={index} className="inline-block bg-gray-700 text-white px-3 py-1 rounded m-1">
                {name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">{translate(lang, 'nameGenerator.result.empty')}</p>
        )}
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { translate } from '@/lib/i18n/client';

type Props = {
  params: { lang: string }
}

export default function SentenceGenerator({ params: { lang } }: Props) {
  const [generatedSentences, setGeneratedSentences] = useState<string[]>([]);
  const [sentenceCount, setSentenceCount] = useState(5);
  const [showToast, setShowToast] = useState(false);

  const generateSentences = () => {
    // TODO: Implement sentence generation logic
    const sentences = [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "All that glitters is not gold.",
      "Actions speak louder than words.",
      "Beauty is in the eye of the beholder."
    ];
    setGeneratedSentences(sentences.slice(0, sentenceCount));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedSentences.join('\n'));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'wordGen.tools.sentenceGenerator.title')}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {translate(lang, 'wordGen.tools.sentenceGenerator.description')}
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {translate(lang, 'sentenceGenerator.form.count.label')}
            </label>
            <input
              type="number"
              value={sentenceCount}
              onChange={(e) => setSentenceCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
              className="bg-gray-800 text-white px-3 py-2 rounded w-32"
              min="1"
              max="10"
            />
          </div>
          
          <button
            onClick={generateSentences}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            {translate(lang, 'sentenceGenerator.form.generate')}
          </button>
        </div>

        <div className="relative mt-6">
          <div className="w-full bg-gray-900 text-gray-100 p-6 rounded-lg min-h-[200px]">
            {generatedSentences.length > 0 ? (
              <div className="space-y-4">
                {generatedSentences.map((sentence, index) => (
                  <p key={index}>{sentence}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">{translate(lang, 'sentenceGenerator.result.empty')}</p>
            )}
          </div>
          {generatedSentences.length > 0 && (
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              title={translate(lang, 'sentenceGenerator.result.copyTitle')}
            >
              {translate(lang, 'sentenceGenerator.form.copy')}
            </button>
          )}
          {showToast && (
            <div className="absolute right-4 top-full mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
              {translate(lang, 'sentenceGenerator.result.copied')}
            </div>
          )}
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">{translate(lang, 'sentenceGenerator.about.title')}</h2>
          <p className="mb-4">{translate(lang, 'sentenceGenerator.about.description')}</p>
          
          <h3 className="text-xl font-bold mb-4">{translate(lang, 'sentenceGenerator.features.title')}</h3>
          <ul className="list-disc pl-5">
            <li>{translate(lang, 'sentenceGenerator.features.random')}</li>
            <li>{translate(lang, 'sentenceGenerator.features.customizable')}</li>
            <li>{translate(lang, 'sentenceGenerator.features.instant')}</li>
            <li>{translate(lang, 'sentenceGenerator.features.copy')}</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-4">{translate(lang, 'sentenceGenerator.useCases.title')}</h3>
          <ul className="list-disc pl-5">
            <li>{translate(lang, 'sentenceGenerator.useCases.writing')}</li>
            <li>{translate(lang, 'sentenceGenerator.useCases.learning')}</li>
            <li>{translate(lang, 'sentenceGenerator.useCases.testing')}</li>
            <li>{translate(lang, 'sentenceGenerator.useCases.inspiration')}</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 
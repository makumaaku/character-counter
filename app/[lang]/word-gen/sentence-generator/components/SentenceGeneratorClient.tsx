'use client';

import { useState } from 'react';
import { translate } from '@/lib/i18n/client';

type Props = {
  lang: string;
};

export default function SentenceGeneratorClient({ lang }: Props) {
  const [generatedSentences, setGeneratedSentences] = useState<string[]>([]);
  const [sentenceCount, setSentenceCount] = useState<string>('5');
  const [showToast, setShowToast] = useState(false);

  const generateSentences = () => {
    const count = Math.min(20, Math.max(1, parseInt(sentenceCount) || 1));
    // TODO: Implement sentence generation logic
    const sentences = [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "All that glitters is not gold.",
      "Actions speak louder than words.",
      "Beauty is in the eye of the beholder.",
      "Time heals all wounds.",
      "Knowledge is power.",
      "Practice makes perfect.",
      "Better late than never.",
      "Every cloud has a silver lining.",
      "Fortune favors the bold.",
      "Hope for the best, prepare for the worst.",
      "Actions speak louder than words.",
      "Where there's a will, there's a way.",
      "Time is money.",
      "Life is what happens while you're busy making other plans.",
      "The early bird catches the worm.",
      "Don't put all your eggs in one basket.",
      "When in Rome, do as the Romans do.",
      "A picture is worth a thousand words."
    ];
    setGeneratedSentences(sentences.slice(0, count));
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
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {translate(lang, 'sentenceGenerator.form.count.label')}
        </label>
        <input
          type="number"
          value={sentenceCount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setSentenceCount('');
            } else {
              const num = parseInt(value);
              if (!isNaN(num)) {
                setSentenceCount(value);
              }
            }
          }}
          onBlur={(e) => {
            const num = parseInt(e.target.value);
            if (isNaN(num) || num < 1) {
              setSentenceCount('1');
            } else if (num > 20) {
              setSentenceCount('20');
            }
          }}
          className="bg-gray-800 text-white px-3 py-2 rounded w-32"
          min="1"
          max="20"
        />
      </div>
      
      <button
        onClick={generateSentences}
        className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
      >
        {translate(lang, 'sentenceGenerator.form.generate')}
      </button>

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
        <p className="mb-4 text-left">{translate(lang, 'sentenceGenerator.about.description')}</p>
        
        <div className="text-left">
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
      </div>
    </>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { translate } from '@/lib/i18n/client';
import DownloadButton from '../../components/DownloadButton';

type Props = {
  lang: string;
};

type SentencesData = {
  sentences: string[];
};

export default function SentenceGeneratorClient({ lang }: Props) {
  const [generatedSentences, setGeneratedSentences] = useState<string[]>([]);
  const [sentenceCount, setSentenceCount] = useState<string>('5');
  const [showToast, setShowToast] = useState(false);
  const [allSentences, setAllSentences] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await fetch(`/${lang}/api/word-gen/sentence-generator`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch sentences: ${response.status}`);
        }
        
        const data: SentencesData = await response.json();
        setAllSentences(data.sentences);
        setError(null);
      } catch (err) {
        console.error('Error fetching sentences:', err);
        setError('Failed to load sentences. Please try again later.');
      }
    };

    fetchSentences();
  }, [lang]);

  const generateSentences = () => {
    if (allSentences.length === 0) {
      setError('No sentences available. Please try again later.');
      return;
    }

    const count = Math.min(20, Math.max(1, parseInt(sentenceCount) || 1));
    const selectedSentences: string[] = [];
    const usedIndices = new Set<number>();

    // Select random sentences without repetition
    while (selectedSentences.length < count && usedIndices.size < allSentences.length) {
      const randomIndex = Math.floor(Math.random() * allSentences.length);
      
      if (!usedIndices.has(randomIndex)) {
        selectedSentences.push(allSentences[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    setGeneratedSentences(selectedSentences);
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
          {error ? (
            <p className="text-red-400">{error}</p>
          ) : generatedSentences.length > 0 ? (
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
          <div className="mt-4 flex justify-end space-x-2">
            <div className="relative">
              <button
                onClick={handleCopy}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
                title={translate(lang, 'sentenceGenerator.result.copyTitle')}
              >
                {translate(lang, 'sentenceGenerator.form.copy')}
              </button>
              {showToast && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg whitespace-nowrap">
                  {translate(lang, 'sentenceGenerator.result.copied')}
                </div>
              )}
            </div>
            <DownloadButton
              content={generatedSentences.join('\n')}
              filename="generated-sentences.txt"
            />
          </div>
        )}
      </div>

      {/* Detailed Content Section */}
      <div className="bg-gray-800 p-8 rounded-lg mt-8 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">{translate(lang, 'sentenceGenerator.title')}</h2>
          <p className="text-xl text-gray-300">{translate(lang, 'sentenceGenerator.detailedContent.catchphrase')}</p>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">{translate(lang, 'sentenceGenerator.detailedContent.introduction')}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{translate(lang, 'sentenceGenerator.detailedContent.features.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.features.easyOperation.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.features.easyOperation.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.features.patterns.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.features.patterns.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.features.customization.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.features.customization.description')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{translate(lang, 'sentenceGenerator.detailedContent.useCases.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.useCases.writer.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.useCases.writer.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.useCases.creative.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.useCases.creative.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.useCases.education.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.useCases.education.description')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{translate(lang, 'sentenceGenerator.detailedContent.technical.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.technical.nlp.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.technical.nlp.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.technical.database.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.technical.database.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{translate(lang, 'sentenceGenerator.detailedContent.technical.performance.title')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.technical.performance.description')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{translate(lang, 'sentenceGenerator.detailedContent.faq.title')}</h3>
          <div className="space-y-4">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'sentenceGenerator.detailedContent.faq.quality.question')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.faq.quality.answer')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'sentenceGenerator.detailedContent.faq.commercial.question')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.faq.commercial.answer')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{translate(lang, 'sentenceGenerator.detailedContent.faq.style.question')}</h4>
              <p>{translate(lang, 'sentenceGenerator.detailedContent.faq.style.answer')}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">{translate(lang, 'sentenceGenerator.detailedContent.conclusion.title')}</h3>
          <p>{translate(lang, 'sentenceGenerator.detailedContent.conclusion.description')}</p>
        </div>
      </div>
    </>
  );
} 
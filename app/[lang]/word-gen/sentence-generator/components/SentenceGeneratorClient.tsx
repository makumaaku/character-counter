'use client';

import { useState, useEffect } from 'react';
import DownloadButton from '../../components/DownloadButton';
import CopyButton from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import { WordGenSentenceGeneratorMessages } from '@/lib/i18n/types';

type Props = {
  messages: WordGenSentenceGeneratorMessages;
  lang: string;
};

type SentencesData = {
  sentences: string[];
};

export default function SentenceGeneratorClient({ messages, lang }: Props) {
  const [generatedSentences, setGeneratedSentences] = useState<string[]>([]);
  const [sentenceCount, setSentenceCount] = useState<string>('5');
  const [allSentences, setAllSentences] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // messagesからテキストを取得
  const { title, form, result, detailedContent } = messages;

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

  return (
    <>
      <div className="mb-6">
        <label htmlFor="sentence-count" className="block text-sm font-medium mb-2">
          {form.count.label}
        </label>
        <input
          id="sentence-count"
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
          aria-label={form.count.label}
        />
      </div>
      
      <Button
        onClick={generateSentences}
        variant="purple"
        size="lg"
        aria-label={form.generate}
      >
        {form.generate}
      </Button>

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
            <p className="text-gray-400">{result.empty}</p>
          )}
        </div>
        {generatedSentences.length > 0 && (
          <div className="mt-4 flex justify-end space-x-2">
            <CopyButton
              text={generatedSentences.join('\n')}
              copyText={form.copy}
              toastText={result.copied}
              variant="purple"
              className="px-4 py-2"
              aria-label={form.copy}
            />
            <DownloadButton
              content={generatedSentences.join('\n')}
              filename="generated-sentences.txt"
              variant='purple'
              aria-label="Download generated sentences"
            />
          </div>
        )}
      </div>

      {/* Detailed Content Section */}
      <div className="bg-gray-800 p-8 rounded-lg mt-8 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">{title}</h2>
          <p className="text-xl text-gray-300">{detailedContent.catchphrase}</p>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">{detailedContent.introduction}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{detailedContent.features.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.features.easyOperation.title}</h4>
              <p>{detailedContent.features.easyOperation.description}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.features.patterns.title}</h4>
              <p>{detailedContent.features.patterns.description}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.features.customization.title}</h4>
              <p>{detailedContent.features.customization.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{detailedContent.useCases.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.useCases.writer.title}</h4>
              <p>{detailedContent.useCases.writer.description}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.useCases.creative.title}</h4>
              <p>{detailedContent.useCases.creative.description}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.useCases.education.title}</h4>
              <p>{detailedContent.useCases.education.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{detailedContent.technical.title}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.technical.nlp.title}</h4>
              <p>{detailedContent.technical.nlp.description}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.technical.database.title}</h4>
              <p>{detailedContent.technical.database.description}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{detailedContent.technical.performance.title}</h4>
              <p>{detailedContent.technical.performance.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400">{detailedContent.faq.title}</h3>
          <div className="space-y-4">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{detailedContent.faq.quality.question}</h4>
              <p>{detailedContent.faq.quality.answer}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{detailedContent.faq.commercial.question}</h4>
              <p>{detailedContent.faq.commercial.answer}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{detailedContent.faq.style.question}</h4>
              <p>{detailedContent.faq.style.answer}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">{detailedContent.conclusion.title}</h3>
          <p>{detailedContent.conclusion.description}</p>
        </div>
      </div>
    </>
  );
} 
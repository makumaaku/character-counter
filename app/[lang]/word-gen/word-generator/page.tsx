"use client";

import { useState } from "react";
import { translate } from '@/lib/i18n/server'
import words from '../../../../public/words/words.json'

type Props = {
  params: { lang: string }
}

export default function WordGenerator({ params: { lang } }: Props) {
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState<number>(10);
  const [minLength, setMinLength] = useState(3)
  const [maxLength, setMaxLength] = useState(8)
  const [pattern, setPattern] = useState('')
  const [copied, setCopied] = useState(false)

  const generateWords = () => {
    if (wordCount < 1) {
      setWordCount(1);
      return;
    }
    const selectedWords = [];
    
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * words.words.length);
      selectedWords.push(words.words[randomIndex]);
    }
    
    setGeneratedWords(selectedWords);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedWords.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'wordGenerator.title')}</h1>
          <p className="text-xl text-gray-300">
            {translate(lang, 'wordGenerator.description')}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {translate(lang, 'wordGenerator.form.length.label')}
              </label>
              <div className="flex gap-4">
                <div>
                  <label className="block text-xs text-gray-400">
                    {translate(lang, 'wordGenerator.form.length.min')}
                  </label>
                  <input
                    type="number"
                    value={minLength}
                    onChange={(e) => setMinLength(Number(e.target.value))}
                    className="bg-gray-800 text-white px-3 py-2 rounded w-24"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400">
                    {translate(lang, 'wordGenerator.form.length.max')}
                  </label>
                  <input
                    type="number"
                    value={maxLength}
                    onChange={(e) => setMaxLength(Number(e.target.value))}
                    className="bg-gray-800 text-white px-3 py-2 rounded w-24"
                    min="1"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {translate(lang, 'wordGenerator.form.pattern.label')}
              </label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder={translate(lang, 'wordGenerator.form.pattern.placeholder')}
                className="bg-gray-800 text-white px-3 py-2 rounded w-full"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {translate(lang, 'wordGenerator.form.count.label')}
            </label>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setWordCount(0);
                } else {
                  const num = parseInt(value);
                  if (!isNaN(num)) {
                    setWordCount(Math.min(100, Math.max(1, num)));
                  }
                }
              }}
              placeholder={translate(lang, 'wordGenerator.form.count.placeholder')}
              className="bg-gray-800 text-white px-3 py-2 rounded w-full md:w-1/3"
              min="1"
              max="100"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={generateWords}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
            >
              {translate(lang, 'wordGenerator.form.generate')}
            </button>
            <button
              onClick={() => {
                setMinLength(3)
                setMaxLength(8)
                setPattern('')
                setWordCount(10)
                setGeneratedWords([])
              }}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded transition-colors"
            >
              {translate(lang, 'wordGenerator.form.clear')}
            </button>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{translate(lang, 'wordGenerator.result.title')}</h2>
            {generatedWords.length > 0 && (
              <button
                onClick={copyToClipboard}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
              >
                {copied ? translate(lang, 'wordGenerator.result.copied') : translate(lang, 'wordGenerator.result.copy')}
              </button>
            )}
          </div>
          {generatedWords.length > 0 ? (
            <div className="bg-gray-800 p-4 rounded">
              {generatedWords.map((word, index) => (
                <span key={index} className="inline-block bg-gray-700 text-white px-3 py-1 rounded m-1">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">{translate(lang, 'wordGenerator.result.empty')}</p>
          )}
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { translate } from '@/lib/i18n/client';

export function CharacterCounterClient() {
  const params = useParams();
  const lang = params.lang as string;
  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(t('characterCounter.placeholder'));
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationStartedRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  useEffect(() => {
    if (!animationStartedRef.current) {
      animationStartedRef.current = true;
      const fullPlaceholder = '...';
      let i = 0;
      const animate = () => {
        if (i < fullPlaceholder.length) {
          setPlaceholderText(t('characterCounter.placeholder') + fullPlaceholder.substring(0, i + 1));
          i++;
        } else {
          i = 0;
        }
      };
      animationIntervalRef.current = setInterval(animate, 300);
    }
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [lang, t]);

  const charCount = text.length;
  const newlineCount = (text.match(/\n/g) || []).length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const byteCount = new TextEncoder().encode(text).length;

  const countOccurrences = (str: string, searchStr: string) => {
    if (!searchStr) return 0;
    return (str.match(new RegExp(searchStr, 'g')) || []).length;
  };

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        {/* Counter Section */}
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h2 className="text-xl mb-4">{t('characterCounter.charCount')}</h2>
          <p className="text-4xl font-bold">{charCount}</p>
        </div>

        <div className="relative">
          <textarea
            className="w-full mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={placeholderText}
            rows={6}
            value={text}
            onChange={handleChange}
          />
          <button
            onClick={handleCopy}
            className="absolute bottom-4 right-4 text-white hover:text-gray-300 transition-colors"
            title={t('characterCounter.copyText')}
          >
            <Image 
              src="/copy_icon_white.png" 
              alt={t('characterCounter.copyText')}
              width={20}
              height={20}
            />
          </button>
          {showToast && (
            <div className="absolute right-4 top-full mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
              {t('characterCounter.copied')}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">{t('characterCounter.lineCount')}</h3>
            <p className="text-3xl font-bold">{newlineCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">{t('characterCounter.wordCount')}</h3>
            <p className="text-3xl font-bold">{wordCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">{t('characterCounter.byteCount')}</h3>
            <p className="text-3xl font-bold">{byteCount}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h3 className="text-xl mb-4 text-center">{t('characterCounter.searchString')}</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder={t('characterCounter.enterSearchString')}
              className="flex-1 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchString}
              onChange={handleSearchChange}
            />
            {searchString && (
              <div className="bg-gray-800 p-4 rounded-lg flex-1 text-center">
                <span className="text-purple-400 font-mono">{searchString}</span>
                <span className="ml-2">{t('characterCounter.occurrences')}:</span>
                <span className="text-2xl font-bold ml-2">
                  {countOccurrences(text, searchString)}
                </span>
              </div>
            )}
          </div>
          
          {searchString && text && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">{t('characterCounter.searchResultPreview')}:</p>
              <div className="font-mono break-all">
                {text.split(new RegExp(`(${searchString})`, 'g')).map((part, i) => 
                  part === searchString ? (
                    <span key={i} className="bg-purple-500 px-1 rounded">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mt-16 mb-4">{t('characterCounter.content.hero.title')}</h2>
          <p className="text-lg text-gray-300 mb-2">{t('characterCounter.content.hero.description')}</p>
          <p className="text-sm text-purple-400">{t('characterCounter.content.hero.darkMode')}</p>
        </div>

        {/* How To Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('characterCounter.content.howTo.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.howTo.steps.input.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.howTo.steps.input.description')}</p>
              <p className="text-sm text-purple-400 mt-2">{t('characterCounter.content.howTo.steps.input.note')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.howTo.steps.realtime.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.howTo.steps.realtime.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.howTo.steps.utilize.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.howTo.steps.utilize.description')}</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('characterCounter.content.testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.testimonials.users.writer.name')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.testimonials.users.writer.comment')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.testimonials.users.social.name')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.testimonials.users.social.comment')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.testimonials.users.marketer.name')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.testimonials.users.marketer.comment')}</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('characterCounter.content.features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.features.items.easy.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.features.items.easy.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.features.items.accurate.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.features.items.accurate.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.features.items.free.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.features.items.free.description')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.features.items.darkMode.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.features.items.darkMode.description')}</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('characterCounter.content.faq.title')}</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.faq.questions.what.question')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.faq.questions.what.answer')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.faq.questions.usage.question')}</h3>
              <p className="text-gray-300 whitespace-pre-line">{t('characterCounter.content.faq.questions.usage.answer')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.faq.questions.counting.question')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.faq.questions.counting.answer')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.faq.questions.languages.question')}</h3>
              <p className="text-gray-300">{t('characterCounter.content.faq.questions.languages.answer')}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('characterCounter.content.faq.questions.pricing.question')}</h3>
              <p className="text-gray-300 whitespace-pre-line">{t('characterCounter.content.faq.questions.pricing.answer')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
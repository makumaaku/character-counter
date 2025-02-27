'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { translate } from '@/lib/i18n/client';

interface StoryData {
  characters: string[]
  events: string[]
  endings: string[]
}

type Props = {
  lang: string;
};

export default function StoryGeneratorClient({ lang }: Props) {
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [story, setStory] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch('/words/story.json')
      .then(response => response.json())
      .then(data => setStoryData(data))
      .catch(error => console.error('Error loading story data:', error))
  }, []);

  const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

  const generateStory = () => {
    if (!storyData) return;

    const charPick = storyData.characters[getRandomIndex(storyData.characters.length)];
    const eventPick = storyData.events[getRandomIndex(storyData.events.length)];
    const endPick = storyData.endings[getRandomIndex(storyData.endings.length)];

    const generatedStory = 
      `${charPick}.\n\n${charPick} ${eventPick}.\n\n${charPick} ${endPick}.`;

    setStory(generatedStory);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'storyGenerator.title')}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {translate(lang, 'storyGenerator.description')}
          </p>
          
          <button
            onClick={generateStory}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            {translate(lang, 'storyGenerator.form.generate')}
          </button>
        </div>

        <div className="relative mt-6">
          <div
            className="w-full bg-gray-900 text-gray-100 p-6 rounded-lg min-h-[200px] whitespace-pre-line"
          >
            {story || translate(lang, 'storyGenerator.result.empty')}
          </div>
          {story && (
            <button
              onClick={handleCopy}
              className="absolute bottom-4 right-4 text-white hover:text-gray-300 transition-colors"
              title={translate(lang, 'storyGenerator.result.copyTitle')}
            >
              <Image 
                src="/copy_icon_white.png" 
                alt={translate(lang, 'storyGenerator.result.copyAlt')}
                width={20}
                height={20}
              />
            </button>
          )}
          {showToast && (
            <div className="absolute right-4 top-full mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
              {translate(lang, 'storyGenerator.result.copied')}
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="mt-16 space-y-12">
          {/* Introduction */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{translate(lang, 'storyGenerator.catchphrase')}</h2>
            <p className="text-lg text-gray-300">{translate(lang, 'storyGenerator.intro')}</p>
          </div>

          {/* Features */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translate(lang, 'storyGenerator.features.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.features.oneClick.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.features.oneClick.description')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.features.patterns.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.features.patterns.description')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.features.customization.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.features.customization.description')}</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translate(lang, 'storyGenerator.useCases.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.useCases.novel.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.useCases.novel.description')}</p>
              </div>
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.useCases.game.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.useCases.game.description')}</p>
              </div>
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.useCases.workshop.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.useCases.workshop.description')}</p>
              </div>
            </div>
          </div>

          {/* Technical Background */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translate(lang, 'storyGenerator.technical.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.technical.algorithm.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.technical.algorithm.description')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.technical.database.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.technical.database.description')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translate(lang, 'storyGenerator.technical.performance.title')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.technical.performance.description')}</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translate(lang, 'storyGenerator.faq.title')}</h2>
            <div className="space-y-6">
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {translate(lang, 'storyGenerator.faq.questions.random.question')}
                </h3>
                <p className="text-gray-300">
                  {translate(lang, 'storyGenerator.faq.questions.random.answer')}
                </p>
              </div>
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {translate(lang, 'storyGenerator.faq.questions.commercial.question')}
                </h3>
                <p className="text-gray-300">
                  {translate(lang, 'storyGenerator.faq.questions.commercial.answer')}
                </p>
              </div>
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {translate(lang, 'storyGenerator.faq.questions.customize.question')}
                </h3>
                <p className="text-gray-300">
                  {translate(lang, 'storyGenerator.faq.questions.customize.answer')}
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{translate(lang, 'storyGenerator.conclusion.title')}</h2>
            <p className="text-lg text-gray-300">{translate(lang, 'storyGenerator.conclusion.description')}</p>
          </div>
        </div>
      </main>
    </div>
  );
} 
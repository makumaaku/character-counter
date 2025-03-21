'use client';

import { useState, useEffect } from 'react';
import { translate } from '@/lib/i18n/client';
import DownloadButton from '../../components/DownloadButton';
import CopyButton from '@/components/CopyButton';
import { Button } from '@/components/ui/button';

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

  useEffect(() => {
    // APIルートを使用してJSONファイルを読み込む
    fetch(`/${lang}/api/word-gen/story-generator`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load story data: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setStoryData(data))
      .catch(error => {
        console.error('Error loading story data:', error);
      });
  }, [lang]); // langが変わったら再度読み込む

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

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'storyGenerator.title')}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {translate(lang, 'storyGenerator.description')}
          </p>
          
          <Button
            onClick={generateStory}
            variant="purple"
            size="lg"
          >
            {translate(lang, 'storyGenerator.form.generate')}
          </Button>
        </div>

        <div className="relative mt-6">
          <div
            className="w-full bg-gray-900 text-gray-100 p-6 rounded-lg min-h-[200px] whitespace-pre-line"
          >
            {story || translate(lang, 'storyGenerator.result.empty')}
          </div>
          {story && (
            <div className="flex justify-end mt-4 items-center space-x-3">
              <CopyButton 
                text={story}
                copyText={translate(lang, 'storyGenerator.result.copyTitle')}
                toastText={translate(lang, 'storyGenerator.result.copied')}
                variant="purple"
                className="text-sm px-2 py-1"
              />
              <DownloadButton
                content={story}
                filename="generated-story.txt"
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors"
                variant='purple'
              />
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="mt-16 space-y-12">
          {/* Introduction */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{translate(lang, 'storyGenerator.catchphrase')}</h2>
            <p className="text-lg text-start text-gray-300">{translate(lang, 'storyGenerator.intro')}</p>
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
              <div>
                <h3 className="text-xl font-semibold mb-2">{translate(lang, 'storyGenerator.faq.q1')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.faq.a1')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translate(lang, 'storyGenerator.faq.q2')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.faq.a2')}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translate(lang, 'storyGenerator.faq.q3')}</h3>
                <p className="text-gray-300">{translate(lang, 'storyGenerator.faq.a3')}</p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{translate(lang, 'storyGenerator.conclusion.title')}</h2>
            <p className="text-lg text-start text-gray-300">{translate(lang, 'storyGenerator.conclusion.description')}</p>
          </div>
        </div>
      </main>
    </div>
  );
} 
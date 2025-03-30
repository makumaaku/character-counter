'use client';

import { useState, useEffect } from 'react';
import DownloadButton from '../../components/DownloadButton';
import CopyButton from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import { WordGenStoryGeneratorMessages } from '@/lib/i18n/types';

interface StoryData {
  characters: string[]
  events: string[]
  endings: string[]
}

interface StoryGeneratorClientProps {
  messages: WordGenStoryGeneratorMessages;
  lang: string;
}

export default function StoryGeneratorClient({ messages, lang }: StoryGeneratorClientProps) {
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
  }, [lang]); // 依存関係からlangを削除

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

  // messagesから値を取得
  const { title, description, catchphrase, intro, form, result, features, useCases, technical, faq, conclusion } = messages;

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {description}
          </p>
          
          <Button
            onClick={generateStory}
            variant="purple"
            size="lg"
          >
            {form.generate}
          </Button>
        </div>

        <div className="relative mt-6">
          <div
            className="w-full bg-gray-900 text-gray-100 p-6 rounded-lg min-h-[200px] whitespace-pre-line"
          >
            {story || result.empty}
          </div>
          {story && (
            <div className="flex justify-end mt-4 items-center space-x-3">
              <CopyButton 
                text={story}
                copyText={result.copyTitle}
                toastText={result.copied}
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
            <h2 className="text-3xl font-bold mb-4">{catchphrase}</h2>
            <p className="text-lg text-start text-gray-300">{intro}</p>
          </div>

          {/* Features */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{features.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">{features.oneClick.title}</h3>
                <p className="text-gray-300">{features.oneClick.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{features.patterns.title}</h3>
                <p className="text-gray-300">{features.patterns.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{features.customization.title}</h3>
                <p className="text-gray-300">{features.customization.description}</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{useCases.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{useCases.novel.title}</h3>
                <p className="text-gray-300">{useCases.novel.description}</p>
              </div>
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{useCases.game.title}</h3>
                <p className="text-gray-300">{useCases.game.description}</p>
              </div>
              <div className="bg-gray-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{useCases.workshop.title}</h3>
                <p className="text-gray-300">{useCases.workshop.description}</p>
              </div>
            </div>
          </div>

          {/* Technical Background */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{technical.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">{technical.algorithm.title}</h3>
                <p className="text-gray-300">{technical.algorithm.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{technical.database.title}</h3>
                <p className="text-gray-300">{technical.database.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{technical.performance.title}</h3>
                <p className="text-gray-300">{technical.performance.description}</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{faq.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{faq.q1}</h3>
                <p className="text-gray-300">{faq.a1}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{faq.q2}</h3>
                <p className="text-gray-300">{faq.a2}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{faq.q3}</h3>
                <p className="text-gray-300">{faq.a3}</p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{conclusion.title}</h2>
            <p className="text-lg text-start text-gray-300">{conclusion.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
} 
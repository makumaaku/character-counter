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
  const { title, description, form, result } = messages;

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-4 pt-12">
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
      </main>
    </div>
  );
} 
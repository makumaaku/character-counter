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

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">{translate(lang, 'storyGenerator.about.title')}</h2>
          <p className="mb-4">{translate(lang, 'storyGenerator.about.description')}</p>
          
          <h3 className="text-xl font-bold mb-4">{translate(lang, 'storyGenerator.howTo.title')}</h3>
          <ul className="list-disc pl-5 mb-6">
            <li>
              {translate(lang, 'storyGenerator.howTo.generate.title')}
              <p className="ml-5">{translate(lang, 'storyGenerator.howTo.generate.description')}</p>
            </li>
            <li>
              {translate(lang, 'storyGenerator.howTo.review.title')}
              <p className="ml-5">{translate(lang, 'storyGenerator.howTo.review.description')}</p>
            </li>
            <li>
              {translate(lang, 'storyGenerator.howTo.share.title')}
              <p className="ml-5">{translate(lang, 'storyGenerator.howTo.share.description')}</p>
            </li>
          </ul>

          <h3 className="text-xl font-bold mb-4">{translate(lang, 'storyGenerator.features.title')}</h3>
          <ul className="list-disc pl-5">
            <li>{translate(lang, 'storyGenerator.features.instant')}</li>
            <li>{translate(lang, 'storyGenerator.features.unique')}</li>
            <li>{translate(lang, 'storyGenerator.features.creative')}</li>
            <li>{translate(lang, 'storyGenerator.features.memorable')}</li>
            <li>{translate(lang, 'storyGenerator.features.interface')}</li>
            <li>{translate(lang, 'storyGenerator.features.copy')}</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Image from 'next/image';

type SentenceType = 'simple' | 'literary' | 'joke';

export default function SentenceGenerator() {
  const [sentence, setSentence] = useState<string>('');
  const [type, setType] = useState<SentenceType>('simple');
  const [showToast, setShowToast] = useState(false);

  const generateSentence = async () => {
    try {
      const response = await fetch('/words/sentences.json');
      const data = await response.json();
      const sentences = data.sentences[type];
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setSentence(sentences[randomIndex]);
    } catch (error) {
      console.error('Error generating sentence:', error);
    }
  };

  const copyToClipboard = async () => {
    if (sentence) {
      try {
        await navigator.clipboard.writeText(sentence);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <>
      <div className="text-gray-100 font-sans">
        <main className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold p-6 text-center">Random Sentence Generator</h1>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl mb-4 text-center">Sentence Type</h2>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as SentenceType)}
              className="bg-gray-900 text-gray-100 px-3 py-2 w-48 text-center rounded focus:outline-none focus:ring-2 focus:ring-purple-500 mx-auto block"
            >
              <option value="simple">Simple</option>
              <option value="literary">Literary</option>
              <option value="joke">Joke</option>
            </select>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-900 text-gray-100 p-4 rounded-lg min-h-[100px]">
              {sentence || "Generated sentence will appear here"}
            </div>
            <button
              onClick={copyToClipboard}
              className="absolute bottom-4 right-4 text-white hover:text-gray-300 transition-colors"
              title="Copy text"
            >
              <Image 
                src="/copy_icon_white.png" 
                alt="Copy text"
                width={20}
                height={20}
              />
            </button>
            {showToast && (
              <div className="absolute right-4 top-full mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                Copied!
              </div>
            )}
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <button
              onClick={generateSentence}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Generate Sentence
            </button>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl mb-4 text-center">Easy & Simple! Random Sentence Generator Tool (free)</h2>
            <p className="mb-4">
              Generate random sentences instantly from our curated collection. Perfect for creative writing,
              content creation, or just for fun. Dark mode supported with an eye-friendly design!
            </p>
            
            <h3 className="text-lg mb-2 font-bold">How to Use</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Select sentence type
                <p className="ml-5">Choose from simple, literary, or joke sentences</p>
              </li>
              <li>Generate sentence
                <p className="ml-5">Click the generate button to create your random sentence</p>
              </li>
              <li>Copy results
                <p className="ml-5">Use the copy button to easily copy the generated sentence to your clipboard</p>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
} 
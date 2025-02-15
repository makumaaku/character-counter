"use client";

import { useState } from "react";
import words from '../../../public/words/words.json'
import Image from "next/image";

export default function WordGenerator() {
  const [generatedWords, setGeneratedWords] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(10);
  const [showToast, setShowToast] = useState(false);

  const generateWords = () => {
    if (wordCount < 1) {
      setWordCount(1);
      return;
    }
    const wordList = words.words;
    const selectedWords = [];
    
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      selectedWords.push(wordList[randomIndex]);
    }
    
    setGeneratedWords(selectedWords.join(" "));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedWords);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <h1 className="text-3xl font-bold text-center py-6">Random Word Generator</h1>
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h2 className="text-xl mb-4">Word Count</h2>
          <p className="text-4xl font-bold">{wordCount}</p>
        </div>

        <div className="relative">
          <div className="w-full mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg min-h-[100px]">
            {generatedWords || "Generated words will appear here"}
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

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <div className="flex items-center gap-4 justify-center mb-6">
            <label htmlFor="wordCount" className="text-lg">
              Number of words:
            </label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              id="wordCount"
              min="1"
              max="100"
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
              className="bg-gray-900 text-gray-100 px-3 py-2 w-24 text-center rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={generateWords}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Generate Words
          </button>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">Easy & Simple! Random Word Generator Tool (free)</h2>
          <p className="mb-4">
            Generate random words instantly from our curated list of English words. Perfect for creative writing,
            brainstorming, vocabulary building, and more. Dark mode supported with an eye-friendly design!
          </p>
          
          <h3 className="text-lg mb-2 font-bold">How to Use</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Set the number of words
              <p className="ml-5">Choose how many words you want to generate (1-100)</p>
            </li>
            <li>Generate words
              <p className="ml-5">Click the generate button to create your random word list</p>
            </li>
            <li>Copy results
              <p className="ml-5">Use the copy button to easily copy the generated words to your clipboard</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
} 
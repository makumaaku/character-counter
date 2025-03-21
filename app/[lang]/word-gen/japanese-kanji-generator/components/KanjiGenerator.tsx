'use client';

import { generateRandomKanji } from '../kanjiGenerator';

interface KanjiGeneratorProps {
  onGenerateKanji: (kanji: string) => void;
  isGenerating: boolean;
  generateButtonText: string;
  loadingText: string;
}

export default function KanjiGenerator({ 
  onGenerateKanji, 
  isGenerating, 
  generateButtonText,
  loadingText
}: KanjiGeneratorProps) {
  
  const handleGenerateClick = () => {
    try {
      const kanji = generateRandomKanji();
      onGenerateKanji(kanji);
    } catch (error) {
      console.error('Error generating kanji:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <button
        onClick={handleGenerateClick}
        disabled={isGenerating}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 disabled:bg-purple-400 disabled:cursor-not-allowed shadow-md"
      >
        {isGenerating ? loadingText : generateButtonText}
      </button>
    </div>
  );
} 
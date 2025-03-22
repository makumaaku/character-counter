'use client';

import { generateRandomKanji } from '../kanjiGenerator';
import { Button } from '@/components/ui/button';

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
      <Button
        onClick={handleGenerateClick}
        disabled={isGenerating}
        variant="purple"
        className="py-3 px-6 text-lg shadow-md"
      >
        {isGenerating ? loadingText : generateButtonText}
      </Button>
    </div>
  );
} 
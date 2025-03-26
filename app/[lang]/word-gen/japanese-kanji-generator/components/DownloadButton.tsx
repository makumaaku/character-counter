'use client';

import { downloadKanjiImage } from '../kanjiGenerator';
import { Button } from '@/components/ui/button';

interface DownloadButtonProps {
  kanji: string | null;
  jpgButtonText: string;
  pngButtonText: string;
}

export default function DownloadButton({ 
  kanji, 
  jpgButtonText, 
  pngButtonText 
}: DownloadButtonProps) {
  
  const handleDownloadJpg = () => {
    if (!kanji) return;
    try {
      downloadKanjiImage(kanji, 'jpg');
    } catch (error) {
      console.error('Error downloading JPG:', error);
    }
  };

  const handleDownloadPng = () => {
    if (!kanji) return;
    try {
      downloadKanjiImage(kanji, 'png');
    } catch (error) {
      console.error('Error downloading PNG:', error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 mb-8">
      <Button
        onClick={handleDownloadJpg}
        disabled={!kanji}
        variant="purple"
        className="shadow-md"
      >
        {jpgButtonText}
      </Button>
      <Button
        onClick={handleDownloadPng}
        disabled={!kanji}
        variant="purple"
        className="shadow-md"
      >
        {pngButtonText}
      </Button>
    </div>
  );
} 
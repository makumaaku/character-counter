'use client';

import { downloadKanjiImage } from '../kanjiGenerator';

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
      <button
        onClick={handleDownloadJpg}
        disabled={!kanji}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 shadow-md"
      >
        {jpgButtonText}
      </button>
      <button
        onClick={handleDownloadPng}
        disabled={!kanji}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 shadow-md"
      >
        {pngButtonText}
      </button>
    </div>
  );
} 
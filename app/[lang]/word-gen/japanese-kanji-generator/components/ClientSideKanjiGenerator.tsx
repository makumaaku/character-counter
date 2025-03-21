'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// クライアントコンポーネントを動的にインポート
const KanjiGenerator = dynamic(
  () => import('./KanjiGenerator'),
  { ssr: false }
);

const KanjiDisplay = dynamic(
  () => import('./KanjiDisplay'),
  { ssr: false }
);

const DownloadButton = dynamic(
  () => import('./DownloadButton'),
  { ssr: false }
);

interface ClientSideKanjiGeneratorProps {
  generateButtonText: string;
  loadingText: string;
  jpgButtonText: string;
  pngButtonText: string;
  copyButtonText?: string;
  copiedText?: string;
  noImageText?: string;
}

export default function ClientSideKanjiGenerator({ 
  generateButtonText, 
  loadingText,
  jpgButtonText,
  pngButtonText,
  copyButtonText = "Copy Kanji",
  copiedText = "Copied",
  noImageText = "No image generated yet"
}: ClientSideKanjiGeneratorProps) {
  const [kanji, setKanji] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateKanji = (newKanji: string) => {
    setIsGenerating(true);
    
    // 生成に時間がかかることを示すために少し遅延
    setTimeout(() => {
      setKanji(newKanji);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <>
      <KanjiGenerator
        onGenerateKanji={handleGenerateKanji}
        isGenerating={isGenerating}
        generateButtonText={generateButtonText}
        loadingText={loadingText}
      />
      
      <KanjiDisplay 
        kanji={kanji} 
        copyButtonText={copyButtonText}
        copiedText={copiedText}
        noImageText={noImageText}
      />
      
      <DownloadButton
        kanji={kanji}
        jpgButtonText={jpgButtonText}
        pngButtonText={pngButtonText}
      />
    </>
  );
} 
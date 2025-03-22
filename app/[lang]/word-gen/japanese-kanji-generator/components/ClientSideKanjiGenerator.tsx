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
  fontLoadingText?: string;
}

export default function ClientSideKanjiGenerator({ 
  generateButtonText, 
  loadingText,
  jpgButtonText,
  pngButtonText,
  copyButtonText = "Copy Kanji",
  copiedText = "Copied",
  noImageText = "No image generated yet",
  fontLoadingText = "フォントをロード中..."
}: ClientSideKanjiGeneratorProps) {
  const [kanji, setKanji] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isLoadingFont, setIsLoadingFont] = useState(false);

  const loadFont = async (): Promise<boolean> => {
    if (isFontLoaded) return true; // すでにロードされていれば何もしない
    
    setIsLoadingFont(true);
    
    try {
      // Web Fontを動的にロード
      const font = new FontFace('Yuji Mai', 'url(/fonts/YujiMai-Regular.ttf)');
      const loadedFont = await font.load();
      
      // フォントをドキュメントに追加
      document.fonts.add(loadedFont);
      setIsFontLoaded(true);
      setIsLoadingFont(false);
      return true;
    } catch (error) {
      console.error('フォントロードエラー:', error);
      setIsLoadingFont(false);
      return false;
    }
  };

  const handleGenerateKanji = async (newKanji: string) => {
    setIsGenerating(true);
    
    // フォントがロードされていなければロードする
    if (!isFontLoaded) {
      const success = await loadFont();
      if (!success) {
        setIsGenerating(false);
        return; // フォントのロードに失敗した場合は中断
      }
    }
    
    // 生成に時間がかかることを示すために少し遅延
    setTimeout(() => {
      setKanji(newKanji);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <>
      {isLoadingFont && (
        <div className="mb-4 text-center text-blue-500 font-bold">
          {fontLoadingText}
        </div>
      )}
      
      <KanjiGenerator
        onGenerateKanji={handleGenerateKanji}
        isGenerating={isGenerating || isLoadingFont}
        generateButtonText={generateButtonText}
        loadingText={isLoadingFont ? fontLoadingText : loadingText}
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
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { WordGenJapaneseKanjiGeneratorMessages } from '@/lib/i18n/types';

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
  messages: WordGenJapaneseKanjiGeneratorMessages;
}

export default function ClientSideKanjiGenerator({ messages }: ClientSideKanjiGeneratorProps) {
  const [kanji, setKanji] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isLoadingFont, setIsLoadingFont] = useState(false);

  // messagesから必要な翻訳を取得
  const { 
    generate,
    download,
    copy,
    display,
    font,
    error
  } = messages;

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
    } catch (err) {
      console.error('フォントロードエラー:', err);
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
        console.error(error.generation);
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
    <div className="w-full overflow-hidden">
      {isLoadingFont && (
        <div className="mb-4 text-center text-blue-500 font-bold">
          {font.loading}
        </div>
      )}
      
      <KanjiGenerator
        onGenerateKanji={handleGenerateKanji}
        isGenerating={isGenerating || isLoadingFont}
        generateButtonText={generate.button}
        loadingText={isLoadingFont ? font.loading : generate.loading}
      />
      
      <KanjiDisplay 
        kanji={kanji} 
        copyButtonText={copy.button}
        copiedText={copy.success}
        noImageText={display.noImage}
      />
      
      <DownloadButton
        kanji={kanji}
        jpgButtonText={download.jpg}
        pngButtonText={download.png}
      />
    </div>
  );
} 
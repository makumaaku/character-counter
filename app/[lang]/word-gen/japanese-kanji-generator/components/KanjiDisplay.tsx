'use client';

import { useEffect, useRef, useState } from 'react';
import CopyButton from '@/components/CopyButton';

// ウィンドウサイズを取得するカスタムフック
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    // ウィンドウのリサイズをハンドリングする関数
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    // イベントリスナーを追加
    window.addEventListener('resize', handleResize);
    
    // 初回マウント時にもサイズを設定
    handleResize();
    
    // クリーンアップ関数
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

interface KanjiDisplayProps {
  kanji: string | null;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  copyButtonText?: string;
  copiedText?: string;
  noImageText?: string;
}

export default function KanjiDisplay({
  kanji,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  fontFamily = 'Yuji Mai',
  copyButtonText = '漢字をコピー',
  copiedText = '✓ コピーしました',
  noImageText = '画像が生成されていません'
}: KanjiDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width } = useWindowSize();
  const baseSize = 512;
  
  // モバイル画面では画面幅に合わせてサイズを調整
  const adjustedSize = width < baseSize ? (width - 48)*0.7 : Math.min(width * 0.7, baseSize);

  useEffect(() => {
    if (!kanji || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスのサイズを設定
    canvas.width = adjustedSize;
    canvas.height = adjustedSize;

    // 背景を描画
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, adjustedSize, adjustedSize);

    // 漢字を描画
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 漢字のサイズを調整 (キャンバスサイズの約70%)
    const fontSize = Math.floor(adjustedSize * 0.7);
    ctx.font = `${fontSize}px ${fontFamily}`;

    // 漢字を中央に描画
    ctx.fillText(kanji, adjustedSize / 2, adjustedSize / 2);
  }, [kanji, adjustedSize, backgroundColor, textColor, fontFamily]);

  return (
    <div className="flex flex-col items-center mt-8 mb-8 w-full overflow-hidden">
      <div className="border-4 border-purple-300 rounded-lg overflow-hidden shadow-lg bg-white">
        {kanji ? (
          <canvas 
            ref={canvasRef} 
            width={adjustedSize} 
            height={adjustedSize}
            className="max-w-full"
          />
        ) : (
          <div 
            style={{ width: adjustedSize, height: adjustedSize }} 
            className="flex items-center justify-center bg-purple-50 text-purple-400"
          >
            <span className="text-xl">{noImageText}</span>
          </div>
        )}
      </div>
      
      {kanji && (
        <div className="mt-4 flex flex-col items-center">
          <CopyButton
            text={kanji}
            copyText={copyButtonText}
            toastText={copiedText}
            variant="purple"
            disabled={!kanji}
          />
        </div>
      )}
    </div>
  );
} 
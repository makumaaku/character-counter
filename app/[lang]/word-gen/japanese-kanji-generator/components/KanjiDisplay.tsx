'use client';

import { useEffect, useRef } from 'react';
import CopyButton from '@/components/CopyButton';

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
  size = 512,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  fontFamily = 'Yuji Mai',
  copyButtonText = '漢字をコピー',
  copiedText = '✓ コピーしました',
  noImageText = '画像が生成されていません'
}: KanjiDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!kanji || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスのサイズを設定
    canvas.width = size;
    canvas.height = size;

    // 背景を描画
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);

    // 漢字を描画
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 漢字のサイズを調整 (キャンバスサイズの約70%)
    const fontSize = Math.floor(size * 0.7);
    ctx.font = `${fontSize}px ${fontFamily}`;

    // 漢字を中央に描画
    ctx.fillText(kanji, size / 2, size / 2);
  }, [kanji, size, backgroundColor, textColor, fontFamily]);

  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      <div className="border-4 border-purple-300 rounded-lg overflow-hidden shadow-lg bg-white">
        {kanji ? (
          <canvas 
            ref={canvasRef} 
            width={size} 
            height={size}
            className="max-w-full"
          />
        ) : (
          <div 
            style={{ width: size, height: size }} 
            className="flex items-center justify-center bg-purple-50 text-purple-400"
          >
            <span className="text-2xl">{noImageText}</span>
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
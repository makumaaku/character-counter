'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  text: string;
  copyText?: string;
  toastText?: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'purple';
  className?: string;
  duration?: number;
  onCopy?: () => void;
}

/**
 * クリップボードにテキストをコピーするボタンコンポーネント
 * クリップボードにコピーした際にトースト通知を表示する
 */
export default function CopyButton({
  text,
  copyText = 'Copy',
  toastText = 'Copied!',
  variant = 'secondary',
  className = '',
  duration = 2000,
  onCopy
}: CopyButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      
      // オプションのコールバック関数を実行
      if (onCopy) {
        onCopy();
      }
      
      // 一定時間後にトースト表示をリセット
      setTimeout(() => {
        setShowToast(false);
      }, duration);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleCopy}
        variant={variant}
        className={className}
      >
        {copyText}
      </Button>
      
      {/* トースト通知 */}
      {showToast && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg whitespace-nowrap z-50">
          {toastText}
        </div>
      )}
    </div>
  );
} 
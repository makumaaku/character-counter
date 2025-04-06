'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';

// ダークモード情報を共有するためのコンテキスト
const DarkModeContext = createContext(true);

// カスタムフックを作成して、コンテキストからダークモード状態を取得できるようにする
export const useDarkModeContext = () => useContext(DarkModeContext);

interface DarkModeWrapperProps {
  children: ReactNode;
}

export const DarkModeWrapper: React.FC<DarkModeWrapperProps> = ({
  children
}) => {
  // クライアント側でシステムのダークモード設定を検出
  const isDarkMode = useDarkMode();
  
  // コンテキストプロバイダーを通じてダークモード状態を子コンポーネントに提供
  return (
    <DarkModeContext.Provider value={isDarkMode}>
      <div 
        className={isDarkMode ? 'dark' : ''}
        style={{
          '--theme-bg': isDarkMode ? '#1f2937' : '#ffffff',
          '--theme-text': isDarkMode ? '#FFFFFF' : '#171717',
          '--theme-primary': '#A15EF7',
          '--theme-secondary': '#3B3B54',
        } as React.CSSProperties}
      >
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};
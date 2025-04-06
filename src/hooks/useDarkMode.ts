 'use client';

import { useEffect, useState } from 'react';

// ダークモードの初期値をtrueに設定する。
// TODO: 将来的にはユーザーの設定を優先するようにすることも考慮した実装とする。
export function useDarkMode(initialDarkMode: boolean = true): boolean {
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    // クライアント側でのみ実行されるコード
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 初期値をシステム設定に合わせる（ただしinitialDarkModeが明示的にtrueならそれを優先）
    if (!initialDarkMode) {
      setIsDarkMode(mediaQuery.matches);
    }

    // システム設定の変更を監視する
    const handleChange = (e: MediaQueryListEvent) => {
      if (!initialDarkMode) { // initialDarkModeが明示的に指定されていない場合のみ
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [initialDarkMode]);

  return isDarkMode;
}
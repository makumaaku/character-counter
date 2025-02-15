'use client';

import { useRouter, usePathname } from 'next/navigation';
import { type Language } from '@/lib/i18n/types';

// 言語設定
const LANGUAGES: { [key in Language]: string } = {
  en: 'English',
  ja: '日本語',
  // 新しい言語を追加する場合は、ここに追加するだけで良い
  // 例: fr: 'Français',
  // 例: zh: '中文',
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // パスから現在の言語を取得
  const currentLanguage = (Object.keys(LANGUAGES) as Language[]).find(
    lang => pathname.startsWith(`/${lang}`)
  ) || 'en';

  const handleLanguageChange = (newLang: Language) => {
    // 現在のパスから言語部分を抽出
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLang}${pathWithoutLang}`;
    router.push(newPath);
  };

  return (
    <select
      value={currentLanguage}
      onChange={(e) => handleLanguageChange(e.target.value as Language)}
      className="p-2 rounded border border-gray-300"
    >
      {Object.entries(LANGUAGES).map(([lang, label]) => (
        <option key={lang} value={lang}>
          {label}
        </option>
      ))}
    </select>
  );
} 
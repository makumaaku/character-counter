'use client';

import { useRouter, usePathname } from 'next/navigation';
import { type Language } from '@/lib/i18n/types';
import { setCookie } from 'cookies-next';

// 言語設定
const LANGUAGES: { [key in Language]: string } = {
  en: 'English',
  ja: '日本語',
  es: 'Español',
  ru: 'Русский',
  zh: '中文',

  // 新しい言語を追加する場合は、ここに追加するだけで良い
  // 例: fr: 'Français',
  // 例: 
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // パスから現在の言語を取得
  const currentLanguage = (Object.keys(LANGUAGES) as Language[]).find(
    lang => pathname.startsWith(`/${lang}`)
  ) || 'en';

  const handleLanguageChange = (newLang: Language) => {
      // クッキーに言語設定を保存 (30日間有効)
      setCookie('lang', newLang, { 
        maxAge: 30 * 24 * 60 * 60,
        path: '/' 
      });
    // 現在のパスから言語部分を抽出
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLang}${pathWithoutLang}`;
    router.push(newPath);
  };

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="appearance-none bg-transparent text-white hover:text-gray-200 transition-colors cursor-pointer pr-6 pl-2 py-1 border-2 border-white/20 rounded hover:border-white/40 focus:border-white/60 focus:outline-none"
      >
        {Object.entries(LANGUAGES).map(([lang, label]) => (
          <option key={lang} value={lang} className="bg-primary text-white">
            {label}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
} 
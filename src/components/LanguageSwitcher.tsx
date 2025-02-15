'use client';

import { useRouter, usePathname } from 'next/navigation';
import { type Language } from '@/lib/i18n/types';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage: Language = pathname.startsWith('/ja') ? 'ja' : 'en';

  const handleLanguageChange = (newLang: Language) => {
    const newPath = pathname.startsWith('/ja') || pathname.startsWith('/en')
      ? pathname.replace(/^\/(ja|en)/, `/${newLang}`)
      : `/${newLang}${pathname}`;
    router.push(newPath);
  };

  return (
    <select
      value={currentLanguage}
      onChange={(e) => handleLanguageChange(e.target.value as Language)}
      className="p-2 rounded border border-gray-300"
    >
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  );
} 
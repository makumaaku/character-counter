import enMessages from '../../../locales/en.json';
import jaMessages from '../../../locales/ja.json';
import { Language } from './types';

export type MessageValue = string | string[] | { [key: string]: MessageValue };
export type Messages = Record<string, MessageValue>;

// 言語ごとのメッセージを動的に管理するマップ
const messages = new Map<Language, Messages>();

// デフォルトメッセージを設定
messages.set('en', enMessages);
messages.set('ja', jaMessages);

// 新しい言語のメッセージを追加するためのヘルパー関数
export function registerMessages(locale: Language, messageData: Messages): void {
  messages.set(locale, messageData);
}

export function getLanguageFromPath(pathname: string): Language {
  // パスから言語を抽出
  const match = pathname.match(/^\/([a-z]{2})/);
  if (match && messages.has(match[1] as Language)) {
    return match[1] as Language;
  }
  return 'en'; // デフォルト言語
}

export function getMessages(locale: Language = 'en'): Messages {
  return messages.get(locale) || messages.get('en')!;
}

export function translate(lang: string, key: string): string {
  const locale = lang as Language;
  const keys = key.split('.');
  let value: unknown = getMessages(locale);

  for (const k of keys) {
    if (value === undefined || typeof value !== 'object') return key;
    value = (value as Record<string, unknown>)[k];
  }

  return typeof value === 'string' ? value : key;
}

// 利用可能な言語一覧を取得
export function getAvailableLanguages(): Language[] {
  return Array.from(messages.keys());
}

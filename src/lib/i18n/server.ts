import enMessages from '../../../locales/en.json';
import jaMessages from '../../../locales/ja.json';
import { Language } from './types';

export type Messages = typeof enMessages;

const messages: Record<Language, Messages> = {
  en: enMessages,
  ja: jaMessages,
};

export function getLanguageFromPath(pathname: string): Language {
  return pathname.startsWith('/ja') ? 'ja' : 'en';
}

export function getMessages(locale: Language = 'en'): Messages {
  return messages[locale] || messages.en;
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

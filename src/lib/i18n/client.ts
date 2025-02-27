import en from '../../../assets/locales/en.json';
import ja from '../../../assets/locales/ja.json';
import { type Language } from './types';

type TranslationMessages = {
  [key: string]: string | string[] | TranslationMessages;
};

const messages: { [key in Language]: TranslationMessages } = {
  en,
  ja,
};

export function translate(lang: string, key: string): string {
  const keys = key.split('.');
  let current: TranslationMessages | string | string[] = messages[lang as Language];

  for (const k of keys) {
    if (current === undefined) {
      console.warn(`Translation key not found: ${key} for language ${lang}`);
      return key;
    }
    if (typeof current === 'string' || Array.isArray(current)) {
      console.warn(`Unexpected value while traversing: ${key} for language ${lang}`);
      return key;
    }
    current = current[k];
  }

  if (typeof current !== 'string') {
    console.warn(`Translation value is not a string: ${key} for language ${lang}`);
    return key;
  }

  return current;
} 
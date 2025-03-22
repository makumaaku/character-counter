import { Language } from './types';

export type MessageValue = string | string[] | { [key: string]: MessageValue };
export type Messages = Record<string, MessageValue>;

// 言語ごとのメッセージを動的に管理するマップ
const messages = new Map<Language, Messages>();

// 新しい言語のメッセージを追加するためのヘルパー関数
export function registerMessages(locale: Language, messageData: Messages): void {
  messages.set(locale, messageData);
}

// 翻訳ファイルの遅延読み込み
export async function loadMessagesByLang(lang: Language): Promise<Messages> {
  try {
    let commonMessages = {};
    let metaMessages = {};
    let legacyMessages = {};

    // 新しいディレクトリ構造から読み込み試行
    try {
      // common.jsonの読み込み
      const commonModule = await import(`../../../assets/locales/${lang}/common.json`);
      commonMessages = commonModule.default || {};

      // meta.jsonの読み込み
      const metaModule = await import(`../../../assets/locales/${lang}/meta.json`);
      metaMessages = metaModule.default || {};
    } catch {
      console.info(`New directory structure not found for ${lang}, trying legacy file`);
    }

    // 既存の大きなJSONファイルからのフォールバック
    try {
      const legacyModule = await import(`../../../assets/locales/${lang}.json`);
      legacyMessages = legacyModule.default || {};
    } catch {
      console.info(`Legacy file not found for ${lang}`);
    }

    // 既に読み込まれているか確認
    if (messages.has(lang)) {
      return messages.get(lang)!;
    }

    // 新しい構造と既存構造をマージ（新しい構造を優先）
    const initialMessages: Messages = {
      ...legacyMessages,
      common: commonMessages,
      ...metaMessages,
    };

    // メッセージをキャッシュ
    messages.set(lang, initialMessages);
    return initialMessages;
  } catch (error) {
    console.error(`Failed to load messages for ${lang}:`, error);
    // エラーの場合は空のオブジェクトを返す
    return {};
  }
}

// 特定のツール用の翻訳を読み込む
export async function loadToolMessages(lang: Language, toolName: string): Promise<Messages> {
  try {
    let toolMessages = {};
    
    // ツール名のマッピング（ケバブケース → キャメルケース）
    // jsonファイル内のkeyはキャメルケースなので、こちらで変換を行う。
    const toolKeyMap: Record<string, string> = {
      'country-data': 'countryData',
      'json-viewer': 'jsonViewer'
    };
    
    const toolKey = toolKeyMap[toolName] || toolName;
    
    // 新しいディレクトリ構造からのツール翻訳ファイル読み込み試行
    try {
      // ツール用翻訳ファイルの読み込み
      const toolModule = await import(`../../../assets/locales/${lang}/${toolName}.json`);
      toolMessages = toolModule.default || {};
    } catch {
      console.info(`New structure for tool ${toolName} not found, will check legacy file`);
      
      // 既存のキャッシュされたメッセージからツール情報取得を試みる
      if (messages.has(lang)) {
        const existingMessages = messages.get(lang);
        if (existingMessages && toolKey in existingMessages) {
          toolMessages = existingMessages[toolKey] as Record<string, unknown>;
          console.info(`Found tool ${toolKey} in cached messages`);
          return existingMessages as Messages;
        }
      }
    }
    
    // 基本メッセージと結合
    const baseMessages = await loadMessagesByLang(lang);
    
    // 既存メッセージに既にツールのキーがある場合はそれを使用
    if (baseMessages[toolKey]) {
      console.info(`Using existing ${toolKey} from legacy file`);
      return baseMessages;
    }
    
    const combinedMessages = {
      ...baseMessages,
      [toolKey]: toolMessages,
    };
    
    // 更新したメッセージをキャッシュ
    messages.set(lang, combinedMessages);
    return combinedMessages;
  } catch (error) {
    console.error(`Failed to load tool messages for ${toolName} in ${lang}:`, error);
    // エラーの場合は基本メッセージを返す
    return await loadMessagesByLang(lang);
  }
}

export function getLanguageFromPath(pathname: string): Language {
  // パスから言語を抽出
  const match = pathname.match(/^\/([a-z]{2})/);
  if (match && ['en', 'ja', 'es'].includes(match[1])) {
    return match[1] as Language;
  }
  return 'en'; // デフォルト言語
}

export function getMessages(locale: Language = 'en'): Messages {
  return messages.get(locale) || messages.get('en')!;
}

export async function translate(lang: string, key: string): Promise<string> {
  const locale = lang as Language;
  
  // メッセージをロード（必要な場合）
  if (!messages.has(locale)) {
    await loadMessagesByLang(locale);
  }
  
  const keys = key.split('.');
  let value: unknown = getMessages(locale);

  // ルートレベルのキーを特定
  const rootKey = keys[0];
  
  // ツール固有の翻訳が必要で、まだ読み込まれていない場合は読み込む
  if (keys.length > 1 && rootKey && 
      typeof value === 'object' && value !== null && 
      !(rootKey in value)) {
    // ツール名のマッピング（キャメルケース → ケバブケース）
    const toolNameMap: Record<string, string> = {
      'countryData': 'country-data',
      'jsonViewer': 'json-viewer'
    };
    
    const fileToolName = toolNameMap[rootKey] || rootKey;
    
    if (Object.keys(toolNameMap).includes(rootKey)) {
      await loadToolMessages(locale, fileToolName);
      value = getMessages(locale);
    }
  }

  for (const k of keys) {
    if (value === undefined || typeof value !== 'object') return key;
    value = (value as Record<string, unknown>)[k];
  }

  return typeof value === 'string' ? value : key;
}

// 利用可能な言語一覧を取得
export function getAvailableLanguages(): Language[] {
  return ['en', 'ja', 'es'];
}

// パラメータから言語を取得する関数
export async function getLanguageFromParams(params: { lang: string } | Promise<{ lang: string }>): Promise<Language> {
  const resolvedParams = await Promise.resolve(params);
  const langParam = resolvedParams.lang;
  
  // 有効な言語かチェック
  if (['en', 'ja', 'es'].includes(langParam)) {
    return langParam as Language;
  }
  
  // デフォルト言語を返す
  return 'en';
}

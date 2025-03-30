import { Language } from './types';

export type MessageValue = string | string[] | { [key: string]: MessageValue };
export type Messages = Record<string, MessageValue>;

// 言語ごとのメッセージを動的に管理するマップ
const messages = new Map<Language, Messages>();

// 新しい言語のメッセージを追加するためのヘルパー関数
export function registerMessages(locale: Language, messageData: Messages): void {
  messages.set(locale, messageData);
}

 // マッピングにないツール名の場合はキャメルケースに変換する関数
 const kebabToCamel = (kebab: string): string => {
  return kebab.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

// 翻訳ファイルの遅延読み込み
export async function loadMessagesByLang(lang: Language): Promise<Messages> {
  try {
    let commonMessages = {};
    let metaMessages = {};
    const legacyMessages = {};

    // 新しいディレクトリ構造から読み込み試行
    try {
      // common.jsonの読み込み
      const commonModule = await import(`../../../assets/locales/${lang}/common.json`);
      commonMessages = commonModule.default || {};

      // meta.jsonの読み込み
      const metaModule = await import(`../../../assets/locales/${lang}/meta.json`);
      metaMessages = metaModule.default || {};
    } catch {
    }

    // 既存の大きなJSONファイルからのフォールバック
    // try {
    //   const legacyModule = await import(`../../../assets/locales/${lang}.json`);
    //   legacyMessages = legacyModule.default || {};
    // } catch {
      
    // }

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
  } catch {
    // エラーの場合は空のオブジェクトを返す
    return {};
  }
}

// 特定のツール用の翻訳を読み込む
export async function loadToolMessages(lang: Language, toolName: string): Promise<Messages> {
  try {
    let toolMessages = {};
    let categoryMessages = {};
    
    // キャメルケースのキーを生成
    const parts = toolName.split('/');
    const toolKey = parts.map(kebabToCamel).join('.');
    
    // 基本メッセージを読み込み
    const baseMessages = await loadMessagesByLang(lang);
    
    try {
      if (toolName.includes('/')) {
        // カテゴリ/ツールの形式の場合
        const [category, tool] = toolName.split('/');
        
        // カテゴリの共通ファイルを読み込み
        try {
          const categoryModule = await import(`../../../assets/locales/${lang}/${category}/common.json`);
          categoryMessages = categoryModule.default || {};
        } catch {
          // カテゴリ共通ファイルが存在しない場合は無視
        }
        
        // 個別ツールファイルを読み込み
        const toolModule = await import(`../../../assets/locales/${lang}/${category}/${tool}.json`);
        toolMessages = toolModule.default || {};
        
        // カテゴリとツールのメッセージをマージ
        const categoryKey = kebabToCamel(category);
        const combinedMessages = {
          ...baseMessages,
          [categoryKey]: {
            ...categoryMessages,
            [kebabToCamel(tool)]: toolMessages
          }
        };
        
        messages.set(lang, combinedMessages);
        return combinedMessages;
      } else {
        // トップレベルのツールの場合
        const toolModule = await import(`../../../assets/locales/${lang}/${toolName}.json`);
        toolMessages = toolModule.default || {};
        
        const combinedMessages = {
          ...baseMessages,
          [toolKey]: toolMessages,
        };
        
        messages.set(lang, combinedMessages);
        return combinedMessages;
      }
    } catch {
      // 既存のキャッシュされたメッセージからツール情報取得を試みる
      if (messages.has(lang)) {
        const existingMessages = messages.get(lang);
        if (existingMessages && toolKey in existingMessages) {
          return existingMessages as Messages;
        }
      }
      
      // 既存メッセージに既にツールのキーがある場合はそれを使用
      if (baseMessages[toolKey]) {
        return baseMessages;
      }
      
      // どちらも見つからない場合は基本メッセージを返す
      return baseMessages;
    }
  } catch {
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

// wordGenで始まるキーを抽出して出力する関数
export function extractAndLogWordGenKeys(locale: Language = 'en'): void {
  // メッセージを取得
  const allMessages = getMessages(locale);
  console.log(allMessages)
  
  // // wordGenで始まるキーを探す
  // const wordGenKeys: Record<string, MessageValue> = {};
  
  // // トップレベルのwordGenキーをチェック
  // if (allMessages.wordGen) {
  //   wordGenKeys.wordGen = allMessages.wordGen;
  // }
  
  // // ネストされたキーも確認
  // Object.entries(allMessages).forEach(([key, value]) => {
  //   if (key.startsWith('wordGen')) {
  //     wordGenKeys[key] = value;
  //   }
  // });
  
  // // 結果を出力
  // console.warn('Found wordGen keys:', wordGenKeys);
}

export async function translate(lang: string, key: string, toolName?: string): Promise<string> {
  const locale = lang as Language;
  
  // メッセージをロード（必要な場合）
  if (!messages.has(locale)) {
    await loadMessagesByLang(locale);
  }

  // キーを分割して解析
  const keys = key.split('.');
  
  // ツール名が指定されていない場合は、最初のキーをツール名として使用
  const actualToolName = toolName || keys[0];
  
  // ツールのメッセージをロード
  await loadToolMessages(locale, actualToolName);
  
  // メッセージを取得
  let value: unknown = getMessages(locale);
  
  // 各キーに対して順番にアクセス
  // extractAndLogWordGenKeys(locale)


  for (const k of keys) {
    if (!value || typeof value !== 'object') {
      console.warn(`Translation key not found: ${key} (at ${k})`);
      return key;
    }
    value = (value as Record<string, unknown>)[k];
  }

  // 最終的な値が文字列でない場合は、キーを返す
  if (typeof value !== 'string') {
    console.warn(`Translation value is not a string: ${key}`);
    return key;
  }

  return value;
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

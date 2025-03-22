import { Language } from './types';

/**
 * ツールのパスから対応する翻訳ファイルを動的にロードする関数
 * 
 * @param lang - 言語コード (en, ja, es など)
 * @param toolPath - ツールのパス (例: 'word-gen/name-generator', 'character-counter' など)
 * @returns ロードされた翻訳オブジェクト
 * 
 * 使用例:
 * const translations = await loadToolTranslation('ja', 'word-gen/name-generator');
 */
export const loadToolTranslation = async (lang: Language, toolPath: string): Promise<Record<string, unknown>> => {
  try {
    // 常に共通の翻訳をロード
    const commonTranslation = await import(`../../../assets/locales/${lang}/common.json`)
      .then(module => module.default)
      .catch(() => ({}));  // 共通ファイルがなければ空オブジェクト
    
    // メタデータの翻訳をロード
    const metaTranslation = await import(`../../../assets/locales/${lang}/meta.json`)
      .then(module => module.default)
      .catch(() => ({}));  // メタファイルがなければ空オブジェクト

    // パスがカテゴリを含むか確認 (例: 'word-gen/name-generator')
    if (toolPath.includes('/')) {
      const [category, tool] = toolPath.split('/');
      
      // カテゴリ共通の翻訳をロード (例: 'word-gen/common.json')
      const commonCategoryTranslation = await import(`../../../assets/locales/${lang}/${category}/common.json`)
        .then(module => module.default)
        .catch(() => ({}));  // カテゴリ共通ファイルがない場合は空オブジェクト
      
      // 特定ツールの翻訳をロード (例: 'word-gen/name-generator.json')
      const toolTranslation = await import(`../../../assets/locales/${lang}/${category}/${tool}.json`)
        .then(module => module.default)
        .catch(() => {
          console.warn(`Translation file for tool ${toolPath} in language ${lang} not found.`);
          return {};
        });
      
      // すべてのオブジェクトをマージして返却 (優先順位: ツール > カテゴリ共通 > メタ > 全体共通)
      return {
        ...commonTranslation,
        ...metaTranslation,
        ...commonCategoryTranslation,
        ...toolTranslation
      };
    }
    
    // カテゴリなしの単独ツール (例: 'character-counter')
    const toolTranslation = await import(`../../../assets/locales/${lang}/${toolPath}.json`)
      .then(module => module.default)
      .catch(() => {
        console.warn(`Translation file for tool ${toolPath} in language ${lang} not found.`);
        return {};
      });
    
    // マージして返却 (優先順位: ツール > メタ > 全体共通)
    return {
      ...commonTranslation,
      ...metaTranslation,
      ...toolTranslation
    };
  } catch (error) {
    console.error(`Error loading translations for ${toolPath} in ${lang}:`, error);
    // エラー時はとりあえず空オブジェクトを返す (アプリクラッシュ防止)
    return {};
  }
}; 
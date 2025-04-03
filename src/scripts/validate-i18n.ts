/**
 * i18nファイルの検証スクリプト
 * 
 * このスクリプトは言語間の翻訳キーの一貫性をチェックします。
 * 基準言語（通常は英語）に存在するすべてのキーが他の言語にも存在することを確認します。
 * 
 * 使用方法: 
 * ```
 * ts-node src/scripts/validate-i18n.ts
 * ```
 */

import fs from 'fs';
import path from 'path';

// types.tsが見つからないときの回避策
// 型定義だけを直接こちらで定義
type Language = 'en' | 'ja' | 'es' | 'ru' | 'zh';
const locales = ['en', 'ja', 'es', 'ru', 'zh'];

// 設定
const LOCALE_DIR = path.join(process.cwd(), 'assets/locales');
const BASE_LANG: Language = 'en'; // 基準となる言語

// 結果レポート用の型
interface ValidationResult {
  lang: Language;
  missing: string[];
  extra: string[];
}

/**
 * メイン関数
 */
async function main() {
  console.log('🔍 i18n翻訳ファイルの検証を開始します...');
  console.log(`📝 基準言語: ${BASE_LANG}`);
  console.log(`🌐 対象言語: ${locales.filter(l => l !== BASE_LANG).join(', ')}`);
  console.log('----------------------------------------');

  // 基準言語からキー構造を取得
  const baseKeys = getAllTranslationKeys(path.join(LOCALE_DIR, BASE_LANG));
  console.log(`✅ 基準言語(${BASE_LANG})から${baseKeys.length}個のキーを抽出しました`);
  
  // 各言語の検証結果
  const results: ValidationResult[] = [];
  
  // 各言語をチェック
  for (const lang of locales.filter(l => l !== BASE_LANG)) {
    console.log(`\n🔍 言語 "${lang}" を検証中...`);
    const langPath = path.join(LOCALE_DIR, lang);
    
    // 言語ディレクトリが存在するか確認
    if (!fs.existsSync(langPath)) {
      console.error(`❌ エラー: 言語ディレクトリ "${lang}" が見つかりません`);
      continue;
    }
    
    // 言語ファイルのキーを取得
    const langKeys = getAllTranslationKeys(langPath);
    console.log(`📊 言語 "${lang}" には${langKeys.length}個のキーがあります`);
    
    // 欠落しているキーを見つける（基準言語にあるが、この言語にない）
    const missingKeys = findMissingKeys(baseKeys, langKeys);
    
    // 余分なキーを見つける（この言語にあるが、基準言語にない）
    const extraKeys = findMissingKeys(langKeys, baseKeys);
    
    // 結果を保存
    results.push({
      lang: lang as Language,
      missing: missingKeys,
      extra: extraKeys
    });
    
    // 欠落キーの報告
    if (missingKeys.length > 0) {
      console.warn(`⚠️ 言語 "${lang}" には${missingKeys.length}個の欠落キーがあります`);
      
      // グループ化して表示（先頭部分でグループ化）
      const groupedMissing = groupKeysByPrefix(missingKeys);
      Object.entries(groupedMissing).forEach(([prefix, keys]) => {
        console.warn(`   📁 ${prefix}: ${keys.length}個のキー`);
        // 最初の5つだけ表示
        keys.slice(0, 5).forEach(key => console.warn(`      - ${key}`));
        if (keys.length > 5) {
          console.warn(`      ... 他 ${keys.length - 5}個`);
        }
      });
    } else {
      console.log(`✅ 言語 "${lang}" にはすべてのキーが存在します！`);
    }
    
    // 余分キーの報告（オプション）
    if (extraKeys.length > 0) {
      console.info(`ℹ️ 言語 "${lang}" には基準言語にない${extraKeys.length}個の余分なキーがあります`);
    }
  }
  
  // 最終レポート
  console.log('\n========================================');
  console.log('📊 検証結果サマリー:');
  
  let hasErrors = false;
  
  results.forEach(result => {
    if (result.missing.length > 0) {
      hasErrors = true;
      console.error(`❌ 言語 "${result.lang}": ${result.missing.length}個の欠落キー`);
    } else {
      console.log(`✅ 言語 "${result.lang}": 完全に翻訳されています`);
    }
  });
  
  // 終了コード
  if (hasErrors) {
    console.error('\n❌ 翻訳に不完全な部分があります。修正してください。');
    process.exit(1);
  } else {
    console.log('\n✅ すべての言語ファイルが完全に翻訳されています！');
  }
}

/**
 * キーをプレフィックスでグループ化（ファイルパスベース）
 */
function groupKeysByPrefix(keys: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  
  keys.forEach(key => {
    // 最初のドットまでをプレフィックスとする（最上位のファイル/カテゴリ）
    const prefix = key.split('.')[0];
    if (!groups[prefix]) {
      groups[prefix] = [];
    }
    groups[prefix].push(key);
  });
  
  return groups;
}

/**
 * ディレクトリ内のすべての翻訳キーを取得（フラット化）
 */
function getAllTranslationKeys(dirPath: string): string[] {
  const result = new Set<string>();
  
  // ディレクトリを再帰的に処理
  function processDirectory(currentPath: string, prefix: string = '') {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        // ディレクトリの場合は再帰的に処理
        const dirName = entry.name;
        processDirectory(entryPath, prefix ? `${prefix}.${dirName}` : dirName);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        // JSONファイルの場合は内容を読み込み
        const fileName = entry.name.replace('.json', '');
        const filePrefix = prefix 
          ? (fileName === 'common' ? prefix : `${prefix}.${fileName}`)
          : fileName;
        
        try {
          const content = JSON.parse(fs.readFileSync(entryPath, 'utf8'));
          extractKeys(content, filePrefix, result);
        } catch (error) {
          console.error(`JSONファイルの読み込みエラー: ${entryPath}`, error);
        }
      }
    }
  }
  
  processDirectory(dirPath);
  return Array.from(result).sort();
}

/**
 * オブジェクトからすべてのキーを抽出（ネストされたキーを平坦化）
 */
function extractKeys(obj: Record<string, unknown>, prefix: string, result: Set<string>): void {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // ネストされたオブジェクトを再帰的に処理
      extractKeys(value as Record<string, unknown>, fullKey, result);
    } else {
      // 値を持つキーを追加
      result.add(fullKey);
    }
  }
}

/**
 * 欠落しているキーを見つける
 */
function findMissingKeys(sourceKeys: string[], targetKeys: string[]): string[] {
  return sourceKeys.filter(key => !targetKeys.includes(key));
}

// メイン処理を実行
main().catch(err => {
  console.error('エラーが発生しました:', err);
  process.exit(1);
}); 
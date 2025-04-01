/**
 * i18n翻訳状況レポート生成スクリプト
 * 
 * このスクリプトは多言語対応の現在の状況をレポートします。
 * 各言語の翻訳完成度、欠落キー、余分なキーなどの詳細を表示します。
 * 
 * 使用方法:
 * ```
 * ts-node src/scripts/i18n-report.ts
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

// カラー表示用
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

// 言語名マッピング
const languageNames: Record<Language, string> = {
  en: '英語 (English)',
  ja: '日本語 (Japanese)',
  es: 'スペイン語 (Spanish)',
  ru: 'ロシア語 (Russian)',
  zh: '中国語 (Chinese)'
};

// レポート結果の型
interface LanguageReport {
  lang: Language;
  totalKeys: number;
  missingKeys: string[];
  extraKeys: string[];
  completionRate: number; // 0-100のパーセンテージ
  topMissingCategories: Record<string, number>;
}

/**
 * メイン関数
 */
async function main() {
  console.log(`${colors.cyan}${colors.bright}📊 i18n翻訳状況レポート${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}`);
  console.log(`基準言語: ${colors.bright}${languageNames[BASE_LANG]}${colors.reset}`);
  console.log('');

  // 基準言語のキーを取得
  const baseKeys = getAllTranslationKeys(path.join(LOCALE_DIR, BASE_LANG));
  console.log(`基準言語には ${colors.bright}${baseKeys.length}個${colors.reset} のキーがあります`);
  
  // 基準言語のカテゴリ別キー数
  const baseCategories = categorizeKeys(baseKeys);
  console.log('\n--- カテゴリ別キー数 ---');
  Object.entries(baseCategories).sort((a, b) => b[1] - a[1]).forEach(([category, count]) => {
    console.log(`${category}: ${count}個`);
  });
  
  console.log('\n--- 言語別完成度 ---');
  
  // 各言語のレポートを作成
  const reports: LanguageReport[] = [];
  
  // 基準言語を除く各言語の状況を分析
  for (const lang of locales.filter(l => l !== BASE_LANG)) {
    const langPath = path.join(LOCALE_DIR, lang);
    
    // 言語ディレクトリが存在するか確認
    if (!fs.existsSync(langPath)) {
      console.log(`${colors.red}⚠️ 言語 "${lang}" のディレクトリが見つかりません${colors.reset}`);
      continue;
    }
    
    // 言語のキーを取得
    const langKeys = getAllTranslationKeys(langPath);
    
    // 欠落キー
    const missingKeys = findMissingKeys(baseKeys, langKeys);
    
    // 余分なキー
    const extraKeys = findMissingKeys(langKeys, baseKeys);
    
    // 完成度を計算
    const completionRate = ((baseKeys.length - missingKeys.length) / baseKeys.length) * 100;
    
    // 欠落キーをカテゴリ別に分類
    const topMissingCategories = categorizeKeys(missingKeys);
    
    // レポートに追加
    reports.push({
      lang: lang as Language,
      totalKeys: langKeys.length,
      missingKeys,
      extraKeys,
      completionRate,
      topMissingCategories
    });
  }
  
  // 完成度の降順でソート
  reports.sort((a, b) => b.completionRate - a.completionRate);
  
  // 言語ごとのレポートを表示
  reports.forEach(report => {
    // 完成度に応じた色を設定
    let completionColor = colors.green;
    if (report.completionRate < 90) completionColor = colors.yellow;
    if (report.completionRate < 70) completionColor = colors.red;
    
    console.log(`\n${colors.bright}${languageNames[report.lang]}${colors.reset}`);
    console.log(`完成度: ${completionColor}${report.completionRate.toFixed(2)}%${colors.reset} (${baseKeys.length - report.missingKeys.length}/${baseKeys.length})`);
    
    if (report.missingKeys.length > 0) {
      console.log(`欠落: ${colors.red}${report.missingKeys.length}個${colors.reset} | 余分: ${report.extraKeys.length}個`);
      
      // 欠落カテゴリのTOP5を表示
      const categories = Object.entries(report.topMissingCategories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      if (categories.length > 0) {
        console.log('\n主な欠落カテゴリ:');
        categories.forEach(([category, count]) => {
          console.log(`  - ${category}: ${count}個`);
        });
      }
    } else {
      console.log(`${colors.green}✓ すべてのキーが翻訳されています${colors.reset}`);
    }
  });
  
  // 総合レポート
  console.log(`\n${colors.cyan}${colors.bright}========================================${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}📊 総合レポート${colors.reset}`);
  
  // 翻訳の全体的な進捗率
  const averageCompletion = reports.reduce((sum, report) => sum + report.completionRate, 0) / reports.length;
  console.log(`平均完成度: ${averageCompletion.toFixed(2)}%`);
  
  // 完全に翻訳済みの言語数
  const fullyTranslated = reports.filter(r => r.missingKeys.length === 0).length;
  console.log(`完全に翻訳済みの言語: ${fullyTranslated}/${reports.length}`);
  
  // 最も翻訳が不足している言語
  const worstLang = reports[reports.length - 1];
  if (worstLang.completionRate < 100) {
    console.log(`最も翻訳が必要な言語: ${languageNames[worstLang.lang]} (${worstLang.completionRate.toFixed(2)}%)`);
  }
}

/**
 * キーを分類（最上位カテゴリ別に集計）
 */
function categorizeKeys(keys: string[]): Record<string, number> {
  const categories: Record<string, number> = {};
  
  keys.forEach(key => {
    const category = key.split('.')[0];
    if (!categories[category]) {
      categories[category] = 0;
    }
    categories[category]++;
  });
  
  return categories;
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
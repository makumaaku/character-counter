/**
 * i18n翻訳キー構造チェッカー 🔥✨
 * 
 * このスクリプトは言語間のキー構造を比較し、不一致を検出します。
 * 基準言語（通常は英語）と他の言語間で以下をチェックします:
 * - 欠落しているキー
 * - 余分なキー
 * - ファイルの欠落または余分なファイル
 * 
 * 使用方法:
 * ```
 * npm run i18n-check
 * ```
 * 
 * Created with 💕 by Claude
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// 基本設定
type Language = 'en' | 'ja' | 'es' | 'ru' | 'zh';
const LOCALES_DIR = path.join(process.cwd(), 'assets', 'locales');
const BASE_LANG: Language = 'en';
const LANGS_TO_CHECK: Language[] = ['ja', 'es', 'ru', 'zh'];

// 結果集計用
interface CheckResult {
  lang: Language;
  checkedFiles: number;
  missingFiles: string[];
  extraFiles: string[];
  issuesFound: number;
  fileResults: FileCheckResult[];
}

interface FileCheckResult {
  filePath: string;
  missingKeys: string[];
  extraKeys: string[];
}

// JSONの値の型定義
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

/**
 * ディレクトリ内の全てのJSONファイルを再帰的に取得する関数
 */
function getAllJsonFiles(dirPath: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return fileList;
  
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllJsonFiles(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * JSONオブジェクトのキーを抽出（ネストされたキーも含む）
 */
function extractKeys(obj: JsonObject, prefix = '', result = new Set<string>()): Set<string> {
  if (!obj || typeof obj !== 'object') return result;

  for (const key in obj) {
    const currentKey = prefix ? `${prefix}.${key}` : key;
    result.add(currentKey);

    // ネストされたオブジェクトの場合は再帰的に処理
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      extractKeys(obj[key] as JsonObject, currentKey, result);
    }
  }

  return result;
}

/**
 * ファイルからJSONを読み込む
 */
function loadJsonFile(filePath: string): JsonObject | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(chalk.red(`❌ JSONファイルの読み込みエラー: ${filePath}`), error);
    return null;
  }
}

/**
 * キープレフィックスでグループ化
 */
function groupKeysByPrefix(keys: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  
  keys.forEach(key => {
    const prefix = key.split('.')[0];
    if (!groups[prefix]) {
      groups[prefix] = [];
    }
    groups[prefix].push(key);
  });
  
  return groups;
}

/**
 * ファイルのキー構造を比較
 */
function compareJsonFile(baseFilePath: string, targetFilePath: string): FileCheckResult | null {
  // ターゲットファイルが存在しない場合はnullを返す
  if (!fs.existsSync(targetFilePath)) return null;
  
  // JSONファイルの読み込み
  const baseContent = loadJsonFile(baseFilePath);
  const targetContent = loadJsonFile(targetFilePath);
  
  if (!baseContent || !targetContent) return null;
  
  // キー構造の比較
  const baseKeys = Array.from(extractKeys(baseContent)).sort();
  const targetKeys = Array.from(extractKeys(targetContent)).sort();
  
  const missingInTarget = baseKeys.filter(key => !targetKeys.includes(key));
  const extraInTarget = targetKeys.filter(key => !baseKeys.includes(key));
  
  // 相対パスを取得
  const relativeFilePath = path.relative(LOCALES_DIR, baseFilePath).replace(`${BASE_LANG}/`, '');
  
  return {
    filePath: relativeFilePath,
    missingKeys: missingInTarget,
    extraKeys: extraInTarget
  };
}

/**
 * 言語ファイルを比較する
 */
function compareLanguages(baseLang: Language, targetLang: Language): CheckResult {
  console.log(chalk.bold.blue(`\n🔍 ${baseLang} と ${targetLang} の言語ファイルを比較中...\n`));
  
  const baseDir = path.join(LOCALES_DIR, baseLang);
  const targetDir = path.join(LOCALES_DIR, targetLang);
  
  // 対象言語のディレクトリが存在しない場合
  if (!fs.existsSync(targetDir)) {
    console.error(chalk.red(`❌ 言語ディレクトリが見つかりません: ${targetLang}`));
    return {
      lang: targetLang,
      checkedFiles: 0,
      missingFiles: [],
      extraFiles: [],
      issuesFound: 1,
      fileResults: []
    };
  }
  
  // ベース言語のJSONファイル一覧を取得
  const baseFiles = getAllJsonFiles(baseDir);
  const targetFiles = getAllJsonFiles(targetDir);
  
  // 言語ディレクトリからの相対パスに変換
  const baseRelativeFiles = baseFiles.map(file => path.relative(baseDir, file));
  const targetRelativeFiles = targetFiles.map(file => path.relative(targetDir, file));
  
  // 不足しているファイルを検出
  const missingFiles = baseRelativeFiles.filter(file => !targetRelativeFiles.includes(file));
  
  // 余分なファイルを検出
  const extraFiles = targetRelativeFiles.filter(file => !baseRelativeFiles.includes(file));
  
  // 各ファイルを比較
  const fileResults: FileCheckResult[] = [];
  let issuesFound = 0;
  
  for (const baseFile of baseFiles) {
    const relativeFile = path.relative(baseDir, baseFile);
    const targetFile = path.join(targetDir, relativeFile);
    
    // ターゲット言語に対応するファイルが存在しない場合はスキップ
    if (!fs.existsSync(targetFile)) continue;
    
    const result = compareJsonFile(baseFile, targetFile);
    if (result && (result.missingKeys.length > 0 || result.extraKeys.length > 0)) {
      fileResults.push(result);
      issuesFound += result.missingKeys.length + result.extraKeys.length;
    }
  }
  
  return {
    lang: targetLang,
    checkedFiles: baseRelativeFiles.length - missingFiles.length,
    missingFiles,
    extraFiles,
    issuesFound,
    fileResults
  };
}

/**
 * 言語ファイルの比較結果を表示
 */
function displayResults(result: CheckResult): void {
  const { lang, checkedFiles, missingFiles, extraFiles, issuesFound, fileResults } = result;
  
  console.log(chalk.cyan.bold(`\n📊 ${lang} の検証結果:`));
  console.log(chalk.cyan(`  - チェックしたファイル数: ${checkedFiles}`));
  
  // 不足ファイルの表示
  if (missingFiles.length > 0) {
    console.log(chalk.red(`  - 不足しているファイル: ${missingFiles.length}個`));
    missingFiles.forEach(file => console.log(chalk.red(`    • ${file}`)));
  } else {
    console.log(chalk.green(`  - 不足しているファイル: なし`));
  }
  
  // 余分ファイルの表示
  if (extraFiles.length > 0) {
    console.log(chalk.yellow(`  - 余分なファイル: ${extraFiles.length}個`));
    extraFiles.forEach(file => console.log(chalk.yellow(`    • ${file}`)));
  } else {
    console.log(chalk.green(`  - 余分なファイル: なし`));
  }
  
  // キーの問題表示
  if (issuesFound > 0) {
    console.log(chalk.red(`  - キーの不一致: ${issuesFound}個`));
    
    // ファイルごとの問題を表示
    fileResults.forEach(fileResult => {
      console.log(chalk.yellow(`\n    📄 ${fileResult.filePath}:`));
      
      // 不足キーの表示
      if (fileResult.missingKeys.length > 0) {
        console.log(chalk.red(`      - 不足キー: ${fileResult.missingKeys.length}個`));
        
        // キーをグループ化して表示
        const groupedMissing = groupKeysByPrefix(fileResult.missingKeys);
        Object.entries(groupedMissing).forEach(([prefix, keys]) => {
          console.log(chalk.red(`        • ${prefix}: ${keys.length}個`));
          // 最初の3つだけ表示
          keys.slice(0, 3).forEach(key => console.log(chalk.red(`          - ${key}`)));
          if (keys.length > 3) {
            console.log(chalk.red(`          ... 他 ${keys.length - 3}個`));
          }
        });
      }
      
      // 余分キーの表示
      if (fileResult.extraKeys.length > 0) {
        console.log(chalk.magenta(`      - 余分キー: ${fileResult.extraKeys.length}個`));
        
        // キーをグループ化して表示
        const groupedExtra = groupKeysByPrefix(fileResult.extraKeys);
        Object.entries(groupedExtra).forEach(([prefix, keys]) => {
          console.log(chalk.magenta(`        • ${prefix}: ${keys.length}個`));
          // 最初の3つだけ表示
          keys.slice(0, 3).forEach(key => console.log(chalk.magenta(`          - ${key}`)));
          if (keys.length > 3) {
            console.log(chalk.magenta(`          ... 他 ${keys.length - 3}個`));
          }
        });
      }
    });
  } else {
    console.log(chalk.green(`  - キーの不一致: なし 👍`));
  }
  
  // 全体の評価
  if (issuesFound === 0 && missingFiles.length === 0) {
    console.log(chalk.green.bold(`\n✨ ${lang}: 完璧です！`));
  } else {
    console.log(chalk.yellow.bold(`\n⚠️ ${lang}: 問題が見つかりました`));
  }
}

/**
 * メイン処理
 */
function main() {
  console.log(chalk.bold.magenta('🌐✨ i18n キー構造チェッカー ✨🌐'));
  console.log(chalk.cyan(`ベース言語: ${BASE_LANG}`));
  console.log(chalk.cyan(`チェック対象言語: ${LANGS_TO_CHECK.join(', ')}`));
  
  let allPassed = true;
  const allResults: CheckResult[] = [];
  
  // 各言語をチェック
  for (const lang of LANGS_TO_CHECK) {
    const result = compareLanguages(BASE_LANG, lang);
    displayResults(result);
    allResults.push(result);
    
    if (result.issuesFound > 0 || result.missingFiles.length > 0) {
      allPassed = false;
    }
  }
  
  // 総合結果
  console.log('\n' + chalk.bold.blue('=================================================='));
  console.log(chalk.bold.cyan('📝 結果サマリー:'));
  
  allResults.forEach(result => {
    const { lang, issuesFound, missingFiles } = result;
    const totalIssues = issuesFound + missingFiles.length;
    
    if (totalIssues === 0) {
      console.log(chalk.green(`✅ ${lang}: 問題なし`));
    } else {
      console.log(chalk.red(`❌ ${lang}: ${totalIssues}個の問題`));
    }
  });
  
  if (allPassed) {
    console.log(chalk.bold.green('\n🎉 全ての言語ファイルのキー構造が一致しています！'));
  } else {
    console.log(chalk.bold.red('\n❌ 一部の言語ファイルにキー構造の不一致があります'));
    console.log(chalk.yellow('💡 修正方法:'));
    console.log(chalk.yellow('   1. 不足しているファイルを追加'));
    console.log(chalk.yellow('   2. 不足しているキーを追加 (`npm run i18n-fix` コマンドを使用できます)'));
    console.log(chalk.yellow('   3. 余分なキーを確認し、必要であれば他の言語にも追加'));
    process.exit(1); // CIで失敗を検知できるようにエラーコードを返す
  }
}

// スクリプト実行
main(); 
/**
 * i18n翻訳修正ヘルパースクリプト
 * 
 * このスクリプトは欠落している翻訳キーを基準言語（英語）から補完します。
 * 翻訳漏れを一時的に対処するための支援ツールです。
 * 
 * 使用方法:
 * ```
 * ts-node src/scripts/i18n-fix-helper.ts [言語コード]
 * ```
 * 
 * 例:
 * ```
 * ts-node src/scripts/i18n-fix-helper.ts ja
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
};

// 翻訳ファイルの型
interface TranslationFile {
  path: string;
  content: Record<string, unknown>;
  modified: boolean;
}

/**
 * メイン関数
 */
async function main() {
  console.log(`${colors.cyan}${colors.bright}🔧 i18n翻訳修正ヘルパー${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}`);
  
  // コマンドライン引数から言語を取得
  const lang = process.argv[2] as Language;
  
  // 言語コードが指定されていない場合はエラー
  if (!lang) {
    console.error(`${colors.red}エラー: 言語コードを指定してください${colors.reset}`);
    console.log(`使用例: ts-node src/scripts/i18n-fix-helper.ts ja`);
    process.exit(1);
  }
  
  // 有効な言語コードかチェック
  if (!locales.includes(lang) || lang === BASE_LANG) {
    console.error(`${colors.red}エラー: 無効な言語コードです: ${lang}${colors.reset}`);
    console.log(`有効な言語コード: ${locales.filter(l => l !== BASE_LANG).join(', ')}`);
    process.exit(1);
  }
  
  console.log(`言語: ${colors.bright}${lang}${colors.reset}`);
  console.log(`基準言語: ${colors.bright}${BASE_LANG}${colors.reset}`);
  
  // 言語ディレクトリのパス
  const basePath = path.join(LOCALE_DIR, BASE_LANG);
  const langPath = path.join(LOCALE_DIR, lang);
  
  // 基準言語ディレクトリの存在確認
  if (!fs.existsSync(basePath)) {
    console.error(`${colors.red}エラー: 基準言語ディレクトリが見つかりません: ${basePath}${colors.reset}`);
    process.exit(1);
  }
  
  // 対象言語ディレクトリの存在確認
  if (!fs.existsSync(langPath)) {
    console.error(`${colors.red}エラー: 対象言語ディレクトリが見つかりません: ${langPath}${colors.reset}`);
    process.exit(1);
  }
  
  // 基準言語と対象言語の翻訳ファイルを読み込み
  const baseFiles = loadTranslationFiles(basePath);
  const langFiles = loadTranslationFiles(langPath);
  
  console.log(`基準言語ファイル数: ${colors.bright}${baseFiles.length}${colors.reset}`);
  console.log(`対象言語ファイル数: ${colors.bright}${langFiles.length}${colors.reset}`);
  
  // 不足しているファイルを作成
  const missingFiles = findMissingFiles(baseFiles, langFiles, langPath);
  
  // 既存ファイルの欠落キーを補完
  const fixedFiles = fixExistingFiles(baseFiles, langFiles, langPath);
  
  // 変更されたファイル数
  const totalChanges = missingFiles.length + fixedFiles.length;
  
  if (totalChanges > 0) {
    console.log(`\n${colors.green}${colors.bright}✓ 合計 ${totalChanges} 個のファイルが更新されました${colors.reset}`);
    
    // 確認メッセージ
    console.log(`\n${colors.yellow}注意: これらの変更は一時的なものです。実際の翻訳に置き換えてください。${colors.reset}`);
  } else {
    console.log(`\n${colors.green}${colors.bright}✓ すべてのファイルが最新です。変更は必要ありません。${colors.reset}`);
  }
}

/**
 * ディレクトリ内の翻訳ファイルを読み込む
 */
function loadTranslationFiles(dirPath: string): TranslationFile[] {
  const files: TranslationFile[] = [];
  
  // ディレクトリを再帰的に処理
  function processDirectory(currentPath: string, relativePath: string = '') {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);
      // 言語ディレクトリからの相対パスを記録
      const entryRelativePath = relativePath ? path.join(relativePath, entry.name) : entry.name;
      
      if (entry.isDirectory()) {
        // ディレクトリの場合は再帰的に処理
        processDirectory(entryPath, entryRelativePath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        // JSONファイルの場合は内容を読み込み
        try {
          const content = JSON.parse(fs.readFileSync(entryPath, 'utf8'));
          files.push({
            path: entryRelativePath,
            content,
            modified: false
          });
        } catch (error) {
          console.error(`JSONファイルの読み込みエラー: ${entryPath}`, error);
        }
      }
    }
  }
  
  processDirectory(dirPath);
  return files;
}

/**
 * 不足しているファイルを見つけて作成
 */
function findMissingFiles(baseFiles: TranslationFile[], langFiles: TranslationFile[], langDir: string): string[] {
  const langFilePaths = langFiles.map(file => file.path);
  const missingFiles: string[] = [];
  
  for (const baseFile of baseFiles) {
    if (!langFilePaths.includes(baseFile.path)) {
      // 対象言語に存在しないファイル
      const targetPath = path.join(langDir, baseFile.path);
      
      // ディレクトリを作成
      const dirPath = path.dirname(targetPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // ファイルを作成
      fs.writeFileSync(targetPath, JSON.stringify(baseFile.content, null, 2), 'utf8');
      
      console.log(`${colors.green}✓ ファイルを新規作成: ${colors.reset}${baseFile.path}`);
      missingFiles.push(baseFile.path);
    }
  }
  
  return missingFiles;
}

/**
 * 既存ファイルの欠落キーを補完
 */
function fixExistingFiles(baseFiles: TranslationFile[], langFiles: TranslationFile[], langPath: string): string[] {
  const fixedFiles: string[] = [];
  
  for (const langFile of langFiles) {
    // 基準言語の対応するファイルを検索
    const baseFile = baseFiles.find(file => file.path === langFile.path);
    if (!baseFile) continue;
    
    // 欠落キーを補完
    let modified = false;
    
    // 深いオブジェクト比較と修正を行う関数
    function mergeObjects(baseObj: Record<string, unknown>, langObj: Record<string, unknown>, path = ''): Record<string, unknown> {
      for (const [key, baseValue] of Object.entries(baseObj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (!(key in langObj)) {
          // キーが存在しない場合は追加
          langObj[key] = baseValue;
          console.log(`  - キーを追加: ${currentPath}`);
          modified = true;
        } else if (
          baseValue !== null &&
          typeof baseValue === 'object' &&
          !Array.isArray(baseValue) &&
          langObj[key] !== null &&
          typeof langObj[key] === 'object' &&
          !Array.isArray(langObj[key])
        ) {
          // 両方がオブジェクトの場合は再帰的に処理
          langObj[key] = mergeObjects(
            baseValue as Record<string, unknown>,
            langObj[key] as Record<string, unknown>,
            currentPath
          );
        }
      }
      
      return langObj;
    }
    
    // ファイルの内容を比較・修正
    const updatedContent = mergeObjects(baseFile.content, { ...langFile.content });
    
    if (modified) {
      // 変更があった場合はファイルを更新
      // このファイルが言語ディレクトリ内のどこにあるかのパスを構築
      const filePath = path.join(langPath, langFile.path);
      
      try {
        console.log(`更新するファイル: ${filePath}`);
        
        // ディレクトリが存在するか確認
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
          console.log(`ディレクトリを作成: ${dirPath}`);
          fs.mkdirSync(dirPath, { recursive: true });
        }
        
        fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2), 'utf8');
        console.log(`${colors.green}✓ ファイルを更新: ${colors.reset}${langFile.path}`);
        fixedFiles.push(langFile.path);
      } catch (error) {
        console.error(`${colors.red}エラー: ファイル更新失敗 (${filePath})${colors.reset}`);
        console.error(error);
      }
    }
  }
  
  return fixedFiles;
}

// メイン処理を実行
main().catch(err => {
  console.error('エラーが発生しました:', err);
  process.exit(1);
}); 
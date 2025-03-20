import { execSync } from 'child_process';
import puppeteer from 'puppeteer';
import { Browser, Page } from './puppeteer-types';

// ブラウザインスタンスをキャッシュ
let browserInstance: Browser | null = null;

/**
 * 開発環境でChromeをインストールする関数
 */
async function ensureChromium(): Promise<void> {
  try {
    // Puppeteerが互換性のあるChromeバージョンを見つけられるか確認
    await puppeteer.launch({ 
      headless: true,
      protocolTimeout: 5000 // 短めのタイムアウトで確認
    });
    console.log('互換性のあるChromeが見つかりました');
  } catch {
    console.log('互換性のあるChromeが見つかりません。自動的にインストールします...');
    try {
      // Puppeteerが要求する正確なバージョンを取得してインストール
      const requiredVersion = String(execSync('node -e "console.log(require(\'puppeteer\')._preferredRevision)"', { encoding: 'utf-8' })).trim();
      console.log(`Puppeteerが必要とするChromeバージョン: ${requiredVersion}`);
      
      // 具体的なバージョンでChromeをインストール
      execSync(`npx puppeteer browsers install chrome@${requiredVersion}`, { stdio: 'inherit' });
      console.log('Chromeのインストールが完了しました！');
    } catch (installError) {
      console.error('Chromeのインストールに失敗しました:', installError);
      throw new Error('Chromeのインストールに失敗しました。手動でインストールしてください: npx puppeteer browsers install chrome');
    }
  }
}

/**
 * ローカル環境でブラウザ情報を取得してログに出力する
 * @param executablePath Chromeの実行パス
 */
function logLocalBrowserInfo(executablePath: string): void {
  try {
    // Puppeteerのバージョン情報をコマンドで取得する
    const requiredVersion = String(execSync('npx puppeteer browsers install --help | grep -o "chrome@[0-9.]*" | head -1 | cut -d@ -f2', { encoding: 'utf-8' })).trim() || '不明';
    const puppeteerVersion = String(execSync('npx puppeteer --version', { encoding: 'utf-8' })).trim() || '不明';
    
    // パスからバージョン情報を抽出（OS非依存の方法）
    let installedChromeVersion = '不明';
    try {
      // Chromeのバージョン情報を直接取得
      const versionOutput = String(execSync(`"${executablePath}" --version`, { encoding: 'utf-8' })).trim();
      installedChromeVersion = versionOutput.match(/[\d\.]+/)?.[0] || '不明';
    } catch {
      // 直接実行できない場合はパスからバージョンを推測
      const macMatch = executablePath.match(/mac(?:_arm)?-([^\/]+)/);
      const winMatch = executablePath.match(/win(?:64)?-([^\\]+)/);
      const linuxMatch = executablePath.match(/linux-([^\/]+)/);
      installedChromeVersion = macMatch?.[1] || winMatch?.[1] || linuxMatch?.[1] || '不明';
    }
    
    console.log(`------- ローカルブラウザ情報 -------`);
    console.log(`Puppeteerバージョン: ${puppeteerVersion}`);
    console.log(`Puppeteerが必要とするChromeバージョン: ${requiredVersion}`);
    console.log(`実際に使用するChromeバージョン: ${installedChromeVersion}`);
    console.log(`使用するChromeのパス: ${executablePath}`);
    
    // 実行環境の情報を追加
    try {
      const nodeVersion = String(execSync('node --version', { encoding: 'utf-8' })).trim();
      const osInfo = String(execSync('uname -a || ver', { encoding: 'utf-8' })).trim();
      console.log(`Node.jsバージョン: ${nodeVersion}`);
      console.log(`OS情報: ${osInfo}`);
    } catch (envError) {
      console.log(`実行環境情報の取得に失敗: ${envError}`);
    }
    
    console.log(`----------------------------------`);
  } catch (error) {
    console.warn('バージョン情報の取得に失敗しました:', error);
    console.log(`使用するChromeのパス: ${executablePath}`);
  }
}

/**
 * ローカル開発環境でブラウザインスタンスを取得する
 * @returns Puppeteerのブラウザインスタンス
 */
export async function getBrowser(): Promise<Browser> {
  if (browserInstance) return browserInstance;

  // 開発環境ではローカルのPuppeteerを使用
  // Chromeが利用可能か確認し、必要ならインストール
  await ensureChromium();
  
  // インストールされたChromeの実行パスを取得
  const executablePath = puppeteer.executablePath();
  
  // Chromeのバージョン情報を取得
  logLocalBrowserInfo(executablePath);
  
  browserInstance = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
    executablePath: executablePath,
    protocolTimeout: 50000 // タイムアウトを50秒に設定
  });
  
  return browserInstance;
}

/**
 * ブラウザの新しいページを作成する
 * @returns Puppeteerのページオブジェクト
 */
export async function createPage(): Promise<Page> {
  const browser = await getBrowser();
  return await browser.newPage();
}

/**
 * デバッグ用にブラウザ環境情報をログに出力
 */
export function logBrowserInfo(): void {
  console.log('------- ローカル環境ブラウザ情報 -------');
  console.log('環境: ローカル開発環境');
  console.log('puppeteerを使用');
  console.log('----------------------------------------');
} 
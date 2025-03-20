import { execSync } from 'child_process';
import puppeteerCore, { Browser, Page } from 'puppeteer-core';

// ブラウザインスタンスをキャッシュ
let browserInstance: Browser | null = null;

/**
 * Chromeの実行パスを取得する関数
 * @returns Chromeの実行パス
 */
async function getChromeExecutablePath(): Promise<string> {
  // OSに応じたデフォルトのChrome実行パス
  const defaultPaths = {
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
    ],
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium'
    ]
  };

  // 現在のOSに合わせたパスリストを取得
  const paths = defaultPaths[process.platform as keyof typeof defaultPaths] || defaultPaths.linux;

  // パスが存在するか確認
  for (const path of paths) {
    try {
      execSync(`"${path}" --version`, { stdio: 'ignore' });
      console.log(`使用可能なChromeが見つかりました: ${path}`);
      return path;
    } catch {
      // このパスでは実行できない、次を試す
    }
  }

  // 見つからない場合はエラー
  throw new Error('Chrome実行パスが見つかりません。Chromeをインストールしてください。');
}

/**
 * ローカル環境でブラウザ情報を取得してログに出力する
 * @param executablePath Chromeの実行パス
 */
function logLocalBrowserInfo(executablePath: string): void {
  try {
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
    console.log(`puppeteer-coreを使用`);
    console.log(`使用するChromeバージョン: ${installedChromeVersion}`);
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
 * @returns Puppeteer-Coreのブラウザインスタンス
 */
export async function getBrowser(): Promise<Browser> {
  if (browserInstance) return browserInstance;

  // ローカルのChromeパスを取得
  const executablePath = await getChromeExecutablePath();
  
  // Chromeのバージョン情報を取得
  logLocalBrowserInfo(executablePath);
  
  // 環境変数から日本語フォントサポート設定を取得
  const fontSupport = process.env.PUPPETEER_FONT_SUPPORT === 'true';
  const lang = process.env.PUPPETEER_LANG || 'ja';
  
  // 起動オプションを設定
  const launchArgs = [
    '--no-sandbox', 
    '--disable-setuid-sandbox', 
    '--disable-dev-shm-usage'
  ];
  
  // 日本語フォントサポートが有効な場合、フォント関連のオプションを追加
  if (fontSupport) {
    launchArgs.push(
      '--font-render-hinting=none',
      '--disable-font-subpixel-positioning',
      '--disable-features=BlinkGenPropertyTrees',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      `--lang=${lang}`,
      '--font-family=Noto Sans JP,Noto Sans CJK JP,Hiragino Sans,Hiragino Kaku Gothic Pro,Yu Gothic,Meiryo,sans-serif'
    );
  }
  
  // puppeteer-coreでローカルのChromeを使用
  browserInstance = await puppeteerCore.launch({
    args: launchArgs,
    headless: true,
    executablePath: executablePath,
    protocolTimeout: 50000, // タイムアウトを50秒に設定
    ignoreDefaultArgs: ['--disable-extensions']
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
  console.log('puppeteer-coreを使用');
  console.log('----------------------------------------');
} 
import chromium from '@sparticuz/chromium-min';
import puppeteerCore from 'puppeteer-core';
import { Browser, Page } from './puppeteer-core-types';

// GitHubからChromiumを取得するためのパス
// @sparticuz/chromium-minのバージョンに応じてパスを変更する必要があります。
const REMOTE_EXECUTABLE_PATH = 
  "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar";

// ブラウザインスタンスをキャッシュ
let browserInstance: Browser | null = null;

/**
 * Production環境でブラウザインスタンスを取得する
 * @returns Puppeteer-Coreのブラウザインスタンス
 */
export async function getBrowser(): Promise<Browser> {
  if (browserInstance) return browserInstance;

  // 本番環境（Vercel）では@sparticuz/chromium-minを使用
  browserInstance = await puppeteerCore.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(REMOTE_EXECUTABLE_PATH),
    headless: true,
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
  console.log('------- Production ブラウザ情報 -------');
  console.log('環境: Vercel/Production');
  console.log(`Chromiumパス: ${REMOTE_EXECUTABLE_PATH}`);
  console.log('puppeteer-coreを使用');
  console.log('---------------------------------------');
} 
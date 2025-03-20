import chromium from '@sparticuz/chromium-min';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import type { Page } from 'puppeteer-core';
import puppeteerCore from 'puppeteer-core';

// Vercelのタイムアウトを60秒に設定
export const maxDuration = 60; // Vercelのサーバーレス関数のタイムアウト設定 (秒)
export const dynamic = "force-dynamic";

// GitHubからChromiumを取得するためのパス
const remoteExecutablePath = 
  "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar";

// ブラウザインスタンスをキャッシュ
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let browser: any = null;

// 開発環境でChromeをインストールする関数
async function ensureChromium() {
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

// ブラウザインスタンスを取得する関数
async function getBrowser() {
  if (browser) return browser;

  if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production" || process.env.NODE_ENV === "production") {
    // 本番環境（Vercel）では@sparticuz/chromium-minを使用
    browser = await puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(remoteExecutablePath),
      headless: true,
      protocolTimeout: 50000 // タイムアウトを50秒に設定
    });
  } else {
    // 開発環境ではローカルのPuppeteerを使用
    // Chromeが利用可能か確認し、必要ならインストール
    await ensureChromium();
    
    // インストールされたChromeの実行パスを取得
    // Puppeteerのデフォルトの実行可能パスを使用
    // これにより自動的にPuppeteerが互換性のあるChromeバージョンを選択する
    const executablePath = puppeteer.executablePath();
    
    // Chromeのバージョン情報を取得
    try {
      const requiredVersion = String(execSync('node -e "console.log(require(\'puppeteer\')._preferredRevision)"', { encoding: 'utf-8' })).trim();
      const puppeteerVersion = String(execSync('node -e "console.log(require(\'puppeteer\').version())"', { encoding: 'utf-8' })).trim();
      
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
      
      console.log(`------- ブラウザ情報 -------`);
      console.log(`Puppeteerバージョン: ${puppeteerVersion}`);
      console.log(`Puppeteerが必要とするChromeバージョン: ${requiredVersion}`);
      console.log(`実際に使用するChromeバージョン: ${installedChromeVersion}`);
      console.log(`使用するChromeのパス: ${executablePath}`);
      console.log(`---------------------------`);
    } catch (error) {
      console.warn('バージョン情報の取得に失敗しました:', error);
      console.log(`使用するChromeのパス: ${executablePath}`);
    }
    
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      headless: true,
      executablePath: executablePath,
      protocolTimeout: 50000 // タイムアウトを50秒に設定
    });
  }
  return browser;
}

export async function GET(request: NextRequest) {
  try {
    // URLパラメータを取得
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const format = searchParams.get('format') || 'a4';
    const orientation = searchParams.get('orientation') || 'portrait';
    const scale = searchParams.get('scale') === 'fit' ? 'fit' : 1;

    // URLが指定されていない場合はエラーを返す
    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // ブラウザを取得
    const browser = await getBrowser();
    
    // 新しいページを作成
    const page = await browser.newPage();
    
    // ビューポートサイズを設定（A4サイズに近い比率）
    await page.setViewport({
      width: 1240,
      height: 1754,
      deviceScaleFactor: 1,
    });

    // ユーザーエージェントを設定（モバイルビューを避けるため）
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // ページに移動
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 45000 // タイムアウトを45秒に設定
    });

    // ページが完全に読み込まれるのを待つ
    try {
      await page.evaluate(() => {
        return new Promise((resolve) => {
          // タイムアウト処理を追加（30秒後に強制的に解決）
          const forceResolveTimeout = setTimeout(() => {
            console.log('Image loading timeout, continuing anyway');
            resolve(true);
          }, 30000);
          
          // すべての画像が読み込まれるのを待つ
          const images = document.querySelectorAll('img');
          let loadedImages = 0;
          
          if (images.length === 0) {
            clearTimeout(forceResolveTimeout);
            resolve(true);
            return;
          }
          
          images.forEach(img => {
            if (img.complete) {
              loadedImages++;
              if (loadedImages === images.length) {
                clearTimeout(forceResolveTimeout);
                resolve(true);
              }
            } else {
              img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                  clearTimeout(forceResolveTimeout);
                  resolve(true);
                }
              });
              img.addEventListener('error', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                  clearTimeout(forceResolveTimeout);
                  resolve(true);
                }
              });
            }
          });
        });
      });
    } catch (error) {
      console.log('Error waiting for images, continuing anyway:', error);
    }

    // 動的コンテンツのロードを待つための追加処理
    try {
      // ローディング要素が消えるのを待つ（最大10秒）
      await page.waitForFunction(
        () => {
          // ローディング要素を探す一般的なセレクタ
          const loadingElements = document.querySelectorAll('.loading, .loader, [data-loading], [aria-busy="true"]');
          return loadingElements.length === 0;
        },
        { timeout: 10000 }
      ).catch(() => {
        console.log('Loading elements still present or not found, continuing anyway');
      });
      
      // 少し待機して、最終的なJavaScriptの実行を待つ
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
      
      // スクロールしてすべてのコンテンツを読み込む
      await autoScroll(page);
      
    } catch (error) {
      console.log('Error waiting for dynamic content, continuing anyway:', error);
    }

    // PDFオプションを設定
    interface PDFOptions {
      format: 'a4' | 'letter' | 'legal';
      landscape: boolean;
      printBackground: boolean;
      margin: {
        top: string;
        right: string;
        bottom: string;
        left: string;
      };
      scale?: number;
      preferCSSPageSize?: boolean;
      displayHeaderFooter?: boolean;
      timeout?: number;
    }

    const pdfOptions: PDFOptions = {
      format: format as 'a4' | 'letter' | 'legal',
      landscape: orientation === 'landscape',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      timeout: 45000 // PDF生成のタイムアウトも調整
    };

    // スケールオプションを設定
    if (scale === 'fit') {
      // ページ全体をPDFに収める
      pdfOptions.scale = 0.75; // 一般的に0.75がページ全体を収めるのに適切
    } else {
      pdfOptions.scale = 1;
    }

    // PDFを生成
    const pdf = await page.pdf(pdfOptions);

    // ページを閉じる（ブラウザは閉じない - 再利用のため）
    await page.close();

    // PDFをレスポンスとして返す
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="webpage.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

// ページを自動スクロールする関数
async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
} 
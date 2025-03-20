import * as local from './local';
import { PageInterface } from './page-interface';
import * as production from './production';
import { PDFOptions, PageSetupOptions } from './types';
import { loadPage, setupPage } from './utils';

// 環境に応じたモジュールを選択
const environment = process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production" || process.env.NODE_ENV === "production"
  ? production
  : local;

/**
 * 環境に応じたブラウザインスタンスを取得する
 * @returns 適切な環境のブラウザインスタンス
 */
export async function getBrowser() {
  return environment.getBrowser();
}

/**
 * 新しいPuppeteerページを作成する
 * @returns Puppeteerのページオブジェクト
 */
export async function createPage(): Promise<PageInterface> {
  return environment.createPage() as unknown as PageInterface;
}

/**
 * 環境情報をログに出力する
 */
export function logBrowserInfo(): void {
  environment.logBrowserInfo();
}

/**
 * ウェブページをPDFに変換する
 * @param options ページ設定オプション
 * @returns PDFバッファ
 */
export async function convertToPDF(options: PageSetupOptions): Promise<Buffer> {
  // ブラウザページを作成
  const page = await createPage();
  
  try {
    // PCビューを確保するため、十分な幅を設定（最低でも1280px）
    const pcWidth = Math.max(options.width, 1280);
    
    // 高さが指定されていない場合は、アスペクト比から計算
    const aspectRatio = 1754 / 1240; // PDFの元のアスペクト比を維持
    const height = options.height || Math.round(pcWidth * aspectRatio);
    
    // ページの設定
    await setupPage(page, pcWidth, height);
    
    // ページを読み込む
    await loadPage(page, options.url);
    
    // さらにPC表示を確実にするためのスクリプトを実行
    await page.evaluate(() => {
      // メディアクエリチェックを上書き
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSMediaRule) {
              if (rule.conditionText.includes('max-width') || 
                  rule.conditionText.includes('max-device-width') || 
                  rule.conditionText.includes('mobile') || 
                  rule.conditionText.includes('phone')) {
                // モバイル用CSSを無効化するための処理
                // 実際には何もしない（このルールを適用しない）
              }
            }
          });
        } catch (e) {
          // CORSの制約でアクセスできないスタイルシートは無視
          console.log('CORSの制約でアクセスできないスタイルシートは無視', e);
        }
      });
      
      // モバイル表示/SPサイト切り替えボタンがあれば、PC表示を選択
      const pcViewButtons = Array.from(document.querySelectorAll('a, button, [role="button"]')).filter(el => {
        const text = el.textContent?.toLowerCase() || '';
        return text.includes('pc') || text.includes('desktop') || text.includes('pc表示');
      });
      
      pcViewButtons.forEach(button => {
        try {
          (button as HTMLElement).click();
        } catch (e) {
          // クリックできない場合は無視
          console.log('クリックできない場合は無視', e);
        }
      });
    });
    
    // PDFオプションを設定
    const pdfOptions: PDFOptions = {
      format: 'letter',
      landscape: false,
      printBackground: true,
      margin: {
        top: '0.5cm',
        right: '0.5cm',
        bottom: '0.5cm',
        left: '0.5cm',
      },
      preferCSSPageSize: false, // CSSのページサイズを優先しない
      displayHeaderFooter: true,
      timeout: 45000 // PDF生成のタイムアウトも調整
    };

    // スケールオプションを設定
    if (options.scale === 'fit') {
      // ページ全体をPDFに収める（幅の広いウェブサイト向けに調整）
      pdfOptions.scale = 0.55; // より小さい値で全体を表示
    } else {
      pdfOptions.scale = 0.8; // デフォルトのスケールも少し小さく
    }

    // PDFを生成
    const pdf = await page.pdf(pdfOptions);
    
    return pdf;
  } finally {
    // 常にページを閉じる（エラーが発生しても閉じる）
    await page.close();
  }
} 
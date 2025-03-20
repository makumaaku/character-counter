import { Page } from 'puppeteer-core';
import * as local from './local';
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
export async function createPage(): Promise<Page> {
  return environment.createPage();
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
export async function convertToPDF(options: PageSetupOptions): Promise<Uint8Array> {
  // 処理開始時間を記録
  const startTime = Date.now();
  console.log(`🔄 [Web-to-PDF] 処理開始: URL=${options.url}`);
  
  // ブラウザページを作成
  console.log(`🔄 [Web-to-PDF] ブラウザページ作成中...`);
  const page = await createPage();
  console.log(`✅ [Web-to-PDF] ブラウザページ作成完了 (${Date.now() - startTime}ms)`);
  
  try {
    // PCビューを確保するため、十分な幅を設定（最低でも1280px）
    const pcWidth = Math.max(options.width, 1280);
    
    // 高さが指定されていない場合は、アスペクト比から計算
    const aspectRatio = 1754 / 1240; // PDFの元のアスペクト比を維持
    const height = options.height || Math.round(pcWidth * aspectRatio);
    
    // ページの設定
    console.log(`🔄 [Web-to-PDF] ページ設定中... (width=${pcWidth}, height=${height})`);
    await setupPage(page, pcWidth, height);
    console.log(`✅ [Web-to-PDF] ページ設定完了 (${Date.now() - startTime}ms)`);
    
    // ページを読み込む
    console.log(`🔄 [Web-to-PDF] ページ読み込み開始...`);
    await loadPage(page, options.url);
    console.log(`✅ [Web-to-PDF] ページ読み込み完了 (${Date.now() - startTime}ms)`);

    // 画像の読み込み状態を確認して、必要に応じて再読み込み
    console.log(`🔄 [Web-to-PDF] 画像の読み込み状態を確認...`);
    const imageStatus = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const totalImages = images.length;
      const loadedImages = images.filter(img => img.complete && img.naturalWidth > 0).length;
      
      // 未読み込みの画像を特定
      const unloadedImages = images.filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => ({
          src: img.src,
          srcset: img.srcset,
          classes: img.className,
          id: img.id,
          width: img.width,
          height: img.height,
          isVisible: img.getBoundingClientRect().top < window.innerHeight
        }));
      
      return { 
        totalImages, 
        loadedImages, 
        unloadedImages: unloadedImages.slice(0, 10), // 最初の10個だけを返す
        hasUnloaded: loadedImages < totalImages
      };
    });
    
    console.log(`📊 [Web-to-PDF] 画像読み込み状況: ${imageStatus.loadedImages}/${imageStatus.totalImages}`);
    
    // 未読み込みの画像がある場合、追加の対策を実施
    if (imageStatus.hasUnloaded && imageStatus.totalImages > 0) {
      console.log(`⚠️ [Web-to-PDF] 未読み込み画像があります。追加対策を実施...`);
      
      // 未読み込み画像の詳細をログ出力
      console.log(`未読み込み画像サンプル:`, JSON.stringify(imageStatus.unloadedImages, null, 2));
      
      // 画像を強制的に表示させるスクリプトを実行
      await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        
        // すべての画像を可視化
        images.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            // 画像のスタイルを調整して表示を確保
            img.style.visibility = 'visible';
            img.style.display = 'inline-block';
            
            // data-src や data-srcset がある場合、それらの値をsrcやsrcsetに設定
            if (img.getAttribute('data-src')) {
              img.src = img.getAttribute('data-src') || img.src;
            }
            if (img.getAttribute('data-srcset')) {
              img.srcset = img.getAttribute('data-srcset') || img.srcset;
            }
            
            // loading="lazy"を無効化
            img.loading = 'eager';
            
            // サイズが0の場合は最小サイズを設定
            if (img.width === 0) img.width = 100;
            if (img.height === 0) img.height = 100;
          }
        });
        
        // 遅延読み込みスクリプトを事前に実行するヒント
        interface WindowWithLazyLoad extends Window {
          lazyLoadInstance?: {
            update(): void;
          };
        }
        if ((window as WindowWithLazyLoad).lazyLoadInstance) {
          try {
            (window as WindowWithLazyLoad).lazyLoadInstance?.update();
          } catch (e) {
            console.log('LazyLoad update failed:', e);
          }
        }
        
        return true;
      });
      
      // 追加の待機時間を設定
      console.log(`🔄 [Web-to-PDF] 画像の追加読み込み待機中...`);
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));
      
      // 再度スクロールして画像を表示
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const scrollDelay = 100;
          let lastScrollHeight = 0;
          
          console.log('Rescrolling to ensure images are loaded...');
          
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            
            if (totalHeight >= scrollHeight || lastScrollHeight === scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              setTimeout(resolve, 500);
            }
            
            lastScrollHeight = scrollHeight;
          }, scrollDelay);
        });
      });
      
      // 最終的な画像状態を確認
      const finalImageStatus = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const loadedImages = images.filter(img => img.complete && img.naturalWidth > 0).length;
        return { total: images.length, loaded: loadedImages };
      });
      
      console.log(`📊 [Web-to-PDF] 最終画像読み込み状況: ${finalImageStatus.loaded}/${finalImageStatus.total}`);
    }
    
    // さらにPC表示を確実にするためのスクリプトを実行
    console.log(`🔄 [Web-to-PDF] PC表示用スクリプト実行...`);
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
    console.log(`✅ [Web-to-PDF] PC表示用スクリプト実行完了 (${Date.now() - startTime}ms)`);
    
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
      timeout: 45000 // 
    };

    // スケールオプションを設定
    if (options.scale === 'fit') {
      // ページ全体をPDFに収める（幅の広いウェブサイト向けに調整）
      pdfOptions.scale = 0.55; // より小さい値で全体を表示
    } else {
      pdfOptions.scale = 0.8; // デフォルトのスケールも少し小さく
    }

    // ページに日本語フォントをインジェクトする
    await page.evaluate(() => {
      // 日本語フォントのフォールバックを設定するためのスタイルを追加
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'NotoSansJP';
          src: local('Noto Sans JP'), local('Noto Sans CJK JP'), 
               local('Hiragino Sans'), local('Hiragino Kaku Gothic Pro'), 
               local('Yu Gothic'), local('Meiryo'), local('MS PGothic'), 
               local('sans-serif');
          font-weight: normal;
          font-style: normal;
        }
        
        * {
          font-family: 'NotoSansJP', 'Noto Sans JP', 'Noto Sans CJK JP', 
                      'Hiragino Sans', 'Hiragino Kaku Gothic Pro', 
                      'Yu Gothic', 'Meiryo', 'MS PGothic', sans-serif !important;
        }
      `;
      document.head.appendChild(style);
    });

    // PDFを生成
    console.log(`🔄 [Web-to-PDF] PDF生成開始...`);
    const pdf = await page.pdf(pdfOptions);
    console.log(`✅ [Web-to-PDF] PDF生成完了 (${Date.now() - startTime}ms)`);
    
    // 処理完了時間とサイズをログ出力
    const totalTime = Date.now() - startTime;
    const pdfSizeMB = (pdf.length / (1024 * 1024)).toFixed(2);
    console.log(`✅ [Web-to-PDF] 処理完了: 合計時間=${totalTime}ms, サイズ=${pdfSizeMB}MB`);
    
    return pdf;
  } catch (error) {
    // エラー発生時のログ
    const errorTime = Date.now() - startTime;
    console.error(`❌ [Web-to-PDF] エラー発生 (${errorTime}ms):`, error);
    throw error;
  } finally {
    // 常にページを閉じる（エラーが発生しても閉じる）
    await page.close();
    console.log(`🔄 [Web-to-PDF] ページクローズ完了 (${Date.now() - startTime}ms)`);
  }
}

/**
 * ウェブページからPDFを生成する
 * @param url PDFに変換するウェブページのURL
 * @param options PDFオプションとページセットアップオプション
 * @returns PDFバイナリデータ
 */
export async function webToPdf(
  url: string, 
  options: { pdf?: Partial<PDFOptions>; page?: Partial<PageSetupOptions> } = {}
): Promise<Uint8Array> {
  const pageOptions: PageSetupOptions = {
    url,
    width: options.page?.width || 1280,
    height: options.page?.height,
    scale: options.page?.scale || 'fit'
  };
  
  return convertToPDF(pageOptions);
} 
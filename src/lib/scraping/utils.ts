import { Page } from 'puppeteer-core';

/**
 * ページを自動スクロールしてすべてのコンテンツを読み込む
 * @param page Puppeteerのページオブジェクト
 */
export async function autoScroll(page: Page): Promise<void> {
  const startTime = Date.now();
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100; // スクロール距離を小さくして、より細かくスクロール
      const scrollDelay = 150; // スクロール間隔を長めに設定して、読み込みの時間を確保
      let lastScrollHeight = 0;
      let unchangedScrolls = 0;
      let totalScrolls = 0;
      
      console.log('Starting auto-scroll');
      
      // スクロール前に遅延読み込みの画像を事前に確認
      const checkLazyImages = () => {
        // srcset属性を持つ画像または遅延読み込み用の属性を持つ要素を検出
        const lazyElements = document.querySelectorAll('img[srcset], img[data-src], img[data-srcset], img[loading="lazy"], [data-lazy-src], [data-lazy-srcset]');
        
        console.log(`Detected ${lazyElements.length} potentially lazy-loaded images`);
        
        // スクリーンに入った時に読み込まれる可能性のある画像のためのIntersectionObserverをシミュレート
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target;
                observer.unobserve(img);
              }
            });
          });
          
          lazyElements.forEach(img => observer.observe(img));
        }
      };
      
      // 初回チェック
      checkLazyImages();
      
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        totalScrolls++;

        // スクロール高さが変わらない場合をカウント
        if (lastScrollHeight === scrollHeight) {
          unchangedScrolls++;
        } else {
          unchangedScrolls = 0;
          // スクロール高さが変わったら画像をチェック
          checkLazyImages();
        }
        lastScrollHeight = scrollHeight;

        // 終了条件：
        // 1. スクロール位置が最下部に達した、または
        // 2. 3回連続でスクロール高さが変わらなかった、または
        // 3. 最大100回スクロールした（安全策）
        if (totalHeight >= scrollHeight || unchangedScrolls >= 3 || totalScrolls >= 100) {
          clearInterval(timer);
          console.log(`Auto-scroll completed after ${totalScrolls} scrolls`);
          
          // 画像の読み込み状態を最終確認
          const images = document.querySelectorAll('img');
          const loadedImages = Array.from(images).filter(img => img.complete && img.naturalWidth > 0).length;
          console.log(`Images loaded during scroll: ${loadedImages}/${images.length}`);
          
          // 最後に画面上部に戻る（ヘッダーなど全ての要素が表示される状態にする）
          window.scrollTo(0, 0);
          
          // スクロール完了後にさらに待機して、遅延読み込み要素が表示される時間を確保
          setTimeout(resolve, 1000);
        }
      }, scrollDelay);
    });
  });
  
  // スクロール後に追加で待機して、動的コンテンツの読み込みを確実にする
  console.log(`[AutoScroll] スクロール後の追加待機...`);
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000))); // 2秒に延長
  console.log(`[AutoScroll] 自動スクロール完了: 合計時間=${Date.now() - startTime}ms`);
  
  // 画像の読み込み状態を最終確認
  await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    const loadedCount = Array.from(images).filter(img => img.complete && img.naturalWidth > 0).length;
    console.log(`[AutoScroll] 最終画像読み込み状態: ${loadedCount}/${images.length}`);
    
    // スタイルシートがすべて読み込まれているか確認
    const styleSheets = Array.from(document.styleSheets);
    let loadedStyles = 0;
    let failedStyles = 0;
    
    styleSheets.forEach(sheet => {
      try {
        // スタイルシートにアクセスしてみる（読み込みが完了していれば成功する）
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const rules = sheet.cssRules || sheet.rules;
        loadedStyles++;
      } catch (error) {
        // CORSの制約などでアクセスできない場合
        failedStyles++;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _error = error; // エラーを使用したことにする
      }
    });
    
    console.log(`[AutoScroll] スタイルシート読み込み状態: ${loadedStyles}/${styleSheets.length} (${failedStyles} 失敗)`);
  });
}

/**
 * 指定したURLのページを開き、コンテンツが完全に読み込まれるのを待つ
 * @param page Puppeteerのページオブジェクト
 * @param url 開くURL
 */
export async function loadPage(page: Page, url: string): Promise<void> {
  const startTime = Date.now();
  
  // ページに移動
  console.log(`🔄 [LoadPage] goto開始: URL=${url}`);
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 60000 // タイムアウトを60秒に延長（画像読み込みのため）
  });
  console.log(`✅ [LoadPage] goto完了 (${Date.now() - startTime}ms)`);

  // ページが完全に読み込まれるのを待つ
  try {
    // 少し待機してJSの初期化を待つ
    console.log(`🔄 [LoadPage] JS初期化待機...`);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000))); // 初期化待機時間を2秒に延長
    console.log(`✅ [LoadPage] JS初期化待機完了 (${Date.now() - startTime}ms)`);
    
    console.log(`🔄 [LoadPage] 画像読み込み待機...`);
    await page.evaluate(() => {
      return new Promise((resolve) => {
        // タイムアウト処理を追加（45秒後に強制的に解決 - 延長）
        const forceResolveTimeout = setTimeout(() => {
          console.log('Image loading timeout, continuing anyway');
          resolve(true);
        }, 45000);
        
        // すべての画像が読み込まれるのを待つ - 改善版
        const images = Array.from(document.querySelectorAll('img'));
        let loadedImages = 0;
        
        if (images.length === 0) {
          clearTimeout(forceResolveTimeout);
          resolve(true);
          return;
        }
        
        console.log(`Total images to load: ${images.length}`);
        
        // 画像の読み込み状態を定期的にチェック
        const checkImages = () => {
          // すでに読み込み済みの画像をカウント
          loadedImages = images.filter(img => 
            img.complete && 
            (img.naturalWidth > 0 || img.src.startsWith('data:'))
          ).length;
          
          console.log(`Loaded ${loadedImages} of ${images.length} images`);
          
          if (loadedImages === images.length) {
            clearTimeout(forceResolveTimeout);
            // 念のため少し待機してから解決
            setTimeout(() => resolve(true), 500);
          } else {
            // まだ読み込まれていない画像がある場合は再チェック
            setTimeout(checkImages, 1000);
          }
        };
        
        // イベントリスナーも併用して確実に捕捉
        images.forEach(img => {
          if (!img.complete) {
            img.addEventListener('load', () => {
              loadedImages++;
              if (loadedImages === images.length) {
                clearTimeout(forceResolveTimeout);
                resolve(true);
              }
            });
            img.addEventListener('error', () => {
              console.log(`Failed to load image: ${img.src}`);
              loadedImages++;
              if (loadedImages === images.length) {
                clearTimeout(forceResolveTimeout);
                resolve(true);
              }
            });
          }
        });
        
        // 初回チェック開始
        checkImages();
      });
    });
    console.log(`✅ [LoadPage] 画像読み込み完了または継続 (${Date.now() - startTime}ms)`);
    
    // ページ内の画像URLをログ出力（デバッグ用）
    await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      console.log(`ページ内の画像数: ${images.length}`);
      images.slice(0, 5).forEach((img, index) => {
        console.log(`画像[${index}]: src=${img.src}, complete=${img.complete}, naturalWidth=${img.naturalWidth}`);
      });
      if (images.length > 5) {
        console.log(`...他 ${images.length - 5} 個の画像`);
      }
    });
  } catch (error) {
    console.log('Error waiting for images, continuing anyway:', error);
  }

  // 動的コンテンツのロードを待つための追加処理
  try {
    // ローディング要素が消えるのを待つ（最大10秒に延長）
    console.log(`🔄 [LoadPage] ローディング要素消失待機...`);
    await page.waitForFunction(
      () => {
        // ローディング要素を探す一般的なセレクタ
        const loadingElements = document.querySelectorAll('.loading, .loader, [data-loading], [aria-busy="true"], .is-loading');
        return loadingElements.length === 0;
      },
      { timeout: 10000 }
    ).catch(() => {
      console.log('Loading elements still present or not found, continuing anyway');
    });
    console.log(`✅ [LoadPage] ローディング要素消失待機完了 (${Date.now() - startTime}ms)`);
    
    // 少し待機して、最終的なJavaScriptの実行を待つ
    console.log(`🔄 [LoadPage] 最終JavaScriptの実行待機...`);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000))); // 2秒に延長
    console.log(`✅ [LoadPage] 最終JavaScript実行待機完了 (${Date.now() - startTime}ms)`);
    
    // スクロールしてすべてのコンテンツを読み込む
    console.log(`🔄 [LoadPage] コンテンツ読み込みのための自動スクロール開始...`);
    await autoScroll(page);
    console.log(`✅ [LoadPage] 自動スクロール完了 (${Date.now() - startTime}ms)`);
    
    // 最後にもう一度画像の状態を確認
    await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const loadedCount = images.filter(img => img.complete && img.naturalWidth > 0).length;
      console.log(`最終確認: 画像読み込み状態 - ${loadedCount}/${images.length} 完了`);
    });
    
    // 処理完了ログ
    console.log(`✅ [LoadPage] すべての読み込み処理完了: 合計時間=${Date.now() - startTime}ms`);
  } catch (error) {
    console.log('Error waiting for dynamic content, continuing anyway:', error);
  }
}

/**
 * ページの設定を行う（ビューポート、ユーザーエージェント、デスクトップ表示など）
 * @param page Puppeteerのページオブジェクト
 * @param width ビューポートの幅
 * @param height ビューポートの高さ
 */
export async function setupPage(page: Page, width: number, height: number): Promise<void> {
  // より広いビューポートサイズを設定（PCサイズを保証）
  const pcWidth = Math.max(width, 1280);
  const pcHeight = Math.max(height, 900);
  
  await page.setViewport({
    width: pcWidth,
    height: pcHeight,
    deviceScaleFactor: 1,
  });

  // よりデスクトップらしいユーザーエージェントを設定
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // エミュレーションの追加設定でモバイル表示を完全に無効化
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'light' },
    { name: 'prefers-reduced-motion', value: 'no-preference' }
  ]);
  
  // 日本語フォント対応の追加設定
  await page.evaluate(() => {
    // 日本語フォントを確実に利用するためのオーバーライド
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @font-face {
        font-family: 'PuppeteerJPFont';
        font-style: normal;
        font-weight: 400;
        src: local('Hiragino Sans'), local('Meiryo'), 
             local('MS PGothic'), local('Noto Sans CJK JP'),
             local('Yu Gothic');
      }
      
      body, html, div, p, span, h1, h2, h3, h4, h5, h6, 
      a, li, td, th, input, textarea, button, select {
        font-family: 'PuppeteerJPFont', sans-serif !important;
      }
    `;
    document.head.appendChild(styleElement);
  });
  
  // デスクトップビューを強制する設定をより堅牢に
  await page.evaluateOnNewDocument(() => {
    // モバイルデバイス検出をオーバーライド
    Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 0 });
    Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
    Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
    Object.defineProperty(navigator, 'appVersion', { get: () => '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
    Object.defineProperty(window, 'ontouchstart', { get: () => null });
    Object.defineProperty(window, 'orientation', { get: () => undefined });
    
    // スクリーンとウィンドウのサイズをPCサイズに固定
    Object.defineProperty(window, 'innerWidth', { get: () => 1280 });
    Object.defineProperty(window, 'innerHeight', { get: () => 900 });
    Object.defineProperty(window, 'outerWidth', { get: () => 1280 });
    Object.defineProperty(window, 'outerHeight', { get: () => 900 });
    Object.defineProperty(screen, 'width', { get: () => 1920 });
    Object.defineProperty(screen, 'height', { get: () => 1080 });
    Object.defineProperty(screen, 'availWidth', { get: () => 1920 });
    Object.defineProperty(screen, 'availHeight', { get: () => 1080 });
    
    // matchMediaをオーバーライドしてデスクトップモードを強制
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query) => {
      // モバイル/スマホ関連のメディアクエリをデスクトップとして扱う
      if (query.includes('max-width') || query.includes('max-device-width') || query.includes('mobile') || query.includes('phone')) {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true
        };
      }
      // PC関連のメディアクエリを常にマッチさせる
      if (query.includes('min-width: 1200px') || query.includes('min-width: 992px') || query.includes('min-width: 768px')) {
        return {
          matches: true,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true
        };
      }
      // それ以外はオリジナルの動作
      return originalMatchMedia(query);
    };
  });
} 
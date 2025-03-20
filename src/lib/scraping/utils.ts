import { PageInterface } from './page-interface';

/**
 * ページを自動スクロールしてすべてのコンテンツを読み込む
 * @param page Puppeteerのページオブジェクト
 */
export async function autoScroll(page: PageInterface): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100; // スクロール距離
      const scrollDelay = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          // 最後に画面上部に戻る（ヘッダーなど全ての要素が表示される状態にする）
          window.scrollTo(0, 0);
          // スクロール完了後に少し待機してから解決
          setTimeout(resolve, 500);
        }
      }, scrollDelay);
    });
  });
  
  // スクロール後に追加で待機して、動的コンテンツの読み込みを確実にする
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
}

/**
 * 指定したURLのページを開き、コンテンツが完全に読み込まれるのを待つ
 * @param page Puppeteerのページオブジェクト
 * @param url 開くURL
 */
export async function loadPage(page: PageInterface, url: string): Promise<void> {
  // ページに移動
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 45000 // タイムアウトを45秒に設定
  });

  // ページが完全に読み込まれるのを待つ
  try {
    // 少し待機してJSの初期化を待つ
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
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
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
    // スクロールしてすべてのコンテンツを読み込む
    await autoScroll(page);
    
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
export async function setupPage(page: PageInterface, width: number, height: number): Promise<void> {
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
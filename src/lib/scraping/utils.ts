import { Page } from 'puppeteer-core';

/**
 * ページを自動スクロールして全てのコンテンツを読み込む
 * @param page puppeteerのページオブジェクト
 */
export async function autoScroll(page: Page): Promise<void> {
  console.log('🔄 自動スクロール開始...');
  
  // スクロール状態のトラッキング用変数
  const scrollResult = await page.evaluate(async (): Promise<{ 
    totalHeight: number, 
    imageStats: { total: number, loaded: number, urls: string[] } 
  }> => {
    // スクロール開始前のスタイルシート読み込み確認
    const checkStyleSheets = () => {
      const styleSheets = Array.from(document.styleSheets);
      const pendingSheets = styleSheets.filter(sheet => {
        try {
          // CSSルールへのアクセスを試みる - 読み込み済みならエラーにならない
          return !(sheet.cssRules || sheet.rules);
        } catch (e: unknown) {
          // CORSエラーは無視（外部スタイルシートの場合）
          if ((e as Error).name === 'SecurityError') return false;
          // その他のエラーは未読み込みとみなす
          return true;
        }
      });
      return pendingSheets.length === 0;
    };
    
    // 全ての画像の読み込み状態をチェック
    const checkImages = () => {
      const images = Array.from(document.querySelectorAll('img'));
      const loadedImages = images.filter(img => img.complete && img.naturalWidth > 0);
      const unloadedUrls = images
        .filter(img => !img.complete || img.naturalWidth === 0)
        .slice(0, 5)  // 最初の5件だけログに出す
        .map(img => img.src || img.getAttribute('data-src') || 'unknown');
      
      return {
        total: images.length,
        loaded: loadedImages.length,
        urls: unloadedUrls
      };
    };
    
    return new Promise<{ 
      totalHeight: number, 
      imageStats: { total: number, loaded: number, urls: string[] } 
    }>((resolve) => {
      let totalHeight = 0;
      const distance = 100;   
      const scrollDelay = 100; 
      
      // スクロール高さが変わらない回数をカウント
      let unchangedCount = 0;
      let lastScrollHeight = document.body.scrollHeight;
      const maxUnchangedCount = 5;
      
      const styleLoaded = checkStyleSheets();
      console.log(`スタイルシート読み込み状態: ${styleLoaded ? '完了' : '未完了'}`);
      
      // スクロール前の画像状態をチェック
      const initialImageStats = checkImages();
      console.log(`初期画像状態: ${initialImageStats.loaded}/${initialImageStats.total}枚読み込み済み`);
      
      // スクロールを繰り返す処理
      const timer = setInterval(() => {
        // 現在のスクロール高さを取得
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        // 画像の読み込み状態をチェック
        const imageStats = checkImages();
        
        // スクロール高さが変わらない場合（読み込み完了の可能性）
        if (lastScrollHeight === scrollHeight) {
          unchangedCount++;
          
          // 画像読み込みを強制
          if (imageStats.total > 0 && imageStats.loaded < imageStats.total) {
            // まだ読み込まれていない画像がある場合、それらの表示を試みる
            const images = Array.from(document.querySelectorAll('img'));
            images.forEach(img => {
              if (!img.complete || img.naturalWidth === 0) {
                // 画像の表示を強制
                img.style.visibility = 'visible';
                img.style.display = 'inline-block';
                img.loading = 'eager';
                
                // data-src属性がある場合（遅延読み込みの対策）
                if (img.getAttribute('data-src')) {
                  img.src = img.getAttribute('data-src') || img.src;
                }
              }
            });
          }
          
          // 最大回数に達したらスクロール終了
          if (unchangedCount >= maxUnchangedCount) {
            clearInterval(timer);
            window.scrollTo(0, 0); // 一番上に戻る
            
            const finalImageStats = checkImages();
            console.log(`最終画像状態: ${finalImageStats.loaded}/${finalImageStats.total}枚読み込み済み`);
            
            // スクロール結果を返す
            resolve({ 
              totalHeight, 
              imageStats: finalImageStats 
            });
          }
        } else {
          // スクロール高さが変わった場合はカウントをリセット
          unchangedCount = 0;
          lastScrollHeight = scrollHeight;
        }
        
        // 画面の最下部に到達した場合もスクロール終了
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // 一番上に戻る
          
          const finalImageStats = checkImages();
          console.log(`最終画像状態: ${finalImageStats.loaded}/${finalImageStats.total}枚読み込み済み`);
          
          // スクロール結果を返す
          resolve({ 
            totalHeight, 
            imageStats: finalImageStats 
          });
        }
      }, scrollDelay);
    });
  });
  
  console.log(`✅ 自動スクロール完了 (総距離=${scrollResult.totalHeight}px)`);
  console.log(`📊 画像読み込み状況: ${scrollResult.imageStats.loaded}/${scrollResult.imageStats.total}枚`);
  
  // 未読み込みの画像がある場合はログ出力
  if (scrollResult.imageStats.urls.length > 0) {
    console.log(`⚠️ 未読み込み画像例:`, scrollResult.imageStats.urls);
  }
}

/**
 * 指定されたURLのページを開き、コンテンツが完全に読み込まれるまで待機する
 * @param page puppeteerのページオブジェクト
 * @param url 開くURL
 */
export async function loadPage(page: Page, url: string): Promise<void> {
  const startTime = Date.now();
  console.log(`🔄 [loadPage] ページ読み込み開始: ${url}`);
  
  try {
    // ページを開く
    await page.goto(url, { 
      waitUntil: 'networkidle0',  // 全てのネットワークリクエストが完了するまで待機
      timeout: 60000  // タイムアウトを60秒に設定（大きいページのために長めに）
    });
    console.log(`✅ [loadPage] 初期読み込み完了: ${Date.now() - startTime}ms`);

    // ローディング要素が消えるまで待機
    console.log(`🔄 [loadPage] ローディング要素の消失を待機中...`);
    await page.evaluate(async () => {
      return new Promise<void>(resolve => {
        // よくあるローディング要素のセレクタリスト
        const loadingSelectors = [
          '.loading', '#loading', '.spinner', '#spinner', '.loader', '#loader',
          '[class*="loading"]', '[id*="loading"]', '[class*="spinner"]', '[id*="spinner"]',
          '.page-loading', '.content-loading', '.ajax-loader', '.progress'
        ];
        
        // ローディング要素があるかチェック
        const hasLoadingElements = () => {
          return loadingSelectors.some(selector => {
            const elements = document.querySelectorAll(selector);
            return Array.from(elements).some(el => {
              const style = window.getComputedStyle(el);
              return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
            });
          });
        };
        
        // 初期チェック - ローディング要素がなければすぐに解決
        if (!hasLoadingElements()) {
          return resolve();
        }
        
        // ローディング要素が消えるのを監視
        const checkInterval = setInterval(() => {
          if (!hasLoadingElements()) {
            clearInterval(checkInterval);
            clearTimeout(timeout);
            resolve();
          }
        }, 500);
        
        // 最大10秒待機したらタイムアウト
        const timeout = setTimeout(() => {
          clearInterval(checkInterval);
          console.log('⚠️ [loadPage] ローディング要素待機タイムアウト');
          resolve();
        }, 10000);
      });
    });
    
    // 画像が読み込まれるまで待機
    console.log(`🔄 [loadPage] 画像の読み込みを待機中...`);
    let imagesLoaded = false;
    let attemptCount = 0;
    const maxAttempts = 12; // 最大試行回数（60秒間）
    
    while (!imagesLoaded && attemptCount < maxAttempts) {
      attemptCount++;
      
      // 画像の読み込み状態をチェック
      const imageStatus = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const totalImages = images.length;
        if (totalImages === 0) return { loaded: true, total: 0, loadedCount: 0, sampleUrls: [] };
        
        const loadedImages = images.filter(img => img.complete && img.naturalWidth > 0);
        const loadedCount = loadedImages.length;
        const isAllLoaded = loadedCount === totalImages;
        
        // サンプルとして未読み込みの画像URLを最大5つ取得
        const sampleUrls = images
          .filter(img => !img.complete || img.naturalWidth === 0)
          .slice(0, 5)
          .map(img => ({
            src: img.src,
            width: img.width,
            height: img.height,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            visible: img.getBoundingClientRect().top < window.innerHeight
          }));
        
        return { 
          loaded: isAllLoaded, 
          total: totalImages, 
          loadedCount,
          sampleUrls
        };
      });
      
      // 画像の読み込み状態をログ出力
      console.log(`📊 [loadPage] 画像読み込み状況 (${attemptCount}/${maxAttempts}): ${imageStatus.loadedCount}/${imageStatus.total}`);
      
      // すべての画像が読み込まれた、または画像がない場合
      if (imageStatus.loaded) {
        imagesLoaded = true;
        break;
      }
      
      // 未読み込みの画像がある場合、サンプルをログ出力
      if (imageStatus.sampleUrls.length > 0) {
        console.log(`⚠️ [loadPage] 未読み込み画像サンプル:`, JSON.stringify(imageStatus.sampleUrls, null, 2));
        
        // 画像読み込みを促進するためのスクリプトを実行
        await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          
          // 未読み込みの画像の読み込みを促進
          images.forEach(img => {
            if (!img.complete || img.naturalWidth === 0) {
              // 画像の表示を強制
              img.style.visibility = 'visible';
              img.style.display = 'inline-block';
              
              // loading属性を変更して遅延読み込みを無効化
              img.loading = 'eager';
              
              // data-src属性があれば、それをsrcに設定
              if (img.getAttribute('data-src')) {
                img.src = img.getAttribute('data-src') || img.src;
              }
              
              // data-srcset属性があれば、それをsrcsetに設定
              if (img.getAttribute('data-srcset')) {
                img.srcset = img.getAttribute('data-srcset') || img.srcset;
              }
            }
          });
          
          // 遅延読み込みライブラリのupdateメソッドがあれば呼び出す
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const win = window as any;
          if (win.lazyLoadInstance && typeof win.lazyLoadInstance.update === 'function') {
            try {
              win.lazyLoadInstance.update();
            } catch (e) {
              console.log('LazyLoad update failed:', e);
            }
          }
        });
      }
      
      // 5秒待機して再チェック
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));
    }
    
    // 画像の読み込み状態に関わらず、自動スクロールを実行して残りのコンテンツを表示
    await autoScroll(page);
    
    // JavaScriptの実行が完了するまで少し待機
    console.log(`🔄 [loadPage] 最終確認のため追加で待機中...`);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));
    
    console.log(`✅ [loadPage] ページ読み込み完了: 合計${Date.now() - startTime}ms`);
  } catch (error) {
    console.error(`❌ [loadPage] エラー発生:`, error);
    throw new Error(`ページ読み込み中にエラーが発生しました: ${error}`);
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
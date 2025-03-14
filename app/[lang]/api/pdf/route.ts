import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

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

    // Puppeteerを起動
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
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
      timeout: 60000 // タイムアウトを60秒に設定
    });

    // ページが完全に読み込まれるのを待つ
    await page.evaluate(() => {
      return new Promise((resolve) => {
        // すべての画像が読み込まれるのを待つ
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        if (images.length === 0) {
          resolve(true);
          return;
        }
        
        images.forEach(img => {
          if (img.complete) {
            loadedImages++;
            if (loadedImages === images.length) {
              resolve(true);
            }
          } else {
            img.addEventListener('load', () => {
              loadedImages++;
              if (loadedImages === images.length) {
                resolve(true);
              }
            });
            img.addEventListener('error', () => {
              loadedImages++;
              if (loadedImages === images.length) {
                resolve(true);
              }
            });
          }
        });
      });
    });

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
      displayHeaderFooter: false
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

    // ブラウザを閉じる
    await browser.close();

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
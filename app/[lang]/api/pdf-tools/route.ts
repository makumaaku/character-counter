import { convertToPDF, logBrowserInfo } from '@/lib/scraping';
import { PageSetupOptions } from '@/lib/scraping/types';
import { NextRequest, NextResponse } from 'next/server';

// Vercelのタイムアウトを45秒に設定（60から短縮）
export const maxDuration = 60; // Vercelのサーバーレス関数のタイムアウト設定 (秒)
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  console.log(`🔄 [API:pdf-tools] リクエスト受信`);
  
  try {
    // URLパラメータを取得
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const scale = searchParams.get('scale') === 'fit' ? 'fit' : 1;
    const width = parseInt(searchParams.get('width') || '1280');
    
    console.log(`🔄 [API:pdf-tools] パラメータ: url=${url}, scale=${scale}, width=${width}`);
    
    // URLが指定されていない場合はエラーを返す
    if (!url) {
      console.log(`❌ [API:pdf-tools] URLパラメータがありません`);
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // 環境情報をログに出力
    console.log(`🔄 [API:pdf-tools] 環境情報ログ出力...`);
    logBrowserInfo();
    
    // ページ設定オプションを作成
    const options: PageSetupOptions = {
      url,
      width,
      scale
    };
    
    // PDFに変換
    console.log(`🔄 [API:pdf-tools] PDF変換開始...`);
    const pdf = await convertToPDF(options);
    
    // 処理時間とサイズをログ出力
    const totalTime = Date.now() - startTime;
    const pdfSizeMB = (pdf.length / (1024 * 1024)).toFixed(2);
    console.log(`✅ [API:pdf-tools] PDF変換完了: 処理時間=${totalTime}ms, サイズ=${pdfSizeMB}MB`);
    
    // PDFをレスポンスとして返す
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="webpage.pdf"`,
      },
    });
  } catch (error) {
    // エラー情報と処理時間をログ出力
    const errorTime = Date.now() - startTime;
    console.error(`❌ [API:pdf-tools] エラー発生 (${errorTime}ms):`, error);
    
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 
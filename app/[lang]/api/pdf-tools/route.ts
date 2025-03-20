import { convertToPDF, logBrowserInfo } from '@/lib/scraping';
import { PageSetupOptions } from '@/lib/scraping/types';
import { NextRequest, NextResponse } from 'next/server';

// Vercelのタイムアウトを60秒に設定
export const maxDuration = 60; // Vercelのサーバーレス関数のタイムアウト設定 (秒)
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // URLパラメータを取得
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const scale = searchParams.get('scale') === 'fit' ? 'fit' : 1;
    const width = parseInt(searchParams.get('width') || '1280');
    
    // URLが指定されていない場合はエラーを返す
    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // 環境情報をログに出力
    logBrowserInfo();
    
    // ページ設定オプションを作成
    const options: PageSetupOptions = {
      url,
      width,
      scale
    };
    
    // PDFに変換
    const pdf = await convertToPDF(options);
    
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
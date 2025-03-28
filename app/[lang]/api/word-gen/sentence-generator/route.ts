import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const { lang } = await params;
    const fileName = lang === 'ja' ? 'sentences-ja.json' : 'sentences-en.json';
    const filePath = path.join(process.cwd(), 'assets', 'words', fileName);
    
    // ファイルの存在チェック
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File not found: ${fileName}` },
        { status: 404 }
      );
    }
    
    // ファイルを読み込み
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error reading sentence file:', error);
    return NextResponse.json(
      { error: 'Failed to read sentences' },
      { status: 500 }
    );
  }
} 
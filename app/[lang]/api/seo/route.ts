import axios, { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const links: { url: string; status: number }[] = [];

    $('a').each((index: number, el: cheerio.Element) => {
      const href = $(el).attr('href');
      if (href) {
        const absoluteUrl = new URL(href, url).href;
        links.push({ url: absoluteUrl, status: 0 }); // 初期ステータスを0に設定
      }
    });

    // リンクのステータスをチェック
    const statusPromises = links.map(async (link) => {
      try {
        const response = await axios.get(link.url);
        link.status = response.status;
      } catch (error) {
        if (error instanceof AxiosError) {
          link.status = error.response?.status || 500;
        } else {
          link.status = 500;
        }
      }
    });

    // すべてのステータスチェックが完了するのを待つ
    await Promise.all(statusPromises);

    return NextResponse.json({ links });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
} 
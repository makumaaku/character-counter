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
    // Set a timeout for the initial request to prevent long-running requests
    const response = await axios.get(url, { 
      timeout: 15000, // Reduce timeout to 15 seconds
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = response.data;
    const $ = cheerio.load(html);
    
    // URLの重複を排除するためのセット
    const uniqueUrls = new Set<string>();
    const links: { url: string; status: number }[] = [];

    $('a').each((index: number, el: cheerio.Element) => {
      const href = $(el).attr('href');
      if (href) {
        try {
          const absoluteUrl = new URL(href, url).href;
          
          // 重複チェック - 同じURLが既に処理されている場合はスキップ
          if (!uniqueUrls.has(absoluteUrl)) {
            uniqueUrls.add(absoluteUrl);
            links.push({ url: absoluteUrl, status: 0 }); // 初期ステータスを0に設定
          }
        } catch (urlError) {
          // Skip invalid URLs
          console.error(`Invalid URL: ${href}`, urlError);
        }
      }
    });

    // リンクのステータスをチェック - 各リンクに5秒のタイムアウトを設定
    const statusPromises = links.map(async (link) => {
      try {
        // Set a timeout for each link check to prevent long-running requests
        const response = await axios.get(link.url, { 
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
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
    console.error('Error checking URL:', url, error);
    
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;
    
    if (error instanceof AxiosError) {
      statusCode = error.response?.status || 500;
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Request timed out. The server took too long to respond.';
        statusCode = 504;
      } else if (error.code === 'ENOTFOUND' || error.message.includes('getaddrinfo')) {
        errorMessage = 'Network error. Could not resolve host.';
        statusCode = 502;
      } else if (error.response?.status === 504) {
        errorMessage = 'Gateway Timeout: The server took too long to respond';
      } else if (error.message) {
        errorMessage = error.message;
      }
    }
    
    // Always return a proper JSON response
    return NextResponse.json({ error: errorMessage }, { 
      status: statusCode,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 
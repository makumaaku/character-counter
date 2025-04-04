import { loadToolMessages, translate } from '@/lib/i18n/server'
import { Language } from '@/lib/i18n/types'
import * as cheerio from 'cheerio'
import { NextRequest, NextResponse } from 'next/server'

// CORS用のヘッダー
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// OPTIONSリクエスト用のハンドラを明示的に追加
export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders, status: 200 })
}

export async function POST(request: NextRequest) {
  // 言語パラメータを取得
  const pathname = request.nextUrl.pathname
  const lang = pathname.split('/')[1] || 'en'
  await loadToolMessages(lang as Language, 'seo-tools/page-structure-checker')
  const t = (key: string) => translate(lang, key)

  // CORS対策のヘッダーを設定
  // const corsHeaders = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'POST, OPTIONS',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  // }

  // OPTIONSリクエスト（プリフライトリクエスト）への対応
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders, status: 200 })
  }

  try {
    let reqData
    try {
      reqData = await request.json()
    } catch {
      console.error('Failed to parse request JSON:')
      const errorMessage = await t('seoTools.pageStructureChecker.error.invalidJson');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400, headers: corsHeaders }
      )
    }

    const { url } = reqData

    if (!url) {
      const errorMessage = await t('seoTools.pageStructureChecker.error.urlRequired');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400, headers: corsHeaders }
      )
    }

    // URLの検証
    try {
      new URL(url)
    } catch {
      const errorMessage = await t('seoTools.pageStructureChecker.error.invalidUrl');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400, headers: corsHeaders }
      )
    }

    console.log(`Analyzing URL: ${url}`) // デバッグログ

    // タイムアウト設定付きでページを取得
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)
    
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BoringToolBot/1.0; +https://boring-tool.com)'
        },
        cache: 'no-store' // キャッシュを無効化
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorTemplate = await t('seoTools.pageStructureChecker.error.fetchWithStatus');
        const errorMessage = errorTemplate.replace('{status}', response.status.toString()).replace('{statusText}', response.statusText);
        return NextResponse.json(
          { error: errorMessage },
          { status: 500, headers: corsHeaders }
        )
      }

      const html = await response.text()
      
      // HTMLが空の場合はエラーを返す
      if (!html || html.trim() === '') {
        const errorMessage = await t('seoTools.pageStructureChecker.error.emptyHtml');
        return NextResponse.json(
          { error: errorMessage },
          { status: 500, headers: corsHeaders }
        )
      }

      const $ = cheerio.load(html)

      // タイトルと説明を取得
      const title = $('title').text().trim() || null
      const description = $('meta[name="description"]').attr('content') || null
      // canonical URLを取得
      const canonicalUrl = $('link[rel="canonical"]').attr('href') || null

      // 見出しタグを取得
      const headings: { tag: string; text: string; level: number }[] = []
      
      $('h1, h2, h3, h4, h5, h6').each((_, element) => {
        const $el = $(element)
        const tag = $el.prop('tagName')?.toLowerCase() || ''
        const level = parseInt(tag.substring(1))
        const text = $el.text().trim()
        
        headings.push({ tag, text, level })
      })

      // 問題点をチェック
      const issues: { type: 'error' | 'warning'; message: string }[] = []

      // タイトルチェック
      if (!title) {
        issues.push({
          type: 'error',
          message: await t('seoTools.pageStructureChecker.noTitle')
        })
      }

      // ディスクリプションチェック
      if (!description) {
        issues.push({
          type: 'error',
          message: await t('seoTools.pageStructureChecker.noDescription')
        })
      }

      // canonical URLチェック
      if (!canonicalUrl) {
        issues.push({
          type: 'warning',
          message: await t('seoTools.pageStructureChecker.noCanonical')
        })
      }

      // h1タグのチェック
      const h1Count = headings.filter(h => h.level === 1).length
      
      if (h1Count === 0) {
        issues.push({
          type: 'error',
          message: await t('seoTools.pageStructureChecker.noH1')
        })
      } else if (h1Count > 1) {
        issues.push({
          type: 'error',
          message: await t('seoTools.pageStructureChecker.multipleH1')
        })
      }

      // 見出し階層の連続性チェック
      const usedLevels = new Set(headings.map(h => h.level))
      
      for (let i = 2; i <= 6; i++) {
        if (usedLevels.has(i) && !usedLevels.has(i - 1)) {
          issues.push({
            type: 'warning',
            message: await t('seoTools.pageStructureChecker.skippedLevel')
          })
        }
      }

      // 正常なレスポンスを返す
      const result = {
        title,
        description,
        canonicalUrl,
        headings,
        issues
      }

      return NextResponse.json(result, { headers: corsHeaders })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error('Fetch error:', fetchError)
      
      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          const errorMessage = await t('seoTools.pageStructureChecker.error.timeout');
          return NextResponse.json(
            { error: errorMessage },
            { status: 408, headers: corsHeaders }
          )
        }
        const errorTemplate = await t('seoTools.pageStructureChecker.error.fetchError');
        const errorMessage = errorTemplate.replace('{message}', fetchError.message);
        return NextResponse.json(
          { error: errorMessage },
          { status: 500, headers: corsHeaders }
        )
      }
      
      const errorMessage = await t('seoTools.pageStructureChecker.error.unknownFetchError');
      return NextResponse.json(
        { error: errorMessage },
        { status: 500, headers: corsHeaders }
      )
    }
  } catch (error) {
    console.error('Error analyzing page structure:', error)
    
    const errorTemplate = await t('seoTools.pageStructureChecker.error.serverError');
    const errorMessage = error instanceof Error 
      ? errorTemplate.replace('{message}', error.message)
      : await t('seoTools.pageStructureChecker.error.unknownServerError');
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  }
} 
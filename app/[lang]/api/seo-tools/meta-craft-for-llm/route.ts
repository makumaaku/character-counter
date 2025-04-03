import { getLanguageFromParams, loadToolMessages, translate } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: Promise<{ lang: string }> }) {

  const lang = await getLanguageFromParams(params);
  await loadToolMessages(lang as Language, 'seo-tools/meta-craft-for-llm');
  try {
    
    const t = (key: string) => translate(lang, key);
    
    const { url } = await request.json();
    if (!url) {
      const errorMessage = await t('error.urlRequired');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // URLが有効かどうかチェック
    try {
      new URL(url);
    } catch {
      const errorMessage = await t('error.invalidUrl');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // HTMLを取得
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BoringTools/1.0; +https://boring-tool.com)',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      const errorTemplate = await t('error.fetchWithStatus');
      const errorMessage = errorTemplate.replace('{status}', response.status.toString()).replace('{statusText}', response.statusText);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const html = await response.text();

    return NextResponse.json({ html });
  } catch (error) {
    console.error('Error fetching URL:', error);
    const lang = await getLanguageFromParams(params);
    const errorMessage = await translate(lang as Language, 'seoTools.metaCraftForLlm.error.fetchFailed');
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 
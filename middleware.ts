import { Language, locales } from '@/lib/i18n/types';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const defaultLocale = 'en';
const rootPath = '/';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // ルートパスの場合は言語情報は不要。
  if(pathname === rootPath) {
    return;
  }

  // パスに言語情報がない場合、言語情報をcookieから取得する。
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // パスに言語情報がない場合（ルートパスも含む）
  if (pathnameIsMissingLocale) {
    let locale = defaultLocale;
    // クッキーから言語設定を取得
    try{
      const langCookie = request.cookies.get('lang');
      if (langCookie && langCookie.value && locales.includes(langCookie.value as Language)) {
        locale = langCookie.value;
      }
    }catch(e){
      console.error(e);
    }
  
    // ルートパスの場合は言語情報は不要。
    request.nextUrl.pathname = `/${locale}${pathname}`;
    
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|_vercel|.*\\..*).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}; 
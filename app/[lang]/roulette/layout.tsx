import { SITE_CONFIG } from '@/constants/constants';
import { translate, getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Language } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // ツール固有の翻訳をロード
  await loadToolMessages(lang as Language, 'roulette');
  
  // 必要な翻訳を並列で取得
  const [
    metaTitle,
    metaDescription,
    metaKeywords,
  ] = await Promise.all([
    translate(lang, 'roulette.meta.title'),
    translate(lang, 'roulette.meta.description'),
    translate(lang, 'roulette.meta.keywords'),
  ]);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  // ページ固有のJSON-LDを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": metaTitle,
    "description": metaDescription,
    "url": `${SITE_CONFIG.baseURL}/${lang}/roulette`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    }
  };

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/roulette`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function RouletteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // ツール固有の翻訳をロード
  await loadToolMessages(lang as Language, 'roulette');
  
  // ページタイトルを取得（多言語対応）
  const title = await translate(lang, 'roulette.title');

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={title} homeLink={`/${lang}/roulette`}>
        <div className="flex items-center gap-2">
          {/* Left side content removed */}
        </div>
      </Header>
      <main className="flex-1 bg-gray-800">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
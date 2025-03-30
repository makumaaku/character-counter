import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // number-quiz用の翻訳をロード
  await loadToolMessages(lang as Language, 'number-quiz');
  
  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'numberQuiz.meta.title'),
    translate(lang, 'numberQuiz.meta.description'),
    translate(lang, 'numberQuiz.meta.keywords')
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
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/number-quiz`,
    "applicationCategory": "GameApplication",
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
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/number-quiz`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // number-quiz用の翻訳をロード
  await loadToolMessages(lang as Language, 'number-quiz');

  // 翻訳を一括で取得
  const [
    title
  ] = await Promise.all([
    translate(lang, 'numberQuiz.game.title'),
    translate(lang, 'numberQuiz.title')
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={title} homeLink={`/${lang}/number-quiz`}>
        <div className="flex items-center gap-2">
        </div>
      </Header>
      <main className="flex-1 bg-gray-800">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  // ページ固有のJSON-LDを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('roulette.meta.title'),
    "description": t('roulette.meta.description'),
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
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('roulette.meta.title'),
      description: t('roulette.meta.description'),
      keywords: t('roulette.meta.keywords'),
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
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={t('roulette.title')} homeLink={`/${lang}/roulette`}>
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
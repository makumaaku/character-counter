import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
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
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('numberQuiz.meta.title'),
    "description": t('numberQuiz.meta.description'),
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

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('numberQuiz.meta.title'),
      description: t('numberQuiz.meta.description'),
      keywords: t('numberQuiz.meta.keywords'),
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
  const t = (key: string) => translate(lang, key);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={t('numberQuiz.title')} homeLink={`/${lang}/number-quiz`}>
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
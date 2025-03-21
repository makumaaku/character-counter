import { Metadata } from 'next';
import { translate } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import Script from 'next/script';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

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

  // 共通のメタデータを取得
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('seoVolumeGuess.meta.title'),
      description: t('seoVolumeGuess.meta.description'),
      keywords: t('seoVolumeGuess.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
    }
  );

  return {
    ...metadata,
    alternates: {
      canonical: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
      languages: {
        'en': `${SITE_CONFIG.baseURL}/en/seo-tools/seo-volume-guess`,
        'ja': `${SITE_CONFIG.baseURL}/ja/seo-tools/seo-volume-guess`,
        'x-default': `${SITE_CONFIG.baseURL}/en/seo-tools/seo-volume-guess`  // デフォルト言語（英語）のURLを指定
      },
    },
    openGraph: {
      title: t('seoVolumeGuess.meta.title'),
      description: t('seoVolumeGuess.meta.description'),
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
      siteName: commonMeta.siteName,
      locale: lang,
      alternateLocale: [lang === 'en' ? 'ja' : 'en'],
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        width: SITE_CONFIG.logo.width,
        height: SITE_CONFIG.logo.height,
        alt: commonMeta.logoAlt
      }]
    }
  };
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Script
        id="seo-volume-guess-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SEO Volume Prediction Tool",
            "description": "A free tool that collects keyword suggestions and scores the estimated search volume.",
            "url": `${SITE_CONFIG.baseURL}/seo-tools/seo-volume-guess`,
            "publisher": {
              "@type": "Organization",
              "name": "Boring Tools",
              "logo": {
                "@type": "ImageObject",
                "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
                "width": SITE_CONFIG.logo.width,
                "height": SITE_CONFIG.logo.height
              }
            },
            "applicationCategory": "UtilityApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      {children}
    </>
  );
} 
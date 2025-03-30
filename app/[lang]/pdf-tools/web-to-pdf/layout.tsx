import { translate, loadToolMessages, getLanguageFromParams } from '@/lib/i18n/server'
import { SITE_CONFIG } from '@/constants/constants'
import { getCommonMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { Language } from '@/lib/i18n/types'

type Props = {
  children: React.ReactNode
  params: { lang: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const lang = await getLanguageFromParams(params);
  
  // Web-to-PDF 用の翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/web-to-pdf');
  
  // 翻訳を並列で取得
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'pdfTools.webToPdf.meta.title'),
    translate(lang, 'pdfTools.webToPdf.meta.description'),
    translate(lang, 'pdfTools.webToPdf.meta.keywords')
  ]);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  // JSON-LD structured data for WebApplication
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': title,
    'description': description,
    'url': `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/web-to-pdf`,
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'publisher': {
      '@type': 'Organization',
      'name': commonMeta.siteName,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        'width': SITE_CONFIG.logo.width,
        'height': SITE_CONFIG.logo.height,
        'alt': commonMeta.logoAlt
      }
    }
  };

  // JSON-LD structured data for BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': await translate(lang, 'home.title'),
        'item': `${SITE_CONFIG.baseURL}/${lang}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': await translate(lang, 'pdfTools.title'),
        'item': `${SITE_CONFIG.baseURL}/${lang}/pdf-tools`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': title,
        'item': `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/web-to-pdf`
      }
    ]
  };

  // Get common metadata using the getCommonMetadata function
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/web-to-pdf`
    }
  );

  // Add additional structured data
  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'application/ld+json': JSON.stringify([webAppJsonLd, breadcrumbJsonLd])
    }
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      {children}
    </div>
  );
} 
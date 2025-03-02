import { translate } from '@/lib/i18n/server'
import { Metadata } from 'next'
import { getCommonMetadata } from '@/lib/metadata'

// Define a basic site config since we don't have access to the actual constants
const SITE_CONFIG = {
  baseURL: 'https://boring-tool.com',
  siteName: 'common.meta.siteName',
  publisher: 'common.meta.publisher',
  logo: {
    url: '/boring_logo.png',
    width: 192,
    height: 192,
    alt: 'common.meta.logoAlt'
  }
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params
  const t = (key: string) => translate(lang, key)

  // Common metadata
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t(SITE_CONFIG.logo.alt),
  }

  // Page-specific metadata
  const title = t('webToPdf.meta.title')
  const description = t('webToPdf.meta.description')
  const keywords = t('webToPdf.meta.keywords')
  const url = `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/web-to-pdf`

  // JSON-LD structured data for WebApplication
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': title,
    'description': description,
    'url': url,
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
  }

  // JSON-LD structured data for BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': t('home.title'),
        'item': `${SITE_CONFIG.baseURL}/${lang}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': t('pdfTools.title'),
        'item': `${SITE_CONFIG.baseURL}/${lang}/pdf-tools`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': title,
        'item': url
      }
    ]
  }

  // Get common metadata using the getCommonMetadata function
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url
    }
  )

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
  }
}

export default function WebToPdfLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      {children}
    </div>
  )
} 
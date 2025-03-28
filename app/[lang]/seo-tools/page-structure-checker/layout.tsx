import { Metadata } from 'next'
import { SITE_CONFIG } from '@/constants/constants'
import { translate } from '@/lib/i18n/server'
import { getCommonMetadata } from '@/lib/metadata'

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key)

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t(SITE_CONFIG.logoAlt),
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('page-structure-checker.meta.title'),
    "description": t('page-structure-checker.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/page-structure-checker`,
    "applicationCategory": "WebApplication",
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
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Page structure analysis",
      "SEO checker",
      "Heading hierarchy validation",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true
  }

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('page-structure-checker.meta.title'),
      description: t('page-structure-checker.meta.description'),
      keywords: t('page-structure-checker.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/page-structure-checker`,
    }
  )

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  }
}

export default async function PageStructureCheckerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children
} 
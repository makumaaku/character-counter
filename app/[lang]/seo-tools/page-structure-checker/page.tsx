import { Metadata } from 'next'
import { SITE_CONFIG } from '@/constants/constants'
import { translate } from '@/lib/i18n/server'
import { getCommonMetadata } from '@/lib/metadata'
import PageStructureCheckerClient from './components/PageStructureCheckerClient'

type Props = {
  params: Promise<{ lang: string }> | { lang: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await (Promise.resolve(params) as Promise<{ lang: string }>)
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

export default async function PageStructureCheckerPage({ params }: Props) {
  const { lang } = await (Promise.resolve(params) as Promise<{ lang: string }>)
  const t = (key: string) => translate(lang, key)

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen p-4">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('page-structure-checker.title')}</h1>
        <p className="text-lg text-gray-300">
          {t('page-structure-checker.description')}
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <PageStructureCheckerClient lang={lang} />
      </main>
    </div>
  )
} 
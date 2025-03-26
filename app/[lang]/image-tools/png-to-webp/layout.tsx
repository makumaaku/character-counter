import { SITE_CONFIG } from '@/constants/constants'
import { translate } from '@/lib/i18n/server'
import { getCommonMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params
  const t = (key: string) => translate(lang, key)

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  }

  // ページ固有のJSON-LDを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('pngToWebp.meta.title'),
    "description": t('pngToWebp.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/png-to-webp`,
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
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert PNG images to WebP format",
      "Free to use",
      "No registration required",
      "Instant preview",
      "Fast processing",
      "Batch conversion",
      "Browser-based conversion"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled"
  }

  // 共通のメタデータを取得
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('pngToWebp.meta.title'),
      description: t('pngToWebp.meta.description'),
      keywords: t('pngToWebp.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/image-tools/png-to-webp`,
    }
  )

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  }
}

export default function Layout({ children }: Props) {
  return children
} 
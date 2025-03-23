import { Metadata } from 'next'
import { translate } from '@/lib/i18n/server'
import { SITE_CONFIG } from '@/constants/constants'
import { getCommonMetadata } from '@/lib/metadata'

import PasswordStrengthLayout from './components/PasswordStrengthLayout'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>;
}

type JsonLdType = {
  '@context': string
  '@type': string
  '@id': string
  name: string
  description: string
  url: string
  inLanguage?: string
  publisher?: {
    '@type': string
    name: string
    url: string
  }
  mainEntity?: {
    '@type': string
    name: string
    description: string
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { lang } = await params;
  const title = translate(lang, 'passwordStrength.title')
  const description = translate(lang, 'passwordStrength.description')
  const url = `${SITE_CONFIG.baseURL}/${lang}/password-strength`

  // JSON-LDデータの構築
  const jsonLd: JsonLdType = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': url,
    name: title,
    description,
    url,
    inLanguage: lang,
    publisher: {
      '@type': 'Organization',
      name: translate(lang, SITE_CONFIG.siteName),
      url: SITE_CONFIG.baseURL,
    },
    mainEntity: {
      '@type': 'WebPage',
      name: title,
      description,
    },
  }

  const commonMeta = {
    siteName: translate(lang, SITE_CONFIG.siteName),
    publisher: translate(lang, SITE_CONFIG.publisher),
    logoAlt: translate(lang, 'common.meta.logoAlt'),
  }

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords: translate(lang, 'passwordStrength.meta.keywords'),
      url,
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
  return (
    <PasswordStrengthLayout>
      {children}
    </PasswordStrengthLayout>
  )
} 
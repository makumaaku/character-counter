import { Metadata } from 'next'
import { translate, loadToolMessages } from '@/lib/i18n/server'
import { SITE_CONFIG } from '@/constants/constants'
import { getCommonMetadata } from '@/lib/metadata'
import { Language } from '@/lib/i18n/types'

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
  
  // password-strength用の翻訳をロード
  await loadToolMessages(lang as Language, 'password-strength');
  
  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'passwordStrength.meta.title'),
    translate(lang, 'passwordStrength.meta.description'),
    translate(lang, 'passwordStrength.meta.keywords')
  ]);

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
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.baseURL,
    },
    mainEntity: {
      '@type': 'WebPage',
      name: title,
      description,
    },
  }

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  }

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
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

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // password-strength用の翻訳をロード
  await loadToolMessages(lang as Language, 'password-strength');

  // タイトルを取得
  const title = await translate(lang, 'passwordStrength.title');

  return (
    <PasswordStrengthLayout title={title}>
      {children}
    </PasswordStrengthLayout>
  )
} 
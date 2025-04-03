import CharacterCounterLayout from './components/CharacterCounterLayout'

import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter');
  
  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    logoAlt
  ] = await Promise.all([
    translate(lang, 'characterCounter.meta.title'),
    translate(lang, 'characterCounter.meta.description'),
    translate(lang, 'characterCounter.meta.keywords'),
    translate(lang, 'common.meta.logoAlt')
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter`,
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
      "Character counting",
      "Word counting",
      "Line counting",
      "Real-time counting",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter`,
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
  params
}: {
  children: React.ReactNode,
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter');
  
  // レイアウト用の翻訳を取得
  const [
    title,
    sidebarFunction,
    sidebarUsecase,
    sidebarFaq,
    sidebarAboutUs,
    sidebarContact,
    sidebarPrivacy,
    sidebarColumn
  ] = await Promise.all([
    translate(lang, 'characterCounter.title'),
    translate(lang, 'characterCounter.sidebar.function'),
    translate(lang, 'characterCounter.sidebar.usecase'),
    translate(lang, 'characterCounter.sidebar.faq'),
    translate(lang, 'characterCounter.sidebar.aboutUs'),
    translate(lang, 'characterCounter.sidebar.contact'),
    translate(lang, 'characterCounter.sidebar.privacy'),
    translate(lang, 'characterCounter.sidebar.column')
  ]);

  // レイアウト用のメッセージを構築
  const layoutMessages = {
    title,
    sidebar: {
      function: sidebarFunction,
      usecase: sidebarUsecase,
      faq: sidebarFaq,
      aboutUs: sidebarAboutUs,
      contact: sidebarContact,
      privacy: sidebarPrivacy,
      column: sidebarColumn
    }
  };
  
  return (
    <CharacterCounterLayout messages={layoutMessages}>
      {children}
    </CharacterCounterLayout>
  )
} 
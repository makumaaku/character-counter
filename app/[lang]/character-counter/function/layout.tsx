import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

type JsonLdType = {
  "@context": "https://schema.org";
  "@type": string;
  name: string;
  description: string;
  url: string;
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  mainEntity: {
    "@type": "HowTo";
    name: string;
    step: Array<{
      "@type": "HowToStep";
      name: string;
      text: string;
    }>;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/function');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    howToTitle,
    step1Title,
    step1Text,
    step2Title,
    step2Text,
    step3Title,
    step3Text,
    siteName,
    publisher,
    logoAlt
  ] = await Promise.all([
    translate(lang, 'characterCounter.function.meta.title'),
    translate(lang, 'characterCounter.function.meta.description'),
    translate(lang, 'characterCounter.function.meta.keywords'),
    translate(lang, 'characterCounter.function.meta.howTo.title'),
    translate(lang, 'characterCounter.function.howToUse.step1.title'),
    translate(lang, 'characterCounter.function.howToUse.step1.text'),
    translate(lang, 'characterCounter.function.howToUse.step2.title'),
    translate(lang, 'characterCounter.function.howToUse.step2.text'),
    translate(lang, 'characterCounter.function.howToUse.step3.title'),
    translate(lang, 'characterCounter.function.howToUse.step3.text'),
    translate(lang, SITE_CONFIG.siteName),
    translate(lang, SITE_CONFIG.publisher),
    translate(lang, 'common.meta.logoAlt')
  ]);

  const commonMeta = {
    siteName,
    publisher,
    logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/function`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "url": SITE_CONFIG.baseURL
    },
    "mainEntity": {
      "@type": "HowTo",
      "name": howToTitle,
      "step": [
        {
          "@type": "HowToStep",
          "name": step1Title,
          "text": step1Text
        },
        {
          "@type": "HowToStep",
          "name": step2Title,
          "text": step2Text
        },
        {
          "@type": "HowToStep",
          "name": step3Title,
          "text": step3Text
        }
      ]
    }
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/function`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 
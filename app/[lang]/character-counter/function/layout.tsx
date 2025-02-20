import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

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
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('characterCounter.function.meta.title'),
    "description": t('characterCounter.function.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/function`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "url": SITE_CONFIG.baseURL
    },
    "mainEntity": {
      "@type": "HowTo",
      "name": t('characterCounter.function.meta.howTo.title'),
      "step": [
        {
          "@type": "HowToStep",
          "name": t('characterCounter.function.howToUse.step1.title'),
          "text": t('characterCounter.function.howToUse.step1.text')
        },
        {
          "@type": "HowToStep",
          "name": t('characterCounter.function.howToUse.step2.title'),
          "text": t('characterCounter.function.howToUse.step2.text')
        },
        {
          "@type": "HowToStep",
          "name": t('characterCounter.function.howToUse.step3.title'),
          "text": t('characterCounter.function.howToUse.step3.text')
        }
      ]
    }
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('characterCounter.function.meta.title'),
      description: t('characterCounter.function.meta.description'),
      keywords: t('characterCounter.function.meta.keywords'),
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
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 
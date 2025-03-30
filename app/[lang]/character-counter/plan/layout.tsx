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
    logo: {
      "@type": "ImageObject";
      url: string;
      width: number;
      height: number;
    };
  };
  offers: {
    "@type": "AggregateOffer";
    priceCurrency: string;
    offers: Array<{
      "@type": "Offer";
      name: string;
      description: string;
      price: string;
      priceCurrency: string;
      availability: string;
    }>;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/plan');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    freePlanTitle,
    freePlanDescription,
    proPlanTitle,
    proPlanDescription,
  ] = await Promise.all([
    translate(lang, 'characterCounter.plan.meta.title'),
    translate(lang, 'characterCounter.plan.meta.description'),
    translate(lang, 'characterCounter.plan.meta.keywords'),
    translate(lang, 'characterCounter.plan.free.title'),
    translate(lang, 'characterCounter.plan.free.description'),
    translate(lang, 'characterCounter.plan.pro.title'),
    translate(lang, 'characterCounter.plan.pro.description'), 
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/plan`,
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
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "offers": [
        {
          "@type": "Offer",
          "name": freePlanTitle,
          "description": freePlanDescription,
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": proPlanTitle,
          "description": proPlanDescription,
          "price": "9.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
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
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/plan`,
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
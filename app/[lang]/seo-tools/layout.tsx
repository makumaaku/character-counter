import { translate, loadToolMessages } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import SeoToolsLayout from './components/SeoToolsLayout';
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
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  featureList: string[];
  isAccessibleForFree: boolean;
  browserRequirements: string;
  hasPart: {
    "@type": string;
    name: string;
    description: string;
    url: string;
  }[];
}

// レイアウトメッセージの型定義
type LayoutMessages = {
  title: string;
  pageSpeedChecker: {
    title: string;
  };
  linkStatusChecker: {
    title: string;
  };
  seoCannibalizationChecker: {
    title: string;
  };
  seoVolumeGuess: {
    title: string;
  };
  pageStructureChecker: {
    title: string;
  };
  metaCraftForLlm: {
    title: string;
  };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // Load SEO tools translations
  await loadToolMessages(lang as Language, 'seo-tools');
  
  // Get translations in parallel
  const [
    title,
    description,
    keywords,
    pageSpeedCheckerTitle,
    pageSpeedCheckerDescription,
    seoCannibalizationCheckerTitle,
    seoCannibalizationCheckerDescription
  ] = await Promise.all([
    translate(lang, 'seoTools.meta.title'),
    translate(lang, 'seoTools.meta.description'),
    translate(lang, 'seoTools.meta.keywords'),
    translate(lang, 'seoTools.tools.pageSpeedChecker.title'),
    translate(lang, 'seoTools.tools.pageSpeedChecker.description'),
    translate(lang, 'seoTools.tools.seoCannibalizationChecker.title'),
    translate(lang, 'seoTools.tools.seoCannibalizationChecker.description')
  ]);

  // Common metadata
  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt
  };

  // JSON-LD data
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools`,
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
      "Page Speed Checker",
      "SEO Analysis",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": pageSpeedCheckerTitle,
        "description": pageSpeedCheckerDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/page-speed-checker`
      },
      {
        "@type": "WebApplication",
        "name": seoCannibalizationCheckerTitle,
        "description": seoCannibalizationCheckerDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-cannibalization-checker`
      }
      // 将来的に他のSEOツールを追加する場合はここに追加
    ]
  };

  // Get common metadata
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // seo-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools');
  
  // サイドバー用の翻訳を取得
  const [
    seoToolsTitle,
    pageSpeedCheckerTitle,
    linkStatusCheckerTitle,
    seoCannibalizationCheckerTitle,
    seoVolumeGuessTitle,
    pageStructureCheckerTitle,
    metaCraftForLlmTitle
  ] = await Promise.all([
    translate(lang, 'seoTools.title'),
    translate(lang, 'seoTools.tools.pageSpeedChecker.title'),
    translate(lang, 'seoTools.tools.linkStatusChecker.title'),
    translate(lang, 'seoTools.tools.seoCannibalizationChecker.title'),
    translate(lang, 'seoTools.tools.seoVolumeGuess.title'),
    translate(lang, 'seoTools.tools.pageStructureChecker.title'),
    translate(lang, 'seoTools.tools.metaCraftForLlm.title')
  ]);
  
  // SeoToolsLayoutに渡すメッセージオブジェクト
  // 自動生成された型定義に部分的に沿った構造
  const layoutMessages: LayoutMessages = {
    title: seoToolsTitle,
    pageSpeedChecker: {
      title: pageSpeedCheckerTitle
    },
    linkStatusChecker: {
      title: linkStatusCheckerTitle
    },
    seoCannibalizationChecker: {
      title: seoCannibalizationCheckerTitle
    },
    seoVolumeGuess: {
      title: seoVolumeGuessTitle
    },
    pageStructureChecker: {
      title: pageStructureCheckerTitle
    },
    metaCraftForLlm: {
      title: metaCraftForLlmTitle
    }
  };
  
  return (
    <SeoToolsLayout messages={layoutMessages}>
      {children}
    </SeoToolsLayout>
  );
} 
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
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
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  featureList: string[];
  keywords: string[];
  applicationSubCategory: string;
  aggregateRating: {
    "@type": string;
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
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
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/meta-craft-for-llm');
  
  // 翻訳を並列取得
  const [
    title,
    description,
    keywords,
  ] = await Promise.all([
    translate(lang, 'seoTools.metaCraftForLlm.meta.title'),
    translate(lang, 'seoTools.metaCraftForLlm.meta.description'),
    translate(lang, 'seoTools.metaCraftForLlm.meta.keywords'),
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  // ページ固有のJSON-LDを定義
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/meta-craft-for-llm`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "URL analysis",
      "SEO metadata extraction",
      "Title tag generation",
      "Meta description generation",
      "OGP tags generation",
      "Twitter Card generation",
      "JSON-LD generation",
      "LLM optimization",
      "AI-ready metadata creation"
    ],
    "keywords": keywords.split(','),
    "applicationSubCategory": "AITool",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    }
  };

  // FAQスキーマを追加
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Meta Craft for LLM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Meta Craft for LLM is a free tool that helps you create optimized metadata for your webpages that can be better understood by Large Language Models (LLMs) like ChatGPT and Google Bard. It analyzes your URL and generates structured data, meta tags, and JSON-LD code."
        }
      },
      {
        "@type": "Question",
        "name": "How does this tool optimize for LLMs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This tool analyzes your page content and creates schema.org structured data (JSON-LD) that helps LLMs better understand your content. It extracts key information and formats it according to recommended practices for AI-powered search and answers."
        }
      },
      {
        "@type": "Question",
        "name": "Why is structured data important for LLMs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Structured data provides clear, machine-readable context about your content. LLMs and AI search engines use this data to better understand your page's purpose, content, and relevance, increasing the chances of being cited in AI-generated responses."
        }
      },
      {
        "@type": "Question",
        "name": "What types of structured data does this tool generate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The tool generates title tags, meta descriptions, Open Graph tags, Twitter Card tags, and JSON-LD structured data. For LLM optimization, it focuses on creating WebApplication, FAQPage, and other schema types that are particularly helpful for AI understanding."
        }
      },
      {
        "@type": "Question",
        "name": "How can I implement the generated code on my website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply copy the generated code using the copy buttons provided and paste it into the <head> section of your webpage HTML. If you're using a CMS like WordPress, you can use plugins like Yoast SEO or RankMath to add custom code."
        }
      }
    ]
  };

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description: description + " Optimized for AI and language models, this tool helps your content get cited in LLM responses.",
      keywords: keywords + ", LLM optimization, AI metadata, structured data for language models, chatGPT optimization",
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/meta-craft-for-llm`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify([jsonLd, faqJsonLd])
    }
  };
}

export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="layout-container">
      {children}
    </div>
  );
} 
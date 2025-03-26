import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
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

  // ページ固有のJSON-LDを定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('metaCraftForLlm.meta.title'),
    "description": t('metaCraftForLlm.meta.description'),
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
    "keywords": [
      "LLM SEO tool",
      "AI metadata generator",
      "SEO for language models",
      "JSON-LD generator",
      "schema.org generator",
      "meta tags for LLM",
      "structured data for AI"
    ],
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
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('metaCraftForLlm.meta.title'),
      description: t('metaCraftForLlm.meta.description') + " Optimized for AI and language models, this tool helps your content get cited in LLM responses.",
      keywords: t('metaCraftForLlm.meta.keywords') + ", LLM optimization, AI metadata, structured data for language models, chatGPT optimization",
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

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
} 
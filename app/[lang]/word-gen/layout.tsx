import { loadToolMessages, translate } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n/types';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;

  // word-gen用の翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    wordGeneratorTitle,
    wordGeneratorDescription,
    nameGeneratorTitle,
    nameGeneratorDescription,
    passwordGeneratorTitle,
    passwordGeneratorDescription,
    storyGeneratorTitle,
    storyGeneratorDescription,
    sentenceGeneratorTitle,
    sentenceGeneratorDescription,
    wordCardGeneratorTitle,
    wordCardGeneratorDescription,
    japaneseKanjiGeneratorTitle,
    japaneseKanjiGeneratorDescription
  ] = await Promise.all([
    translate(lang, 'wordGen.meta.title'),
    translate(lang, 'wordGen.meta.description'),
    translate(lang, 'wordGen.meta.keywords'),
    translate(lang, 'wordGen.tools.wordGenerator.title'),
    translate(lang, 'wordGen.tools.wordGenerator.description'),
    translate(lang, 'wordGen.tools.nameGenerator.title'),
    translate(lang, 'wordGen.tools.nameGenerator.description'),
    translate(lang, 'wordGen.tools.passwordGenerator.title'),
    translate(lang, 'wordGen.tools.passwordGenerator.description'),
    translate(lang, 'wordGen.tools.storyGenerator.title'),
    translate(lang, 'wordGen.tools.storyGenerator.description'),
    translate(lang, 'wordGen.tools.sentenceGenerator.title'),
    translate(lang, 'wordGen.tools.sentenceGenerator.description'),
    translate(lang, 'wordGen.tools.wordCardGenerator.title'),
    translate(lang, 'wordGen.tools.wordCardGenerator.description'),
    translate(lang, 'wordGen.tools.japaneseKanjiGenerator.title'),
    translate(lang, 'wordGen.tools.japaneseKanjiGenerator.description')
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen`,
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
      "Random word generation",
      "Name generation",
      "Password generation",
      "Story generation",
      "Sentence generation",
      "Word card generation",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": wordGeneratorTitle,
        "description": wordGeneratorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-generator`
      },
      {
        "@type": "WebApplication",
        "name": nameGeneratorTitle,
        "description": nameGeneratorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/name-generator`
      },
      {
        "@type": "WebApplication",
        "name": passwordGeneratorTitle,
        "description": passwordGeneratorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`
      },
      {
        "@type": "WebApplication",
        "name": storyGeneratorTitle,
        "description": storyGeneratorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/story-generator`
      },
      {
        "@type": "WebApplication",
        "name": sentenceGeneratorTitle,
        "description": sentenceGeneratorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/sentence-generator`
      },
      {
        "@type": "WebApplication",
        "name": wordCardGeneratorTitle,
        "description": wordCardGeneratorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-card-generator`
      },
      {
        "@type": "WebApplication",
        "name": japaneseKanjiGeneratorTitle,
        "description": japaneseKanjiGeneratorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/japanese-kanji-generator`
      }
    ]
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  
  // word-gen用の翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen');

  // クライアントコンポーネント用の翻訳を準備
  const [
    title, 
    description,
    wordGeneratorTitle,
    wordCardGeneratorTitle,
    sentenceGeneratorTitle,
    nameGeneratorTitle,
    passwordGeneratorTitle,
    storyGeneratorTitle,
    japaneseKanjiGeneratorTitle
  ] = await Promise.all([
    translate(lang, 'wordGen.title'),
    translate(lang, 'wordGen.description'),
    translate(lang, 'wordGen.tools.wordGenerator.title'),
    translate(lang, 'wordGen.tools.wordCardGenerator.title'),
    translate(lang, 'wordGen.tools.sentenceGenerator.title'),
    translate(lang, 'wordGen.tools.nameGenerator.title'),
    translate(lang, 'wordGen.tools.passwordGenerator.title'),
    translate(lang, 'wordGen.tools.storyGenerator.title'),
    translate(lang, 'wordGen.tools.japaneseKanjiGenerator.title')
  ]);

  const messages = {
    title,
    description,
    wordGen: {
      tools: {
        wordGenerator: {
          title: wordGeneratorTitle
        },
        wordCardGenerator: {
          title: wordCardGeneratorTitle
        },
        sentenceGenerator: {
          title: sentenceGeneratorTitle
        },
        nameGenerator: {
          title: nameGeneratorTitle
        },
        passwordGenerator: {
          title: passwordGeneratorTitle
        },
        storyGenerator: {
          title: storyGeneratorTitle
        },
        japaneseKanjiGenerator: {
          title: japaneseKanjiGeneratorTitle
        }
      }
    }
  };

  return (
    <>
      <Script
        id="messages"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(messages),
        }}
      />
      <div className="flex flex-col min-h-screen bg-gray-800">
        <Header title={title} homeLink={`/${lang}/word-gen`} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
} 
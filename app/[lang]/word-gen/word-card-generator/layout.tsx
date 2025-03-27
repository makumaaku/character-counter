import Script from 'next/script';
import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
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
  keywords: string[];
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // word-card-generator用の翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/word-card-generator');
  
  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords
  ] = await Promise.all([
    translate(lang, 'wordCardGenerator.meta.title'),
    translate(lang, 'wordCardGenerator.meta.description'),
    translate(lang, 'wordCardGenerator.meta.keywords')
  ]);

  // 共通のメタデータ情報を設定
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
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-card-generator`,
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
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Word card creation",
      "Custom card design",
      "Multiple languages support",
      "Vocabulary learning",
      "Printable cards",
      "Digital flashcards",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": keywords.split(',')
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-card-generator`,
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
  
  // word-card-generator用の翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/word-card-generator');

  // 翻訳を一括で取得（並列処理）
  const [
    title,
    description,
    countLabel,
    generateButton,
    resultTitle,
    resultEmpty,
    copyButton,
    copiedMessage,
    lengthLabel,
    categoryLabel,
    // About section
    aboutCatchphrase,
    aboutIntro,
    aboutFeaturesTitle,
    aboutFeatureOneClickTitle,
    aboutFeatureOneClickDesc,
    aboutFeatureDatabaseTitle,
    aboutFeatureDatabaseDesc,
    aboutFeatureDesignTitle,
    aboutFeatureDesignDesc,
    // Use cases
    aboutUseCasesTitle,
    aboutUseCaseVocabularyTitle,
    aboutUseCaseVocabularyDesc,
    aboutUseCaseBrainstormingTitle,
    aboutUseCaseBrainstormingDesc,
    aboutUseCaseGamesTitle,
    aboutUseCaseGamesDesc,
    // Technical
    aboutTechnicalTitle,
    aboutTechnicalAlgorithmTitle,
    aboutTechnicalAlgorithmDesc,
    aboutTechnicalDatabaseTitle,
    aboutTechnicalDatabaseDesc,
    aboutTechnicalResponsiveTitle,
    aboutTechnicalResponsiveDesc,
    // FAQ
    aboutFaqTitle,
    aboutFaqFreeQuestion,
    aboutFaqFreeAnswer,
    aboutFaqCustomizeQuestion,
    aboutFaqCustomizeAnswer,
    aboutFaqPrintQuestion,
    aboutFaqPrintAnswer,
    // Conclusion
    aboutConclusionTitle,
    aboutConclusionDesc,
    // How To
    howToTitle,
    howToDesc,
    // Use Cases
    useCasesTitle,
    useCasesVocabulary,
    useCasesTeaching,
    useCasesGames,
    useCasesWriting,
    useCasesEsl
  ] = await Promise.all([
    translate(lang, 'wordGen.wordCardGenerator.title'),
    translate(lang, 'wordGen.wordCardGenerator.description'),
    translate(lang, 'wordGen.wordCardGenerator.form.count.label'),
    translate(lang, 'wordGen.wordCardGenerator.form.generate'),
    translate(lang, 'wordGen.wordCardGenerator.result.title'),
    translate(lang, 'wordGen.wordCardGenerator.result.empty'),
    translate(lang, 'wordGen.wordCardGenerator.result.copy'),
    translate(lang, 'wordGen.wordCardGenerator.result.copied'),
    translate(lang, 'wordGen.wordCardGenerator.card.length'),
    translate(lang, 'wordGen.wordCardGenerator.card.category'),
    // About section
    translate(lang, 'wordGen.wordCardGenerator.about.catchphrase'),
    translate(lang, 'wordGen.wordCardGenerator.about.introduction'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.oneClick.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.oneClick.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.database.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.database.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.design.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.features.design.description'),
    // Use cases
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.vocabulary.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.vocabulary.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.brainstorming.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.brainstorming.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.games.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.useCases.games.description'),
    // Technical
    translate(lang, 'wordGen.wordCardGenerator.about.technical.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.algorithm.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.algorithm.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.database.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.database.description'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.responsive.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.technical.responsive.description'),
    // FAQ
    translate(lang, 'wordGen.wordCardGenerator.about.faq.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.free.question'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.free.answer'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.customize.question'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.customize.answer'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.print.question'),
    translate(lang, 'wordGen.wordCardGenerator.about.faq.questions.print.answer'),
    // Conclusion
    translate(lang, 'wordGen.wordCardGenerator.about.conclusion.title'),
    translate(lang, 'wordGen.wordCardGenerator.about.conclusion.description'),
    // How To
    translate(lang, 'wordGen.wordCardGenerator.howTo.title'),
    translate(lang, 'wordGen.wordCardGenerator.howTo.description'),
    // Use Cases
    translate(lang, 'wordGen.wordCardGenerator.useCases.title'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.vocabulary'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.teaching'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.games'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.writing'),
    translate(lang, 'wordGen.wordCardGenerator.useCases.esl')
  ]);

  // クライアントコンポーネントに渡す翻訳データ
  const messages = {
    wordCardGenerator: {
      title,
      description,
      form: {
        count: {
          label: countLabel
        },
        generate: generateButton
      },
      result: {
        title: resultTitle,
        empty: resultEmpty,
        copy: copyButton,
        copied: copiedMessage
      },
      card: {
        length: lengthLabel,
        category: categoryLabel
      },
      about: {
        catchphrase: aboutCatchphrase,
        introduction: aboutIntro,
        features: {
          title: aboutFeaturesTitle,
          oneClick: {
            title: aboutFeatureOneClickTitle,
            description: aboutFeatureOneClickDesc
          },
          database: {
            title: aboutFeatureDatabaseTitle,
            description: aboutFeatureDatabaseDesc
          },
          design: {
            title: aboutFeatureDesignTitle,
            description: aboutFeatureDesignDesc
          }
        },
        useCases: {
          title: aboutUseCasesTitle,
          vocabulary: {
            title: aboutUseCaseVocabularyTitle,
            description: aboutUseCaseVocabularyDesc
          },
          brainstorming: {
            title: aboutUseCaseBrainstormingTitle,
            description: aboutUseCaseBrainstormingDesc
          },
          games: {
            title: aboutUseCaseGamesTitle,
            description: aboutUseCaseGamesDesc
          }
        },
        technical: {
          title: aboutTechnicalTitle,
          algorithm: {
            title: aboutTechnicalAlgorithmTitle,
            description: aboutTechnicalAlgorithmDesc
          },
          database: {
            title: aboutTechnicalDatabaseTitle,
            description: aboutTechnicalDatabaseDesc
          },
          responsive: {
            title: aboutTechnicalResponsiveTitle,
            description: aboutTechnicalResponsiveDesc
          }
        },
        faq: {
          title: aboutFaqTitle,
          questions: {
            free: {
              question: aboutFaqFreeQuestion,
              answer: aboutFaqFreeAnswer
            },
            customize: {
              question: aboutFaqCustomizeQuestion,
              answer: aboutFaqCustomizeAnswer
            },
            print: {
              question: aboutFaqPrintQuestion,
              answer: aboutFaqPrintAnswer
            }
          }
        },
        conclusion: {
          title: aboutConclusionTitle,
          description: aboutConclusionDesc
        }
      },
      howTo: {
        title: howToTitle,
        description: howToDesc
      },
      useCases: {
        title: useCasesTitle,
        vocabulary: useCasesVocabulary,
        teaching: useCasesTeaching,
        games: useCasesGames,
        writing: useCasesWriting,
        esl: useCasesEsl
      }
    }
  };

  return (
    <>
      <Script
        id="word-card-generator-messages"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(messages),
        }}
      />
      <div className="flex flex-col min-h-screen bg-gray-800">
        <main className="flex-1 bg-gray-800">
          {children}
        </main>
      </div>
    </>
  );
} 
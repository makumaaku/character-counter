import { translate, loadToolMessages } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n/types';
import Script from 'next/script';

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
  
  // Load word-generator translations
  await loadToolMessages(lang as Language, 'word-gen');
  await loadToolMessages(lang as Language, 'word-gen/word-generator');
  
  // Get translations in parallel
  const [
    title,
    description,
    keywords,
  ] = await Promise.all([
    translate(lang, 'wordGen.wordGenerator.meta.title'),
    translate(lang, 'wordGen.wordGenerator.meta.description'),
    translate(lang, 'wordGen.wordGenerator.meta.keywords'),
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
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-generator`,
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
    "applicationCategory": "CreativeApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Random word generation",
      "Custom word patterns",
      "Multiple languages support",
      "Word length control",
      "Part of speech selection",
      "Real-time generation",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": keywords.split(',')
  };

  // Get common metadata
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/word-generator`,
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
  params: { lang: string };
}) {
  const { lang } = params;
  
  // Load translations
  await loadToolMessages(lang as Language, 'word-gen');
  await loadToolMessages(lang as Language, 'word-gen/word-generator');
  
  // Get client component translations
  const [
    // タイトルと説明
    title,
    description,
    // フォームの要素
    formLengthLabel,
    formLengthMin,
    formLengthMax,
    formPatternLabel,
    formPatternPlaceholder,
    formCountLabel,
    formCountPlaceholder,
    formGenerate,
    formClear,
    // 結果セクション
    resultTitle,
    resultEmpty,
    resultCopy,
    resultCopied,
    resultDownload,
    resultDownloaded,
    // About section
    aboutCatchphrase,
    aboutIntroduction,
    aboutFeaturesTitle,
    aboutFeaturesOneClickTitle,
    aboutFeaturesOneClickDesc,
    aboutFeaturesDatabaseTitle,
    aboutFeaturesDatabaseDesc,
    aboutFeaturesDesignTitle,
    aboutFeaturesDesignDesc,
    // Use cases
    aboutUseCasesTitle,
    aboutUseCasesScenesTitle,
    aboutUseCasesScenesWriter,
    aboutUseCasesScenesDesigner,
    aboutUseCasesScenesBS,
    aboutUseCasesTestimonialsTitle,
    aboutUseCasesTestimonialsWriterName,
    aboutUseCasesTestimonialsWriterQuote,
    aboutUseCasesTestimonialsDesignerName,
    aboutUseCasesTestimonialsDesignerQuote,
    // Technical
    aboutTechnicalTitle,
    aboutTechnicalAlgorithmTitle,
    aboutTechnicalAlgorithmDesc,
    aboutTechnicalDatabaseTitle,
    aboutTechnicalDatabaseDesc,
    aboutTechnicalPerformanceTitle,
    aboutTechnicalPerformanceDesc,
    // FAQ
    aboutFaqTitle,
    aboutFaqQuestionsFree,
    aboutFaqAnswersFree,
    aboutFaqQuestionsWords,
    aboutFaqAnswersWords,
    aboutFaqQuestionsCommercial,
    aboutFaqAnswersCommercial,
    aboutFaqQuestionsMobile,
    aboutFaqAnswersMobile,
    // Conclusion
    aboutConclusionTitle,
    aboutConclusionDesc
  ] = await Promise.all([
    // タイトルと説明
    translate(lang, 'wordGen.wordGenerator.title'),
    translate(lang, 'wordGen.wordGenerator.description'),
    // フォームの要素
    translate(lang, 'wordGen.wordGenerator.form.length.label'),
    translate(lang, 'wordGen.wordGenerator.form.length.min'),
    translate(lang, 'wordGen.wordGenerator.form.length.max'),
    translate(lang, 'wordGen.wordGenerator.form.pattern.label'),
    translate(lang, 'wordGen.wordGenerator.form.pattern.placeholder'),
    translate(lang, 'wordGen.wordGenerator.form.count.label'),
    translate(lang, 'wordGen.wordGenerator.form.count.placeholder'),
    translate(lang, 'wordGen.wordGenerator.form.generate'),
    translate(lang, 'wordGen.wordGenerator.form.clear'),
    // 結果セクション
    translate(lang, 'wordGen.wordGenerator.result.title'),
    translate(lang, 'wordGen.wordGenerator.result.empty'),
    translate(lang, 'wordGen.wordGenerator.result.copy'),
    translate(lang, 'wordGen.wordGenerator.result.copied'),
    translate(lang, 'wordGen.wordGenerator.result.download').catch(() => "Download"),
    translate(lang, 'wordGen.wordGenerator.result.downloaded').catch(() => "Downloaded!"),
    // About section
    translate(lang, 'wordGen.wordGenerator.about.catchphrase'),
    translate(lang, 'wordGen.wordGenerator.about.introduction'),
    translate(lang, 'wordGen.wordGenerator.about.features.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.oneClick.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.oneClick.description'),
    translate(lang, 'wordGen.wordGenerator.about.features.database.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.database.description'),
    translate(lang, 'wordGen.wordGenerator.about.features.design.title'),
    translate(lang, 'wordGen.wordGenerator.about.features.design.description'),
    // Use cases
    translate(lang, 'wordGen.wordGenerator.about.useCases.title'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.title'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.writer'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.designer'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.scenes.brainstorming'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.title'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.writer.name'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.writer.quote'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.designer.name'),
    translate(lang, 'wordGen.wordGenerator.about.useCases.testimonials.designer.quote'),
    // Technical
    translate(lang, 'wordGen.wordGenerator.about.technical.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.algorithm.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.algorithm.description'),
    translate(lang, 'wordGen.wordGenerator.about.technical.database.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.database.description'),
    translate(lang, 'wordGen.wordGenerator.about.technical.performance.title'),
    translate(lang, 'wordGen.wordGenerator.about.technical.performance.description'),
    // FAQ
    translate(lang, 'wordGen.wordGenerator.about.faq.title'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.free.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.free.answer'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.words.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.words.answer'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.commercial.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.commercial.answer'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.mobile.question'),
    translate(lang, 'wordGen.wordGenerator.about.faq.questions.mobile.answer'),
    translate(lang, 'wordGen.wordGenerator.about.conclusion.title'),
    translate(lang, 'wordGen.wordGenerator.about.conclusion.description'),
  ]);
  
  // クライアントコンポーネントに渡す翻訳データ
  const messages = {
    wordGen: {
      wordGenerator: {
        title,
        description,
        form: {
          length: {
            label: formLengthLabel,
            min: formLengthMin,
            max: formLengthMax
          },
          pattern: {
            label: formPatternLabel,
            placeholder: formPatternPlaceholder
          },
          count: {
            label: formCountLabel,
            placeholder: formCountPlaceholder
          },
          generate: formGenerate,
          clear: formClear
        },
        result: {
          title: resultTitle,
          empty: resultEmpty,
          copy: resultCopy,
          copied: resultCopied,
          download: resultDownload || "Download",
          downloaded: resultDownloaded || "Downloaded!"
        },
        about: {
          catchphrase: aboutCatchphrase,
          introduction: aboutIntroduction,
          features: {
            title: aboutFeaturesTitle,
            oneClick: {
              title: aboutFeaturesOneClickTitle,
              description: aboutFeaturesOneClickDesc
            },
            database: {
              title: aboutFeaturesDatabaseTitle,
              description: aboutFeaturesDatabaseDesc
            },
            design: {
              title: aboutFeaturesDesignTitle,
              description: aboutFeaturesDesignDesc
            }
          },
          useCases: {
            title: aboutUseCasesTitle,
            scenes: {
              title: aboutUseCasesScenesTitle,
              writer: aboutUseCasesScenesWriter,
              designer: aboutUseCasesScenesDesigner,
              brainstorming: aboutUseCasesScenesBS
            },
            testimonials: {
              title: aboutUseCasesTestimonialsTitle,
              writer: {
                name: aboutUseCasesTestimonialsWriterName,
                quote: aboutUseCasesTestimonialsWriterQuote
              },
              designer: {
                name: aboutUseCasesTestimonialsDesignerName,
                quote: aboutUseCasesTestimonialsDesignerQuote
              }
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
            performance: {
              title: aboutTechnicalPerformanceTitle,
              description: aboutTechnicalPerformanceDesc
            }
          },
          faq: {
            title: aboutFaqTitle,
            questions: {
              free: {
                question: aboutFaqQuestionsFree,
                answer: aboutFaqAnswersFree
              },
              words: {
                question: aboutFaqQuestionsWords,
                answer: aboutFaqAnswersWords
              },
              commercial: {
                question: aboutFaqQuestionsCommercial,
                answer: aboutFaqAnswersCommercial
              },
              mobile: {
                question: aboutFaqQuestionsMobile,
                answer: aboutFaqAnswersMobile
              }
            }
          },
          conclusion: {
            title: aboutConclusionTitle,
            description: aboutConclusionDesc
          }
        }
      }
    }
  };

  return (
    <>
      <Script
        id="word-generator-messages"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(messages),
        }}
      />
      {children}
    </>
  );
} 
import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import SentenceGeneratorClient from './components/SentenceGeneratorClient';
import { Language, WordGenSentenceGeneratorMessages } from '@/lib/i18n/types';
import SeoText, { SeoTextContent } from '@/components/SeoText';
import PageContainer from '@/components/PageContainer';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SentenceGenerator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/sentence-generator');
  
  // サーバーコンポーネントで翻訳を取得
  const [
    title,
    description,
    // フォームの要素
    formCountLabel,
    formGenerate,
    // 結果セクション
    resultEmpty,
    resultCopyTitle,
    resultCopied,
    // 詳細コンテンツ
    detailedContentCatchphrase,
    detailedContentIntroduction,
    // 機能セクション
    detailedContentFeaturesTitle,
    detailedContentFeaturesEasyOperationTitle,
    detailedContentFeaturesEasyOperationDescription,
    detailedContentFeaturesPatternsTitle,
    detailedContentFeaturesPatternsDescription,
    detailedContentFeaturesCustomizationTitle,
    detailedContentFeaturesCustomizationDescription,
    // ユースケース
    detailedContentUseCasesTitle,
    detailedContentUseCasesWriterTitle,
    detailedContentUseCasesWriterDescription,
    detailedContentUseCasesCreativeTitle,
    detailedContentUseCasesCreativeDescription,
    detailedContentUseCasesEducationTitle,
    detailedContentUseCasesEducationDescription,
    // 技術情報
    detailedContentTechnicalTitle,
    detailedContentTechnicalNlpTitle,
    detailedContentTechnicalNlpDescription,
    detailedContentTechnicalDatabaseTitle,
    detailedContentTechnicalDatabaseDescription,
    detailedContentTechnicalPerformanceTitle,
    detailedContentTechnicalPerformanceDescription,
    // FAQ
    detailedContentFaqTitle,
    detailedContentFaqQualityQuestion,
    detailedContentFaqQualityAnswer,
    detailedContentFaqCommercialQuestion,
    detailedContentFaqCommercialAnswer,
    detailedContentFaqStyleQuestion,
    detailedContentFaqStyleAnswer,
    // 結論
    detailedContentConclusionTitle,
    detailedContentConclusionDescription,
    // フォーム
    formCopy,
    // SEOテキスト
    seoTextOverviewTitle,
    seoTextOverviewContent,
    seoTextHowToTitle,
    seoTextHowToStep1Title,
    seoTextHowToStep1Desc,
    seoTextHowToStep2Title,
    seoTextHowToStep2Desc,
    seoTextHowToStep3Title,
    seoTextHowToStep3Desc,
    seoTextTestimonialsTitle,
    seoTextTestimonialsUser1Name,
    seoTextTestimonialsUser1Comment,
    seoTextTestimonialsUser2Name,
    seoTextTestimonialsUser2Comment,
    seoTextTestimonialsUser3Name,
    seoTextTestimonialsUser3Comment,
    seoTextFeaturesTitle,
    seoTextFeaturesItem1Title,
    seoTextFeaturesItem1Desc,
    seoTextFeaturesItem2Title,
    seoTextFeaturesItem2Desc,
    seoTextFeaturesItem3Title,
    seoTextFeaturesItem3Desc,
    seoTextFeaturesItem4Title,
    seoTextFeaturesItem4Desc,
    seoTextFaqTitle,
    seoTextFaqQ1,
    seoTextFaqA1,
    seoTextFaqQ2,
    seoTextFaqA2,
    seoTextFaqQ3,
    seoTextFaqA3
  ] = await Promise.all([
    translate(lang, 'wordGen.sentenceGenerator.title'),
    translate(lang, 'wordGen.sentenceGenerator.description'),
    // フォームの要素
    translate(lang, 'wordGen.sentenceGenerator.form.count.label'),
    translate(lang, 'wordGen.sentenceGenerator.form.generate'),
    // 結果セクション
    translate(lang, 'wordGen.sentenceGenerator.result.empty'),
    translate(lang, 'wordGen.sentenceGenerator.result.copyTitle'),
    translate(lang, 'wordGen.sentenceGenerator.result.copied'),
    // 詳細コンテンツ
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.catchphrase'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.introduction'),
    // 機能セクション
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.features.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.features.easyOperation.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.features.easyOperation.description'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.features.patterns.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.features.patterns.description'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.features.customization.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.features.customization.description'),
    // ユースケース
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.useCases.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.useCases.writer.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.useCases.writer.description'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.useCases.creative.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.useCases.creative.description'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.useCases.education.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.useCases.education.description'),
    // 技術情報
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.technical.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.technical.nlp.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.technical.nlp.description'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.technical.database.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.technical.database.description'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.technical.performance.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.technical.performance.description'),
    // FAQ
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.faq.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.faq.quality.question'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.faq.quality.answer'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.faq.commercial.question'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.faq.commercial.answer'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.faq.style.question'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.faq.style.answer'),
    // 結論
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.conclusion.title'),
    translate(lang, 'wordGen.sentenceGenerator.detailedContent.conclusion.description'),
    // フォーム
    translate(lang, 'wordGen.sentenceGenerator.form.copy'),
    // SEOテキスト
    translate(lang, 'wordGen.sentenceGenerator.seoText.overview.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.overview.content'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.howTo.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.howTo.steps.0.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.howTo.steps.0.description'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.howTo.steps.1.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.howTo.steps.1.description'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.howTo.steps.2.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.howTo.steps.2.description'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.testimonials.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.testimonials.users.0.name'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.testimonials.users.0.comment'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.testimonials.users.1.name'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.testimonials.users.1.comment'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.testimonials.users.2.name'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.testimonials.users.2.comment'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.0.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.0.description'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.1.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.1.description'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.2.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.2.description'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.3.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.features.items.3.description'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.faq.title'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.faq.questions.0.question'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.faq.questions.0.answer'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.faq.questions.1.question'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.faq.questions.1.answer'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.faq.questions.2.question'),
    translate(lang, 'wordGen.sentenceGenerator.seoText.faq.questions.2.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenSentenceGeneratorMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    form: {
      count: {
        label: formCountLabel
      },
      generate: formGenerate,
      copy: formCopy
    },
    result: {
      empty: resultEmpty,
      copyTitle: resultCopyTitle,
      copied: resultCopied
    },
    detailedContent: {
      catchphrase: detailedContentCatchphrase,
      introduction: detailedContentIntroduction,
      features: {
        title: detailedContentFeaturesTitle,
        easyOperation: {
          title: detailedContentFeaturesEasyOperationTitle,
          description: detailedContentFeaturesEasyOperationDescription
        },
        patterns: {
          title: detailedContentFeaturesPatternsTitle,
          description: detailedContentFeaturesPatternsDescription
        },
        customization: {
          title: detailedContentFeaturesCustomizationTitle,
          description: detailedContentFeaturesCustomizationDescription
        }
      },
      useCases: {
        title: detailedContentUseCasesTitle,
        writer: {
          title: detailedContentUseCasesWriterTitle,
          description: detailedContentUseCasesWriterDescription
        },
        creative: {
          title: detailedContentUseCasesCreativeTitle,
          description: detailedContentUseCasesCreativeDescription
        },
        education: {
          title: detailedContentUseCasesEducationTitle,
          description: detailedContentUseCasesEducationDescription
        }
      },
      technical: {
        title: detailedContentTechnicalTitle,
        nlp: {
          title: detailedContentTechnicalNlpTitle,
          description: detailedContentTechnicalNlpDescription
        },
        database: {
          title: detailedContentTechnicalDatabaseTitle,
          description: detailedContentTechnicalDatabaseDescription
        },
        performance: {
          title: detailedContentTechnicalPerformanceTitle,
          description: detailedContentTechnicalPerformanceDescription
        }
      },
      faq: {
        title: detailedContentFaqTitle,
        quality: {
          question: detailedContentFaqQualityQuestion,
          answer: detailedContentFaqQualityAnswer
        },
        commercial: {
          question: detailedContentFaqCommercialQuestion,
          answer: detailedContentFaqCommercialAnswer
        },
        style: {
          question: detailedContentFaqStyleQuestion,
          answer: detailedContentFaqStyleAnswer
        }
      },
      conclusion: {
        title: detailedContentConclusionTitle,
        description: detailedContentConclusionDescription
      }
    },
    seoText: {
      overview: {
        title: seoTextOverviewTitle,
        content: seoTextOverviewContent
      },
      howTo: {
        title: seoTextHowToTitle,
        steps: [
          {
            title: seoTextHowToStep1Title,
            description: seoTextHowToStep1Desc
          },
          {
            title: seoTextHowToStep2Title,
            description: seoTextHowToStep2Desc
          },
          {
            title: seoTextHowToStep3Title,
            description: seoTextHowToStep3Desc
          }
        ]
      },
      testimonials: {
        title: seoTextTestimonialsTitle,
        users: [
          {
            name: seoTextTestimonialsUser1Name,
            comment: seoTextTestimonialsUser1Comment
          },
          {
            name: seoTextTestimonialsUser2Name,
            comment: seoTextTestimonialsUser2Comment
          },
          {
            name: seoTextTestimonialsUser3Name,
            comment: seoTextTestimonialsUser3Comment
          }
        ]
      },
      features: {
        title: seoTextFeaturesTitle,
        items: [
          {
            title: seoTextFeaturesItem1Title,
            description: seoTextFeaturesItem1Desc
          },
          {
            title: seoTextFeaturesItem2Title,
            description: seoTextFeaturesItem2Desc
          },
          {
            title: seoTextFeaturesItem3Title,
            description: seoTextFeaturesItem3Desc
          },
          {
            title: seoTextFeaturesItem4Title,
            description: seoTextFeaturesItem4Desc
          }
        ]
      },
      faq: {
        title: seoTextFaqTitle,
        questions: [
          {
            question: seoTextFaqQ1,
            answer: seoTextFaqA1
          },
          {
            question: seoTextFaqQ2,
            answer: seoTextFaqA2
          },
          {
            question: seoTextFaqQ3,
            answer: seoTextFaqA3
          }
        ]
      }
    }
  };
  
  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;
  
  return (
    <PageContainer>
      <div className="bg-gray-700 p-6 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-300 mb-6">
          {description}
        </p>
        <SentenceGeneratorClient messages={messages} lang={lang} />
      </div>
      <SeoText content={seoTextContent} />
    </PageContainer>
  );
} 
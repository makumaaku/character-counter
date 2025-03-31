import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import SentenceGeneratorClient from './components/SentenceGeneratorClient';
import { Language, WordGenSentenceGeneratorMessages } from '@/lib/i18n/types';

type Props = {
  params: { lang: string }
}

export default async function SentenceGenerator({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
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
    formCopy
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
    translate(lang, 'wordGen.sentenceGenerator.form.copy')
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
    }
  };
  
  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {description}
          </p>
          <SentenceGeneratorClient messages={messages} lang={lang} />
        </div>
      </main>
    </div>
  );
} 
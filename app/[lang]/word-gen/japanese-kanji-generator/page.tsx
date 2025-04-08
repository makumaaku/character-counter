import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import ClientSideKanjiGenerator from './components/ClientSideKanjiGenerator';
import { Language, WordGenJapaneseKanjiGeneratorMessages } from '@/lib/i18n/types';
import PageContainer from '@/components/PageContainer';
import SeoText, { SeoTextContent } from '@/components/SeoText';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function JapaneseKanjiGenerator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/japanese-kanji-generator');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    generateButton,
    loadingText,
    downloadButton,
    jpgButton,
    pngButton,
    copyButton,
    copiedText,
    noImageText,
    fontLoadingText,
    errorGeneration,
    errorDownload,
    // SEOテキスト関連の翻訳
    seoOverviewTitle,
    seoOverviewContent,
    seoHowToTitle,
    seoHowToStep1Title,
    seoHowToStep1Desc,
    seoHowToStep2Title,
    seoHowToStep2Desc,
    seoHowToStep3Title,
    seoHowToStep3Desc,
    seoTestimonialsTitle,
    seoTestimonialsUser1Name,
    seoTestimonialsUser1Comment,
    seoTestimonialsUser2Name,
    seoTestimonialsUser2Comment,
    seoTestimonialsUser3Name,
    seoTestimonialsUser3Comment,
    seoFeaturesTitle,
    seoFeaturesItem1Title,
    seoFeaturesItem1Desc,
    seoFeaturesItem2Title,
    seoFeaturesItem2Desc,
    seoFeaturesItem3Title,
    seoFeaturesItem3Desc,
    seoFeaturesItem4Title,
    seoFeaturesItem4Desc,
    seoFaqTitle,
    seoFaqQ1,
    seoFaqA1,
    seoFaqQ2,
    seoFaqA2,
    seoFaqQ3,
    seoFaqA3,
    seoFaqQ4,
    seoFaqA4,
    seoFaqQ5,
    seoFaqA5
  ] = await Promise.all([
    translate(lang, 'wordGen.japaneseKanjiGenerator.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.generate.button'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.generate.loading'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.download.button'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.download.jpg'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.download.png'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.copy.button'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.copy.success'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.display.noImage'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.font.loading'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.error.generation'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.error.download'),
    // SEOテキスト関連の翻訳
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.overview.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.overview.content'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.howTo.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.howTo.steps.0.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.howTo.steps.0.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.howTo.steps.1.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.howTo.steps.1.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.howTo.steps.2.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.howTo.steps.2.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.testimonials.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.testimonials.users.0.name'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.testimonials.users.0.comment'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.testimonials.users.1.name'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.testimonials.users.1.comment'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.testimonials.users.2.name'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.testimonials.users.2.comment'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.0.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.0.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.1.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.1.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.2.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.2.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.3.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.features.items.3.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.0.question'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.0.answer'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.1.question'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.1.answer'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.2.question'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.2.answer'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.3.question'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.3.answer'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.4.question'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.seoText.faq.questions.4.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenJapaneseKanjiGeneratorMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    generate: {
      button: generateButton,
      loading: loadingText
    },
    download: {
      button: downloadButton,
      jpg: jpgButton,
      png: pngButton
    },
    copy: {
      button: copyButton,
      success: copiedText
    },
    display: {
      noImage: noImageText
    },
    font: {
      loading: fontLoadingText
    },
    error: {
      generation: errorGeneration,
      download: errorDownload
    },
    seoText: {
      overview: {
        title: seoOverviewTitle,
        content: seoOverviewContent
      },
      howTo: {
        title: seoHowToTitle,
        steps: [
          {
            title: seoHowToStep1Title,
            description: seoHowToStep1Desc
          },
          {
            title: seoHowToStep2Title,
            description: seoHowToStep2Desc
          },
          {
            title: seoHowToStep3Title,
            description: seoHowToStep3Desc
          }
        ]
      },
      testimonials: {
        title: seoTestimonialsTitle,
        users: [
          {
            name: seoTestimonialsUser1Name,
            comment: seoTestimonialsUser1Comment
          },
          {
            name: seoTestimonialsUser2Name,
            comment: seoTestimonialsUser2Comment
          },
          {
            name: seoTestimonialsUser3Name,
            comment: seoTestimonialsUser3Comment
          }
        ]
      },
      features: {
        title: seoFeaturesTitle,
        items: [
          {
            title: seoFeaturesItem1Title,
            description: seoFeaturesItem1Desc
          },
          {
            title: seoFeaturesItem2Title,
            description: seoFeaturesItem2Desc
          },
          {
            title: seoFeaturesItem3Title,
            description: seoFeaturesItem3Desc
          },
          {
            title: seoFeaturesItem4Title,
            description: seoFeaturesItem4Desc
          }
        ]
      },
      faq: {
        title: seoFaqTitle,
        questions: [
          {
            question: seoFaqQ1,
            answer: seoFaqA1
          },
          {
            question: seoFaqQ2,
            answer: seoFaqA2
          },
          {
            question: seoFaqQ3,
            answer: seoFaqA3
          },
          {
            question: seoFaqQ4,
            answer: seoFaqA4
          },
          {
            question: seoFaqQ5,
            answer: seoFaqA5
          }
        ]
      }
    }
  };

  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-300">
          {description}
        </p>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 sm:p-8 shadow-xl mb-10">
        <ClientSideKanjiGenerator messages={messages} />
      </div>
      
      <SeoText content={seoTextContent} />
    </PageContainer>
  );
} 
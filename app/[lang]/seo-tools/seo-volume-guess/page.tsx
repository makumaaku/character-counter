import React from 'react';
import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import SEOVolumeGuessForm from './components/SEOVolumeGuessForm';
import { Language, SeoToolsSeoVolumeGuessMessages } from '@/lib/i18n/types';
import SeoText, { SeoTextContent } from '@/components/SeoText';
import PageContainer from '@/components/PageContainer';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SEOVolumeGuessPage({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/seo-volume-guess');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    // タイトルと説明
    title,
    description,
    // 入力フォーム
    inputPlaceholder,
    // ボタン
    buttonAnalyze,
    // 結果セクション
    resultVolumeScore,
    resultSuggestions,
    resultAllSuggestions,
    // スコア説明
    resultScoreDescription1,
    resultScoreDescription2,
    resultScoreDescription3,
    resultScoreDescription4,
    resultScoreDescription5,
    // エラーメッセージ
    errorEmptyKeyword,
    errorUnknown,
    errorApiError,
    // 国選択関連
    countrySelectorLabel,
    countryResultFormat,
    countryJapan,
    countryUS,
    countryUK,
    countryAustralia,
    countryCanada,
    countryGermany,
    countryFrance,
    countryIndia,
    // 注意事項
    noticeTitle,
    noticeLanguage,
    noticeLocation,
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
    // タイトルと説明
    translate(lang, 'seoTools.seoVolumeGuess.title'),
    translate(lang, 'seoTools.seoVolumeGuess.description'),
    // 入力フォーム
    translate(lang, 'seoTools.seoVolumeGuess.input.placeholder'),
    // ボタン
    translate(lang, 'seoTools.seoVolumeGuess.button.analyze'),
    // 結果セクション
    translate(lang, 'seoTools.seoVolumeGuess.result.volumeScore'),
    translate(lang, 'seoTools.seoVolumeGuess.result.suggestions'),
    translate(lang, 'seoTools.seoVolumeGuess.result.allSuggestions'),
    // スコア説明
    translate(lang, 'seoTools.seoVolumeGuess.result.scoreDescription1'),
    translate(lang, 'seoTools.seoVolumeGuess.result.scoreDescription2'),
    translate(lang, 'seoTools.seoVolumeGuess.result.scoreDescription3'),
    translate(lang, 'seoTools.seoVolumeGuess.result.scoreDescription4'),
    translate(lang, 'seoTools.seoVolumeGuess.result.scoreDescription5'),
    // エラーメッセージ
    translate(lang, 'seoTools.seoVolumeGuess.error.emptyKeyword'),
    translate(lang, 'seoTools.seoVolumeGuess.error.unknown'),
    translate(lang, 'seoTools.seoVolumeGuess.error.apiError'),
    // 国選択関連
    translate(lang, 'seoTools.seoVolumeGuess.country.selector'),
    translate(lang, 'seoTools.seoVolumeGuess.country.result'),
    translate(lang, 'seoTools.seoVolumeGuess.country.japan'),
    translate(lang, 'seoTools.seoVolumeGuess.country.us'),
    translate(lang, 'seoTools.seoVolumeGuess.country.uk'),
    translate(lang, 'seoTools.seoVolumeGuess.country.australia'),
    translate(lang, 'seoTools.seoVolumeGuess.country.canada'),
    translate(lang, 'seoTools.seoVolumeGuess.country.germany'),
    translate(lang, 'seoTools.seoVolumeGuess.country.france'),
    translate(lang, 'seoTools.seoVolumeGuess.country.india'),
    // 注意事項
    translate(lang, 'seoTools.seoVolumeGuess.notice.title'),
    translate(lang, 'seoTools.seoVolumeGuess.notice.language'),
    translate(lang, 'seoTools.seoVolumeGuess.notice.location'),
    // SEOテキスト関連の翻訳
    translate(lang, 'seoTools.seoVolumeGuess.seoText.overview.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.overview.content'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.howTo.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.howTo.steps.0.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.howTo.steps.0.description'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.howTo.steps.1.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.howTo.steps.1.description'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.howTo.steps.2.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.howTo.steps.2.description'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.testimonials.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.testimonials.users.0.name'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.testimonials.users.0.comment'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.testimonials.users.1.name'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.testimonials.users.1.comment'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.testimonials.users.2.name'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.testimonials.users.2.comment'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.0.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.0.description'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.1.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.1.description'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.2.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.2.description'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.3.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.features.items.3.description'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.title'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.0.question'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.0.answer'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.1.question'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.1.answer'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.2.question'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.2.answer'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.3.question'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.3.answer'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.4.question'),
    translate(lang, 'seoTools.seoVolumeGuess.seoText.faq.questions.4.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: SeoToolsSeoVolumeGuessMessages = {
    meta: {
      title: '',
      description: '',
      keywords: ''
    },
    title,
    description,
    input: {
      placeholder: inputPlaceholder
    },
    button: {
      analyze: buttonAnalyze
    },
    result: {
      volumeScore: resultVolumeScore,
      suggestions: resultSuggestions,
      allSuggestions: resultAllSuggestions,
      scoreDescription1: resultScoreDescription1,
      scoreDescription2: resultScoreDescription2,
      scoreDescription3: resultScoreDescription3,
      scoreDescription4: resultScoreDescription4,
      scoreDescription5: resultScoreDescription5
    },
    error: {
      emptyKeyword: errorEmptyKeyword,
      unknown: errorUnknown,
      apiError: errorApiError
    },
    country: {
      selector: countrySelectorLabel,
      result: countryResultFormat,
      japan: countryJapan,
      us: countryUS,
      uk: countryUK,
      australia: countryAustralia,
      canada: countryCanada,
      germany: countryGermany,
      france: countryFrance,
      india: countryIndia
    },
    notice: {
      title: noticeTitle,
      language: noticeLanguage,
      location: noticeLocation
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
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>
        
        <SEOVolumeGuessForm lang={lang as Language} messages={messages} />
        <SeoText content={seoTextContent} />
      </div>
    </PageContainer>
  );
} 
import React from 'react';
import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import { Container } from '@/components/container';
import SEOVolumeGuessForm from './components/SEOVolumeGuessForm';
import { Language, SeoToolsSeoVolumeGuessMessages } from '@/lib/i18n/types';

type Props = {
  params: { lang: string }
}

export default async function SEOVolumeGuessPage({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
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
    noticeLocation
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
    translate(lang, 'seoTools.seoVolumeGuess.notice.location')
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
    }
  };

  return (
    <Container className="py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>
        
        <SEOVolumeGuessForm lang={lang as Language} messages={messages} />
      </div>
    </Container>
  );
} 
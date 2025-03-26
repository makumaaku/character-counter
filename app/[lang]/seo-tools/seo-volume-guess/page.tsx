import React from 'react';
import { translate } from '@/lib/i18n/server';
import { Container } from '@/components/container';
import SEOVolumeGuessForm from './components/SEOVolumeGuessForm';
import { Language } from '@/lib/i18n/types';

export default async function SEOVolumeGuessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  // 翻訳をオブジェクトとして渡す
  const translations = {
    placeholder: t('seoVolumeGuess.input.placeholder'),
    analyzeButton: t('seoVolumeGuess.button.analyze'),
    volumeScore: t('seoVolumeGuess.result.volume-score'),
    suggestions: t('seoVolumeGuess.result.suggestions'),
    allSuggestions: t('seoVolumeGuess.result.all-suggestions'),
    errorEmptyKeyword: t('seoVolumeGuess.error.empty-keyword'),
    errorUnknown: t('seoVolumeGuess.error.unknown'),
    scoreDescriptions: {
      1: t('seoVolumeGuess.result.score-description-1'),
      2: t('seoVolumeGuess.result.score-description-2'),
      3: t('seoVolumeGuess.result.score-description-3'),
      4: t('seoVolumeGuess.result.score-description-4'),
      5: t('seoVolumeGuess.result.score-description-5')
    },
    // 国選択関連の翻訳を追加
    countrySelector: t('seoVolumeGuess.country.selector'),
    countryResult: t('seoVolumeGuess.country.result'),
    countries: {
      jp: t('seoVolumeGuess.country.japan'),
      us: t('seoVolumeGuess.country.us'),
      gb: t('seoVolumeGuess.country.uk'),
      au: t('seoVolumeGuess.country.australia'),
      ca: t('seoVolumeGuess.country.canada'),
      de: t('seoVolumeGuess.country.germany'),
      fr: t('seoVolumeGuess.country.france'),
      in: t('seoVolumeGuess.country.india')
    },
    // 注意事項の翻訳を追加
    notice: {
      title: t('seoVolumeGuess.notice.title'),
      language: t('seoVolumeGuess.notice.language'),
      location: t('seoVolumeGuess.notice.location')
    }
  };

  return (
    <Container className="py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white">{t('seoVolumeGuess.title')}</h1>
        <p className="text-gray-300 mb-8">{t('seoVolumeGuess.description')}</p>
        
        <SEOVolumeGuessForm lang={lang as Language} translations={translations} />
      </div>
    </Container>
  );
} 
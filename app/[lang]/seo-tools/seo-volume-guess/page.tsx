import React from 'react';
import { Metadata } from 'next';
import { translate, getLanguageFromParams } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { analyzeSEOVolume } from './actions';
import { Container } from '@/components/container';
import SEOVolumeGuessForm from './components/SEOVolumeGuessForm';

type Props = {
  params: { lang: string };
};

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
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLanguageFromParams(params);
  const t = (key: string) => translate(lang, key);

  // 共通のメタデータ情報を設定
  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  // ページ固有のJSON-LDを定義
  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('seo-volume-guess.meta.title'),
    "description": t('seo-volume-guess.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // 共通のメタデータを取得
  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('seo-volume-guess.meta.title'),
      description: t('seo-volume-guess.meta.description'),
      keywords: t('seo-volume-guess.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-volume-guess`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function SEOVolumeGuessPage({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  const t = (key: string) => translate(lang, key);

  // 翻訳をオブジェクトとして渡す
  const translations = {
    placeholder: t('seo-volume-guess.input.placeholder'),
    analyzeButton: t('seo-volume-guess.button.analyze'),
    volumeScore: t('seo-volume-guess.result.volume-score'),
    suggestions: t('seo-volume-guess.result.suggestions'),
    allSuggestions: t('seo-volume-guess.result.all-suggestions'),
    errorEmptyKeyword: t('seo-volume-guess.error.empty-keyword'),
    errorUnknown: t('seo-volume-guess.error.unknown'),
    scoreDescriptions: {
      1: t('seo-volume-guess.result.score-description-1'),
      2: t('seo-volume-guess.result.score-description-2'),
      3: t('seo-volume-guess.result.score-description-3'),
      4: t('seo-volume-guess.result.score-description-4'),
      5: t('seo-volume-guess.result.score-description-5')
    },
    // 国選択関連の翻訳を追加
    countrySelector: t('seo-volume-guess.country.selector'),
    countryResult: t('seo-volume-guess.country.result'),
    countries: {
      jp: t('seo-volume-guess.country.japan'),
      us: t('seo-volume-guess.country.us'),
      gb: t('seo-volume-guess.country.uk'),
      au: t('seo-volume-guess.country.australia'),
      ca: t('seo-volume-guess.country.canada'),
      de: t('seo-volume-guess.country.germany'),
      fr: t('seo-volume-guess.country.france'),
      in: t('seo-volume-guess.country.india')
    },
    // 注意事項の翻訳を追加
    notice: {
      title: t('seo-volume-guess.notice.title'),
      language: t('seo-volume-guess.notice.language'),
      location: t('seo-volume-guess.notice.location')
    }
  };

  return (
    <Container className="py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white">{t('seo-volume-guess.title')}</h1>
        <p className="text-gray-300 mb-8">{t('seo-volume-guess.description')}</p>
        
        <SEOVolumeGuessForm lang={lang} translations={translations} />
      </div>
    </Container>
  );
} 
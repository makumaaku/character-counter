import { Metadata } from 'next';
import { translate, getLanguageFromPath } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import SEOCannibalizationChecker from './components/SEOCannibalizationChecker';

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);
  const commonT = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: commonT('common.meta.siteName'),
    publisher: commonT('common.meta.publisher'),
    logoAlt: commonT('common.meta.logoAlt'),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('seoCannibalizationChecker.meta.title'),
    "description": t('seoCannibalizationChecker.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-cannibalization-checker`,
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
    }
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('seoCannibalizationChecker.meta.title'),
      description: t('seoCannibalizationChecker.meta.description'),
      keywords: t('seoCannibalizationChecker.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/seo-tools/seo-cannibalization-checker`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function SEOCannibalizationCheckerPage({ params }: Props) {
  const lang = params.lang;
  
  const translations = {
    title: translate(lang, 'seoCannibalizationChecker.title'),
    description: translate(lang, 'seoCannibalizationChecker.description'),
    domain: {
      label: translate(lang, 'seoCannibalizationChecker.domain.label'),
      placeholder: translate(lang, 'seoCannibalizationChecker.domain.placeholder'),
      help: translate(lang, 'seoCannibalizationChecker.domain.help')
    },
    keyword: {
      label: translate(lang, 'seoCannibalizationChecker.keyword.label'),
      placeholder: translate(lang, 'seoCannibalizationChecker.keyword.placeholder'),
      help: translate(lang, 'seoCannibalizationChecker.keyword.help')
    },
    button: {
      check: translate(lang, 'seoCannibalizationChecker.button.check'),
      processing: translate(lang, 'seoCannibalizationChecker.button.processing')
    },
    result: {
      title: translate(lang, 'seoCannibalizationChecker.result.title'),
      description: translate(lang, 'seoCannibalizationChecker.result.description'),
      openButton: translate(lang, 'seoCannibalizationChecker.result.openButton')
    },
    error: {
      emptyDomain: translate(lang, 'seoCannibalizationChecker.error.emptyDomain'),
      invalidDomain: translate(lang, 'seoCannibalizationChecker.error.invalidDomain'),
      emptyKeyword: translate(lang, 'seoCannibalizationChecker.error.emptyKeyword'),
      generic: translate(lang, 'seoCannibalizationChecker.error.generic')
    }
  };
  
  return <SEOCannibalizationChecker lang={lang} translations={translations} />;
} 
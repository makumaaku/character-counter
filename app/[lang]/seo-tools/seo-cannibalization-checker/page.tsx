import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, SeoToolsSeoCannibalizationCheckerMessages } from '@/lib/i18n/types';
import SEOCannibalizationChecker from './components/SEOCannibalizationChecker';

type Props = {
  params: { lang: string }
}

export default async function SEOCannibalizationCheckerPage({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/seo-cannibalization-checker');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    domainLabel,
    domainPlaceholder,
    domainHelp,
    keywordLabel,
    keywordPlaceholder,
    keywordHelp,
    buttonCheck,
    buttonProcessing,
    resultTitle,
    resultDescription,
    resultOpenButton,
    errorEmptyDomain,
    errorInvalidDomain,
    errorEmptyKeyword,
    errorGeneric
  ] = await Promise.all([
    translate(lang, 'seoTools.seoCannibalizationChecker.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.domain.label'),
    translate(lang, 'seoTools.seoCannibalizationChecker.domain.placeholder'),
    translate(lang, 'seoTools.seoCannibalizationChecker.domain.help'),
    translate(lang, 'seoTools.seoCannibalizationChecker.keyword.label'),
    translate(lang, 'seoTools.seoCannibalizationChecker.keyword.placeholder'),
    translate(lang, 'seoTools.seoCannibalizationChecker.keyword.help'),
    translate(lang, 'seoTools.seoCannibalizationChecker.button.check'),
    translate(lang, 'seoTools.seoCannibalizationChecker.button.processing'),
    translate(lang, 'seoTools.seoCannibalizationChecker.result.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.result.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.result.openButton'),
    translate(lang, 'seoTools.seoCannibalizationChecker.error.emptyDomain'),
    translate(lang, 'seoTools.seoCannibalizationChecker.error.invalidDomain'),
    translate(lang, 'seoTools.seoCannibalizationChecker.error.emptyKeyword'),
    translate(lang, 'seoTools.seoCannibalizationChecker.error.generic')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: SeoToolsSeoCannibalizationCheckerMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    domain: {
      label: domainLabel,
      placeholder: domainPlaceholder,
      help: domainHelp
    },
    keyword: {
      label: keywordLabel,
      placeholder: keywordPlaceholder,
      help: keywordHelp
    },
    button: {
      check: buttonCheck,
      processing: buttonProcessing
    },
    result: {
      title: resultTitle,
      description: resultDescription,
      openButton: resultOpenButton
    },
    error: {
      emptyDomain: errorEmptyDomain,
      invalidDomain: errorInvalidDomain,
      emptyKeyword: errorEmptyKeyword,
      generic: errorGeneric
    }
  };
  
  return <SEOCannibalizationChecker messages={messages} />;
} 
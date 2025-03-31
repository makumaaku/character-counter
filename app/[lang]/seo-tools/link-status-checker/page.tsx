import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, SeoToolsLinkStatusCheckerMessages } from '@/lib/i18n/types';
import LinkStatusCheckerClient from './components/LinkStatusCheckerClient';

type Props = {
  params: { lang: string }
}

export default async function LinkStatusChecker({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools/link-status-checker');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    formUrlLabel,
    formUrlPlaceholder,
    buttonCheck,
    buttonChecking,
    resultsTitle,
    resultsStatus,
    resultsProcessingUrl,
    resultsCheckingLinks,
    resultsTotalLinksChecked,
    errorGeneral,
    errorTimeout,
    errorNetwork,
    errorInvalidUrl
  ] = await Promise.all([
    translate(lang, 'seoTools.linkStatusChecker.title'),
    translate(lang, 'seoTools.linkStatusChecker.description'),
    translate(lang, 'seoTools.linkStatusChecker.form.url.label'),
    translate(lang, 'seoTools.linkStatusChecker.form.url.placeholder'),
    translate(lang, 'seoTools.linkStatusChecker.form.button.check'),
    translate(lang, 'seoTools.linkStatusChecker.form.button.checking'),
    translate(lang, 'seoTools.linkStatusChecker.results.title'),
    translate(lang, 'seoTools.linkStatusChecker.results.status'),
    translate(lang, 'seoTools.linkStatusChecker.results.processing_url'),
    translate(lang, 'seoTools.linkStatusChecker.results.checking_links'),
    translate(lang, 'seoTools.linkStatusChecker.results.total_links_checked'),
    translate(lang, 'seoTools.linkStatusChecker.errors.general'),
    translate(lang, 'seoTools.linkStatusChecker.errors.timeout'),
    translate(lang, 'seoTools.linkStatusChecker.errors.network'),
    translate(lang, 'seoTools.linkStatusChecker.errors.invalid_url')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: SeoToolsLinkStatusCheckerMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    form: {
      url: {
        label: formUrlLabel,
        placeholder: formUrlPlaceholder
      },
      button: {
        check: buttonCheck,
        checking: buttonChecking
      }
    },
    results: {
      title: resultsTitle,
      status: resultsStatus,
      processing_url: resultsProcessingUrl,
      checking_links: resultsCheckingLinks,
      total_links_checked: resultsTotalLinksChecked
    },
    errors: {
      general: errorGeneral,
      timeout: errorTimeout,
      network: errorNetwork,
      invalid_url: errorInvalidUrl
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300">
            {description}
          </p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <LinkStatusCheckerClient messages={messages} lang={lang} />
        </div>
      </div>
    </div>
  );
} 
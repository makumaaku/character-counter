import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, SeoToolsLinkStatusCheckerMessages } from '@/lib/i18n/types';
import LinkStatusCheckerClient from './components/LinkStatusCheckerClient';
import SeoText, { SeoTextContent } from '@/components/SeoText';
import PageContainer from '@/components/PageContainer';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function LinkStatusChecker({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
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
    errorInvalidUrl,
    placeholder,
    emptyState,
    sidebarFunction,
    sidebarUseCase,
    sidebarFaq,
    sidebarAboutUs,
    sidebarContact,
    sidebarPrivacy,
    sidebarPlan,
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
    translate(lang, 'seoTools.linkStatusChecker.errors.invalid_url'),
    translate(lang, 'seoTools.linkStatusChecker.placeholder'),
    translate(lang, 'seoTools.linkStatusChecker.emptyState'),
    translate(lang, 'seoTools.linkStatusChecker.sidebar.function'),
    translate(lang, 'seoTools.linkStatusChecker.sidebar.usecase'),
    translate(lang, 'seoTools.linkStatusChecker.sidebar.faq'),
    translate(lang, 'seoTools.linkStatusChecker.sidebar.aboutUs'),
    translate(lang, 'seoTools.linkStatusChecker.sidebar.contact'),
    translate(lang, 'seoTools.linkStatusChecker.sidebar.privacy'),
    translate(lang, 'seoTools.linkStatusChecker.sidebar.plan'),
    // SEOテキスト関連の翻訳
    translate(lang, 'seoTools.linkStatusChecker.seoText.overview.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.overview.content'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.howTo.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.howTo.steps.0.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.howTo.steps.0.description'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.howTo.steps.1.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.howTo.steps.1.description'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.howTo.steps.2.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.howTo.steps.2.description'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.testimonials.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.testimonials.users.0.name'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.testimonials.users.0.comment'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.testimonials.users.1.name'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.testimonials.users.1.comment'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.testimonials.users.2.name'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.testimonials.users.2.comment'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.0.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.0.description'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.1.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.1.description'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.2.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.2.description'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.3.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.features.items.3.description'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.title'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.0.question'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.0.answer'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.1.question'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.1.answer'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.2.question'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.2.answer'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.3.question'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.3.answer'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.4.question'),
    translate(lang, 'seoTools.linkStatusChecker.seoText.faq.questions.4.answer')
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
    },
    placeholder,
    emptyState,
    sidebar: {
      function: sidebarFunction,
      usecase: sidebarUseCase,
      faq: sidebarFaq,
      aboutUs: sidebarAboutUs,
      contact: sidebarContact,
      privacy: sidebarPrivacy,
      plan: sidebarPlan
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
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-300">
          {description}
        </p>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-6 mb-10">
        <LinkStatusCheckerClient messages={messages} lang={lang} />
      </div>

      <SeoText content={seoTextContent} />
    </PageContainer>
  );
} 
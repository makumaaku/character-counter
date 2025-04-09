import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, SeoToolsSeoCannibalizationCheckerMessages } from '@/lib/i18n/types';
import SEOCannibalizationChecker from './components/SEOCannibalizationChecker';
import SeoText, { SeoTextContent } from '@/components/SeoText';
import PageContainer from '@/components/PageContainer';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SEOCannibalizationCheckerPage({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
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
    errorGeneric,
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
    translate(lang, 'seoTools.seoCannibalizationChecker.error.generic'),
    // SEOテキスト関連の翻訳
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.overview.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.overview.content'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.howTo.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.howTo.steps.0.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.howTo.steps.0.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.howTo.steps.1.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.howTo.steps.1.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.howTo.steps.2.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.howTo.steps.2.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.testimonials.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.testimonials.users.0.name'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.testimonials.users.0.comment'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.testimonials.users.1.name'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.testimonials.users.1.comment'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.testimonials.users.2.name'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.testimonials.users.2.comment'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.0.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.0.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.1.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.1.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.2.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.2.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.3.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.features.items.3.description'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.title'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.0.question'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.0.answer'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.1.question'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.1.answer'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.2.question'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.2.answer'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.3.question'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.3.answer'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.4.question'),
    translate(lang, 'seoTools.seoCannibalizationChecker.seoText.faq.questions.4.answer')
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
        <SEOCannibalizationChecker messages={messages} />
        <SeoText content={seoTextContent} />
    </PageContainer>
  );
} 
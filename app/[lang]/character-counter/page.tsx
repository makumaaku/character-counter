import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import { CharacterCounterClient } from './components/CharacterCounterClient';
import { CharacterCounterCommonMessages, Language } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function CharacterCounter({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter');
  
  // 必要な翻訳を並列取得
  const [
    title,
    description,
    placeholder,
    charCount,
    lineCount,
    wordCount,
    byteCount,
    searchString,
    enterSearchString,
    occurrences,
    searchResultPreview,
    copyText,
    copied,
    // Meta section
    metaTitle,
    metaDescription,
    metaKeywords,
    // Sidebar section
    sidebarFunction,
    sidebarUsecase,
    sidebarFaq,
    sidebarPlan,
    sidebarColumn,
    // Hero section
    heroTitle,
    heroDescription,
    heroDarkMode,
    // How to section
    howToTitle,
    howToStepsInputTitle,
    howToStepsInputDescription,
    howToStepsInputNote,
    howToStepsRealtimeTitle,
    howToStepsRealtimeDescription,
    howToStepsUtilizeTitle,
    howToStepsUtilizeDescription,
    // Testimonials section
    testimonialsTitle,
    testimonialsUsersWriterName,
    testimonialsUsersWriterComment,
    testimonialsUsersSocialName,
    testimonialsUsersSocialComment,
    testimonialsUsersMarketerName,
    testimonialsUsersMarketerComment,
    // Features section
    featuresTitle,
    featuresItemsEasyTitle,
    featuresItemsEasyDescription,
    featuresItemsAccurateTitle,
    featuresItemsAccurateDescription,
    featuresItemsFreeTitle,
    featuresItemsFreeDescription,
    featuresItemsDarkModeTitle,
    featuresItemsDarkModeDescription,
    // FAQ section
    faqTitle,
    faqQuestionsWhatQuestion,
    faqQuestionsWhatAnswer,
    faqQuestionsUsageQuestion,
    faqQuestionsUsageAnswer,
    faqQuestionsCountingQuestion,
    faqQuestionsCountingAnswer,
    faqQuestionsLanguagesQuestion,
    faqQuestionsLanguagesAnswer,
    faqQuestionsPricingQuestion,
    faqQuestionsPricingAnswer
  ] = await Promise.all([
    translate(lang, 'characterCounter.title'),
    translate(lang, 'characterCounter.description'),
    translate(lang, 'characterCounter.placeholder'),
    translate(lang, 'characterCounter.charCount'),
    translate(lang, 'characterCounter.lineCount'),
    translate(lang, 'characterCounter.wordCount'),
    translate(lang, 'characterCounter.byteCount'),
    translate(lang, 'characterCounter.searchString'),
    translate(lang, 'characterCounter.enterSearchString'),
    translate(lang, 'characterCounter.occurrences'),
    translate(lang, 'characterCounter.searchResultPreview'),
    translate(lang, 'characterCounter.copyText'),
    translate(lang, 'characterCounter.copied'),
    // Meta section
    translate(lang, 'characterCounter.meta.title'),
    translate(lang, 'characterCounter.meta.description'),
    translate(lang, 'characterCounter.meta.keywords'),
    // Sidebar section
    translate(lang, 'characterCounter.sidebar.function'),
    translate(lang, 'characterCounter.sidebar.usecase'),
    translate(lang, 'characterCounter.sidebar.faq'),
    translate(lang, 'characterCounter.sidebar.plan'),
    translate(lang, 'characterCounter.sidebar.column'),
    // Hero section
    translate(lang, 'characterCounter.content.hero.title'),
    translate(lang, 'characterCounter.content.hero.description'),
    translate(lang, 'characterCounter.content.hero.darkMode'),
    // How to section
    translate(lang, 'characterCounter.content.howTo.title'),
    translate(lang, 'characterCounter.content.howTo.steps.input.title'),
    translate(lang, 'characterCounter.content.howTo.steps.input.description'),
    translate(lang, 'characterCounter.content.howTo.steps.input.note'),
    translate(lang, 'characterCounter.content.howTo.steps.realtime.title'),
    translate(lang, 'characterCounter.content.howTo.steps.realtime.description'),
    translate(lang, 'characterCounter.content.howTo.steps.utilize.title'),
    translate(lang, 'characterCounter.content.howTo.steps.utilize.description'),
    // Testimonials section
    translate(lang, 'characterCounter.content.testimonials.title'),
    translate(lang, 'characterCounter.content.testimonials.users.writer.name'),
    translate(lang, 'characterCounter.content.testimonials.users.writer.comment'),
    translate(lang, 'characterCounter.content.testimonials.users.social.name'),
    translate(lang, 'characterCounter.content.testimonials.users.social.comment'),
    translate(lang, 'characterCounter.content.testimonials.users.marketer.name'),
    translate(lang, 'characterCounter.content.testimonials.users.marketer.comment'),
    // Features section
    translate(lang, 'characterCounter.content.features.title'),
    translate(lang, 'characterCounter.content.features.items.easy.title'),
    translate(lang, 'characterCounter.content.features.items.easy.description'),
    translate(lang, 'characterCounter.content.features.items.accurate.title'),
    translate(lang, 'characterCounter.content.features.items.accurate.description'),
    translate(lang, 'characterCounter.content.features.items.free.title'),
    translate(lang, 'characterCounter.content.features.items.free.description'),
    translate(lang, 'characterCounter.content.features.items.darkMode.title'),
    translate(lang, 'characterCounter.content.features.items.darkMode.description'),
    // FAQ section
    translate(lang, 'characterCounter.content.faq.title'),
    translate(lang, 'characterCounter.content.faq.questions.what.question'),
    translate(lang, 'characterCounter.content.faq.questions.what.answer'),
    translate(lang, 'characterCounter.content.faq.questions.usage.question'),
    translate(lang, 'characterCounter.content.faq.questions.usage.answer'),
    translate(lang, 'characterCounter.content.faq.questions.counting.question'),
    translate(lang, 'characterCounter.content.faq.questions.counting.answer'),
    translate(lang, 'characterCounter.content.faq.questions.languages.question'),
    translate(lang, 'characterCounter.content.faq.questions.languages.answer'),
    translate(lang, 'characterCounter.content.faq.questions.pricing.question'),
    translate(lang, 'characterCounter.content.faq.questions.pricing.answer')
  ]);
  
  // 翻訳をオブジェクトにまとめる
  const messages: CharacterCounterCommonMessages = {
    title,
    description,
    placeholder,
    charCount,
    lineCount,
    wordCount,
    byteCount,
    searchString,
    enterSearchString,
    occurrences,
    searchResultPreview,
    copyText,
    copied,
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords
    },
    sidebar: {
      function: sidebarFunction,
      usecase: sidebarUsecase,
      faq: sidebarFaq,
      plan: sidebarPlan,
      column: sidebarColumn
    },
    content: {
      hero: {
        title: heroTitle,
        description: heroDescription,
        darkMode: heroDarkMode
      },
      howTo: {
        title: howToTitle,
        steps: {
          input: {
            title: howToStepsInputTitle,
            description: howToStepsInputDescription,
            note: howToStepsInputNote
          },
          realtime: {
            title: howToStepsRealtimeTitle,
            description: howToStepsRealtimeDescription
          },
          utilize: {
            title: howToStepsUtilizeTitle,
            description: howToStepsUtilizeDescription
          }
        }
      },
      testimonials: {
        title: testimonialsTitle,
        users: {
          writer: {
            name: testimonialsUsersWriterName,
            comment: testimonialsUsersWriterComment
          },
          social: {
            name: testimonialsUsersSocialName,
            comment: testimonialsUsersSocialComment
          },
          marketer: {
            name: testimonialsUsersMarketerName,
            comment: testimonialsUsersMarketerComment
          }
        }
      },
      features: {
        title: featuresTitle,
        items: {
          easy: {
            title: featuresItemsEasyTitle,
            description: featuresItemsEasyDescription
          },
          accurate: {
            title: featuresItemsAccurateTitle,
            description: featuresItemsAccurateDescription
          },
          free: {
            title: featuresItemsFreeTitle,
            description: featuresItemsFreeDescription
          },
          darkMode: {
            title: featuresItemsDarkModeTitle,
            description: featuresItemsDarkModeDescription
          }
        }
      },
      faq: {
        title: faqTitle,
        questions: {
          what: {
            question: faqQuestionsWhatQuestion,
            answer: faqQuestionsWhatAnswer
          },
          usage: {
            question: faqQuestionsUsageQuestion,
            answer: faqQuestionsUsageAnswer
          },
          counting: {
            question: faqQuestionsCountingQuestion,
            answer: faqQuestionsCountingAnswer
          },
          languages: {
            question: faqQuestionsLanguagesQuestion,
            answer: faqQuestionsLanguagesAnswer
          },
          pricing: {
            question: faqQuestionsPricingQuestion,
            answer: faqQuestionsPricingAnswer
          }
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <CharacterCounterClient messages={messages} />
    </div>
  );
}
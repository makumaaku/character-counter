import { translate, loadToolMessages } from '@/lib/i18n/server';
import { getLanguageFromParams } from '@/lib/i18n/server';
import RouletteClient from './components/RouletteClient';
import { Language, RouletteMessages } from '@/lib/i18n/types';

type Props = {
  params: { lang: string }
}

export default async function RoulettePage({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // ツール固有の翻訳をロード
  await loadToolMessages(lang as Language, 'roulette');
  
  // 翻訳キーの配列を定義
  const [
    title,
    spinButton,
    spinningButton,
    editButton,
    saveButton,
    cancelButton,
    selectedText,
    placeholderText,
    heroTitle,
    heroDescription,
    heroDarkMode,
    howToTitle,
    inputTitle,
    inputDescription,
    inputNote,
    spinTitle,
    spinDescription,
    spinNote,
    resultTitle,
    resultDescription,
    resultNote,
    testimonialsTitle,
    teacherName,
    teacherComment,
    teamName,
    teamComment,
    familyName,
    familyComment,
    featuresTitle,
    easyTitle,
    easyDescription,
    fairTitle,
    fairDescription,
    visualTitle,
    visualDescription,
    freeTitle,
    freeDescription,
    faqTitle,
    whatQuestion,
    whatAnswer,
    usageQuestion,
    usageAnswer,
    saveQuestion,
    saveAnswer,
    limitQuestion,
    limitAnswer,
    mobileQuestion,
    mobileAnswer,
  ] = await Promise.all([
    translate(lang, 'roulette.title'),
    translate(lang, 'roulette.buttons.spin'),
    translate(lang, 'roulette.buttons.spinning'),
    translate(lang, 'roulette.buttons.edit'),
    translate(lang, 'roulette.buttons.save'),
    translate(lang, 'roulette.buttons.cancel'),
    translate(lang, 'roulette.result.selected'),
    translate(lang, 'roulette.result.placeholder'),
    translate(lang, 'roulette.content.hero.title'),
    translate(lang, 'roulette.content.hero.description'),
    translate(lang, 'roulette.content.hero.darkMode'),
    translate(lang, 'roulette.content.howTo.title'),
    translate(lang, 'roulette.content.howTo.steps.input.title'),
    translate(lang, 'roulette.content.howTo.steps.input.description'),
    translate(lang, 'roulette.content.howTo.steps.input.note'),
    translate(lang, 'roulette.content.howTo.steps.spin.title'),
    translate(lang, 'roulette.content.howTo.steps.spin.description'),
    translate(lang, 'roulette.content.howTo.steps.spin.note'),
    translate(lang, 'roulette.content.howTo.steps.result.title'),
    translate(lang, 'roulette.content.howTo.steps.result.description'),
    translate(lang, 'roulette.content.howTo.steps.result.note'),
    translate(lang, 'roulette.content.testimonials.title'),
    translate(lang, 'roulette.content.testimonials.users.teacher.name'),
    translate(lang, 'roulette.content.testimonials.users.teacher.comment'),
    translate(lang, 'roulette.content.testimonials.users.team.name'),
    translate(lang, 'roulette.content.testimonials.users.team.comment'),
    translate(lang, 'roulette.content.testimonials.users.family.name'),
    translate(lang, 'roulette.content.testimonials.users.family.comment'),
    translate(lang, 'roulette.content.features.title'),
    translate(lang, 'roulette.content.features.items.easy.title'),
    translate(lang, 'roulette.content.features.items.easy.description'),
    translate(lang, 'roulette.content.features.items.fair.title'),
    translate(lang, 'roulette.content.features.items.fair.description'),
    translate(lang, 'roulette.content.features.items.visual.title'),
    translate(lang, 'roulette.content.features.items.visual.description'),
    translate(lang, 'roulette.content.features.items.free.title'),
    translate(lang, 'roulette.content.features.items.free.description'),
    translate(lang, 'roulette.content.faq.title'),
    translate(lang, 'roulette.content.faq.questions.what.question'),
    translate(lang, 'roulette.content.faq.questions.what.answer'),
    translate(lang, 'roulette.content.faq.questions.usage.question'),
    translate(lang, 'roulette.content.faq.questions.usage.answer'),
    translate(lang, 'roulette.content.faq.questions.save.question'),
    translate(lang, 'roulette.content.faq.questions.save.answer'),
    translate(lang, 'roulette.content.faq.questions.limit.question'),
    translate(lang, 'roulette.content.faq.questions.limit.answer'),
    translate(lang, 'roulette.content.faq.questions.mobile.question'),
    translate(lang, 'roulette.content.faq.questions.mobile.answer'),
  ]);

  // 型付けされた翻訳オブジェクトを作成
  const translations: RouletteMessages = {
    title,
    meta: {
      title: '',
      description: '',
      keywords: ''
    },
    buttons: {
      spin: spinButton,
      spinning: spinningButton,
      edit: editButton,
      save: saveButton,
      cancel: cancelButton,
    },
    result: {
      selected: selectedText,
      placeholder: placeholderText,
    },
    content: {
      hero: {
        title: heroTitle,
        description: heroDescription,
        darkMode: heroDarkMode,
      },
      howTo: {
        title: howToTitle,
        steps: {
          input: {
            title: inputTitle,
            description: inputDescription,
            note: inputNote,
          },
          spin: {
            title: spinTitle,
            description: spinDescription,
            note: spinNote,
          },
          result: {
            title: resultTitle,
            description: resultDescription,
            note: resultNote,
          },
        },
      },
      testimonials: {
        title: testimonialsTitle,
        users: {
          teacher: {
            name: teacherName,
            comment: teacherComment,
          },
          team: {
            name: teamName,
            comment: teamComment,
          },
          family: {
            name: familyName,
            comment: familyComment,
          },
        },
      },
      features: {
        title: featuresTitle,
        items: {
          easy: {
            title: easyTitle,
            description: easyDescription,
          },
          fair: {
            title: fairTitle,
            description: fairDescription,
          },
          visual: {
            title: visualTitle,
            description: visualDescription,
          },
          free: {
            title: freeTitle,
            description: freeDescription,
          },
        },
      },
      faq: {
        title: faqTitle,
        questions: {
          what: {
            question: whatQuestion,
            answer: whatAnswer,
          },
          usage: {
            question: usageQuestion,
            answer: usageAnswer,
          },
          save: {
            question: saveQuestion,
            answer: saveAnswer,
          },
          limit: {
            question: limitQuestion,
            answer: limitAnswer,
          },
          mobile: {
            question: mobileQuestion,
            answer: mobileAnswer,
          },
        },
      },
    },
  };

  return <RouletteClient translations={translations} />;
} 
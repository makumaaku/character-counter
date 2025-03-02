import { translate } from '@/lib/i18n/server';
import RouletteClient from './components/RouletteClient';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function RoulettePage({ params }: Props) {
  const { lang } = await params;
  
  const translations = {
    title: translate(lang, 'roulette.title'),
    buttons: {
      spin: translate(lang, 'roulette.buttons.spin'),
      spinning: translate(lang, 'roulette.buttons.spinning'),
      edit: translate(lang, 'roulette.buttons.edit'),
      save: translate(lang, 'roulette.buttons.save'),
      cancel: translate(lang, 'roulette.buttons.cancel'),
    },
    result: {
      selected: translate(lang, 'roulette.result.selected'),
      placeholder: translate(lang, 'roulette.result.placeholder'),
    },
    content: {
      hero: {
        title: translate(lang, 'roulette.content.hero.title'),
        description: translate(lang, 'roulette.content.hero.description'),
        darkMode: translate(lang, 'roulette.content.hero.darkMode'),
      },
      howTo: {
        title: translate(lang, 'roulette.content.howTo.title'),
        steps: {
          input: {
            title: translate(lang, 'roulette.content.howTo.steps.input.title'),
            description: translate(lang, 'roulette.content.howTo.steps.input.description'),
            note: translate(lang, 'roulette.content.howTo.steps.input.note'),
          },
          spin: {
            title: translate(lang, 'roulette.content.howTo.steps.spin.title'),
            description: translate(lang, 'roulette.content.howTo.steps.spin.description'),
            note: translate(lang, 'roulette.content.howTo.steps.spin.note'),
          },
          result: {
            title: translate(lang, 'roulette.content.howTo.steps.result.title'),
            description: translate(lang, 'roulette.content.howTo.steps.result.description'),
            note: translate(lang, 'roulette.content.howTo.steps.result.note'),
          },
        },
      },
      testimonials: {
        title: translate(lang, 'roulette.content.testimonials.title'),
        users: {
          teacher: {
            name: translate(lang, 'roulette.content.testimonials.users.teacher.name'),
            comment: translate(lang, 'roulette.content.testimonials.users.teacher.comment'),
          },
          team: {
            name: translate(lang, 'roulette.content.testimonials.users.team.name'),
            comment: translate(lang, 'roulette.content.testimonials.users.team.comment'),
          },
          family: {
            name: translate(lang, 'roulette.content.testimonials.users.family.name'),
            comment: translate(lang, 'roulette.content.testimonials.users.family.comment'),
          },
        },
      },
      features: {
        title: translate(lang, 'roulette.content.features.title'),
        items: {
          easy: {
            title: translate(lang, 'roulette.content.features.items.easy.title'),
            description: translate(lang, 'roulette.content.features.items.easy.description'),
          },
          fair: {
            title: translate(lang, 'roulette.content.features.items.fair.title'),
            description: translate(lang, 'roulette.content.features.items.fair.description'),
          },
          visual: {
            title: translate(lang, 'roulette.content.features.items.visual.title'),
            description: translate(lang, 'roulette.content.features.items.visual.description'),
          },
          free: {
            title: translate(lang, 'roulette.content.features.items.free.title'),
            description: translate(lang, 'roulette.content.features.items.free.description'),
          },
        },
      },
      faq: {
        title: translate(lang, 'roulette.content.faq.title'),
        questions: {
          what: {
            question: translate(lang, 'roulette.content.faq.questions.what.question'),
            answer: translate(lang, 'roulette.content.faq.questions.what.answer'),
          },
          usage: {
            question: translate(lang, 'roulette.content.faq.questions.usage.question'),
            answer: translate(lang, 'roulette.content.faq.questions.usage.answer'),
          },
          save: {
            question: translate(lang, 'roulette.content.faq.questions.save.question'),
            answer: translate(lang, 'roulette.content.faq.questions.save.answer'),
          },
          limit: {
            question: translate(lang, 'roulette.content.faq.questions.limit.question'),
            answer: translate(lang, 'roulette.content.faq.questions.limit.answer'),
          },
          mobile: {
            question: translate(lang, 'roulette.content.faq.questions.mobile.question'),
            answer: translate(lang, 'roulette.content.faq.questions.mobile.answer'),
          },
        },
      },
    },
  };

  return <RouletteClient translations={translations} />;
} 
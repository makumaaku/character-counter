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
      reset: translate(lang, 'roulette.buttons.reset'),
      save: translate(lang, 'roulette.buttons.save'),
      cancel: translate(lang, 'roulette.buttons.cancel'),
    },
    result: {
      selected: translate(lang, 'roulette.result.selected'),
      placeholder: translate(lang, 'roulette.result.placeholder'),
    },
  };

  return <RouletteClient translations={translations} />;
} 
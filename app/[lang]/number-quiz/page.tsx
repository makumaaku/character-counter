import { translate } from '@/lib/i18n/server';
import SudokuGame from './components/SudokuGame';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function NumberQuizPage({ params }: Props) {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{t('numberQuiz.game.title')}</h1>
        </div>
        <SudokuGame lang={lang} />
      </main>
    </div>
  );
} 
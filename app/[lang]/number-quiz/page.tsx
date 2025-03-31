import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, NumberQuizMessages } from '@/lib/i18n/types';
import SudokuGame from './components/SudokuGame';

type Props = {
  params: { lang: string }
}

export default async function NumberQuizPage({ params }: Props) {
  const lang = params.lang;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'number-quiz');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    gameTitle,
    difficultyLabel,
    easyDifficulty,
    normalDifficulty,
    hardDifficulty,
    newGameButton,
    checkSolutionButton,
    correctMessage,
    incorrectMessage,
    completeMessage
  ] = await Promise.all([
    translate(lang, 'numberQuiz.game.title'),
    translate(lang, 'numberQuiz.game.difficulty.label'),
    translate(lang, 'numberQuiz.game.difficulty.easy'),
    translate(lang, 'numberQuiz.game.difficulty.normal'),
    translate(lang, 'numberQuiz.game.difficulty.hard'),
    translate(lang, 'numberQuiz.game.buttons.newGame'),
    translate(lang, 'numberQuiz.game.buttons.checkSolution'),
    translate(lang, 'numberQuiz.game.messages.correct'),
    translate(lang, 'numberQuiz.game.messages.incorrect'),
    translate(lang, 'numberQuiz.game.messages.complete')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: NumberQuizMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title: "",
    game: {
      title: gameTitle,
      difficulty: {
        label: difficultyLabel,
        easy: easyDifficulty,
        normal: normalDifficulty,
        hard: hardDifficulty
      },
      buttons: {
        newGame: newGameButton,
        checkSolution: checkSolutionButton
      },
      messages: {
        correct: correctMessage,
        incorrect: incorrectMessage,
        complete: completeMessage
      }
    }
  };
  
  return (
    <div className="text-gray-100 font-sans max-w-4xl mx-auto px-4 pt-10">
      <SudokuGame messages={messages} />
    </div>
  );
} 
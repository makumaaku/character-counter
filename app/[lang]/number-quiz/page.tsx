import { translate, loadToolMessages, getLanguageFromParams } from '@/lib/i18n/server';
import { Language, NumberQuizMessages } from '@/lib/i18n/types';
import SudokuGame from './components/SudokuGame';
import SeoText, { SeoTextContent } from '@/components/SeoText';
import PageContainer from '@/components/PageContainer';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function NumberQuizPage({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
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
    completeMessage,
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
    translate(lang, 'numberQuiz.game.title'),
    translate(lang, 'numberQuiz.game.difficulty.label'),
    translate(lang, 'numberQuiz.game.difficulty.easy'),
    translate(lang, 'numberQuiz.game.difficulty.normal'),
    translate(lang, 'numberQuiz.game.difficulty.hard'),
    translate(lang, 'numberQuiz.game.buttons.newGame'),
    translate(lang, 'numberQuiz.game.buttons.checkSolution'),
    translate(lang, 'numberQuiz.game.messages.correct'),
    translate(lang, 'numberQuiz.game.messages.incorrect'),
    translate(lang, 'numberQuiz.game.messages.complete'),
    // SEOテキスト関連の翻訳
    translate(lang, 'numberQuiz.seoText.overview.title'),
    translate(lang, 'numberQuiz.seoText.overview.content'),
    translate(lang, 'numberQuiz.seoText.howTo.title'),
    translate(lang, 'numberQuiz.seoText.howTo.steps.0.title'),
    translate(lang, 'numberQuiz.seoText.howTo.steps.0.description'),
    translate(lang, 'numberQuiz.seoText.howTo.steps.1.title'),
    translate(lang, 'numberQuiz.seoText.howTo.steps.1.description'),
    translate(lang, 'numberQuiz.seoText.howTo.steps.2.title'),
    translate(lang, 'numberQuiz.seoText.howTo.steps.2.description'),
    translate(lang, 'numberQuiz.seoText.testimonials.title'),
    translate(lang, 'numberQuiz.seoText.testimonials.users.0.name'),
    translate(lang, 'numberQuiz.seoText.testimonials.users.0.comment'),
    translate(lang, 'numberQuiz.seoText.testimonials.users.1.name'),
    translate(lang, 'numberQuiz.seoText.testimonials.users.1.comment'),
    translate(lang, 'numberQuiz.seoText.testimonials.users.2.name'),
    translate(lang, 'numberQuiz.seoText.testimonials.users.2.comment'),
    translate(lang, 'numberQuiz.seoText.features.title'),
    translate(lang, 'numberQuiz.seoText.features.items.0.title'),
    translate(lang, 'numberQuiz.seoText.features.items.0.description'),
    translate(lang, 'numberQuiz.seoText.features.items.1.title'),
    translate(lang, 'numberQuiz.seoText.features.items.1.description'),
    translate(lang, 'numberQuiz.seoText.features.items.2.title'),
    translate(lang, 'numberQuiz.seoText.features.items.2.description'),
    translate(lang, 'numberQuiz.seoText.features.items.3.title'),
    translate(lang, 'numberQuiz.seoText.features.items.3.description'),
    translate(lang, 'numberQuiz.seoText.faq.title'),
    translate(lang, 'numberQuiz.seoText.faq.questions.0.question'),
    translate(lang, 'numberQuiz.seoText.faq.questions.0.answer'),
    translate(lang, 'numberQuiz.seoText.faq.questions.1.question'),
    translate(lang, 'numberQuiz.seoText.faq.questions.1.answer'),
    translate(lang, 'numberQuiz.seoText.faq.questions.2.question'),
    translate(lang, 'numberQuiz.seoText.faq.questions.2.answer'),
    translate(lang, 'numberQuiz.seoText.faq.questions.3.question'),
    translate(lang, 'numberQuiz.seoText.faq.questions.3.answer'),
    translate(lang, 'numberQuiz.seoText.faq.questions.4.question'),
    translate(lang, 'numberQuiz.seoText.faq.questions.4.answer')
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

  // SEOテキスト用のコンテンツを作成
  const seoTextContent: SeoTextContent = messages.seoText;
  
  return (
    <PageContainer>
      <div className="text-gray-100 font-sans max-w-4xl mx-auto px-4 pt-10">
        <SudokuGame messages={messages} />
        <SeoText content={seoTextContent} />
      </div>
    </PageContainer>
  );
} 
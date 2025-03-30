import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, CharacterCounterFaqMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function FAQPage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Language;
  
  // 翻訳をロード
  await loadToolMessages(lang, 'character-counter/faq');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    generalTitle,
    generalQ1Question,
    generalQ1Answer,
    generalQ2Question,
    generalQ2Intro,
    generalQ2Uses1,
    generalQ2Uses2,
    generalQ2Uses3,
    generalQ2Uses4,
    technicalTitle,
    technicalQ3Question,
    technicalQ3Answer,
    technicalQ4Question,
    technicalQ4Answer,
    featuresTitle,
    featuresQ5Question,
    featuresQ5Intro,
    featuresQ5Features1,
    featuresQ5Features2,
    featuresQ5Features3,
    featuresQ5Features4,
    featuresQ5Features5,
    featuresQ5Features6,
    featuresQ6Question,
    featuresQ6Answer,
    privacyTitle,
    privacyQ7Question,
    privacyQ7Answer,
    privacyQ8Question,
    privacyQ8Answer
  ] = await Promise.all([
    translate(lang, 'characterCounter.faq.title'),
    translate(lang, 'characterCounter.faq.general.title'),
    translate(lang, 'characterCounter.faq.general.q1.question'),
    translate(lang, 'characterCounter.faq.general.q1.answer'),
    translate(lang, 'characterCounter.faq.general.q2.question'),
    translate(lang, 'characterCounter.faq.general.q2.intro'),
    translate(lang, 'characterCounter.faq.general.q2.uses.1'),
    translate(lang, 'characterCounter.faq.general.q2.uses.2'),
    translate(lang, 'characterCounter.faq.general.q2.uses.3'),
    translate(lang, 'characterCounter.faq.general.q2.uses.4'),
    translate(lang, 'characterCounter.faq.technical.title'),
    translate(lang, 'characterCounter.faq.technical.q3.question'),
    translate(lang, 'characterCounter.faq.technical.q3.answer'),
    translate(lang, 'characterCounter.faq.technical.q4.question'),
    translate(lang, 'characterCounter.faq.technical.q4.answer'),
    translate(lang, 'characterCounter.faq.features.title'),
    translate(lang, 'characterCounter.faq.features.q5.question'),
    translate(lang, 'characterCounter.faq.features.q5.intro'),
    translate(lang, 'characterCounter.faq.features.q5.features.1'),
    translate(lang, 'characterCounter.faq.features.q5.features.2'),
    translate(lang, 'characterCounter.faq.features.q5.features.3'),
    translate(lang, 'characterCounter.faq.features.q5.features.4'),
    translate(lang, 'characterCounter.faq.features.q5.features.5'),
    translate(lang, 'characterCounter.faq.features.q5.features.6'),
    translate(lang, 'characterCounter.faq.features.q6.question'),
    translate(lang, 'characterCounter.faq.features.q6.answer'),
    translate(lang, 'characterCounter.faq.privacy.title'),
    translate(lang, 'characterCounter.faq.privacy.q7.question'),
    translate(lang, 'characterCounter.faq.privacy.q7.answer'),
    translate(lang, 'characterCounter.faq.privacy.q8.question'),
    translate(lang, 'characterCounter.faq.privacy.q8.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: CharacterCounterFaqMessages = {
    title,
    general: {
      title: generalTitle,
      q1: {
        question: generalQ1Question,
        answer: generalQ1Answer
      },
      q2: {
        question: generalQ2Question,
        intro: generalQ2Intro,
        uses: {
          1: generalQ2Uses1,
          2: generalQ2Uses2,
          3: generalQ2Uses3,
          4: generalQ2Uses4
        },
        answer: '' // 未使用フィールドだが型定義に含まれているため空文字を設定
      }
    },
    technical: {
      title: technicalTitle,
      q3: {
        question: technicalQ3Question,
        answer: technicalQ3Answer
      },
      q4: {
        question: technicalQ4Question,
        answer: technicalQ4Answer
      }
    },
    features: {
      title: featuresTitle,
      q5: {
        question: featuresQ5Question,
        intro: featuresQ5Intro,
        features: {
          1: featuresQ5Features1,
          2: featuresQ5Features2,
          3: featuresQ5Features3,
          4: featuresQ5Features4,
          5: featuresQ5Features5,
          6: featuresQ5Features6
        }
      },
      q6: {
        question: featuresQ6Question,
        answer: featuresQ6Answer
      }
    },
    privacy: {
      title: privacyTitle,
      q7: {
        question: privacyQ7Question,
        answer: privacyQ7Answer
      },
      q8: {
        question: privacyQ8Question,
        answer: privacyQ8Answer
      }
    },
    meta: {
      title: '',
      description: '',
      keywords: ''
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{messages.title}</h1>

        <div className="bg-gray-700 rounded-lg p-6 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">{messages.general.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.general.q1.question}</h3>
                <p className="text-gray-300 pl-4">
                  {messages.general.q1.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.general.q2.question}</h3>
                <p className="text-gray-300 pl-4">{messages.general.q2.intro}</p>
                <ul className="list-disc pl-10 text-gray-300">
                  <li>{messages.general.q2.uses[1]}</li>
                  <li>{messages.general.q2.uses[2]}</li>
                  <li>{messages.general.q2.uses[3]}</li>
                  <li>{messages.general.q2.uses[4]}</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.technical.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.technical.q3.question}</h3>
                <p className="text-gray-300 pl-4">
                  {messages.technical.q3.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.technical.q4.question}</h3>
                <p className="text-gray-300 pl-4">
                  {messages.technical.q4.answer}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.features.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.features.q5.question}</h3>
                <p className="text-gray-300 pl-4">{messages.features.q5.intro}</p>
                <ul className="list-disc pl-10 text-gray-300">
                  <li>{messages.features.q5.features[1]}</li>
                  <li>{messages.features.q5.features[2]}</li>
                  <li>{messages.features.q5.features[3]}</li>
                  <li>{messages.features.q5.features[4]}</li>
                  <li>{messages.features.q5.features[5]}</li>
                  <li>{messages.features.q5.features[6]}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.features.q6.question}</h3>
                <p className="text-gray-300 pl-4">
                  {messages.features.q6.answer}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.privacy.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.privacy.q7.question}</h3>
                <p className="text-gray-300 pl-4">
                  {messages.privacy.q7.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.privacy.q8.question}</h3>
                <p className="text-gray-300 pl-4">
                  {messages.privacy.q8.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
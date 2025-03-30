import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, CharacterCounterFunctionMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function FunctionPage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Language;
  
  // 翻訳をロード
  await loadToolMessages(lang, 'character-counter/function');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    keyFeaturesTitle,
    charCountTitle,
    charCountDescription,
    inputBoxTitle,
    inputBoxDescription,
    lineCountTitle,
    lineCountDescription,
    wordCountTitle,
    wordCountDescription,
    byteCountTitle,
    byteCountDescription,
    copyButtonTitle,
    copyButtonDescription,
    stringSearchTitle,
    stringSearchDescription,
    howToUseTitle,
    step1Title,
    step1Description,
    step2Title,
    step2Description,
    step3Title,
    step3Description
  ] = await Promise.all([
    translate(lang, 'characterCounter.function.title'),
    translate(lang, 'characterCounter.function.keyFeatures.title'),
    translate(lang, 'characterCounter.function.keyFeatures.charCount.title'),
    translate(lang, 'characterCounter.function.keyFeatures.charCount.description'),
    translate(lang, 'characterCounter.function.keyFeatures.inputBox.title'),
    translate(lang, 'characterCounter.function.keyFeatures.inputBox.description'),
    translate(lang, 'characterCounter.function.keyFeatures.lineCount.title'),
    translate(lang, 'characterCounter.function.keyFeatures.lineCount.description'),
    translate(lang, 'characterCounter.function.keyFeatures.wordCount.title'),
    translate(lang, 'characterCounter.function.keyFeatures.wordCount.description'),
    translate(lang, 'characterCounter.function.keyFeatures.byteCount.title'),
    translate(lang, 'characterCounter.function.keyFeatures.byteCount.description'),
    translate(lang, 'characterCounter.function.keyFeatures.copyButton.title'),
    translate(lang, 'characterCounter.function.keyFeatures.copyButton.description'),
    translate(lang, 'characterCounter.function.keyFeatures.stringSearch.title'),
    translate(lang, 'characterCounter.function.keyFeatures.stringSearch.description'),
    translate(lang, 'characterCounter.function.howToUse.title'),
    translate(lang, 'characterCounter.function.howToUse.step1.title'),
    translate(lang, 'characterCounter.function.howToUse.step1.description'),
    translate(lang, 'characterCounter.function.howToUse.step2.title'),
    translate(lang, 'characterCounter.function.howToUse.step2.description'),
    translate(lang, 'characterCounter.function.howToUse.step3.title'),
    translate(lang, 'characterCounter.function.howToUse.step3.description')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: CharacterCounterFunctionMessages = {
    title,
    keyFeatures: {
      title: keyFeaturesTitle,
      charCount: {
        title: charCountTitle,
        description: charCountDescription
      },
      inputBox: {
        title: inputBoxTitle,
        description: inputBoxDescription
      },
      lineCount: {
        title: lineCountTitle,
        description: lineCountDescription
      },
      wordCount: {
        title: wordCountTitle,
        description: wordCountDescription
      },
      byteCount: {
        title: byteCountTitle,
        description: byteCountDescription
      },
      copyButton: {
        title: copyButtonTitle,
        description: copyButtonDescription
      },
      stringSearch: {
        title: stringSearchTitle,
        description: stringSearchDescription
      }
    },
    howToUse: {
      title: howToUseTitle,
      step1: {
        title: step1Title,
        description: step1Description,
        text: ''
      },
      step2: {
        title: step2Title,
        description: step2Description,
        text: ''
      },
      step3: {
        title: step3Title,
        description: step3Description,
        text: ''
      }
    },
    meta: {
      title: '',
      description: '',
      keywords: '',
      howTo: {
        title: ''
      }
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{messages.title}</h1>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">{messages.keyFeatures.title}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.keyFeatures.charCount.title}</h3>
              <p className="text-gray-300">{messages.keyFeatures.charCount.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.keyFeatures.inputBox.title}</h3>
              <p className="text-gray-300">{messages.keyFeatures.inputBox.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.keyFeatures.lineCount.title}</h3>
              <p className="text-gray-300">{messages.keyFeatures.lineCount.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.keyFeatures.wordCount.title}</h3>
              <p className="text-gray-300">{messages.keyFeatures.wordCount.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.keyFeatures.byteCount.title}</h3>
              <p className="text-gray-300">{messages.keyFeatures.byteCount.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.keyFeatures.copyButton.title}</h3>
              <p className="text-gray-300">{messages.keyFeatures.copyButton.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.keyFeatures.stringSearch.title}</h3>
              <p className="text-gray-300">{messages.keyFeatures.stringSearch.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">{messages.howToUse.title}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.howToUse.step1.title}</h3>
              <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: messages.howToUse.step1.description }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.howToUse.step2.title}</h3>
              <p className="text-gray-300">{messages.howToUse.step2.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.howToUse.step3.title}</h3>
              <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: messages.howToUse.step3.description }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
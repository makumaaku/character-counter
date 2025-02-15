import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function FunctionPage(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{t('characterCounter.function.title')}</h1>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">{t('characterCounter.function.keyFeatures.title')}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.darkMode.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.darkMode.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.charCount.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.charCount.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.inputBox.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.inputBox.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.lineCount.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.lineCount.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.wordCount.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.wordCount.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.byteCount.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.byteCount.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.copyButton.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.copyButton.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.keyFeatures.stringSearch.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.keyFeatures.stringSearch.description')}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">{t('characterCounter.function.howToUse.title')}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.howToUse.step1.title')}</h3>
              <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('characterCounter.function.howToUse.step1.description') }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.howToUse.step2.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.function.howToUse.step2.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.function.howToUse.step3.title')}</h3>
              <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('characterCounter.function.howToUse.step3.description') }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function FAQPage(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{t('characterCounter.faq.title')}</h1>

        <div className="bg-gray-700 rounded-lg p-6 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.faq.general.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.general.q1.question')}</h3>
                <p className="text-gray-300 pl-4">
                  {t('characterCounter.faq.general.q1.answer')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.general.q2.question')}</h3>
                <p className="text-gray-300 pl-4">{t('characterCounter.faq.general.q2.intro')}</p>
                <ul className="list-disc pl-10 text-gray-300">
                  <li>{t('characterCounter.faq.general.q2.uses.1')}</li>
                  <li>{t('characterCounter.faq.general.q2.uses.2')}</li>
                  <li>{t('characterCounter.faq.general.q2.uses.3')}</li>
                  <li>{t('characterCounter.faq.general.q2.uses.4')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.faq.technical.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.technical.q3.question')}</h3>
                <p className="text-gray-300 pl-4">
                  {t('characterCounter.faq.technical.q3.answer')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.technical.q4.question')}</h3>
                <p className="text-gray-300 pl-4">
                  {t('characterCounter.faq.technical.q4.answer')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.faq.features.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.features.q5.question')}</h3>
                <p className="text-gray-300 pl-4">{t('characterCounter.faq.features.q5.intro')}</p>
                <ul className="list-disc pl-10 text-gray-300">
                  <li>{t('characterCounter.faq.features.q5.features.1')}</li>
                  <li>{t('characterCounter.faq.features.q5.features.2')}</li>
                  <li>{t('characterCounter.faq.features.q5.features.3')}</li>
                  <li>{t('characterCounter.faq.features.q5.features.4')}</li>
                  <li>{t('characterCounter.faq.features.q5.features.5')}</li>
                  <li>{t('characterCounter.faq.features.q5.features.6')}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.features.q6.question')}</h3>
                <p className="text-gray-300 pl-4">
                  {t('characterCounter.faq.features.q6.answer')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.faq.privacy.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.privacy.q7.question')}</h3>
                <p className="text-gray-300 pl-4">
                  {t('characterCounter.faq.privacy.q7.answer')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.faq.privacy.q8.question')}</h3>
                <p className="text-gray-300 pl-4">
                  {t('characterCounter.faq.privacy.q8.answer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
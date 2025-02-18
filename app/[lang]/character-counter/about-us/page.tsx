import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function AboutUsPage(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{t('characterCounter.aboutUs.title')}</h1>

        <div className="bg-gray-700 rounded-lg p-6 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.aboutUs.ourStory.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.aboutUs.ourStory.content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.aboutUs.ourMission.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.aboutUs.ourMission.intro')}
            </p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{t('characterCounter.aboutUs.ourMission.points.1')}</li>
              <li>{t('characterCounter.aboutUs.ourMission.points.2')}</li>
              <li>{t('characterCounter.aboutUs.ourMission.points.3')}</li>
              <li>{t('characterCounter.aboutUs.ourMission.points.4')}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.aboutUs.tool.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.aboutUs.tool.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{t('characterCounter.aboutUs.tool.features.1')}</li>
              <li>{t('characterCounter.aboutUs.tool.features.2')}</li>
              <li>{t('characterCounter.aboutUs.tool.features.3')}</li>
              <li>{t('characterCounter.aboutUs.tool.features.4')}</li>
              <li>{t('characterCounter.aboutUs.tool.features.5')}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.aboutUs.values.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.aboutUs.values.simplicity.title')}</h3>
                <p className="text-gray-300">
                  {t('characterCounter.aboutUs.values.simplicity.content')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.aboutUs.values.privacy.title')}</h3>
                <p className="text-gray-300">
                  {t('characterCounter.aboutUs.values.privacy.content')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.aboutUs.values.accessibility.title')}</h3>
                <p className="text-gray-300">
                  {t('characterCounter.aboutUs.values.accessibility.content')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.aboutUs.values.innovation.title')}</h3>
                <p className="text-gray-300">
                  {t('characterCounter.aboutUs.values.innovation.content')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.aboutUs.contact.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.aboutUs.contact.description')}
            </p>
            <div className="mt-4">
              <p className="text-gray-300">{t('characterCounter.aboutUs.contact.email')}: support@boring-tool.com</p>
              <p className="text-gray-300">{t('characterCounter.aboutUs.contact.twitter')}: @boring_tool</p>
              <p className="text-gray-300">{t('characterCounter.aboutUs.contact.github')}: github.com/boring-inc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
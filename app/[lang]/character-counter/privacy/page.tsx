import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PrivacyPage(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{t('characterCounter.privacy.title')}</h1>

        <div className="bg-gray-700 rounded-lg p-6 space-y-8">
          <div>
            <p className="text-gray-300">
              {t('characterCounter.privacy.introduction')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.collection.title')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.privacy.collection.text.title')}</h3>
                <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('characterCounter.privacy.collection.text.description') }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.privacy.collection.log.title')}</h3>
                <p className="text-gray-300">
                  {t('characterCounter.privacy.collection.log.intro')}
                </p>
                <ul className="list-disc pl-6 text-gray-300 mt-2">
                  <li>{t('characterCounter.privacy.collection.log.items.1')}</li>
                  <li>{t('characterCounter.privacy.collection.log.items.2')}</li>
                  <li>{t('characterCounter.privacy.collection.log.items.3')}</li>
                </ul>
                <p className="text-gray-300 mt-2">
                  {t('characterCounter.privacy.collection.log.purpose')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('characterCounter.privacy.collection.cookies.title')}</h3>
                <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('characterCounter.privacy.collection.cookies.description') }} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.usage.title')}</h2>
            <p className="text-gray-300">{t('characterCounter.privacy.usage.intro')}</p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{t('characterCounter.privacy.usage.purposes.1')}</li>
              <li>{t('characterCounter.privacy.usage.purposes.2')}</li>
              <li>{t('characterCounter.privacy.usage.purposes.3')}</li>
            </ul>
            <p className="text-gray-300 mt-2">
              {t('characterCounter.privacy.usage.note')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.sharing.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.privacy.sharing.intro')}
            </p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{t('characterCounter.privacy.sharing.cases.1')}</li>
              <li>{t('characterCounter.privacy.sharing.cases.2')}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.retention.title')}</h2>
            <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('characterCounter.privacy.retention.description') }} />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.children.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.privacy.children.description')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.security.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.privacy.security.description')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.changes.title')}</h2>
            <p className="text-gray-300">
              {t('characterCounter.privacy.changes.description')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{t('characterCounter.privacy.contact.title')}</h2>
            <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('characterCounter.privacy.contact.description') }} />
          </div>
        </div>
      </div>
    </div>
  );
} 
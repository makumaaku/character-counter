import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PlanPage(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{t('characterCounter.plan.title')}</h1>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <p className="text-gray-300 mb-8">
            {t('characterCounter.plan.description')}
          </p>

          <h2 className="text-xl font-bold mb-4">{t('characterCounter.plan.pricing.title')}</h2>
          <div className="space-y-2 mb-8">
            <p className="text-gray-300">{t('characterCounter.plan.pricing.free')}</p>
            <p className="text-gray-300">{t('characterCounter.plan.pricing.monthly')}</p>
            <p className="text-gray-300">{t('characterCounter.plan.pricing.annual')}</p>
          </div>

          <h2 className="text-xl font-bold mb-4">{t('characterCounter.plan.comparison.title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">{t('characterCounter.plan.comparison.feature')}</th>
                  <th className="text-center py-2">{t('characterCounter.plan.comparison.free')}</th>
                  <th className="text-center py-2">{t('characterCounter.plan.comparison.premium')}</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-600">
                  <td className="py-2">{t('characterCounter.plan.comparison.features.charCount')}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{t('characterCounter.plan.comparison.features.counts')}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{t('characterCounter.plan.comparison.features.search')}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{t('characterCounter.plan.comparison.features.darkMode')}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{t('characterCounter.plan.comparison.features.ads')}</td>
                  <td className="text-center">{t('characterCounter.plan.comparison.yes')}</td>
                  <td className="text-center">{t('characterCounter.plan.comparison.no')}</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{t('characterCounter.plan.comparison.features.export')}</td>
                  <td className="text-center">✕</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{t('characterCounter.plan.comparison.features.api')}</td>
                  <td className="text-center">✕</td>
                  <td className="text-center">◯</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold mb-6">{t('characterCounter.plan.premiumFeatures.title')}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.plan.premiumFeatures.basic.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.plan.premiumFeatures.basic.description')}</p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>{t('characterCounter.plan.premiumFeatures.basic.features.1')}</li>
                <li>{t('characterCounter.plan.premiumFeatures.basic.features.2')}</li>
                <li>{t('characterCounter.plan.premiumFeatures.basic.features.3')}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.plan.premiumFeatures.adFree.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.plan.premiumFeatures.adFree.description')}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.plan.premiumFeatures.export.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.plan.premiumFeatures.export.description')}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.plan.premiumFeatures.api.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.plan.premiumFeatures.api.description')}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-6">{t('characterCounter.plan.subscriptions.title')}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.plan.subscriptions.monthly.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.plan.subscriptions.monthly.description')}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{t('characterCounter.plan.subscriptions.annual.title')}</h3>
              <p className="text-gray-300">{t('characterCounter.plan.subscriptions.annual.description')}</p>
            </div>

            <p className="text-gray-300 mt-4">
              {t('characterCounter.plan.subscriptions.note')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, CharacterCounterPlanMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PlanPage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Language;
  
  // 翻訳をロード
  await loadToolMessages(lang, 'character-counter/plan');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    pricingTitle,
    pricingFree,
    pricingMonthly,
    pricingAnnual,
    comparisonTitle,
    comparisonFeature,
    comparisonFree,
    comparisonPremium,
    featuresCharCount,
    featuresCounts,
    featuresSearch,
    featuresDarkMode,
    featuresAds,
    featuresExport,
    featuresApi,
    comparisonYes,
    comparisonNo,
    premiumFeaturesTitle,
    basicTitle,
    basicDescription,
    basicFeature1,
    basicFeature2,
    basicFeature3,
    adFreeTitle,
    adFreeDescription,
    exportTitle,
    exportDescription,
    apiTitle,
    apiDescription,
    subscriptionsTitle,
    monthlyTitle,
    monthlyDescription,
    annualTitle,
    annualDescription,
    subscriptionsNote,
    metaTitle,
    metaDescription,
    metaKeywords,
    productDescription,
    offerFreeTitle,
    offerFreeDescription,
    offerMonthlyTitle,
    offerMonthlyDescription,
    offerAnnualTitle,
    offerAnnualDescription
  ] = await Promise.all([
    translate(lang, 'characterCounter.plan.title'),
    translate(lang, 'characterCounter.plan.description'),
    translate(lang, 'characterCounter.plan.pricing.title'),
    translate(lang, 'characterCounter.plan.pricing.free'),
    translate(lang, 'characterCounter.plan.pricing.monthly'),
    translate(lang, 'characterCounter.plan.pricing.annual'),
    translate(lang, 'characterCounter.plan.comparison.title'),
    translate(lang, 'characterCounter.plan.comparison.feature'),
    translate(lang, 'characterCounter.plan.comparison.free'),
    translate(lang, 'characterCounter.plan.comparison.premium'),
    translate(lang, 'characterCounter.plan.comparison.features.charCount'),
    translate(lang, 'characterCounter.plan.comparison.features.counts'),
    translate(lang, 'characterCounter.plan.comparison.features.search'),
    translate(lang, 'characterCounter.plan.comparison.features.darkMode'),
    translate(lang, 'characterCounter.plan.comparison.features.ads'),
    translate(lang, 'characterCounter.plan.comparison.features.export'),
    translate(lang, 'characterCounter.plan.comparison.features.api'),
    translate(lang, 'characterCounter.plan.comparison.yes'),
    translate(lang, 'characterCounter.plan.comparison.no'),
    translate(lang, 'characterCounter.plan.premiumFeatures.title'),
    translate(lang, 'characterCounter.plan.premiumFeatures.basic.title'),
    translate(lang, 'characterCounter.plan.premiumFeatures.basic.description'),
    translate(lang, 'characterCounter.plan.premiumFeatures.basic.features.1'),
    translate(lang, 'characterCounter.plan.premiumFeatures.basic.features.2'),
    translate(lang, 'characterCounter.plan.premiumFeatures.basic.features.3'),
    translate(lang, 'characterCounter.plan.premiumFeatures.adFree.title'),
    translate(lang, 'characterCounter.plan.premiumFeatures.adFree.description'),
    translate(lang, 'characterCounter.plan.premiumFeatures.export.title'),
    translate(lang, 'characterCounter.plan.premiumFeatures.export.description'),
    translate(lang, 'characterCounter.plan.premiumFeatures.api.title'),
    translate(lang, 'characterCounter.plan.premiumFeatures.api.description'),
    translate(lang, 'characterCounter.plan.subscriptions.title'),
    translate(lang, 'characterCounter.plan.subscriptions.monthly.title'),
    translate(lang, 'characterCounter.plan.subscriptions.monthly.description'),
    translate(lang, 'characterCounter.plan.subscriptions.annual.title'),
    translate(lang, 'characterCounter.plan.subscriptions.annual.description'),
    translate(lang, 'characterCounter.plan.subscriptions.note'),
    translate(lang, 'characterCounter.plan.meta.title'),
    translate(lang, 'characterCounter.plan.meta.description'),
    translate(lang, 'characterCounter.plan.meta.keywords'),
    translate(lang, 'characterCounter.plan.meta.product.description'),
    translate(lang, 'characterCounter.plan.meta.product.offers.free.name'),
    translate(lang, 'characterCounter.plan.meta.product.offers.free.description'),
    translate(lang, 'characterCounter.plan.meta.product.offers.monthly.name'),
    translate(lang, 'characterCounter.plan.meta.product.offers.monthly.description'),
    translate(lang, 'characterCounter.plan.meta.product.offers.annual.name'),
    translate(lang, 'characterCounter.plan.meta.product.offers.annual.description')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: CharacterCounterPlanMessages = {
    title,
    description,
    pricing: {
      title: pricingTitle,
      free: pricingFree,
      monthly: pricingMonthly,
      annual: pricingAnnual
    },
    comparison: {
      title: comparisonTitle,
      feature: comparisonFeature,
      free: comparisonFree,
      premium: comparisonPremium,
      yes: comparisonYes,
      no: comparisonNo,
      features: {
        charCount: featuresCharCount,
        counts: featuresCounts,
        search: featuresSearch,
        darkMode: featuresDarkMode,
        ads: featuresAds,
        export: featuresExport,
        api: featuresApi
      }
    },
    premiumFeatures: {
      title: premiumFeaturesTitle,
      basic: {
        title: basicTitle,
        description: basicDescription,
        features: {
          '1': basicFeature1,
          '2': basicFeature2,
          '3': basicFeature3
        }
      },
      adFree: {
        title: adFreeTitle,
        description: adFreeDescription
      },
      export: {
        title: exportTitle,
        description: exportDescription
      },
      api: {
        title: apiTitle,
        description: apiDescription
      }
    },
    subscriptions: {
      title: subscriptionsTitle,
      monthly: {
        title: monthlyTitle,
        description: monthlyDescription
      },
      annual: {
        title: annualTitle,
        description: annualDescription
      },
      note: subscriptionsNote
    },
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords,
      product: {
        description: productDescription,
        offers: {
          free: {
            name: offerFreeTitle,
            description: offerFreeDescription
          },
          monthly: {
            name: offerMonthlyTitle,
            description: offerMonthlyDescription
          },
          annual: {
            name: offerAnnualTitle,
            description: offerAnnualDescription
          }
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{messages.title}</h1>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <p className="text-gray-300 mb-8">
            {messages.description}
          </p>

          <h2 className="text-xl font-bold mb-4">{messages.pricing.title}</h2>
          <div className="space-y-2 mb-8">
            <p className="text-gray-300">{messages.pricing.free}</p>
            <p className="text-gray-300">{messages.pricing.monthly}</p>
            <p className="text-gray-300">{messages.pricing.annual}</p>
          </div>

          <h2 className="text-xl font-bold mb-4">{messages.comparison.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">{messages.comparison.feature}</th>
                  <th className="text-center py-2">{messages.comparison.free}</th>
                  <th className="text-center py-2">{messages.comparison.premium}</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-600">
                  <td className="py-2">{messages.comparison.features.charCount}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{messages.comparison.features.counts}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{messages.comparison.features.search}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{messages.comparison.features.darkMode}</td>
                  <td className="text-center">◯</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{messages.comparison.features.ads}</td>
                  <td className="text-center">{messages.comparison.yes}</td>
                  <td className="text-center">{messages.comparison.no}</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{messages.comparison.features.export}</td>
                  <td className="text-center">✕</td>
                  <td className="text-center">◯</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2">{messages.comparison.features.api}</td>
                  <td className="text-center">✕</td>
                  <td className="text-center">◯</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold mb-6">{messages.premiumFeatures.title}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.premiumFeatures.basic.title}</h3>
              <p className="text-gray-300">{messages.premiumFeatures.basic.description}</p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>{messages.premiumFeatures.basic.features['1']}</li>
                <li>{messages.premiumFeatures.basic.features['2']}</li>
                <li>{messages.premiumFeatures.basic.features['3']}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.premiumFeatures.adFree.title}</h3>
              <p className="text-gray-300">{messages.premiumFeatures.adFree.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.premiumFeatures.export.title}</h3>
              <p className="text-gray-300">{messages.premiumFeatures.export.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.premiumFeatures.api.title}</h3>
              <p className="text-gray-300">{messages.premiumFeatures.api.description}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-6">{messages.subscriptions.title}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.subscriptions.monthly.title}</h3>
              <p className="text-gray-300">{messages.subscriptions.monthly.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{messages.subscriptions.annual.title}</h3>
              <p className="text-gray-300">{messages.subscriptions.annual.description}</p>
            </div>

            <p className="text-gray-300 mt-4">
              {messages.subscriptions.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
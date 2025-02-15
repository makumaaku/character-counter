import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function UseCasePage(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <>
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">{t('characterCounter.usecase.title')}</h1>
          
          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">{t('characterCounter.usecase.subtitle')}</h2>
            <p className="text-gray-300 mb-8">{t('characterCounter.usecase.description')}</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4">{t('characterCounter.usecase.cases.writing.title')}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.writing.efficientArticle.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.writing.efficientArticle.description')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.writing.structure.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.writing.structure.description')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">{t('characterCounter.usecase.cases.social.title')}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.social.limits.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.social.limits.description')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.social.adCopy.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.social.adCopy.description')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">{t('characterCounter.usecase.cases.seo.title')}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.seo.content.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.seo.content.description')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.seo.structure.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.seo.structure.description')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">{t('characterCounter.usecase.cases.marketing.title')}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.marketing.brand.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.marketing.brand.description')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('characterCounter.usecase.cases.marketing.documents.title')}</h4>
                    <p className="text-gray-300">{t('characterCounter.usecase.cases.marketing.documents.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mt-8">{t('characterCounter.usecase.conclusion')}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">{t('characterCounter.usecase.testimonials.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{t('characterCounter.usecase.testimonials.users.1.name')}</h3>
                <p className="text-gray-300 pl-4">&ldquo;{t('characterCounter.usecase.testimonials.users.1.quote')}&rdquo;</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('characterCounter.usecase.testimonials.users.2.name')}</h3>
                <p className="text-gray-300 pl-4">&ldquo;{t('characterCounter.usecase.testimonials.users.2.quote')}&rdquo;</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('characterCounter.usecase.testimonials.users.3.name')}</h3>
                <p className="text-gray-300 pl-4">&ldquo;{t('characterCounter.usecase.testimonials.users.3.quote')}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
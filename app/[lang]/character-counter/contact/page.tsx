import { translate } from '@/lib/i18n/server'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ContactPage(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);
  return (
    <>
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">{t('characterCounter.contact.title')}</h1>

          <div className="bg-gray-700 rounded-lg p-6">
            <p className="text-gray-300 mb-8">
              {t('characterCounter.contact.description')}
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('characterCounter.contact.form.name.label')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('characterCounter.contact.form.name.placeholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('characterCounter.contact.form.email.label')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('characterCounter.contact.form.email.placeholder')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  {t('characterCounter.contact.form.subject.label')}
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">{t('characterCounter.contact.form.subject.placeholder')}</option>
                  <option value="general">{t('characterCounter.contact.form.subject.options.general')}</option>
                  <option value="technical">{t('characterCounter.contact.form.subject.options.technical')}</option>
                  <option value="billing">{t('characterCounter.contact.form.subject.options.billing')}</option>
                  <option value="feature">{t('characterCounter.contact.form.subject.options.feature')}</option>
                  <option value="other">{t('characterCounter.contact.form.subject.options.other')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('characterCounter.contact.form.message.label')}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('characterCounter.contact.form.message.placeholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                {t('characterCounter.contact.form.submit')}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-600">
              <h2 className="text-xl font-bold mb-4">{t('characterCounter.contact.otherWays.title')}</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="font-semibold">{t('characterCounter.contact.otherWays.email')}:</span> support@character-counter.com
                </p>
                <p>
                  <span className="font-semibold">{t('characterCounter.contact.otherWays.businessHours')}:</span> {t('characterCounter.contact.otherWays.businessHoursValue')}
                </p>
                <p>
                  {t('characterCounter.contact.otherWays.responseTime')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
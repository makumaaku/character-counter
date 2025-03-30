import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, CharacterCounterContactMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ContactPage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Language;
  
  // 翻訳をロード
  await loadToolMessages(lang, 'character-counter/contact');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    formNameLabel,
    formNamePlaceholder,
    formEmailLabel,
    formEmailPlaceholder,
    formSubjectLabel,
    formSubjectPlaceholder,
    formSubjectOptionGeneral,
    formSubjectOptionTechnical,
    formSubjectOptionBilling,
    formSubjectOptionFeature,
    formSubjectOptionOther,
    formMessageLabel,
    formMessagePlaceholder,
    formSubmit,
    otherWaysTitle,
    otherWaysEmail,
    otherWaysBusinessHours,
    otherWaysBusinessHoursValue,
    otherWaysResponseTime
  ] = await Promise.all([
    translate(lang, 'characterCounter.contact.title'),
    translate(lang, 'characterCounter.contact.description'),
    translate(lang, 'characterCounter.contact.form.name.label'),
    translate(lang, 'characterCounter.contact.form.name.placeholder'),
    translate(lang, 'characterCounter.contact.form.email.label'),
    translate(lang, 'characterCounter.contact.form.email.placeholder'),
    translate(lang, 'characterCounter.contact.form.subject.label'),
    translate(lang, 'characterCounter.contact.form.subject.placeholder'),
    translate(lang, 'characterCounter.contact.form.subject.options.general'),
    translate(lang, 'characterCounter.contact.form.subject.options.technical'),
    translate(lang, 'characterCounter.contact.form.subject.options.billing'),
    translate(lang, 'characterCounter.contact.form.subject.options.feature'),
    translate(lang, 'characterCounter.contact.form.subject.options.other'),
    translate(lang, 'characterCounter.contact.form.message.label'),
    translate(lang, 'characterCounter.contact.form.message.placeholder'),
    translate(lang, 'characterCounter.contact.form.submit'),
    translate(lang, 'characterCounter.contact.otherWays.title'),
    translate(lang, 'characterCounter.contact.otherWays.email'),
    translate(lang, 'characterCounter.contact.otherWays.businessHours'),
    translate(lang, 'characterCounter.contact.otherWays.businessHoursValue'),
    translate(lang, 'characterCounter.contact.otherWays.responseTime')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: CharacterCounterContactMessages = {
    title,
    description,
    form: {
      name: {
        label: formNameLabel,
        placeholder: formNamePlaceholder
      },
      email: {
        label: formEmailLabel,
        placeholder: formEmailPlaceholder
      },
      subject: {
        label: formSubjectLabel,
        placeholder: formSubjectPlaceholder,
        options: {
          general: formSubjectOptionGeneral,
          technical: formSubjectOptionTechnical,
          billing: formSubjectOptionBilling,
          feature: formSubjectOptionFeature,
          other: formSubjectOptionOther
        }
      },
      message: {
        label: formMessageLabel,
        placeholder: formMessagePlaceholder
      },
      submit: formSubmit
    },
    otherWays: {
      title: otherWaysTitle,
      email: otherWaysEmail,
      businessHours: otherWaysBusinessHours,
      businessHoursValue: otherWaysBusinessHoursValue,
      responseTime: otherWaysResponseTime
    },
    meta: {
      title: '',
      description: '',
      keywords: '',
      jsonLd: {
        name: '',
        description: '',
        organization: {
          name: '',
          email: '',
          availableLanguage: [],
          hoursAvailable: ''
        }
      }
    }
  };

  return (
    <>
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">{messages.title}</h1>

          <div className="bg-gray-700 rounded-lg p-6">
            <p className="text-gray-300 mb-8">
              {messages.description}
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {messages.form.name.label}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={messages.form.name.placeholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {messages.form.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={messages.form.email.placeholder}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  {messages.form.subject.label}
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">{messages.form.subject.placeholder}</option>
                  <option value="general">{messages.form.subject.options.general}</option>
                  <option value="technical">{messages.form.subject.options.technical}</option>
                  <option value="billing">{messages.form.subject.options.billing}</option>
                  <option value="feature">{messages.form.subject.options.feature}</option>
                  <option value="other">{messages.form.subject.options.other}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {messages.form.message.label}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={messages.form.message.placeholder}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                {messages.form.submit}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-600">
              <h2 className="text-xl font-bold mb-4">{messages.otherWays.title}</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="font-semibold">{messages.otherWays.email}:</span> support@character-counter.com
                </p>
                <p>
                  <span className="font-semibold">{messages.otherWays.businessHours}:</span> {messages.otherWays.businessHoursValue}
                </p>
                <p>
                  {messages.otherWays.responseTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
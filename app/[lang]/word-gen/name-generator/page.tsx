import { translate } from '@/lib/i18n/server'
import NameGeneratorClient from './components/NameGeneratorClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function NameGenerator({ params }: Props) {
  const { lang } = await params;
  
  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'nameGenerator.title')}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {translate(lang, 'nameGenerator.description')}
          </p>
          <NameGeneratorClient lang={lang} />
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">{translate(lang, 'nameGenerator.about.title')}</h2>
          <p className="mb-4">
            {translate(lang, 'nameGenerator.about.description')}
          </p>
          
          <h3 className="text-xl font-bold mb-4">{translate(lang, 'nameGenerator.useCases.title')}</h3>
          <ul className="list-disc pl-5 mb-6">
            <li>
              {translate(lang, 'nameGenerator.useCases.creative.title')}
              <p className="ml-5">{translate(lang, 'nameGenerator.useCases.creative.description')}</p>
            </li>
            <li>
              {translate(lang, 'nameGenerator.useCases.gaming.title')}
              <p className="ml-5">{translate(lang, 'nameGenerator.useCases.gaming.description')}</p>
            </li>
            <li>
              {translate(lang, 'nameGenerator.useCases.testing.title')}
              <p className="ml-5">{translate(lang, 'nameGenerator.useCases.testing.description')}</p>
            </li>
          </ul>

          <h3 className="text-xl font-bold mb-4">{translate(lang, 'nameGenerator.faq.title')}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">{translate(lang, 'nameGenerator.faq.q1.question')}</h4>
              <p className="ml-5">{translate(lang, 'nameGenerator.faq.q1.answer')}</p>
            </div>
            <div>
              <h4 className="font-bold">{translate(lang, 'nameGenerator.faq.q2.question')}</h4>
              <p className="ml-5">{translate(lang, 'nameGenerator.faq.q2.answer')}</p>
            </div>
            <div>
              <h4 className="font-bold">{translate(lang, 'nameGenerator.faq.q3.question')}</h4>
              <p className="ml-5">{translate(lang, 'nameGenerator.faq.q3.answer')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 
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
      </main>
    </div>
  )
} 
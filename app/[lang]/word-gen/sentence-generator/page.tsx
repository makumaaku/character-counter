import { translate } from '@/lib/i18n/server';
import SentenceGeneratorClient from './components/SentenceGeneratorClient';

type Props = {
  params: { lang: string }
}

export default function SentenceGenerator({ params: { lang } }: Props) {
  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'wordGen.tools.sentenceGenerator.title')}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {translate(lang, 'wordGen.tools.sentenceGenerator.description')}
          </p>
          <SentenceGeneratorClient lang={lang} />
        </div>
      </main>
    </div>
  );
} 
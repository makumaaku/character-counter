import { translate } from '@/lib/i18n/server';
import ClientSideKanjiGenerator from './components/ClientSideKanjiGenerator';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function JapaneseKanjiGenerator({ params }: Props) {
  const { lang } = await params;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            {t('japaneseKanjiGenerator.title')}
          </h1>
          <p className="text-xl text-gray-300">
            {t('japaneseKanjiGenerator.description')}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-8 shadow-xl">
          <ClientSideKanjiGenerator 
            generateButtonText={t('japaneseKanjiGenerator.generate.button')}
            loadingText={t('japaneseKanjiGenerator.generate.loading')}
            jpgButtonText={t('japaneseKanjiGenerator.download.jpg')}
            pngButtonText={t('japaneseKanjiGenerator.download.png')}
            copyButtonText={t('japaneseKanjiGenerator.copy.button')}
            copiedText={t('japaneseKanjiGenerator.copy.success')}
            noImageText={t('japaneseKanjiGenerator.display.noImage')}
            fontLoadingText={t('japaneseKanjiGenerator.font.loading')}
          />
        </div>
      </main>
    </div>
  );
} 
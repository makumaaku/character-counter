import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import ClientSideKanjiGenerator from './components/ClientSideKanjiGenerator';
import { Language, WordGenJapaneseKanjiGeneratorMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function JapaneseKanjiGenerator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/japanese-kanji-generator');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    generateButton,
    loadingText,
    downloadButton,
    jpgButton,
    pngButton,
    copyButton,
    copiedText,
    noImageText,
    fontLoadingText,
    errorGeneration,
    errorDownload
  ] = await Promise.all([
    translate(lang, 'wordGen.japaneseKanjiGenerator.title'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.description'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.generate.button'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.generate.loading'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.download.button'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.download.jpg'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.download.png'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.copy.button'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.copy.success'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.display.noImage'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.font.loading'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.error.generation'),
    translate(lang, 'wordGen.japaneseKanjiGenerator.error.download')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenJapaneseKanjiGeneratorMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    generate: {
      button: generateButton,
      loading: loadingText
    },
    download: {
      button: downloadButton,
      jpg: jpgButton,
      png: pngButton
    },
    copy: {
      button: copyButton,
      success: copiedText
    },
    display: {
      noImage: noImageText
    },
    font: {
      loading: fontLoadingText
    },
    error: {
      generation: errorGeneration,
      download: errorDownload
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen overflow-x-hidden">
      <main className="max-w-4xl mx-auto px-4 py-10 overflow-hidden">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-300">
            {description}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 sm:p-8 shadow-xl">
          <ClientSideKanjiGenerator messages={messages} />
        </div>
      </main>
    </div>
  );
} 
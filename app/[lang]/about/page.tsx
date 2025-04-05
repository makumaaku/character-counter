import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, AboutMessages } from '@/lib/i18n/types';
import AboutClient from './components/AboutClient';
import Header from '@/components/Header';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  
  // 会社概要用の翻訳をロード
  await loadToolMessages(lang as Language, 'about');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    content,
  ] = await Promise.all([
    translate(lang, 'about.title'),
    translate(lang, 'about.content'),
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: AboutMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    content
  };

  return (
    <>
      <Header title={title} homeLink={`/${lang}`} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AboutClient messages={messages} lang={lang}/>
      </main>
    </>
  );
} 
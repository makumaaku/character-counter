import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, ContactMessages } from '@/lib/i18n/types';
import ContactClient from './components/ContactClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  
  // お問い合わせ用の翻訳をロード
  await loadToolMessages(lang as Language, 'contact');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    content,
    submittingText
  ] = await Promise.all([
    translate(lang, 'contact.title'),
    translate(lang, 'contact.content'),
    translate(lang, 'common.form.submitting')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ContactMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    content: JSON.parse(content as string)
  };

  return (
    <>
      <Header title={title} homeLink={`/${lang}`} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ContactClient 
          messages={messages} 
          lang={lang} 
          submittingText={submittingText as string}
        />
      </main>
      <Footer />
    </>
  );
} 
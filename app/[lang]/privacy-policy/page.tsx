import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, PrivacyPolicyMessages } from '@/lib/i18n/types';
import PrivacyPolicyClient from './components/PrivacyPolicyClient';
import Header from '@/components/Header';

type Props = {
  params: { lang: string }
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { lang } = params;
  
  // プライバシーポリシー用の翻訳をロード
  await loadToolMessages(lang as Language, 'privacy-policy');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    content,
    updated,
    contactText
  ] = await Promise.all([
    translate(lang, 'privacyPolicy.title'),
    translate(lang, 'privacyPolicy.content'),
    translate(lang, 'privacyPolicy.updated'),
    translate(lang, 'common.footer.contact')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PrivacyPolicyMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    content: JSON.parse(content as string),
    updated
  };

  return (
    <>
      <Header title={title} homeLink={`/${lang}`} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <PrivacyPolicyClient 
          messages={messages} 
          lang={lang} 
          contactText={contactText as string}
        />
      </main>
    </>
  );
} 
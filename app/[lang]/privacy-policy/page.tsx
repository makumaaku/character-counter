import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, PrivacyPolicyMessages } from '@/lib/i18n/types';
import PrivacyPolicyClient from './components/PrivacyPolicyClient';
import Header from '@/components/Header';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { lang } = await params;
  
  // プライバシーポリシー用の翻訳をロード
  await loadToolMessages(lang as Language, 'privacy-policy');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    intro,
    collection,
    collectionText,
    usage,
    usageText,
    cookies,
    cookiesText,
    sharing,
    sharingText,
    external,
    externalText,
    contact,
    contactTextBefore,
    contactTextLink,
    contactTextAfter,
    policy,
    policyText,
    conclusion,
    conclusionText,
    updated
  ] = await Promise.all([
    translate(lang, 'privacyPolicy.title'),
    translate(lang, 'privacyPolicy.content.intro'),
    translate(lang, 'privacyPolicy.content.collection'),
    translate(lang, 'privacyPolicy.content.collectionText'),
    translate(lang, 'privacyPolicy.content.usage'),
    translate(lang, 'privacyPolicy.content.usageText'),
    translate(lang, 'privacyPolicy.content.cookies'),
    translate(lang, 'privacyPolicy.content.cookiesText'),
    translate(lang, 'privacyPolicy.content.sharing'),
    translate(lang, 'privacyPolicy.content.sharingText'),
    translate(lang, 'privacyPolicy.content.external'),
    translate(lang, 'privacyPolicy.content.externalText'),
    translate(lang, 'privacyPolicy.content.contact'),
    translate(lang, 'privacyPolicy.content.contactText.before'),
    translate(lang, 'privacyPolicy.content.contactText.link'),
    translate(lang, 'privacyPolicy.content.contactText.after'),
    translate(lang, 'privacyPolicy.content.policy'),
    translate(lang, 'privacyPolicy.content.policyText'),
    translate(lang, 'privacyPolicy.content.conclusion'),
    translate(lang, 'privacyPolicy.content.conclusionText'),
    translate(lang, 'privacyPolicy.updated')
  ]);

  // 配列アイテムを別々に取得
  const collectionItems = await Promise.all([
    translate(lang, 'privacyPolicy.content.collectionItems.0'),
    translate(lang, 'privacyPolicy.content.collectionItems.1'),
    translate(lang, 'privacyPolicy.content.collectionItems.2')
  ]);

  const usageItems = await Promise.all([
    translate(lang, 'privacyPolicy.content.usageItems.0'),
    translate(lang, 'privacyPolicy.content.usageItems.1'),
    translate(lang, 'privacyPolicy.content.usageItems.2')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PrivacyPolicyMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    content: {
      intro,
      collection,
      collectionText,
      collectionItems,
      usage,
      usageText,
      usageItems,
      cookies,
      cookiesText,
      sharing,
      sharingText,
      external,
      externalText,
      contact,
      contactText: {
        before: contactTextBefore,
        link: contactTextLink,
        after: contactTextAfter,
      },
      policy,
      policyText,
      conclusion,
      conclusionText
    },
    updated
  };

  return (
    <>
      <Header title={title} homeLink={`/${lang}`} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <PrivacyPolicyClient 
          messages={messages} 
          lang={lang} 
        />
      </main>
    </>
  );
} 
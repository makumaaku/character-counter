import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, ContactMessages } from '@/lib/i18n/types';
import ContactClient from './components/ContactClient';
import Header from '@/components/Header';

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
    metaTitle,
    metaDescription,
    metaKeywords,
    contentIntro,
    formName,
    formEmail,
    formSubject,
    formMessage,
    formSubmit,
    formNamePlaceholder,
    formEmailPlaceholder,
    formSubjectPlaceholder,
    formMessagePlaceholder,
    formSuccess,
    formError,
    infoTitle,
    infoEmail,
    infoHours,
    infoResponse,
    faqTitle,
    faqText,
    faqButton,
    submittingText,
    formRequiredFieldsError
  ] = await Promise.all([
    translate(lang, 'contact.title'),
    translate(lang, 'contact.meta.title'),
    translate(lang, 'contact.meta.description'),
    translate(lang, 'contact.meta.keywords'),
    translate(lang, 'contact.content.intro'),
    translate(lang, 'contact.content.form.name'),
    translate(lang, 'contact.content.form.email'),
    translate(lang, 'contact.content.form.subject'),
    translate(lang, 'contact.content.form.message'),
    translate(lang, 'contact.content.form.submit'),
    translate(lang, 'contact.content.form.namePlaceholder'),
    translate(lang, 'contact.content.form.emailPlaceholder'),
    translate(lang, 'contact.content.form.subjectPlaceholder'),
    translate(lang, 'contact.content.form.messagePlaceholder'),
    translate(lang, 'contact.content.form.success'),
    translate(lang, 'contact.content.form.error'),
    translate(lang, 'contact.content.info.title'),
    translate(lang, 'contact.content.info.email'),
    translate(lang, 'contact.content.info.hours'),
    translate(lang, 'contact.content.info.response'),
    translate(lang, 'contact.content.faq.title'),
    translate(lang, 'contact.content.faq.text'),
    translate(lang, 'contact.content.faq.button'),
    translate(lang, 'common.form.submitting'),
    translate(lang, 'contact.content.form.requiredFieldsError')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ContactMessages = {
    meta: {
      title: metaTitle as string,
      description: metaDescription as string,
      keywords: metaKeywords as string
    },
    title: title as string,
    content: {
      intro: contentIntro as string,
      form: {
        name: formName as string,
        email: formEmail as string,
        subject: formSubject as string,
        message: formMessage as string,
        submit: formSubmit as string,
        namePlaceholder: formNamePlaceholder as string,
        emailPlaceholder: formEmailPlaceholder as string,
        subjectPlaceholder: formSubjectPlaceholder as string,
        messagePlaceholder: formMessagePlaceholder as string,
        success: formSuccess as string,
        error: formError as string,
        requiredFieldsError: formRequiredFieldsError as string
      },
      info: {
        title: infoTitle as string,
        email: infoEmail as string,
        hours: infoHours as string,
        response: infoResponse as string
      },
      faq: {
        title: faqTitle as string,
        text: faqText as string,
        button: faqButton as string
      }
    }
  };

  return (
    <>
      <Header title={title as string} homeLink={`/${lang}`} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ContactClient 
          messages={messages} 
          submittingText={submittingText as string}
        />
      </main>
    </>
  );
} 
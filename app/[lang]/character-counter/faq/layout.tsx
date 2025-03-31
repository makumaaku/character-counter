import { SITE_CONFIG } from '@/constants/constants';
import { translate, loadToolMessages } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

type FAQQuestion = {
  question: string;
  answer: string;
}

type JsonLdType = {
  "@context": "https://schema.org";
  "@type": string;
  name: string;
  description: string;
  url: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
      width: number;
      height: number;
    };
  };
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'character-counter/faq');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    general_q1_question,
    general_q1_answer,
    general_q2_question,
    general_q2_answer,
    technical_q3_question,
    technical_q3_answer,
    technical_q4_question,
    technical_q4_answer,
  ] = await Promise.all([
    translate(lang, 'characterCounter.faq.meta.title'),
    translate(lang, 'characterCounter.faq.meta.description'),
    translate(lang, 'characterCounter.faq.meta.keywords'),
    translate(lang, 'characterCounter.faq.general.q1.question'),
    translate(lang, 'characterCounter.faq.general.q1.answer'),
    translate(lang, 'characterCounter.faq.general.q2.question'),
    translate(lang, 'characterCounter.faq.general.q2.answer'),
    translate(lang, 'characterCounter.faq.technical.q3.question'),
    translate(lang, 'characterCounter.faq.technical.q3.answer'),
    translate(lang, 'characterCounter.faq.technical.q4.question'),
    translate(lang, 'characterCounter.faq.technical.q4.answer'),
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  // Get FAQ questions from translations
  const questions: FAQQuestion[] = [
    {
      question: general_q1_question,
      answer: general_q1_answer
    },
    {
      question: general_q2_question,
      answer: general_q2_answer
    },
    {
      question: technical_q3_question,
      answer: technical_q3_answer
    },
    {
      question: technical_q4_question,
      answer: technical_q4_answer
    }
  ];

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/faq`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "mainEntity": questions.map((question) => ({
      "@type": "Question",
      "name": question.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": question.answer
      }
    }))
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/faq`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 
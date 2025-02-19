import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  params: { lang: string }
}

type FAQQuestion = {
  question: string;
  answer: string;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  // Get FAQ questions from translations
  const questions: FAQQuestion[] = [
    {
      question: t('characterCounter.faq.general.q1.question'),
      answer: t('characterCounter.faq.general.q1.answer')
    },
    {
      question: t('characterCounter.faq.general.q2.question'),
      answer: t('characterCounter.faq.general.q2.answer')
    },
    {
      question: t('characterCounter.faq.technical.q3.question'),
      answer: t('characterCounter.faq.technical.q3.answer')
    },
    {
      question: t('characterCounter.faq.technical.q4.question'),
      answer: t('characterCounter.faq.technical.q4.answer')
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": t('characterCounter.faq.meta.title'),
    "description": t('characterCounter.faq.meta.description'),
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
      title: t('characterCounter.faq.meta.title'),
      description: t('characterCounter.faq.meta.description'),
      keywords: t('characterCounter.faq.meta.keywords'),
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
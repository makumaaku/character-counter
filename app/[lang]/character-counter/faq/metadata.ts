import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": t('characterCounter.faq.meta.title'),
    "description": t('characterCounter.faq.meta.description'),
    "url": `https://boring-tool.com/${lang}/character-counter/faq`,
    "publisher": {
      "@type": "Organization",
      "name": "Boring Tool",
      "url": "https://boring-tool.com"
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('characterCounter.faq.general.q1.question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('characterCounter.faq.general.q1.answer')
        }
      },
      {
        "@type": "Question",
        "name": t('characterCounter.faq.general.q2.question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('characterCounter.faq.general.q2.answer')
        }
      },
      {
        "@type": "Question",
        "name": t('characterCounter.faq.technical.q3.question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('characterCounter.faq.technical.q3.answer')
        }
      },
      {
        "@type": "Question",
        "name": t('characterCounter.faq.technical.q4.question'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('characterCounter.faq.technical.q4.answer')
        }
      }
    ]
  };

  return {
    title: t('characterCounter.faq.meta.title'),
    description: t('characterCounter.faq.meta.description'),
    openGraph: {
      title: t('characterCounter.faq.meta.title'),
      description: t('characterCounter.faq.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/faq`,
      type: 'article',
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/faq`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/faq',
        'ja': 'https://boring-tool.com/ja/character-counter/faq',
      }
    },
    keywords: t('characterCounter.faq.meta.keywords'),
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
} 
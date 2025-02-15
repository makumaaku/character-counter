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
    "@type": "WebPage",
    "name": t('characterCounter.function.meta.title'),
    "description": t('characterCounter.function.meta.description'),
    "url": `https://boring-tool.com/${lang}/character-counter/function`,
    "publisher": {
      "@type": "Organization",
      "name": "Boring Tool",
      "url": "https://boring-tool.com"
    },
    "mainEntity": {
      "@type": "HowTo",
      "name": t('characterCounter.function.meta.howTo.title'),
      "step": [
        {
          "@type": "HowToStep",
          "name": t('characterCounter.function.howToUse.step1.title'),
          "text": t('characterCounter.function.howToUse.step1.text')
        },
        {
          "@type": "HowToStep",
          "name": t('characterCounter.function.howToUse.step2.title'),
          "text": t('characterCounter.function.howToUse.step2.text')
        },
        {
          "@type": "HowToStep",
          "name": t('characterCounter.function.howToUse.step3.title'),
          "text": t('characterCounter.function.howToUse.step3.text')
        }
      ]
    }
  };

  return {
    title: t('characterCounter.function.meta.title'),
    description: t('characterCounter.function.meta.description'),
    openGraph: {
      title: t('characterCounter.function.meta.title'),
      description: t('characterCounter.function.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/function`,
      type: 'article',
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/function`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/function',
        'ja': 'https://boring-tool.com/ja/character-counter/function',
      }
    },
    keywords: t('characterCounter.function.meta.keywords'),
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
} 
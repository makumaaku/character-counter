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

  return {
    title: t('characterCounter.contact.meta.title'),
    description: t('characterCounter.contact.meta.description'),
    openGraph: {
      title: t('characterCounter.contact.meta.title'),
      description: t('characterCounter.contact.meta.description'),
      url: `https://boring-tool.com/${lang}/character-counter/contact`,
      type: 'website',
    },
    alternates: {
      canonical: `https://boring-tool.com/${lang}/character-counter/contact`,
      languages: {
        'en': 'https://boring-tool.com/en/character-counter/contact',
        'ja': 'https://boring-tool.com/ja/character-counter/contact',
      }
    },
    keywords: t('characterCounter.contact.meta.keywords')
  };
} 
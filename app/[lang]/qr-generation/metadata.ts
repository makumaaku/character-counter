import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = (key: string) => translate(params.lang, key);

  return {
    title: t('qrGeneration.meta.title'),
    description: t('qrGeneration.meta.description'),
    openGraph: {
      title: t('qrGeneration.meta.title'),
      description: t('qrGeneration.meta.description'),
      url: `https://boring-tool.com/${params.lang}/qr-generation`,
      type: 'website',
    },
    alternates: {
      canonical: `https://boring-tool.com/${params.lang}/qr-generation`,
      languages: {
        en: 'https://boring-tool.com/en/qr-generation',
        ja: 'https://boring-tool.com/ja/qr-generation',
      },
    },
  };
} 
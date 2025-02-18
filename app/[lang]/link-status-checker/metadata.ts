import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

type Props = {
  params: { lang: Promise<string> }
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const resolvedLang = await lang;
  const t = (key: string) => translate(resolvedLang, key);

  return {
    title: t('link-status-checker.meta.title'),
    description: t('link-status-checker.meta.description'),
    openGraph: {
      title: t('link-status-checker.meta.title'),
      description: t('link-status-checker.meta.description'),
      url: `https://boring-tool.com/${resolvedLang}/link-status-checker`,
      type: 'website',
    },
    alternates: {
      canonical: `https://boring-tool.com/${resolvedLang}/link-status-checker`,
      languages: {
        'en': 'https://boring-tool.com/en/link-status-checker',
        'ja': 'https://boring-tool.com/ja/link-status-checker',
      },
    },
    other: {
      script: [JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: t('link-status-checker.meta.title'),
        description: t('link-status-checker.meta.description'),
        url: `https://boring-tool.com/${resolvedLang}/link-status-checker`,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        publisher: {
          '@type': 'Organization',
          name: t('common.meta.siteName'),
          url: 'https://boring-tool.com'
        },
        isAccessibleForFree: true
      })]
    }
  };
} 
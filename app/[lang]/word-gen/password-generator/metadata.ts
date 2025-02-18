import { translate } from '@/lib/i18n/server';
import { Metadata } from 'next';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Secure Password Generator - Boring Tool',
  description: 'Generate strong, secure, and customizable passwords instantly with our free online password generator. Perfect for creating unique passwords for your accounts and applications.',
  url: 'https://boring-tool.com/word-gen/password-generator',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Boring Tool',
    url: 'https://boring-tool.com'
  },
  featureList: [
    'Customizable password length (4-128 characters)',
    'Character type selection (uppercase, lowercase, numbers, symbols)',
    'One-click copy functionality',
    'Secure random password generation',
    'Password strength indicator',
    'Dark mode support',
    'Free to use',
    'No registration required'
  ],
  isAccessibleForFree: true,
  browserRequirements: 'Requires a modern web browser with JavaScript enabled'
};

export async function generateMetadata(
  { params }: { params: { lang: string } }
): Promise<Metadata> {
  const title = translate(params.lang, 'passwordGenerator.meta.title');
  const description = translate(params.lang, 'passwordGenerator.meta.description');
  const keywords = translate(params.lang, 'passwordGenerator.meta.keywords');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://boring-tool.com/${params.lang}/word-gen/password-generator`,
      type: 'website',
    },
    alternates: {
      canonical: `https://boring-tool.com/${params.lang}/word-gen/password-generator`,
      languages: {
        'en': 'https://boring-tool.com/en/word-gen/password-generator',
        'ja': 'https://boring-tool.com/ja/word-gen/password-generator',
      },
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
} 
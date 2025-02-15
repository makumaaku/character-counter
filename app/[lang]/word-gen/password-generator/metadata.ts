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

export const metadata: Metadata = {
  title: 'Secure Password Generator - Boring Tool',
  description: 'Generate strong, secure, and customizable passwords instantly with our free online password generator. Perfect for creating unique passwords for your accounts and applications.',
  openGraph: {
    title: 'Secure Password Generator - Boring Tool',
    description: 'Generate strong, secure, and customizable passwords instantly with our free online password generator. Perfect for creating unique passwords for your accounts and applications.',
    url: 'https://boring-tool.com/word-gen/password-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/word-gen/password-generator'
  },
  keywords: 'password generator, secure password, strong password, random password, password security, password tool',
  other: {
    'application/ld+json': JSON.stringify(jsonLd)
  }
}; 
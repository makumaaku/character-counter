import { Metadata } from 'next';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Random Word Generator - Boring Tool',
  description: 'Generate random words instantly with our free online word generator tool. Perfect for brainstorming, creative writing, and language learning.',
  url: 'https://boring-tool.com/word-gen/word-generator',
  applicationCategory: 'UtilityApplication',
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
    'Generate 1-100 random words',
    'Instant word generation',
    'Copy to clipboard functionality',
    'Customizable word count',
    'Dark mode support',
    'Free to use',
    'No registration required'
  ],
  isAccessibleForFree: true,
  browserRequirements: 'Requires a modern web browser with JavaScript enabled'
};

export const metadata: Metadata = {
  title: 'Random Word Generator - Boring Tool',
  description: 'Generate random words instantly with our free online word generator tool. Perfect for brainstorming, creative writing, and language learning. Create unique words with customizable patterns.',
  openGraph: {
    title: 'Random Word Generator - Boring Tool',
    description: 'Generate random words instantly with our free online word generator tool. Perfect for brainstorming, creative writing, and language learning. Create unique words with customizable patterns.',
    url: 'https://boring-tool.com/word-gen/word-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/word-gen/word-generator'
  },
  keywords: 'word generator, random words, creative writing, brainstorming, vocabulary building, language learning, writing tool',
  other: {
    'application/ld+json': JSON.stringify(jsonLd)
  }
}; 
import { Metadata } from 'next';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Sentence Generator - Boring Tool',
  description: 'Generate random sentences with customizable structure using our free online sentence generator. Perfect for language learning, writing practice, and content creation.',
  url: 'https://boring-tool.com/word-gen/sentence-generator',
  applicationCategory: 'EducationalApplication',
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
    'Multiple sentence types (Simple, Literary, Joke)',
    'Instant sentence generation',
    'Copy to clipboard functionality',
    'Dark mode support',
    'Free to use',
    'No registration required'
  ],
  isAccessibleForFree: true,
  browserRequirements: 'Requires a modern web browser with JavaScript enabled'
};

export const metadata: Metadata = {
  title: 'Sentence Generator - Boring Tool',
  description: 'Generate random sentences with customizable structure using our free online sentence generator. Perfect for language learning, writing practice, and content creation.',
  openGraph: {
    title: 'Sentence Generator - Boring Tool',
    description: 'Generate random sentences with customizable structure using our free online sentence generator. Perfect for language learning, writing practice, and content creation.',
    url: 'https://boring-tool.com/word-gen/sentence-generator',
    type: 'website',
  },
  keywords: 'sentence generator, random sentence, writing tool, creative writing, content creation',
  alternates: {
    canonical: 'https://boring-tool.com/word-gen/sentence-generator'
  },
  other: {
    'application/ld+json': JSON.stringify(jsonLd)
  }
}; 
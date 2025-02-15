import { Metadata } from 'next';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Random Name Generator - Boring Tool',
  description: 'Free online random name generator tool. Generate unique names for characters, stories, games, and testing. Easy to use and no registration required.',
  url: 'https://boring-tool.com/word-gen/name-generator',
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
    'Random name generation',
    'Male and female names',
    'Real first and last names',
    'Free to use',
    'No registration required'
  ],
  isAccessibleForFree: true
};

export const metadata: Metadata = {
  title: 'Random Name Generator - Boring Tool',
  description: 'Free online random name generator tool. Generate unique names for characters, stories, games, and testing. Easy to use and no registration required.',
  openGraph: {
    title: 'Random Name Generator - Boring Tool',
    description: 'Free online random name generator tool. Generate unique names for characters, stories, games, and testing. Easy to use and no registration required.',
    url: 'https://boring-tool.com/word-gen/name-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/word-gen/name-generator',
  },
  keywords: 'name generator, random name, character names, story names, game names, test data',
  other: {
    'application/ld+json': JSON.stringify(jsonLd)
  }
}; 
import { Metadata } from 'next';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Character Counter Blog',
  description: 'Articles about text analysis, character counting tips, and content creation best practices',
  url: 'https://boring-tool.com/character-counter/column',
  publisher: {
    '@type': 'Organization',
    name: 'Boring Tool',
    url: 'https://boring-tool.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://boring-tool.com/boring_logo.png',
      width: 286,
      height: 286
    }
  },
  inLanguage: 'en',
  isAccessibleForFree: true
};

export const metadata: Metadata = {
  title: 'Character Counter Blog - Tips & Guides | Text Analysis Articles',
  description: 'Read our collection of articles about text analysis, character counting tips, and best practices for content creation. Learn how to optimize your writing with our guides.',
  keywords: 'character counter blog, text analysis tips, content writing guide, word count articles, writing optimization',
  openGraph: {
    title: 'Character Counter Blog - Tips & Guides | Text Analysis Articles',
    description: 'Read our collection of articles about text analysis, character counting tips, and best practices for content creation. Learn how to optimize your writing with our guides.',
    url: 'https://boring-tool.com/character-counter/column',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/column'
  },
  other: {
    'application/ld+json': JSON.stringify(jsonLd)
  }
}; 
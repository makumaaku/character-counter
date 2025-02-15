import { Metadata } from 'next';

export const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Word Generation Tools - Boring Tool",
  "description": "Collection of free word generation tools including name generator, password generator, story generator, and more. Simple and easy to use tools for all your word generation needs.",
  "url": "https://boring-tool.com/word-gen",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Word Generator",
    "Name Generator",
    "Password Generator",
    "Story Generator",
    "Sentence Generator",
    "Word Card Generator",
    "Dark mode support",
    "Free to use",
    "No registration required"
  ],
  "isAccessibleForFree": true,
  "browserRequirements": "Requires a modern web browser with JavaScript enabled"
};

export const metadata: Metadata = {
  title: 'Word Generation Tools - Boring Tool',
  description: 'Collection of free word generation tools including name generator, password generator, story generator, and more. Simple and easy to use tools for all your word generation needs.',
  openGraph: {
    title: 'Word Generation Tools - Boring Tool',
    description: 'Collection of free word generation tools including name generator, password generator, story generator, and more. Simple and easy to use tools for all your word generation needs.',
    url: 'https://boring-tool.com/word-gen',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/word-gen'
  }
} 
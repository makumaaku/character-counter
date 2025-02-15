import { Metadata } from 'next';

export const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Card Generator - Boring Tool",
  "description": "Create flashcards and word cards instantly with our free online word card generator. Perfect for language learning, vocabulary practice, and educational purposes.",
  "url": "https://boring-tool.com/word-gen/word-card-generator",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  },
  "featureList": [
    "Generate 1-100 word cards",
    "Word length information",
    "Word category information",
    "Customizable card count",
    "Dark mode support",
    "Free to use",
    "No registration required"
  ],
  "isAccessibleForFree": true,
  "browserRequirements": "Requires a modern web browser with JavaScript enabled"
};

export const metadata: Metadata = {
  title: 'Word Card Generator - Boring Tool',
  description: 'Create flashcards and word cards instantly with our free online word card generator. Perfect for language learning, vocabulary practice, and educational purposes.',
  openGraph: {
    title: 'Word Card Generator - Boring Tool',
    description: 'Create flashcards and word cards instantly with our free online word card generator. Perfect for language learning, vocabulary practice, and educational purposes.',
    url: 'https://boring-tool.com/word-gen/word-card-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/word-gen/word-card-generator'
  },
  keywords: 'word cards, vocabulary learning, language teaching, ESL, EFL, education, learning tool, word generator, flashcards'
} 
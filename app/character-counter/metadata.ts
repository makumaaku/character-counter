import { Metadata } from 'next';

 const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Character Counter | easy to use , free to use",
  "description": "Instantly count characters, lines, and bytes. A free tool perfect for SNS posts and article writing.",
  "url": "https://boring-tool.com/character-counter",
  "applicationCategory": "UtilityApplication",
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
    "Real-time character counting",
    "Line counting",
    "Word counting",
    "Byte counting",
    "Search text functionality",
    "Copy to clipboard",
    "Dark mode support",
    "Free to use",
    "No registration required",
    "Multi-language support",
    "Full-width and half-width character support"
  ],
  "isAccessibleForFree": true,
  "browserRequirements": "Requires a modern web browser with JavaScript enabled"
};

export const metadata: Metadata = {
  title: 'Character Counter | easy to use , free to use',
  description: 'Instantly count characters, lines, and bytes. A free tool perfect for SNS posts and article writing.',
  openGraph: {
    title: 'Character Counter | easy to use , free to use',
    description: 'Instantly count characters, lines, and bytes. A free tool perfect for SNS posts and article writing.',
    url: 'https://boring-tool.com/character-counter',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter'
  },
  keywords: 'character counter, word counter, line counter, text analysis, SNS tool, writing tool, byte counter, text editor, online tool',
  other: {
    'application/ld+json': JSON.stringify(jsonLdData)
  }
}; 
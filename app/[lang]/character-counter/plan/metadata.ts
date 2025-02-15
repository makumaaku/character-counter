import { Metadata } from 'next';

 const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Plans & Pricing - Character Counter Tool",
  "description": "Explore our character counter tool plans and pricing. All features are currently available for free, with no registration required.",
  "url": "https://boring-tool.com/character-counter/plan",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  },
  "mainEntity": {
    "@type": "Product",
    "name": "Character Counter Tool",
    "description": "A comprehensive text analysis tool with character counting, word counting, and more features",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "features": [
      "Real-time character counting",
      "Word counting",
      "Line counting",
      "Byte counting",
      "Search functionality",
      "Dark mode support"
    ]
  }
};

export const metadata: Metadata = {
  title: 'Plans & Pricing - Character Counter Tool',
  description: 'Explore our character counter tool plans and pricing. All features are currently available for free, with no registration required.',
  openGraph: {
    title: 'Plans & Pricing - Character Counter Tool',
    description: 'Explore our character counter tool plans and pricing. All features are currently available for free, with no registration required.',
    url: 'https://boring-tool.com/character-counter/plan',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/plan'
  },
  keywords: 'character counter pricing, text analysis plans, free text counter, online tool pricing, character count features',
  other: {
    'application/ld+json': JSON.stringify(jsonLdData)
  }
}; 
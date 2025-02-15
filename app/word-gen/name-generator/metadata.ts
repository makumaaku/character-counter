import { Metadata } from 'next';

export const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random Name Generator - Boring Tool",
  "description": "Generate random full names with our free online name generator tool. Perfect for writers, game developers, and creative projects.",
  "url": "https://boring-tool.com/word-gen/name-generator",
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
    "Random name generation",
    "Male and female names",
    "Realistic full names",
    "Copy to clipboard functionality",
    "Dark mode support",
    "Free to use",
    "No registration required"
  ],
  "isAccessibleForFree": true,
  "browserRequirements": "Requires a modern web browser with JavaScript enabled"
};

export const metadata: Metadata = {
  title: 'Random Name Generator - Boring Tool',
  description: 'Generate random full names with our free online name generator tool. Perfect for writers, game developers, and creative projects. Create unique character names instantly.',
  openGraph: {
    title: 'Random Name Generator - Boring Tool',
    description: 'Generate random full names with our free online name generator tool. Perfect for writers, game developers, and creative projects. Create unique character names instantly.',
    url: 'https://boring-tool.com/word-gen/name-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/word-gen/name-generator'
  }
} 
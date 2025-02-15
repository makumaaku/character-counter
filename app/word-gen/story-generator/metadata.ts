import { Metadata } from 'next';

export const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Story Generator - Boring Tool",
  "description": "Generate creative story ideas and plot prompts instantly with our free online story generator. Perfect for writers, students, and creative professionals.",
  "url": "https://boring-tool.com/word-gen/story-generator",
  "applicationCategory": "CreativeApplication",
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
    "Instant story generation",
    "Unique character combinations",
    "Creative plot twists",
    "Memorable endings",
    "Copy to clipboard functionality",
    "Dark mode support",
    "Free to use"
  ],
  "isAccessibleForFree": true,
  "browserRequirements": "Requires a modern web browser with JavaScript enabled"
};

export const metadata: Metadata = {
  title: 'Story Generator - Boring Tool',
  description: 'Generate creative story ideas and plot prompts instantly with our free online story generator. Perfect for writers, students, and creative professionals looking for inspiration.',
  openGraph: {
    title: 'Story Generator - Boring Tool',
    description: 'Generate creative story ideas and plot prompts instantly with our free online story generator. Perfect for writers, students, and creative professionals looking for inspiration.',
    url: 'https://boring-tool.com/word-gen/story-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/word-gen/story-generator'
  },
  keywords: 'story generator, plot generator, creative writing, story ideas, writing prompts, story plots, creative inspiration'
} 
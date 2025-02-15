import { Metadata } from 'next';

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Us - Character Counter Tool | Our Story & Mission",
  "description": "Learn about the team behind the Character Counter Tool. Discover our mission to provide simple, efficient, and free text analysis tools for everyone.",
  "url": "https://boring-tool.com/character-counter/about-us",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com",
    "description": "We create simple, efficient, and free online tools to help people with their daily tasks.",
    "foundingDate": "2023",
    "sameAs": [
      "https://github.com/boring-inc",
      "https://twitter.com/boring_tool"
    ]
  },
  "mainEntity": {
    "@type": "Article",
    "headline": "About Boring Tool's Character Counter",
    "description": "Our character counter tool is designed to be simple, efficient, and free for everyone. We focus on providing accurate text analysis with real-time results.",
    "articleBody": "At Boring Tool, we believe in creating simple yet powerful tools that make everyday tasks easier. Our character counter is built with modern technology to provide instant, accurate results while maintaining user privacy and data security."
  }
};

export const metadata: Metadata = {
  title: 'About Us - Character Counter Tool | Our Story & Mission',
  description: 'Learn about the team behind the Character Counter Tool. Discover our mission to provide simple, efficient, and free text analysis tools for everyone.',
  openGraph: {
    title: 'About Us - Character Counter Tool | Our Story & Mission',
    description: 'Learn about the team behind the Character Counter Tool. Discover our mission to provide simple, efficient, and free text analysis tools for everyone.',
    url: 'https://boring-tool.com/character-counter/about-us',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/about-us'
  },
  keywords: 'character counter about, text analysis team, boring tool company, online tools developer, text counter mission',
  other: {
    'application/ld+json': JSON.stringify(jsonLd)
  }
}; 
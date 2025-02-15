import { Metadata } from 'next';

 const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Use Cases - Character Counter Tool | Text Analysis Examples",
  "description": "Explore various use cases of our character counter tool. Perfect for social media posts, SEO content, academic writing, and more. Learn how to effectively use text analysis features.",
  "url": "https://boring-tool.com/character-counter/usecase",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Social Media Content",
        "description": "Optimize your posts for various social media platforms by ensuring they meet character limits"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "SEO Content Writing",
        "description": "Create SEO-optimized content by monitoring character counts for meta descriptions and titles"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Academic Writing",
        "description": "Track word counts and ensure your academic papers meet length requirements"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Programming",
        "description": "Count string lengths and analyze text data for programming projects"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Use Cases - Character Counter Tool | Text Analysis Examples',
  description: 'Explore various use cases of our character counter tool. Perfect for social media posts, SEO content, academic writing, and more. Learn how to effectively use text analysis features.',
  openGraph: {
    title: 'Use Cases - Character Counter Tool | Text Analysis Examples',
    description: 'Explore various use cases of our character counter tool. Perfect for social media posts, SEO content, academic writing, and more. Learn how to effectively use text analysis features.',
    url: 'https://boring-tool.com/character-counter/usecase',
    type: 'article',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/usecase'
  },
  keywords: 'character counter examples, text analysis use cases, social media character limits, SEO content writing, academic writing tool',
  other: {
    'application/ld+json': JSON.stringify(jsonLdData)
  }
}; 
import { Metadata } from 'next';

 const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "FAQ - Character Counter Tool | Frequently Asked Questions",
  "description": "Find answers to frequently asked questions about our character counter tool. Learn about features, usage, and troubleshooting tips.",
  "url": "https://boring-tool.com/character-counter/faq",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a character counting app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A character counting app is a tool that instantly calculates the number of characters in entered text and displays accurate results. This prevents manual counting errors and enables efficient text creation and editing."
      }
    },
    {
      "@type": "Question",
      "name": "What scenarios can it be used in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Main usage scenarios include: Writing/blog posting, SNS posting, SEO optimization, and Ad copy creation."
      }
    },
    {
      "@type": "Question",
      "name": "How are full-width and half-width characters counted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both full-width and half-width characters are properly recognized and counted accurately. Special symbols and line breaks are also counted."
      }
    },
    {
      "@type": "Question",
      "name": "Is it compatible with multiple languages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the app supports multiple languages including Japanese and English, with proper handling of characters and symbols for each language."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'FAQ - Character Counter Tool | Frequently Asked Questions',
  description: 'Find answers to frequently asked questions about our character counter tool. Learn about features, usage, and troubleshooting tips.',
  openGraph: {
    title: 'FAQ - Character Counter Tool | Frequently Asked Questions',
    description: 'Find answers to frequently asked questions about our character counter tool. Learn about features, usage, and troubleshooting tips.',
    url: 'https://boring-tool.com/character-counter/faq',
    type: 'article',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/faq'
  },
  keywords: 'character counter faq, text counter questions, word count help, character count tutorial, text analysis guide',
  other: {
    'application/ld+json': JSON.stringify(jsonLdData)
  }
}; 
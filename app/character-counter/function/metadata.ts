import { Metadata } from 'next';

export const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Features & Usage - Character Counter Tool | Free Online Text Counter",
  "description": "Learn how to use our free character counter tool. Count characters, words, lines instantly. Perfect for social media posts, content writing, and SEO optimization.",
  "url": "https://boring-tool.com/character-counter/function",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  },
  "mainEntity": {
    "@type": "HowTo",
    "name": "How to Use Character Counter Tool",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Text",
        "text": "Copy & paste text into the input area or type and edit directly."
      },
      {
        "@type": "HowToStep",
        "name": "Real-time Results",
        "text": "As you type, various counts are displayed in real-time, allowing you to check them instantly."
      },
      {
        "@type": "HowToStep",
        "name": "Utilize Results",
        "text": "Results can be copied using the copy button. Use the displayed numbers as a reference for social media posts, advertising copy, academic papers, and more."
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Features & Usage - Character Counter Tool | Free Online Text Counter',
  description: 'Learn how to use our free character counter tool. Count characters, words, lines instantly. Perfect for social media posts, content writing, and SEO optimization.',
  openGraph: {
    title: 'Features & Usage - Character Counter Tool | Free Online Text Counter',
    description: 'Learn how to use our free character counter tool. Count characters, words, lines instantly. Perfect for social media posts, content writing, and SEO optimization.',
    url: 'https://boring-tool.com/character-counter/function',
    type: 'article',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/function'
  },
  keywords: 'character counter features, text counter usage, word count tool, character count tutorial, online text counter'
}; 
import { Metadata } from 'next';

export const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy - Character Counter Tool",
  "description": "Read our privacy policy to understand how we handle your data when using our character counter tool. We prioritize your privacy and data security.",
  "url": "https://boring-tool.com/character-counter/privacy",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  },
  "mainEntity": {
    "@type": "WebPageElement",
    "name": "Character Counter Privacy Policy",
    "text": "Our character counter tool processes all text locally in your browser. We do not store, collect, or transmit any of the text you enter. Your privacy and data security are our top priorities."
  }
};

export const metadata: Metadata = {
  title: 'Privacy Policy - Character Counter Tool',
  description: 'Read our privacy policy to understand how we handle your data when using our character counter tool. We prioritize your privacy and data security.',
  openGraph: {
    title: 'Privacy Policy - Character Counter Tool',
    description: 'Read our privacy policy to understand how we handle your data when using our character counter tool. We prioritize your privacy and data security.',
    url: 'https://boring-tool.com/character-counter/privacy',
    type: 'article',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/privacy'
  },
  keywords: 'privacy policy, data security, character counter privacy, text analysis privacy, data protection'
}; 
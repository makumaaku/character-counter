import { Metadata } from 'next'

const title = 'Word Card Generator - Free Online Learning Tool | Boring Tool'
const description = 'Generate word cards instantly with our free online tool. Perfect for vocabulary learning, language teaching, ESL/EFL education, and creative writing. Simple, interactive, and user-friendly.'
const url = 'https://boring-tool.com/word-card-generator'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url,
  author: {
    '@type': 'Organization',
    name: 'Boring Tool',
    url: 'https://boring-tool.com'
  },
  isAccessibleForFree: true,
  keywords: [
    'word cards',
    'vocabulary learning',
    'language teaching',
    'ESL',
    'EFL',
    'education',
    'learning tool',
    'word generator',
    'flashcards'
  ]
}

export const metadata: Metadata = {
  title,
  description,
  keywords: jsonLd.keywords.join(', '),
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: 'Boring Tool',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  alternates: {
    canonical: url,
  },
  verification: {
    other: {
      'structured-data': [JSON.stringify(jsonLd)],
    },
  },
}

export const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` 
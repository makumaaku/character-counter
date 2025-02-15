import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'FAQ - Character Counter Tool | Common Questions & Answers',
  description: 'Find answers to frequently asked questions about our character counter tool. Learn about features, usage, and troubleshooting tips.',
  keywords: 'character counter FAQ, text counter help, word count questions, character count support, text analysis FAQ',
  openGraph: {
    title: 'FAQ - Character Counter Tool | Common Questions & Answers',
    description: 'Find answers to frequently asked questions about our character counter tool. Learn about features, usage, and troubleshooting tips.',
    url: 'https://boring-tool.com/character-counter/faq',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/faq'
  }
}

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a character counter app?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A character counter app is a tool that instantly calculates and displays the exact number of characters in entered text. This prevents manual counting errors and enables efficient text creation and editing."
                }
              },
              {
                "@type": "Question",
                "name": "In what scenarios can it be used?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Main usage scenarios include: Writing & Blog Posting (maintaining character count guidelines), Social Media Posts (verifying optimal length for platforms with character limits), and SEO Optimization (managing article volume and structure)."
                }
              },
              {
                "@type": "Question",
                "name": "How are full-width and half-width characters counted?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both full-width and half-width characters are properly recognized and counted accurately. The app can also count special symbols and line breaks."
                }
              },
              {
                "@type": "Question",
                "name": "Is it compatible with multiple languages?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our character counter app supports multiple languages including English and other languages. It is designed for international use, accurately handling characters and symbols specific to each language."
                }
              }
            ]
          })
        }}
      />
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">FAQ</h1>

          <div className="bg-gray-700 rounded-lg p-6 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-2">Q1. What is a character counter app?</h2>
              <p className="text-gray-300">
                A character counter app is a tool that instantly calculates and displays the exact number of characters in entered text. 
                This prevents manual counting errors and enables efficient text creation and editing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Q2. In what scenarios can it be used?</h2>
              <p className="text-gray-300">A: Main usage scenarios include:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>
                  <span className="font-semibold">Writing & Blog Posting:</span> Used to maintain specified character count guidelines when creating articles.
                </li>
                <li>
                  <span className="font-semibold">Social Media Posts:</span> Verify optimal length for platforms with character limits like Twitter and advertising copy.
                </li>
                <li>
                  <span className="font-semibold">SEO Optimization:</span> Manage article volume and structure to optimize for search engines.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Q3. How are full-width and half-width characters counted?</h2>
              <p className="text-gray-300">
                While specifications may vary by app, generally, both full-width and half-width characters are properly recognized and counted accurately. 
                Many apps can also count special symbols and line breaks. We recommend checking the specifications before use.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Q4. Is it compatible with multiple languages?</h2>
              <p className="text-gray-300">
                Many character counter apps support not only English but also other languages. They are designed for international use, 
                accurately handling characters and symbols specific to each language.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Q5. What&apos;s the difference between free and premium versions?</h2>
              <p className="text-gray-300">While it varies by app, typical differences include:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>
                  <span className="font-semibold">Free Version:</span> Basic character counting features available. Often limited to simple functions.
                </li>
                <li>
                  <span className="font-semibold">Premium Version:</span> Additional features typically include advanced statistics (word count, line count, space and symbol counting), 
                  customization options, tool integration capabilities, and ad-free experience.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Q6. Is integration with other tools possible?</h2>
              <p className="text-gray-300">
                Some character counter apps include integration features with editors and CMS, further improving work efficiency. 
                Please check the official website or help pages for detailed integration methods and compatible tools.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Q7. How about support and updates?</h2>
              <p className="text-gray-300">
                Contact forms and chat support are available on the official website or in-app support pages for questions beyond the FAQ. 
                Regular updates for feature improvements and security measures ensure a reliable usage environment.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Q8. What precautions should I take when using the app?</h2>
              <p className="text-gray-300">Please check the following points before use:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Character counting rules (handling of full-width and half-width characters)</li>
                <li>Supported languages and symbols</li>
                <li>Feature differences and pricing between free and premium versions</li>
                <li>Privacy policy and data handling</li>
              </ul>
            </div>

            <p className="text-gray-300 mt-8">
              In addition to the above FAQ, we welcome questions and feedback from users at any time. 
              If you have any questions, please feel free to contact our support desk.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 
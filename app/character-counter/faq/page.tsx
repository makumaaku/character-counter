'use client';

import Script from 'next/script';
import { jsonLdData } from './metadata';

export default function FAQPage() {
  return (
    <>
      <Script
        id="character-counter-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">Frequently Asked Questions</h1>

          <div className="bg-gray-700 rounded-lg p-6 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">General Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q1. What is a character counting app?</h3>
                  <p className="text-gray-300 pl-4">
                    A: A character counting app is a tool that instantly calculates the number of characters in entered text and displays accurate results. This prevents manual counting errors and enables efficient text creation and editing.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q2. What scenarios can it be used in?</h3>
                  <p className="text-gray-300 pl-4">A: Main usage scenarios are:</p>
                  <ul className="list-disc pl-10 text-gray-300">
                    <li>Writing/blog posting</li>
                    <li>SNS posting</li>
                    <li>SEO optimization</li>
                    <li>Ad copy creation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Technical Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q3. How are full-width and half-width characters counted?</h3>
                  <p className="text-gray-300 pl-4">
                    A: Both full-width and half-width characters are properly recognized and counted accurately. Special symbols and line breaks are also counted.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q4. Is it compatible with multiple languages?</h3>
                  <p className="text-gray-300 pl-4">
                    A: Yes, the app supports multiple languages including Japanese and English, with proper handling of characters and symbols for each language.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Features & Usage</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q5. What features are included?</h3>
                  <p className="text-gray-300 pl-4">A: Our character counter includes:</p>
                  <ul className="list-disc pl-10 text-gray-300">
                    <li>Real-time character counting</li>
                    <li>Line counting</li>
                    <li>Word counting</li>
                    <li>Byte counting</li>
                    <li>String search functionality</li>
                    <li>Dark mode support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q6. Is registration required?</h3>
                  <p className="text-gray-300 pl-4">
                    A: No, our basic features are available without registration. However, some premium features may require a user account.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Privacy & Security</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q7. Is my text data secure?</h3>
                  <p className="text-gray-300 pl-4">
                    A: Yes, all text processing is done locally in your browser. We do not store or transmit your text data to any servers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Q8. Do you collect any user data?</h3>
                  <p className="text-gray-300 pl-4">
                    A: We only collect anonymous usage statistics to improve our service. No personal data or text content is collected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
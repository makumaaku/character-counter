'use client';

import Script from 'next/script';
import { jsonLdData } from './metadata';

export default function FunctionPage() {
  return (
    <>
      <Script
        id="character-counter-function-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">Features & Usage</h1>

          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Key Features</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">① Dark Mode Toggle</h3>
                <p className="text-gray-300">Switch between dark mode and light mode. Choose the display mode that&apos;s most comfortable for your eyes.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">② Character Count</h3>
                <p className="text-gray-300">Counts the number of characters in the input box.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">③ Input Box</h3>
                <p className="text-gray-300">Enter or paste the text you want to analyze in this box.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">④ Line Count</h3>
                <p className="text-gray-300">Counts the number of line breaks in your text.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">⑤ Word Count</h3>
                <p className="text-gray-300">Counts words in space-separated text, perfect for English and other space-delimited languages.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">⑥ Byte Count (Multibyte Support)</h3>
                <p className="text-gray-300">Counts the number of bytes, with full support for multibyte characters like Japanese text.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">⑦ Copy Button</h3>
                <p className="text-gray-300">Copy the current text in the input box with one click. Perfect for quickly transferring edited text.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">⑧ String Search & Occurrence Counter</h3>
                <p className="text-gray-300">Count how many times a specific string appears in your text. Useful for SEO keyword density analysis.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">How to Use - Simple Steps</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Enter Text</h3>
                <p className="text-gray-300">Copy & paste text into the input area or type and edit directly.<br />
                Note: Simply typing will instantly count the number of characters, lines, words (English only), and bytes (multibyte compatible).</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Real-time Results</h3>
                <p className="text-gray-300">As you type, various counts are displayed in real-time, allowing you to check them instantly.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Utilize Results</h3>
                <p className="text-gray-300">Results can be copied using the copy button.<br />
                Use the displayed numbers as a reference for social media posts, advertising copy, academic papers, and more.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
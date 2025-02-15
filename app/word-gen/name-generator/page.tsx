'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Button } from './components/Button';

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random Name Generator - Boring Tool",
  "description": "Generate random full names with our free online name generator tool. Perfect for writers, game developers, and creative projects.",
  "url": "https://boring-tool.com/word-gen/name-generator",
  "applicationCategory": "UtilityApplication",
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
  }
};

export default function NameGenerator() {
  const [generatedName, setGeneratedName] = useState<string>('');

  const generateRandomFullName = async () => {
    try {
      const response = await fetch('/words/name.json');
      const data = await response.json();
      
      const isMale = Math.random() < 0.5;
      const firstNames = isMale ? data.male_first_names : data.female_first_names;
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = data.last_names[Math.floor(Math.random() * data.last_names.length)];
      
      setGeneratedName(`${firstName} ${lastName}`);
    } catch (error) {
      console.error('Error generating name:', error);
      setGeneratedName('Error generating name. Please try again.');
    }
  };

  return (
    <>
      <Script
        id="name-generator-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="bg-gray-800 text-gray-100 font-sans">
        <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h1 className="text-xl mb-4">Random Name Generator</h1>
            <div className="text-center mb-6">
              <Button
                onClick={generateRandomFullName}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Generate Random Name
              </Button>
            </div>
            
            {generatedName && (
              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-100">
                  {generatedName}
                </h2>
              </div>
            )}
          </div>

          <div className="bg-gray-700 p-6 rounded-lg mt-6">
            <h2 className="text-xl mb-4 text-center">Easy & Simple! High-performance name generator tool (free)</h2>
            <p className="mb-4">
              Our free and easy-to-use tool instantly generates random names! Perfect for:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Creative writing and character development
                <p className="ml-5">Generate unique character names for your stories, novels, or creative projects.</p>
              </li>
              <li>Game development and role-playing games
                <p className="ml-5">Create character names for your games, RPG sessions, or virtual worlds.</p>
              </li>
              <li>Testing and placeholder data
                <p className="ml-5">Generate realistic test data for your applications or databases.</p>
              </li>
            </ul>

            <h3 className="text-lg mb-2 font-bold">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Q1. How does the name generator work?</h4>
                <p className="ml-5">A: The generator combines randomly selected first names (both male and female) with last names from our extensive database to create unique, realistic full names.</p>
              </div>
              <div>
                <h4 className="font-bold">Q2. Are the generated names realistic?</h4>
                <p className="ml-5">A: Yes, all names in our database are real names, ensuring that the generated combinations sound natural and authentic.</p>
              </div>
              <div>
                <h4 className="font-bold">Q3. Can I use these names in my projects?</h4>
                <p className="ml-5">A: Yes, the generated names are free to use in your creative projects, games, or applications.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 
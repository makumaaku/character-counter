'use client';

import { useState } from 'react';
import { Button } from './Button';

export default function NameGeneratorClient() {
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
    </>
  );
} 
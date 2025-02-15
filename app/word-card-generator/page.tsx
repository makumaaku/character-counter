'use client'

import { useState } from 'react'
import wordsData from '../../public/words/card-words.json'

type Word = {
  word: string
  length: number
  category: string
}

export default function WordCardGenerator() {
  const [wordCount, setWordCount] = useState(10)
  const [generatedWords, setGeneratedWords] = useState<Word[]>([])

  const getRandomWords = (count: number): Word[] => {
    const words = [...wordsData.words] as Word[]
    const result: Word[] = []
    
    for (let i = 0; i < count && words.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * words.length)
      result.push(words[randomIndex])
      words.splice(randomIndex, 1)
    }
    
    return result
  }

  const generateWords = () => {
    setGeneratedWords(getRandomWords(wordCount))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Word Card Generator</h1>
        
        <div className="mb-8">
          <label htmlFor="wordCount" className="block mb-2">Number of word cards (1-100):</label>
          <input
            type="number"
            id="wordCount"
            min="1"
            max="100"
            value={wordCount}
            onChange={(e) => setWordCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg w-32 mr-4"
          />
          <button
            onClick={generateWords}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
          >
            Generate
          </button>
        </div>

        {generatedWords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedWords.map((word, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="text-xl mb-2">{word.word}</div>
                <div className="text-gray-400">
                  Length: {word.length} • Category: {word.category}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            Click the Generate button to create word cards
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="text-gray-300 mb-4">
            Enter the number of word cards you want to generate (between 1 and 100) and click the &quot;Generate&quot; button.
            Each card displays a word with its length and category information.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Vocabulary learning and memorization</li>
            <li>Language teaching and education</li>
            <li>Word games and puzzles</li>
            <li>Creative writing inspiration</li>
            <li>ESL/EFL learning activities</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 
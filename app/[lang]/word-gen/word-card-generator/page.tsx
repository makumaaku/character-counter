'use client'

import { useState } from 'react'
import { translate } from '@/lib/i18n/client'
import wordsData from '../../../../public/words/card-words.json'

type Word = {
  word: string
  length: number
  category: string
}

type Props = {
  params: { lang: string }
}

export default function WordCardGenerator({ params: { lang } }: Props) {
  const [wordCount, setWordCount] = useState(10)
  const [generatedWords, setGeneratedWords] = useState<Word[]>([])
  const [copied, setCopied] = useState(false)

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedWords.map(w => w.word).join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'wordCardGenerator.title')}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {translate(lang, 'wordCardGenerator.description')}
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {translate(lang, 'wordCardGenerator.form.count.label')}
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={wordCount}
              onChange={(e) => setWordCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="bg-gray-800 text-white px-3 py-2 rounded w-32 mr-4"
            />
            <button
              onClick={generateWords}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              {translate(lang, 'wordCardGenerator.form.generate')}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{translate(lang, 'wordCardGenerator.result.title')}</h2>
              {generatedWords.length > 0 && (
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
                >
                  {copied 
                    ? translate(lang, 'wordCardGenerator.result.copied')
                    : translate(lang, 'wordCardGenerator.result.copy')}
                </button>
              )}
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
                      {translate(lang, 'wordCardGenerator.card.length')}: {word.length} • 
                      {translate(lang, 'wordCardGenerator.card.category')}: {word.category}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">{translate(lang, 'wordCardGenerator.result.empty')}</p>
            )}
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {translate(lang, 'wordCardGenerator.howTo.title')}
          </h2>
          <p className="text-gray-300 mb-4">
            {translate(lang, 'wordCardGenerator.howTo.description')}
          </p>

          <h3 className="text-xl font-bold mt-6 mb-4">
            {translate(lang, 'wordCardGenerator.useCases.title')}
          </h3>
          <ul className="list-disc pl-5 text-gray-300">
            <li>{translate(lang, 'wordCardGenerator.useCases.vocabulary')}</li>
            <li>{translate(lang, 'wordCardGenerator.useCases.teaching')}</li>
            <li>{translate(lang, 'wordCardGenerator.useCases.games')}</li>
            <li>{translate(lang, 'wordCardGenerator.useCases.writing')}</li>
            <li>{translate(lang, 'wordCardGenerator.useCases.esl')}</li>
          </ul>
        </div>
      </main>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import wordsData from '../../../../../assets/words/words.json'
import DownloadButton from '../../components/DownloadButton'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/CopyButton'
import { WordGenWordGeneratorMessages } from '@/lib/i18n/generated-types'

// words.jsonの型定義
type WordsData = {
  words: string[]
}

const words: WordsData = wordsData


// PropsインターフェースにWordGeneratorMessagesを追加
interface WordGeneratorClientProps {
  messages: WordGenWordGeneratorMessages;
}

export default function WordGeneratorClient({ messages }: WordGeneratorClientProps) {
  const [generatedWords, setGeneratedWords] = useState<string[]>([])
  const [wordCount, setWordCount] = useState<number>(10)
  const [minLength, setMinLength] = useState(3)
  const [maxLength, setMaxLength] = useState(10) 
  
  // propsからメッセージを取得
  const { title, description, form, result } = messages;

  const generateWords = () => {
    let filteredWords = words.words.filter(word => 
      word.length >= minLength && 
      word.length <= maxLength
    )
    
    const selected: string[] = []
    const count = Math.min(wordCount, filteredWords.length)
    
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * filteredWords.length)
      selected.push(filteredWords[index])
      filteredWords = [...filteredWords.slice(0, index), ...filteredWords.slice(index + 1)]
    }
    
    setGeneratedWords(selected)
  }

  return (
    <div className="bg-gray-700 text-white py-12 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300">
            {description}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {form.length.label}
            </label>
            <div className="flex gap-4 max-w-md mx-auto">
              <div className="w-1/2">
                <label className="block text-xs text-gray-400">
                  {form.length.min}
                </label>
                <input
                  type="number"
                  value={minLength}
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    if (!isNaN(value) && value >= 1) {
                      setMinLength(value)
                    }
                  }}
                  className="bg-gray-800 text-white px-3 py-2 rounded w-full"
                  min="1"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs text-gray-400">
                  {form.length.max}
                </label>
                <input
                  type="number"
                  value={maxLength}
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    if (!isNaN(value) && value >= minLength) {
                      setMaxLength(value)
                    }
                  }}
                  className="bg-gray-800 text-white px-3 py-2 rounded w-full"
                  min={minLength}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {form.count.label}
            </label>
            <div className="max-w-md mx-auto">
              <input
                type="number"
                value={wordCount}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  if (!isNaN(value) && value >= 1) {
                    setWordCount(value)
                  }
                }}
                placeholder={form.count.placeholder}
                className="bg-gray-800 text-white px-3 py-2 rounded w-full"
                min="1"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={generateWords}
              variant="purple"
            >
              {form.generate}
            </Button>
            <Button
              onClick={() => {
                setGeneratedWords([])
                setWordCount(10)
                setMinLength(3)
                setMaxLength(10)
              }}
              variant="secondary"
            >
              {form.clear}
            </Button>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{result.title}</h2>
            {generatedWords.length > 0 && (
              <div className="flex space-x-2">
                <CopyButton
                  text={generatedWords.join('\n')}
                  variant="purple"
                  copyText={result.copy}
                  toastText={result.copied}
                />
                <DownloadButton
                  content={generatedWords.join('\n')}
                  filename="generated-words.txt"
                  variant="purple"
                  downloadText={result.download}
                  downloadedText={result.downloaded}
                />
              </div>
            )}
          </div>
          {generatedWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {generatedWords.map((word, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-purple-800 transition-colors"
                >
                  <div className="text-xl">{word}</div>
                  <div className="text-sm text-gray-400">{word.length} characters</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">{result.empty}</p>
          )}
        </div>
      </div>
    </div>
  )
} 
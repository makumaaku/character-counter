'use client'

import { useState } from 'react'
import wordsData from '../../../../../assets/words/card-words.json'
import DownloadButton from '../../components/DownloadButton'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/CopyButton'
import { WordGenWordCardGeneratorMessages } from '@/lib/i18n/types'

type Word = {
  word: string
  length: number
  category: string
}

// PropsインターフェースにWordCardGeneratorMessagesを追加
interface WordCardGeneratorClientProps {
  messages: WordGenWordCardGeneratorMessages;
}

export default function WordCardGeneratorClient({ messages }: WordCardGeneratorClientProps) {
  const [wordCount, setWordCount] = useState(10)
  const [generatedWords, setGeneratedWords] = useState<Word[]>([])
  
  // propsからメッセージを取得
  const { title, description, form, result, card, about } = messages;

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
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {description}
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {form.count.label}
            </label>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center">
              <input
                type="number"
                min="1"
                max="100"
                value={wordCount}
                onChange={(e) => setWordCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                className="bg-gray-800 text-white px-3 py-2 rounded w-32"
              />
              <Button
                onClick={generateWords}
                variant="purple"
                size="lg"
              >
                {form.generate}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h2 className="text-xl font-bold">{result.title}</h2>
              {generatedWords.length > 0 && (
                <div className="flex space-x-2">
                  <CopyButton
                    text={generatedWords.map(w => w.word).join('\n')}
                    variant="purple"
                    copyText={result.copy}
                    toastText={result.copied}
                  />
                  <DownloadButton
                    content={generatedWords.map(w => w.word).join('\n')}
                    filename="generated-words.txt"
                    variant="purple"
                  />
                </div>
              )}
            </div>
            {generatedWords.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedWords.map((word, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors overflow-hidden"
                  >
                    <div className="text-xl mb-2 break-words">{word.word}</div>
                    <div className="text-gray-400 text-sm flex flex-wrap">
                      <span className="mr-1">{card.length}: {word.length}</span> • 
                      <span className="ml-1">{card.category}: {word.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">{result.empty}</p>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 bg-gray-700 p-6 rounded-lg overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 break-words">{about.catchphrase}</h2>
            <p className="text-lg text-gray-300 text-start break-words">{about.introduction}</p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.features.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.features.oneClick.title}</h4>
                <p className="text-gray-300 break-words">{about.features.oneClick.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.features.database.title}</h4>
                <p className="text-gray-300 break-words">{about.features.database.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.features.design.title}</h4>
                <p className="text-gray-300 break-words">{about.features.design.description}</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.useCases.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.useCases.vocabulary.title}</h4>
                <p className="text-gray-300 break-words">{about.useCases.vocabulary.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.useCases.brainstorming.title}</h4>
                <p className="text-gray-300 break-words">{about.useCases.brainstorming.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.useCases.games.title}</h4>
                <p className="text-gray-300 break-words">{about.useCases.games.description}</p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.technical.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.technical.algorithm.title}</h4>
                <p className="text-gray-300 break-words">{about.technical.algorithm.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.technical.database.title}</h4>
                <p className="text-gray-300 break-words">{about.technical.database.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.technical.responsive.title}</h4>
                <p className="text-gray-300 break-words">{about.technical.responsive.description}</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.faq.title}</h3>
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.faq.questions.free.question}</h4>
                <p className="text-gray-300 break-words">{about.faq.questions.free.answer}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.faq.questions.customize.question}</h4>
                <p className="text-gray-300 break-words">{about.faq.questions.customize.answer}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3 break-words">{about.faq.questions.print.question}</h4>
                <p className="text-gray-300 break-words">{about.faq.questions.print.answer}</p>
              </div>
            </div>
          </div>
          
          {/* Conclusion */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{about.conclusion.title}</h3>
            <p className="text-gray-300 break-words">{about.conclusion.description}</p>
          </div>
        </div>
      </main>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import wordsData from '../../../../../public/words/words.json'

// words.jsonの型定義
type WordsData = {
  words: string[]
}

const words: WordsData = wordsData

type Props = {
  translations: {
    title: string
    description: string
    form: {
      length: {
        label: string
        min: string
        max: string
      }
      pattern: {
        label: string
        placeholder: string
      }
      count: {
        label: string
        placeholder: string
      }
      generate: string
      clear: string
    }
    result: {
      title: string
      empty: string
      copy: string
      copied: string
    }
    about: {
      catchphrase: string
      introduction: string
      features: {
        title: string
        oneClick: {
          title: string
          description: string
        }
        database: {
          title: string
          description: string
        }
        design: {
          title: string
          description: string
        }
      }
      useCases: {
        title: string
        scenes: {
          title: string
          writer: string
          designer: string
          brainstorming: string
        }
        testimonials: {
          title: string
          writer: {
            name: string
            quote: string
          }
          designer: {
            name: string
            quote: string
          }
        }
      }
      technical: {
        title: string
        algorithm: {
          title: string
          description: string
        }
        database: {
          title: string
          description: string
        }
        performance: {
          title: string
          description: string
        }
      }
      faq: {
        title: string
        questions: {
          [key: string]: {
            question: string
            answer: string
          }
        }
      }
      conclusion: {
        title: string
        description: string
      }
    }
  }
}

export default function WordGeneratorClient({ translations }: Props) {
  const [generatedWords, setGeneratedWords] = useState<string[]>([])
  const [wordCount, setWordCount] = useState<number>(10)
  const [minLength, setMinLength] = useState(3)
  const [maxLength, setMaxLength] = useState(10)
  const [pattern, setPattern] = useState('')
  const [copied, setCopied] = useState(false)

  const generateWords = () => {
    let filteredWords = words.words.filter(word => 
      word.length >= minLength && 
      word.length <= maxLength &&
      (!pattern || new RegExp(pattern.replace(/C/g, '[bcdfghjklmnpqrstvwxyz]')
                                    .replace(/V/g, '[aeiou]')
                                    .replace(/\*/g, '.')).test(word))
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedWords.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{translations.title}</h1>
          <p className="text-xl text-gray-300">
            {translations.description}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {translations.form.length.label}
              </label>
              <div className="flex gap-4">
                <div>
                  <label className="block text-xs text-gray-400">
                    {translations.form.length.min}
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
                <div>
                  <label className="block text-xs text-gray-400">
                    {translations.form.length.max}
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

            <div>
              <label className="block text-sm font-medium mb-2">
                {translations.form.pattern.label}
              </label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder={translations.form.pattern.placeholder}
                className="bg-gray-800 text-white px-3 py-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {translations.form.count.label}
            </label>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (!isNaN(value) && value >= 1) {
                  setWordCount(value)
                }
              }}
              placeholder={translations.form.count.placeholder}
              className="bg-gray-800 text-white px-3 py-2 rounded w-full md:w-1/3"
              min="1"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateWords}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition-colors"
            >
              {translations.form.generate}
            </button>
            <button
              onClick={() => {
                setGeneratedWords([])
                setWordCount(10)
                setMinLength(3)
                setMaxLength(10)
                setPattern('')
              }}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded transition-colors"
            >
              {translations.form.clear}
            </button>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{translations.result.title}</h2>
            {generatedWords.length > 0 && (
              <button
                onClick={copyToClipboard}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
              >
                {copied ? translations.result.copied : translations.result.copy}
              </button>
            )}
          </div>
          {generatedWords.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generatedWords.map((word, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-3 rounded text-center"
                >
                  {word}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">{translations.result.empty}</p>
          )}
        </div>

        {/* About Section */}
        <div className="mt-16 space-y-12">
          {/* Introduction */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{translations.about.catchphrase}</h2>
            <p className="text-lg text-gray-300">{translations.about.introduction}</p>
          </div>

          {/* Features */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translations.about.features.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">{translations.about.features.oneClick.title}</h3>
                <p className="text-gray-300">{translations.about.features.oneClick.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translations.about.features.database.title}</h3>
                <p className="text-gray-300">{translations.about.features.database.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translations.about.features.design.title}</h3>
                <p className="text-gray-300">{translations.about.features.design.description}</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translations.about.useCases.title}</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{translations.about.useCases.scenes.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-600 p-6 rounded-lg">
                  <p className="text-gray-300">{translations.about.useCases.scenes.writer}</p>
                </div>
                <div className="bg-gray-600 p-6 rounded-lg">
                  <p className="text-gray-300">{translations.about.useCases.scenes.designer}</p>
                </div>
                <div className="bg-gray-600 p-6 rounded-lg">
                  <p className="text-gray-300">{translations.about.useCases.scenes.brainstorming}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{translations.about.useCases.testimonials.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-600 p-6 rounded-lg">
                  <p className="text-lg font-medium mb-2">{translations.about.useCases.testimonials.writer.name}</p>
                  <p className="text-gray-300 italic">{translations.about.useCases.testimonials.writer.quote}</p>
                </div>
                <div className="bg-gray-600 p-6 rounded-lg">
                  <p className="text-lg font-medium mb-2">{translations.about.useCases.testimonials.designer.name}</p>
                  <p className="text-gray-300 italic">{translations.about.useCases.testimonials.designer.quote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Background */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translations.about.technical.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">{translations.about.technical.algorithm.title}</h3>
                <p className="text-gray-300">{translations.about.technical.algorithm.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translations.about.technical.database.title}</h3>
                <p className="text-gray-300">{translations.about.technical.database.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{translations.about.technical.performance.title}</h3>
                <p className="text-gray-300">{translations.about.technical.performance.description}</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{translations.about.faq.title}</h2>
            <div className="space-y-6">
              {Object.entries(translations.about.faq.questions).map(([key, question]) => (
                <div key={key} className="bg-gray-600 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{question.question}</h3>
                  <p className="text-gray-300">{question.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{translations.about.conclusion.title}</h2>
            <p className="text-lg text-gray-300">{translations.about.conclusion.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
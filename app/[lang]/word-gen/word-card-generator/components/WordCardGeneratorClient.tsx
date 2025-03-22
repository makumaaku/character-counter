'use client'

import { useState } from 'react'
import wordsData from '../../../../../assets/words/card-words.json'
import DownloadButton from '../../components/DownloadButton'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/CopyButton'

type Word = {
  word: string
  length: number
  category: string
}

type Props = {
  translations: {
    title: string
    description: string
    wordCardGenerator: {
      title: string
      description: string
      form: {
        count: {
          label: string
        }
        generate: string
      }
      result: {
        title: string
        empty: string
        copy: string
        copied: string
      }
      card: {
        length: string
        category: string
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
          vocabulary: {
            title: string
            description: string
          }
          brainstorming: {
            title: string
            description: string
          }
          games: {
            title: string
            description: string
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
          responsive: {
            title: string
            description: string
          }
        }
        faq: {
          title: string
          questions: {
            free: {
              question: string
              answer: string
            }
            customize: {
              question: string
              answer: string
            }
            print: {
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
}

export default function WordCardGeneratorClient({ translations }: Props) {
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
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">{translations.wordCardGenerator.title}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {translations.wordCardGenerator.description}
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {translations.wordCardGenerator.form.count.label}
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={wordCount}
              onChange={(e) => setWordCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="bg-gray-800 text-white px-3 py-2 rounded w-32 mr-4"
            />
            <Button
              onClick={generateWords}
              variant="purple"
              size="lg"
            >
              {translations.wordCardGenerator.form.generate}
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{translations.wordCardGenerator.result.title}</h2>
              {generatedWords.length > 0 && (
                <div className="flex space-x-2">
                  <CopyButton
                    text={generatedWords.map(w => w.word).join('\n')}
                    variant="purple"
                    copyText={translations.wordCardGenerator.result.copy}
                    toastText={translations.wordCardGenerator.result.copied}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedWords.map((word, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="text-xl mb-2">{word.word}</div>
                    <div className="text-gray-400">
                      {translations.wordCardGenerator.card.length}: {word.length} • 
                      {translations.wordCardGenerator.card.category}: {word.category}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">{translations.wordCardGenerator.result.empty}</p>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 bg-gray-700 p-8 rounded-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{translations.wordCardGenerator.about.catchphrase}</h2>
            <p className="text-lg text-gray-300 text-start">{translations.wordCardGenerator.about.introduction}</p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{translations.wordCardGenerator.about.features.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.features.oneClick.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.features.oneClick.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.features.database.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.features.database.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.features.design.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.features.design.description}</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{translations.wordCardGenerator.about.useCases.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.useCases.vocabulary.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.useCases.vocabulary.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.useCases.brainstorming.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.useCases.brainstorming.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.useCases.games.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.useCases.games.description}</p>
              </div>
            </div>
          </div>

          {/* Technical Background */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{translations.wordCardGenerator.about.technical.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.technical.algorithm.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.technical.algorithm.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.technical.database.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.technical.database.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{translations.wordCardGenerator.about.technical.responsive.title}</h4>
                <p className="text-gray-300">{translations.wordCardGenerator.about.technical.responsive.description}</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{translations.wordCardGenerator.about.faq.title}</h3>
            <div className="space-y-6">
              {Object.entries(translations.wordCardGenerator.about.faq.questions).map(([key, question]: [string, { question: string; answer: string }]) => (
                <div key={key} className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-3">{question.question}</h4>
                  <p className="text-gray-300">{question.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{translations.wordCardGenerator.about.conclusion.title}</h3>
            <p className="text-gray-300">{translations.wordCardGenerator.about.conclusion.description}</p>
          </div>
        </div>
      </main>
    </div>
  )
} 
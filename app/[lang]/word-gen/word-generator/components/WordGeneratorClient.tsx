'use client'

import { useState } from 'react'
import wordsData from '../../../../../assets/words/words.json'
import DownloadButton from '../../components/DownloadButton'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/CopyButton'
import { useMessages } from '@/hooks/useMessages'

// words.jsonの型定義
type WordsData = {
  words: string[]
}

const words: WordsData = wordsData

// スクリプトタグから取得するメッセージの型定義
type WordGeneratorMessages = {
  wordGen: {
    wordGenerator: {
      title: string;
      description: string;
      form: {
        length: {
          label: string;
          min: string;
          max: string;
        }
        pattern: {
          label: string;
          placeholder: string;
        }
        count: {
          label: string;
          placeholder: string;
        }
        generate: string;
        clear: string;
      }
      result: {
        title: string;
        empty: string;
        copy: string;
        copied: string;
        download: string;
        downloaded: string;
      }
      about: {
        catchphrase: string;
        introduction: string;
        features: {
          title: string;
          oneClick: {
            title: string;
            description: string;
          }
          database: {
            title: string;
            description: string;
          }
          design: {
            title: string;
            description: string;
          }
        }
        useCases: {
          title: string;
          scenes: {
            title: string;
            writer: string;
            designer: string;
            brainstorming: string;
          }
          testimonials: {
            title: string;
            writer: {
              name: string;
              quote: string;
            }
            designer: {
              name: string;
              quote: string;
            }
          }
        }
        technical: {
          title: string;
          algorithm: {
            title: string;
            description: string;
          }
          database: {
            title: string;
            description: string;
          }
          performance: {
            title: string;
            description: string;
          }
        }
        faq: {
          title: string;
          questions: {
            free: {
              question: string;
              answer: string;
            }
            words: {
              question: string;
              answer: string;
            }
            commercial: {
              question: string;
              answer: string;
            }
            mobile: {
              question: string;
              answer: string;
            }
          }
        }
        conclusion: {
          title: string;
          description: string;
        }
      }
    }
  }
}

export default function WordGeneratorClient() {
  const [generatedWords, setGeneratedWords] = useState<string[]>([])
  const [wordCount, setWordCount] = useState<number>(10)
  const [minLength, setMinLength] = useState(3)
  const [maxLength, setMaxLength] = useState(10) 
  
  // Script タグからのメッセージを取得
  const messages = useMessages<WordGeneratorMessages>('word-generator-messages')
  
  // メッセージがロードされていない場合のローディング表示
  if (!messages) {
    return <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  }
  
  // メッセージからトランスレーションを取得
  const { title, description, form, result, about } = messages.wordGen.wordGenerator;

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
    <div className="min-h-screen bg-gray-800 text-white py-12">
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
        
        {/* About Section */}
        <div className="mt-12 bg-gray-700 p-8 rounded-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{about.catchphrase}</h2>
            <p className="text-lg text-gray-300">{about.introduction}</p>
          </div>
          
          {/* Features */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.features.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{about.features.oneClick.title}</h4>
                <p className="text-gray-300">{about.features.oneClick.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{about.features.database.title}</h4>
                <p className="text-gray-300">{about.features.database.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{about.features.design.title}</h4>
                <p className="text-gray-300">{about.features.design.description}</p>
              </div>
            </div>
          </div>
          
          {/* Use Cases */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.useCases.title}</h3>
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">{about.useCases.scenes.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-300">{about.useCases.scenes.writer}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-300">{about.useCases.scenes.designer}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-300">{about.useCases.scenes.brainstorming}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">{about.useCases.testimonials.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <blockquote className="italic text-gray-300 mb-4">&ldquo;{about.useCases.testimonials.writer.quote}&rdquo;</blockquote>
                  <p className="text-right">— {about.useCases.testimonials.writer.name}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <blockquote className="italic text-gray-300 mb-4">&ldquo;{about.useCases.testimonials.designer.quote}&rdquo;</blockquote>
                  <p className="text-right">— {about.useCases.testimonials.designer.name}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.technical.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{about.technical.algorithm.title}</h4>
                <p className="text-gray-300">{about.technical.algorithm.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{about.technical.database.title}</h4>
                <p className="text-gray-300">{about.technical.database.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">{about.technical.performance.title}</h4>
                <p className="text-gray-300">{about.technical.performance.description}</p>
              </div>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{about.faq.title}</h3>
            <div className="divide-y divide-gray-600">
              <div className="py-4">
                <h4 className="text-xl font-bold mb-2">{about.faq.questions.free.question}</h4>
                <p className="text-gray-300">{about.faq.questions.free.answer}</p>
              </div>
              <div className="py-4">
                <h4 className="text-xl font-bold mb-2">{about.faq.questions.words.question}</h4>
                <p className="text-gray-300">{about.faq.questions.words.answer}</p>
              </div>
              <div className="py-4">
                <h4 className="text-xl font-bold mb-2">{about.faq.questions.commercial.question}</h4>
                <p className="text-gray-300">{about.faq.questions.commercial.answer}</p>
              </div>
              <div className="py-4">
                <h4 className="text-xl font-bold mb-2">{about.faq.questions.mobile.question}</h4>
                <p className="text-gray-300">{about.faq.questions.mobile.answer}</p>
              </div>
            </div>
          </div>
          
          {/* Conclusion */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{about.conclusion.title}</h3>
            <p className="text-lg text-gray-300">{about.conclusion.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
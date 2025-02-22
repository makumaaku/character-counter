'use client'

import { useState } from 'react'
import Image from 'next/image'

// Character sets for password generation
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz'
const NUMBER_CHARS = '0123456789'
const SYMBOL_CHARS = '!@#$%^&*()_-+=<>?/{}[]~|'

type Translations = {
  title: string
  catchphrase: string
  intro: string
  description: string
  features: {
    title: string
    easyOperation: {
      title: string
      description: string
    }
    customization: {
      title: string
      description: string
    }
    security: {
      title: string
      description: string
    }
  }
  useCases: {
    title: string
    onlineAccounts: {
      title: string
      description: string
    }
    corporate: {
      title: string
      description: string
    }
    privacy: {
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
    performance: {
      title: string
      description: string
    }
    privacy: {
      title: string
      description: string
    }
  }
  faq: {
    title: string
    questions: {
      security: {
        question: string
        answer: string
      }
      customization: {
        question: string
        answer: string
      }
      commercial: {
        question: string
        answer: string
      }
    }
  }
  conclusion: {
    title: string
    description: string
  }
  generatedPassword: string
  copyButton: string
  copied: string
  passwordLength: string
  characterTypes: {
    uppercase: string
    lowercase: string
    numbers: string
    symbols: string
  }
  generateButton: string
}

export default function PasswordGeneratorClient({ translations }: { translations: Translations }) {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [showToast, setShowToast] = useState(false)

  const generatePassword = () => {
    let charSet = ''
    if (useUppercase) charSet += UPPERCASE_CHARS
    if (useLowercase) charSet += LOWERCASE_CHARS
    if (useNumbers) charSet += NUMBER_CHARS
    if (useSymbols) charSet += SYMBOL_CHARS

    // If no character set is selected, use lowercase as default
    if (!charSet) {
      charSet = LOWERCASE_CHARS
      setUseLowercase(true)
    }

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length)
      newPassword += charSet[randomIndex]
    }
    setPassword(newPassword)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <>
      <div className="bg-gray-800 text-gray-100 font-sans">
        <main className="max-w-4xl mx-auto px-4 pb-24">
          <h1 className="text-3xl font-bold text-center py-8">{translations.title}</h1>
          
          {/* Password Generator Section */}
          <div className="bg-gray-700 p-6 rounded-lg text-center mb-6">
            <h2 className="text-xl mb-4">{translations.generatedPassword}</h2>
            <div className="relative">
              <p className="text-2xl font-bold font-mono bg-gray-900 p-4 rounded-lg break-all">
                {password}
              </p>
              <button
                onClick={handleCopy}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                title={translations.copyButton}
              >
                <Image 
                  src="/copy_icon_white.png" 
                  alt={translations.copyButton}
                  width={20}
                  height={20}
                />
              </button>
              {showToast && (
                <div className="absolute right-4 top-full mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                  {translations.copied}
                </div>
              )}
            </div>
          </div>

          {/* Password Settings Section */}
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <div className="mb-6">
              <label className="block text-lg mb-2">{translations.passwordLength}: {length}</label>
              <input
                type="range"
                min="4"
                max="128"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useUppercase}
                  onChange={(e) => setUseUppercase(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 rounded accent-purple-600"
                />
                <span>{translations.characterTypes.uppercase}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useLowercase}
                  onChange={(e) => setUseLowercase(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 rounded accent-purple-600"
                />
                <span>{translations.characterTypes.lowercase}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 rounded accent-purple-600"
                />
                <span>{translations.characterTypes.numbers}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 rounded accent-purple-600"
                />
                <span>{translations.characterTypes.symbols}</span>
              </label>
            </div>

            <button
              onClick={generatePassword}
              className="w-full mt-6 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {translations.generateButton}
            </button>
          </div>

          {/* Introduction Section */}
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{translations.catchphrase}</h2>
            <p className="mb-6">{translations.intro}</p>
          </div>

          {/* Features Section */}
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-6">{translations.features.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.features.easyOperation.title}</h3>
                <p>{translations.features.easyOperation.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.features.customization.title}</h3>
                <p>{translations.features.customization.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.features.security.title}</h3>
                <p>{translations.features.security.description}</p>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-6">{translations.useCases.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.useCases.onlineAccounts.title}</h3>
                <p>{translations.useCases.onlineAccounts.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.useCases.corporate.title}</h3>
                <p>{translations.useCases.corporate.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.useCases.privacy.title}</h3>
                <p>{translations.useCases.privacy.description}</p>
              </div>
            </div>
          </div>

          {/* Technical Section */}
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-6">{translations.technical.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.technical.algorithm.title}</h3>
                <p>{translations.technical.algorithm.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.technical.performance.title}</h3>
                <p>{translations.technical.performance.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.technical.privacy.title}</h3>
                <p>{translations.technical.privacy.description}</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-6">{translations.faq.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.faq.questions.security.question}</h3>
                <p>{translations.faq.questions.security.answer}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.faq.questions.customization.question}</h3>
                <p>{translations.faq.questions.customization.answer}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{translations.faq.questions.commercial.question}</h3>
                <p>{translations.faq.questions.commercial.answer}</p>
              </div>
            </div>
          </div>

          {/* Conclusion Section */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{translations.conclusion.title}</h2>
            <p>{translations.conclusion.description}</p>
          </div>
        </main>
      </div>
    </>
  )
} 
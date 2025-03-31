'use client'

import { useState } from 'react'
import DownloadButton from '../../components/DownloadButton'
import CopyButton from '@/components/CopyButton'
import { Button } from '@/components/ui/button'
import { WordGenPasswordGeneratorMessages } from '@/lib/i18n/types'

// Character sets for password generation
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz'
const NUMBER_CHARS = '0123456789'
const SYMBOL_CHARS = '!@#$%^&*()_-+=<>?/{}[]~|'

export default function PasswordGeneratorClient({ messages }: { messages: WordGenPasswordGeneratorMessages }) {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)

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

  return (
    <>
      <div className="bg-gray-800 text-gray-100 font-sans">
        <main className="max-w-4xl mx-auto px-4 pb-24">
          <h1 className="text-3xl font-bold text-center py-8">{messages.title}</h1>
          
          {/* Password Generator Section */}
          <div className="bg-gray-700 p-6 rounded-lg text-center mb-6">
            <h2 className="text-xl mb-4">{messages.generatedPassword}</h2>
            <div className="relative flex flex-col">
              <div className="relative w-full">
                <p className="text-2xl font-bold font-mono bg-gray-900 p-4 rounded-lg break-all min-h-[60px] flex items-center justify-center">
                  {password || messages.generatedPassword}
                </p>
              </div>
              <div className="w-full flex justify-end mt-4 space-x-4">
                <CopyButton
                  text={password}
                  copyText={messages.copyButton}
                  toastText={messages.copied}
                  variant="purple"
                  className="text-white hover:text-gray-300 transition-colors p-0 h-auto"
                  disabled={!password}
                />
                <DownloadButton
                  content={password}
                  filename="generated-password.txt"
                  variant="purple"
                  disabled={!password}
                />
              </div>
            </div>
          </div>

          {/* Password Settings Section */}
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <div className="mb-6">
              <label className="block text-lg mb-2">{messages.passwordLength}: {length}</label>
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
                <span>{messages.characterTypes.uppercase}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useLowercase}
                  onChange={(e) => setUseLowercase(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 rounded accent-purple-600"
                />
                <span>{messages.characterTypes.lowercase}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 rounded accent-purple-600"
                />
                <span>{messages.characterTypes.numbers}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 rounded accent-purple-600"
                />
                <span>{messages.characterTypes.symbols}</span>
              </label>
            </div>

            <Button
              onClick={generatePassword}
              variant="purple"
              size="lg"
              className="w-full mt-6"
            >
              {messages.generateButton}
            </Button>
          </div>

          {/* About Section */}
          <div className="mt-16 space-y-12">
            {/* Introduction */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{messages.catchphrase}</h2>
              <p className="text-lg text-gray-300">{messages.intro}</p>
            </div>

            {/* Features */}
            <div className="bg-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{messages.features.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.features.easyOperation.title}</h3>
                  <p className="text-gray-300">{messages.features.easyOperation.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.features.customization.title}</h3>
                  <p className="text-gray-300">{messages.features.customization.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.features.security.title}</h3>
                  <p className="text-gray-300">{messages.features.security.description}</p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{messages.useCases.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.useCases.onlineAccounts.title}</h3>
                  <p className="text-gray-300">{messages.useCases.onlineAccounts.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.useCases.corporate.title}</h3>
                  <p className="text-gray-300">{messages.useCases.corporate.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.useCases.privacy.title}</h3>
                  <p className="text-gray-300">{messages.useCases.privacy.description}</p>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{messages.technical.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.technical.algorithm.title}</h3>
                  <p className="text-gray-300">{messages.technical.algorithm.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.technical.performance.title}</h3>
                  <p className="text-gray-300">{messages.technical.performance.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{messages.technical.privacy.title}</h3>
                  <p className="text-gray-300">{messages.technical.privacy.description}</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{messages.faq.title}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{messages.faq.questions.security.question}</h3>
                  <p className="text-gray-300">{messages.faq.questions.security.answer}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{messages.faq.questions.customization.question}</h3>
                  <p className="text-gray-300">{messages.faq.questions.customization.answer}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{messages.faq.questions.commercial.question}</h3>
                  <p className="text-gray-300">{messages.faq.questions.commercial.answer}</p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">{messages.conclusion.title}</h2>
              <p className="text-gray-300">{messages.conclusion.description}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
} 
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
  description: {
    title: string
    intro: string
    features: {
      title: string
      list: string[]
    }
    howToUse: {
      title: string
      list: string[]
    }
    securityTips: {
      title: string
      list: string[]
    }
  }
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
          <div className="bg-gray-700 p-6 rounded-lg text-center">
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

          <div className="mt-6 bg-gray-700 p-6 rounded-lg">
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

          <div className="bg-gray-700 p-6 rounded-lg mt-6">
            <h2 className="text-xl mb-4 text-center">{translations.description.title}</h2>
            <p className="mb-4">
              {translations.description.intro}
            </p>
            
            <h3 className="text-lg mb-2 font-bold">{translations.description.features.title}</h3>
            <ul className="list-disc pl-5 mb-4">
              {translations.description.features.list.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h3 className="text-lg mb-2 font-bold">{translations.description.howToUse.title}</h3>
            <ul className="list-disc pl-5 mb-4">
              {translations.description.howToUse.list.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            <h3 className="text-lg mb-2 font-bold">{translations.description.securityTips.title}</h3>
            <ul className="list-disc pl-5">
              {translations.description.securityTips.list.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  )
} 
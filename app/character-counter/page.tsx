'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [searchString, setSearchString] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [placeholderText, setPlaceholderText] = useState('Enter text')
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationStartedRef = useRef(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  useEffect(() => {
    if (!animationStartedRef.current) {
      animationStartedRef.current = true
      const fullPlaceholder = '...'
      let i = 0
      const animate = () => {
        if (i < fullPlaceholder.length) {
          setPlaceholderText('Enter text' + fullPlaceholder.substring(0, i + 1))
          i++
        } else {
          i = 0
        }
      }
      animationIntervalRef.current = setInterval(animate, 300)
    }
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
      }
    }
  }, [])

  const charCount = text.length
  const newlineCount = (text.match(/\n/g) || []).length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const byteCount = new TextEncoder().encode(text).length

  const countOccurrences = (str: string, searchStr: string) => {
    if (!searchStr) return 0
    return (str.match(new RegExp(searchStr, 'g')) || []).length
  }

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h2 className="text-xl mb-4">Character Count</h2>
          <p className="text-4xl font-bold">{charCount}</p>
        </div>

        <textarea
          className="w-full mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={placeholderText}
          rows={6}
          value={text}
          onChange={handleChange}
        />

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">Line Count</h3>
            <p className="text-3xl font-bold">{newlineCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">Word Count</h3>
            <p className="text-3xl font-bold">{wordCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">Byte Count</h3>
            <p className="text-3xl font-bold">{byteCount}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h3 className="text-xl mb-4 text-center">Search String</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter search string"
              className="flex-1 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchString}
              onChange={handleSearchChange}
            />
            {searchString && (
              <div className="bg-gray-800 p-4 rounded-lg flex-1 text-center">
                <span className="text-purple-400 font-mono">{searchString}</span>
                <span className="ml-2">Occurrences:</span>
                <span className="text-2xl font-bold ml-2">
                  {countOccurrences(text, searchString)}
                </span>
              </div>
            )}
          </div>
          
          {searchString && text && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Search Result Preview:</p>
              <div className="font-mono break-all">
                {text.split(new RegExp(`(${searchString})`, 'g')).map((part, i) => 
                  part === searchString ? (
                    <span key={i} className="bg-purple-500 px-1 rounded">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="mt-6 w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Copy
          </button>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">Easy & Simple! High-performance character counting tool (free)</h2>
          <p className="mb-4">Our free and easy-to-use tool instantly checks character count, line count, and byte count in real time!
SNS posting, essays, ad copy creation, etc. Perfect for all kinds of situations, such as ad copy creation.
*Dark mode supported, with a carefully designed, eye-friendly design!</p>
          
          <h3 className="text-lg mb-2 font-bold">Easy steps to use</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Enter text
              <p className="ml-5">Copy and paste text into the input area, or type and edit directly.
*Simply typing will instantly count the number of characters, lines, words (English only), and bytes (multi-byte compatible).</p>
            </li>
            <li>Real-time result confirmation
              <p className="ml-5">As you type, the real-time count displays various values, allowing you to check them instantly.</p>
            </li>
            <li>Utilize results
              <p className="ml-5">Results can be copied with the copy button. Please use the displayed numbers as a reference for SNS posts, ad copy, etc.</p>
            </li>
          </ul>

          <h3 className="text-lg mb-2 font-bold">Voices of users</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Q1. What is a character counting app?</h4>
              <p className="ml-5">A: A character counting app is a tool that instantly calculates the number of characters in entered text and displays accurate results. This prevents manual counting errors and enables efficient text creation and editing.</p>
            </div>
            <div>
              <h4 className="font-bold">Q2. What scenarios can it be used in?</h4>
              <p className="ml-5">A: Main usage scenarios are:</p>
              <ul className="list-disc pl-10">
                <li>Writing/blog posting</li>
                <li>SNS posting</li>
                <li>SEO optimization</li>
                <li>Ad copy creation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Q3. How are full-width and half-width characters counted?</h4>
              <p className="ml-5">A: Both full-width and half-width characters are properly recognized and counted accurately. Special symbols and line breaks are also counted.</p>
            </div>
            <div>
              <h4 className="font-bold">Q4. Is it compatible with multiple languages?</h4>
              <p className="ml-5">A: Yes, the app supports multiple languages including Japanese and English, with proper handling of characters and symbols for each language.</p>
            </div>
            <div>
              <h4 className="font-bold">Q5. What precautions should I take?</h4>
              <p className="ml-5">Please check the following points:</p>
              <ul className="list-disc pl-10">
                <li>Character counting rules</li>
                <li>Supported languages and symbols</li>
                <li>Free vs paid version differences</li>
                <li>Privacy policy</li>
              </ul>
            </div>
          </div>

          <h2 className="text-lg mb-2 font-bold text-center">What is a Character Counter App?</h2>
          <p className="ml-5">A character counter app is a tool that instantly calculates and displays the number of characters in entered text. Here are its key features and roles:</p>
          
          <h4 className="font-bold mt-4">Core Features and Functions</h4>
          <ul className="list-disc pl-10">
            <li>Accurate character counting: Automatically calculates and displays precise character counts for text entered in editors or web forms, preventing manual counting errors and saving time</li>
            <li>Real-time feedback: Character count updates as you type, allowing efficient writing within target character limits</li>
          </ul>

          <h4 className="font-bold mt-4">Common Use Cases</h4>
          <ul className="list-disc pl-10">
            <li>Writing & blogging: Helps maintain specified character count guidelines for articles and blog posts</li>
            <li>Social media & advertising: Verifies optimal length before posting on platforms with character limits like Twitter</li>
            <li>SEO optimization: Assists in maintaining appropriate content volume and structure</li>
          </ul>

          <h4 className="font-bold mt-4">Advanced Features</h4>
          <ul className="list-disc pl-10">
            <li>Multi-language support: Handles various languages including English and Japanese, accurately counting full-width and half-width characters</li>
            <li>Additional statistics: Provides detailed metrics like word count, line count, and special character counting</li>
            <li>User-friendly interface: Features simple, intuitive design suitable for users of all experience levels</li>
          </ul>

          <h4 className="font-bold mt-4">Why Its Essential</h4>
          <ul className="list-disc pl-10">
            <li>Improved efficiency: Eliminates manual counting time and effort</li>
            <li>Error prevention: Reduces manual counting mistakes and oversights</li>
            <li>Compliance support: Helps meet strict character count requirements for various formats and platforms</li>
          </ul>

          <p className="mt-4">For these reasons, character counter apps are widely adopted as essential tools in writing, marketing, SEO optimization, and various other scenarios.</p>
        </div>
      </main>

      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={handleCopy}
          className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          title="Copy text"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
            />
          </svg>
        </button>
      </div>

      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Copied!
        </div>
      )}
    </div>
  )
}
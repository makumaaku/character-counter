'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [searchString, setSearchString] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [placeholderText, setPlaceholderText] = useState('テキストを入力してください')
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
      console.error('コピーに失敗しました:', error)
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
          setPlaceholderText('テキストを入力してください' + fullPlaceholder.substring(0, i + 1))
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
      <header className="bg-purple-500 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Boring.</h1>
        <h2 className="text-xl">文字数カウンター</h2>
        <div className="w-[76px]"></div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h2 className="text-xl mb-4">文字数</h2>
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
            <h3 className="text-lg mb-2">改行数</h3>
            <p className="text-3xl font-bold">{newlineCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">単語数</h3>
            <p className="text-3xl font-bold">{wordCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">バイト数</h3>
            <p className="text-3xl font-bold">{byteCount}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h3 className="text-xl mb-4 text-center">文字列検索</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="検索文字列を入力"
              className="flex-1 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchString}
              onChange={handleSearchChange}
            />
            {searchString && (
              <div className="bg-gray-800 p-4 rounded-lg flex-1 text-center">
                <span className="text-purple-400 font-mono">{searchString}</span>
                <span className="ml-2">の出現回数：</span>
                <span className="text-2xl font-bold ml-2">
                  {countOccurrences(text, searchString)}
                </span>
              </div>
            )}
          </div>
          
          {searchString && text && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">検索結果のプレビュー：</p>
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
        </div>

        <button
          onClick={handleCopy}
          className="mt-6 w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          コピー
        </button>
      </main>

      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={handleCopy}
          className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          title="テキストをコピー"
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
          コピーしました！
        </div>
      )}

      <footer className="bg-gray-900 text-center py-6 mt-10">
        <div className="w-12 h-12 bg-black rounded-full mx-auto flex items-center justify-center">
          <span className="text-white font-bold">Boring.</span>
        </div>
        <p className="text-gray-400 mt-2">&copy; Boring Inc</p>
      </footer>
    </div>
  )
}
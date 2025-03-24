'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { translate } from '@/lib/i18n/client'

interface UrlFormProps {
  onSubmit: (url: string) => void
  isLoading: boolean
}

export default function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const params = useParams()
  const lang = params.lang as string
  const [url, setUrl] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 基本的なURL検証
    if (!url) {
      setError('URL is required')
      return
    }

    try {
      new URL(url) // URLが有効かチェック
      setError('')
      onSubmit(url)
    } catch (err) {
      setError('Please enter a valid URL (e.g. https://example.com)')
    }
  }

  return (
    <div className="w-full p-6 bg-gray-700 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-lg font-medium text-gray-200 mb-2">
            {translate(lang, 'metaCraftForLlm.url.label')}
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              id="url"
              className="flex-grow px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={translate(lang, 'metaCraftForLlm.url.placeholder')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            >
              {isLoading
                ? translate(lang, 'metaCraftForLlm.loading')
                : translate(lang, 'metaCraftForLlm.url.button')}
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-400 text-sm mt-2">{error}</div>
        )}
      </form>
    </div>
  )
} 
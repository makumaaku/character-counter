'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { translate } from '@/lib/i18n/client'

export default function QRGenerationPage() {
  const [text, setText] = useState('')
  const params = useParams()
  const lang = params.lang as string
  const t = (key: string) => translate(lang, key)
  const MAX_CHARS = 500

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value
    if (inputText.length <= MAX_CHARS) {
      setText(inputText)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-6 rounded-lg">
        <textarea
          className="w-full bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={t('qrGeneration.placeholder')}
          rows={6}
          value={text}
          onChange={handleChange}
          maxLength={MAX_CHARS}
        />
        <div className="text-right text-sm text-gray-300 mt-1">
          {text.length}/{MAX_CHARS}
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
          {text ? (
            <QRCodeCanvas value={text} size={256} fgColor="#f8fafc" bgColor="#4b5563" />
          ) : (
            <p className="text-white">{t('qrGeneration.emptyState')}</p>
          )}
        </div>
      </div>
    </div>
  )
}
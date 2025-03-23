'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'
import { useMessages } from '@/hooks/useMessages'

type QRGeneratorMessages = {
  placeholder: string;
  emptyState: string;
};

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const MAX_CHARS = 500
  const messages = useMessages<QRGeneratorMessages>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    if (inputText.length <= MAX_CHARS) {
      setText(inputText)
    }
  }

  if (!messages) {
    return <div className="text-center my-8 font-bold text-gray-400">Loading translations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 p-6 rounded-lg">
        <input
          type="text"
          className="w-full bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={messages.placeholder}
          value={text}
          onChange={handleChange}
          maxLength={MAX_CHARS}
          aria-label={messages.placeholder}
        />
        <div className="text-right text-sm text-gray-300 mt-1">
          {text.length}/{MAX_CHARS}
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
          {text ? (
            <QRCodeCanvas 
              value={text} 
              size={256} 
              fgColor="#f8fafc" 
              bgColor="#4b5563"
              aria-label={`QR code for: ${text}`}
            />
          ) : (
            <p className="text-white">{messages.emptyState}</p>
          )}
        </div>
      </div>
    </div>
  )
} 
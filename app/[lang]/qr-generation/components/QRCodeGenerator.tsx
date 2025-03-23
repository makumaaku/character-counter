'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/CopyButton'
import { useMessages } from '@/hooks/useMessages'

type QRGeneratorMessages = {
  title: string;
  description: string;
  ui: {
    placeholder: string;
    downloadButton: string;
    emptyState: string;
  };
};

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const MAX_CHARS = 500
  const messages = useMessages<QRGeneratorMessages>();


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-100 mb-2">{messages.title}</h1>
            <p className="text-gray-300">{messages.description}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="qr-input" className="block text-sm font-medium text-gray-300 mb-2">
                {messages.ui.placeholder}
              </label>
              <textarea
                id="qr-input"
                className="w-full bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={messages.ui.placeholder}
                rows={6}
                value={text}
                onChange={handleChange}
                maxLength={MAX_CHARS}
                aria-label={messages.ui.placeholder}
              />
              <div className="text-right text-sm text-gray-300 mt-1">
                {text.length}/{MAX_CHARS}
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg text-center">
              {text ? (
                <>
                  <QRCodeCanvas 
                    value={text} 
                    size={256} 
                    fgColor="#f8fafc" 
                    bgColor="#4b5563"
                    aria-label={`QR code for: ${text}`}
                  />
                  <div className="mt-4 flex justify-center gap-2">
                    <CopyButton 
                      text={text}
                      variant="outline"
                    />
                    <Button
                      variant="purple"
                      onClick={() => {
                        const canvas = document.querySelector('canvas');
                        if (canvas) {
                          const link = document.createElement('a');
                          link.download = 'qr-code.png';
                          link.href = canvas.toDataURL();
                          link.click();
                        }
                      }}
                    >
                      {messages.ui.downloadButton}
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-white">{messages.ui.emptyState}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'

export default function QRGenerationPage() {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="bg-gray-800 text-gray-100 font-sans p-4">
      <header className="bg-purple-500 text-white flex justify-between items-center p-4 rounded-lg mb-4">
        <h2 className="text-xl font-bold">QRコード生成</h2>
      </header>

      <main className="max-w-4xl mx-auto">
        <textarea
          className="w-full mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="QRコードに変換するテキストを入力してください"
          rows={6}
          value={text}
          onChange={handleChange}
        />

        <div className="mt-6 p-4 bg-gray-700 rounded-lg text-center">
          {text ? (
            <QRCodeCanvas value={text} size={256} fgColor="#f8fafc" bgColor="#4b5563" />
          ) : (
            <p>テキストを入力するとQRコードが表示されます</p>
          )}
        </div>
      </main>

      <footer className="bg-gray-900 text-center py-6 mt-10 rounded-lg">
        <p className="text-gray-400">&copy; Boring Inc</p>
      </footer>
    </div>
  )
}
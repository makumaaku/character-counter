'use client'

import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import FileUploadArea from '../../components/FileUploadArea'

type Props = {
  translations: {
    title: string
    description: string
    form: {
      upload: {
        label: string
        button: string
        dragDrop: string
      }
      convert: string
    }
    result: {
      download: string
    }
    status: {
      processing: string
      noFile: string
    }
    error: {
      fileType: string
      fileSize: string
    }
  }
}

export default function JpgToPngClient({ translations }: Props) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null)

  // クリーンアップ処理
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('data:')) {
        URL.revokeObjectURL(previewUrl)
      }
      if (convertedImageUrl && !convertedImageUrl.startsWith('data:')) {
        URL.revokeObjectURL(convertedImageUrl)
      }
    }
  }, [previewUrl, convertedImageUrl])

  // ファイルアップロードエリアからのエラーハンドリング
  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage)
  }

  // ファイルアップロードエリアからのファイル選択ハンドリング
  const handleFilesSelected = (files: File[]) => {
    if (files.length === 0) return

    const file = files[0] // 複数選択の場合でも最初のファイルのみ使用
    
    setError(null)
    setConvertedImageUrl(null)
    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const convertToPng = async () => {
    if (!selectedFile) {
      setError(translations.status.noFile)
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Create a new image element from the selected file
      const image = new Image()
      image.src = URL.createObjectURL(selectedFile)

      await new Promise((resolve) => {
        image.onload = resolve
      })

      // Create a canvas to draw the image
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Could not get canvas context')
      }
      
      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0)

      // Convert canvas to PNG
      const pngUrl = canvas.toDataURL('image/png')
      setConvertedImageUrl(pngUrl)

      // Release the object URL
      URL.revokeObjectURL(image.src)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadPng = () => {
    if (!convertedImageUrl || !selectedFile) return

    // Extract filename from the original file and change extension to .png
    const originalFilename = selectedFile.name || 'image.jpg'
    const pngFilename = originalFilename.replace(/\.(jpg|jpeg)$/i, '.png')

    // Convert data URL to Blob and download
    fetch(convertedImageUrl)
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, pngFilename)
      })
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-4">{translations.title}</h1>
      <p className="text-gray-300 mb-6">{translations.description}</p>

      {/* 共通のファイルアップロードエリアコンポーネント */}
      <div className="mb-6">
        <FileUploadArea
          title={translations.form.upload.label}
          dragDropText={translations.form.upload.dragDrop}
          limitText="最大ファイルサイズ: 10MB"
          buttonText={translations.form.upload.button}
          accept=".jpg,.jpeg"
          multiple={false}
          maxSizeMB={10}
          validExtensions={['jpg', 'jpeg']}
          onFilesSelected={handleFilesSelected}
          onError={handleUploadError}
        />
      </div>

      {error && (
        <div className="mt-4 bg-red-900/30 border border-red-700 p-3 rounded-md text-red-200">
          {error}
        </div>
      )}

      {previewUrl && !convertedImageUrl && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">プレビュー</h2>
          <div className="mt-2 p-4 bg-gray-800 rounded-lg">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-w-full h-auto max-h-96 mx-auto"
            />
          </div>
          <button
            onClick={convertToPng}
            disabled={isProcessing}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isProcessing ? translations.status.processing : translations.form.convert}
          </button>
        </div>
      )}

      {convertedImageUrl && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">変換後のPNG</h2>
          <div className="mt-2 p-4 bg-gray-800 rounded-lg">
            <img
              src={convertedImageUrl}
              alt="Converted PNG"
              className="max-w-full h-auto max-h-96 mx-auto"
            />
          </div>
          <button
            onClick={downloadPng}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            {translations.result.download}
          </button>
        </div>
      )}
    </div>
  )
} 
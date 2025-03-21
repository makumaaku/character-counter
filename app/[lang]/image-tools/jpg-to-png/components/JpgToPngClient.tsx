'use client'

import { useState, useRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { saveAs } from 'file-saver'

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileChange(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false
  })

  const handleFileChange = (file: File | undefined) => {
    if (!file) return

    setError(null)
    setConvertedImageUrl(null)

    // Check file type
    if (!file.type.includes('image/jpeg')) {
      setError(translations.error.fileType)
      return
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(translations.error.fileSize)
      return
    }

    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    handleFileChange(file)
  }

  const handleSelectFileClick = () => {
    fileInputRef.current?.click()
  }

  const convertToPng = async () => {
    if (!selectedFile) return

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
    if (!convertedImageUrl) return

    // Extract filename from the original file and change extension to .png
    const originalFilename = selectedFile?.name || 'image.jpg'
    const pngFilename = originalFilename.replace(/\.(jpg|jpeg)$/i, '.png')

    // Convert data URL to Blob and download
    fetch(convertedImageUrl)
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, pngFilename)
      })
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-4">{translations.title}</h1>
      <p className="text-lg text-gray-300 mb-8">{translations.description}</p>

      <div className="mb-8">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            {translations.form.upload.label}
          </label>
          
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors ${
              isDragActive ? 'border-blue-500 bg-gray-600' : 'border-gray-500'
            }`}
          >
            <input 
              {...getInputProps()} 
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <p>{translations.form.upload.dragDrop}</p>
            <button
              type="button"
              onClick={handleSelectFileClick}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              {translations.form.upload.button}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}

        {previewUrl && !convertedImageUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Preview</h2>
            <div className="mt-2 p-4 bg-gray-700 rounded-lg">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-full h-auto max-h-96 mx-auto"
              />
            </div>
            <button
              onClick={convertToPng}
              disabled={isProcessing}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50"
            >
              {isProcessing ? translations.status.processing : translations.form.convert}
            </button>
          </div>
        )}

        {convertedImageUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Converted PNG</h2>
            <div className="mt-2 p-4 bg-gray-700 rounded-lg">
              <img
                src={convertedImageUrl}
                alt="Converted PNG"
                className="max-w-full h-auto max-h-96 mx-auto"
              />
            </div>
            <button
              onClick={downloadPng}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              {translations.result.download}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 
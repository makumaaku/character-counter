'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { saveAs } from 'file-saver'
import { useParams } from 'next/navigation'
import Button from '@/components/ui/button'
import { PdfToolsHeicToPdfMessages } from '@/lib/i18n/types'

type Props = {
  messages: PdfToolsHeicToPdfMessages
}

export default function HeicToPdfClient({ messages }: Props) {
  const params = useParams()
  const lang = params.lang as string
  const [heicFile, setHeicFile] = useState<File | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [conversionSuccess, setConversionSuccess] = useState(false)

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    setPdfBlob(null)
    setConversionSuccess(false)
    
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    
    // Check if file is HEIC
    if (!file.name.toLowerCase().endsWith('.heic')) {
      setError(messages.error.fileType)
      return
    }
    
    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setError(messages.error.fileSize)
      return
    }
    
    setHeicFile(file)
  }, [messages.error.fileType, messages.error.fileSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/heic': ['.heic']
    },
    maxFiles: 1
  })

  // Convert HEIC to PDF using API
  const convertToPdf = async () => {
    if (!heicFile) return
    
    try {
      setIsConverting(true)
      setError(null)
      setProgress(10)
      setPdfBlob(null)
      setConversionSuccess(false)
      
      // Create form data
      const formData = new FormData()
      formData.append('file', heicFile)
      
      setProgress(30)
      
      // Send request to API
      const response = await fetch(`/${lang}/api/pdf-tools/heic-to-pdf`, {
        method: 'POST',
        body: formData
      })
      
      setProgress(70)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error during conversion')
      }
      
      // Get the PDF blob
      const blob = await response.blob()
      
      // Set the PDF blob
      setPdfBlob(blob)
      
      setProgress(100)
      
      // Set conversion success
      setConversionSuccess(true)
      
      // Auto download
      saveAs(blob, `${heicFile.name.replace('.heic', '')}.pdf`)
    } catch (err) {
      console.error('Error during conversion:', err)
      setError(messages.error.conversion)
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{messages.title}</h1>
        <p className="text-gray-300">{messages.description}</p>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 mb-8">
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            {messages.form.upload.label}
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-gray-600' : 'border-gray-500 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-gray-300 mb-2">
              {isDragActive
                ? messages.form.upload.dragDrop
                : messages.form.upload.button}
            </p>
            {heicFile && (
              <p className="text-green-400 mt-2">
                {heicFile.name} ({(heicFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>

        {heicFile && (
          <Button
            onClick={convertToPdf}
            disabled={isConverting}
            variant="purple"
          >
            {isConverting ? messages.status.processing : messages.form.convert}
          </Button>
        )}
        
        {isConverting && (
          <div className="mt-4">
            <div className="w-full bg-gray-600 rounded-full h-2.5 mb-2">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-300 text-sm">{progress}%</p>
          </div>
        )}
        
        {conversionSuccess && (
          <div className="mt-4 p-4 bg-green-800 bg-opacity-20 border border-green-600 rounded-lg">
            <p className="text-green-400 text-center">{messages.success.message}</p>
          </div>
        )}
      </div>

      {pdfBlob && !isConverting && (
        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">PDF Preview</h2>
          <div className="flex justify-center mb-4">
            <iframe
              src={URL.createObjectURL(pdfBlob)}
              className="w-full h-96 border border-gray-600 rounded"
              title="PDF Preview"
            />
          </div>
          <Button
            onClick={() => saveAs(pdfBlob, `${heicFile?.name.replace('.heic', '')}.pdf`)}
            variant="purple"
          >
            {messages.result.download}
          </Button>
        </div>
      )}
    </div>
  )
} 
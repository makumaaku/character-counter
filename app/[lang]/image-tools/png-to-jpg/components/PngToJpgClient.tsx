'use client'

import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import JSZip from 'jszip'
import Image from 'next/image'
import FileUploadArea from '@/components/FileUploadArea'
import { Button } from '@/components/ui/button'
import { ImageToolsPngToJpgMessages } from '@/lib/i18n/types'

type Props = {
  translations: ImageToolsPngToJpgMessages
}

type ConvertedFile = {
  originalName: string
  jpgUrl: string
  jpgBlob: Blob
}

export default function PngToJpgClient({ translations }: Props) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0)
  const [conversionComplete, setConversionComplete] = useState(false)

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('data:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // ファイルアップロードエリアからのエラーハンドリング
  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage)
  }

  // ファイルアップロードエリアからのファイル選択ハンドリング
  const handleFilesSelected = (files: File[]) => {
    setError(null)
    setConvertedFiles([])
    setPreviewUrl(null)
    setConversionComplete(false)
    setSelectedFiles(files)

    // Create preview for the first file
    if (files.length > 0) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(files[0])
    }
  }

  const convertToJpg = async () => {
    if (!selectedFiles.length) {
      setError(translations.status.noFile)
      return
    }

    setIsProcessing(true)
    setError(null)
    setConvertedFiles([])
    setConversionComplete(false)

    try {
      const converted: ConvertedFile[] = []

      // Process each file sequentially to avoid memory issues
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        
        // Create a URL for the image
        const imageUrl = URL.createObjectURL(file)
        
        // Create an image element
        const img = new globalThis.Image()
        
        // Wait for the image to load
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error('Failed to load image'))
          img.src = imageUrl
        })
        
        // Create a canvas to draw the image
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          throw new Error('Could not get canvas context')
        }
        
        // Draw the image with white background (to handle transparency)
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        
        // Convert canvas to JPG with high quality (0.9)
        const jpgUrl = canvas.toDataURL('image/jpeg', 0.9)
        
        // Convert data URL to Blob
        const byteString = atob(jpgUrl.split(',')[1])
        const mimeType = jpgUrl.split(',')[0].split(':')[1].split(';')[0]
        const arrayBuffer = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(arrayBuffer)
        
        for (let j = 0; j < byteString.length; j++) {
          ia[j] = byteString.charCodeAt(j)
        }
        
        const jpgBlob = new Blob([arrayBuffer], { type: mimeType })
        
        // Generate filename by replacing extension
        const originalName = file.name
        const jpgName = originalName.replace(/\.png$/i, '.jpg')
        
        // Add to converted files
        converted.push({
          originalName: jpgName,
          jpgUrl,
          jpgBlob
        })
        
        // Clean up the object URL
        URL.revokeObjectURL(imageUrl)
      }
      
      setConvertedFiles(converted)
      
      // Set preview to the first converted file
      if (converted.length > 0) {
        setPreviewUrl(converted[0].jpgUrl)
        setCurrentPreviewIndex(0)
      }
      
      setConversionComplete(true)
    } catch (error) {
      console.error('Error converting PNG to JPG:', error)
      setError(translations.error.conversionFailed)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadJpg = (index: number) => {
    if (index >= 0 && index < convertedFiles.length) {
      const file = convertedFiles[index]
      saveAs(file.jpgBlob, file.originalName)
    }
  }

  const downloadAllJpgs = async () => {
    if (convertedFiles.length === 0) return
    
    if (convertedFiles.length === 1) {
      // If there's only one file, download it directly
      downloadJpg(0)
      return
    }
    
    // For multiple files, create a zip
    const zip = new JSZip()
    
    // Add all files to the zip
    convertedFiles.forEach(file => {
      zip.file(file.originalName, file.jpgBlob)
    })
    
    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    
    // Download the zip
    saveAs(zipBlob, 'png-to-jpg-converted.zip')
  }

  const handlePreview = (index: number) => {
    if (index >= 0 && index < convertedFiles.length) {
      setPreviewUrl(convertedFiles[index].jpgUrl)
      setCurrentPreviewIndex(index)
    }
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
          limitText={translations.form.upload.limitText}
          buttonText={translations.form.upload.button}
          accept=".png"
          multiple={true}
          maxSizeMB={20}
          totalMaxSizeMB={100}
          validExtensions={['png']}
          onFilesSelected={handleFilesSelected}
          onError={handleUploadError}
        />
      </div>

      {previewUrl && !conversionComplete && (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{translations.result.preview}</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <Image 
              src={previewUrl} 
              alt="Preview"
              className="max-w-full h-auto max-h-96 mx-auto"
              width={500}
              height={400}
              unoptimized
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-6 text-center">
        <Button
          onClick={convertToJpg}
          disabled={isProcessing || selectedFiles.length === 0}
          isLoading={isProcessing}
          variant={selectedFiles.length === 0 ? "secondary" : "purple"}
        >
          {isProcessing ? translations.status.processing : translations.form.convert}
        </Button>
      </div>
      
      <p className="mt-2 text-sm text-gray-400 text-center">
        {translations.status.browserProcessing}
      </p>

      {conversionComplete && convertedFiles.length > 0 && (
        <div className="mt-8 bg-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{translations.status.success}</h2>
            <Button
              onClick={downloadAllJpgs}
              variant="purple"
              className="inline-flex items-center"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              {translations.result.downloadAll}
            </Button>
          </div>
          
          <div className="mb-4">
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <Image 
                src={previewUrl || ''} 
                alt="Converted JPG"
                className="max-w-full h-auto max-h-96 mx-auto"
                width={500}
                height={400}
                unoptimized
              />
            </div>
            
            <div className="text-center mb-4">
              <Button
                onClick={() => downloadJpg(currentPreviewIndex)}
                variant="purple"
                className="inline-flex items-center"
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                {translations.result.download}
              </Button>
            </div>
          </div>
          
          {convertedFiles.length > 1 && (
            <div>
              <h3 className="font-semibold mb-2">All Converted Files:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {convertedFiles.map((file, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer p-2 rounded-lg ${
                      currentPreviewIndex === index 
                        ? 'bg-blue-800 ring-2 ring-blue-500' 
                        : 'bg-gray-800 hover:bg-gray-600'
                    }`}
                    onClick={() => handlePreview(index)}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-900 rounded mb-1">
                      <Image 
                        src={file.jpgUrl} 
                        alt={file.originalName}
                        className="w-full h-full object-contain"
                        width={100}
                        height={100}
                        unoptimized
                      />
                    </div>
                    <p className="text-xs truncate">{file.originalName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 
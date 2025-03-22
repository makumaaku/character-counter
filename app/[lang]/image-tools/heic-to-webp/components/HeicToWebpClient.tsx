'use client'

import { useState } from 'react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import heicConvert from 'heic-convert/browser'
import FileUploadArea from '@/components/FileUploadArea'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
// heic-convert の型定義
interface HeicConvertOptions {
  buffer: Uint8Array;
  format: 'JPEG' | 'PNG';  // 'WEBP' is not supported by heic-convert
  quality: number;
}

type ConvertedFile = {
  originalFile: File
  convertedUrl: string
  fileName: string
  status: 'processing' | 'done' | 'error'
  error?: string
}

type Props = {
  translations: {
    title: string
    description: string
    upload?: {
      limit: string
    }
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
      downloadAll: string
    }
    status: {
      processing: string
      noFile: string
      success: string
      convertingFile: string
    }
    error: {
      fileType: string
      fileSize: string
      conversion: string
    }
  }
}

export default function HeicToWebpClient({ translations }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files)
    setConvertedFiles([])
    setError(null)
  }
  
  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const convertToWebP = async () => {
    if (selectedFiles.length === 0) {
      setError(translations.error.fileType)
      return
    }

    setIsProcessing(true)
    setError(null)

    // Clean up previous converted files
    convertedFiles.forEach(file => {
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl)
      }
    })
    setConvertedFiles([])

    try {
      const newConvertedFiles: ConvertedFile[] = []

      // Process each file
      for (const file of selectedFiles) {
        const fileName = file.name.replace(/\.(heic|heif)$/i, '.webp')
        
        // Add to state with 'processing' status
        newConvertedFiles.push({
          originalFile: file,
          fileName,
          convertedUrl: '',
          status: 'processing'
        })
        
        // Update state to show processing
        setConvertedFiles([...newConvertedFiles])
        
        try {
          // Read file as ArrayBuffer
          const arrayBuffer = await file.arrayBuffer()
          
          // Step 1: Convert HEIC to PNG using heic-convert
          // @ts-expect-error - heic-convert types are not perfect
          const pngBuffer = await heicConvert({
            buffer: new Uint8Array(arrayBuffer),
            format: 'PNG',  // Use PNG as intermediate format
            quality: 1.0  // Use highest quality for PNG
          } as HeicConvertOptions)
          
          // Step 2: Convert PNG to WebP
          // Create PNG image from buffer
          const pngBlob = new Blob([pngBuffer], { type: 'image/png' })
          const pngUrl = URL.createObjectURL(pngBlob)
          
          // Create a canvas to convert PNG to WebP
          const img = new globalThis.Image()
          img.src = pngUrl
          
          // Wait for image to load
          await new Promise(resolve => {
            img.onload = resolve
          })
          
          // Draw image on canvas
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          if (!ctx) throw new Error('Failed to get canvas context')
          ctx.drawImage(img, 0, 0)
          
          // Convert to WebP
          // We can release the PNG URL now
          URL.revokeObjectURL(pngUrl)
          
          // Get WebP blob from canvas
          const webPBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(blob => {
              if (blob) resolve(blob)
              else reject(new Error('Failed to convert to WebP'))
            }, 'image/webp', 0.8)
          })
          
          // Create URL for preview
          const webPUrl = URL.createObjectURL(webPBlob)
          
          // Update file status to 'done'
          const fileIndex = newConvertedFiles.findIndex(
            f => f.originalFile === file
          )
          
          if (fileIndex !== -1) {
            newConvertedFiles[fileIndex] = {
              ...newConvertedFiles[fileIndex],
              convertedUrl: webPUrl,
              status: 'done'
            }
            
            setConvertedFiles([...newConvertedFiles])
          }
        } catch (conversionError) {
          // Handle conversion error for this file
          const errorMessage = (conversionError as Error).message || 'Unknown error'
          const fileIndex = newConvertedFiles.findIndex(
            f => f.originalFile === file
          )
          
          if (fileIndex !== -1) {
            newConvertedFiles[fileIndex] = {
              ...newConvertedFiles[fileIndex],
              status: 'error',
              error: errorMessage
            }
          }
          
          setConvertedFiles([...newConvertedFiles])
          
          setError(translations.error.conversion.replace('{error}', errorMessage))
        }
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadWebP = (fileIndex: number) => {
    const file = convertedFiles[fileIndex]
    if (!file || file.status !== 'done') return

    fetch(file.convertedUrl)
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, file.fileName)
      })
  }

  const downloadAllWebPs = async () => {
    const successfulFiles = convertedFiles.filter(file => file.status === 'done')
    if (successfulFiles.length === 0) return
    
    if (successfulFiles.length === 1) {
      // If only one file, just download it directly
      downloadWebP(convertedFiles.findIndex(file => file.status === 'done'))
      return
    }

    // Create a zip file for multiple downloads
    const zip = new JSZip()
    
    // Add all successful conversions to zip
    for (const file of successfulFiles) {
      const blob = await fetch(file.convertedUrl).then(res => res.blob())
      zip.file(file.fileName, blob)
    }

    // Generate and download the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, 'converted_images.zip')
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-4">{translations.title}</h1>
      <p className="text-lg text-gray-300 mb-8">{translations.description}</p>

      <div className="mb-8">
        <FileUploadArea
          title={translations.form.upload.label}
          dragDropText={translations.form.upload.dragDrop}
          limitText={translations.upload?.limit || "Maximum file size: 10MB per file"}
          buttonText={translations.form.upload.button}
          accept=".heic,.heif"
          multiple={true}
          maxSizeMB={10}
          validExtensions={['heic', 'heif']}
          onFilesSelected={handleFilesSelected}
          onError={handleError}
        />

        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <p className="text-gray-300 mb-2">
              {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
            </p>
            <Button
              type="button"
              onClick={convertToWebP}
              disabled={isProcessing}
              isLoading={isProcessing}
              variant="purple"
            >
              {isProcessing ? translations.status.processing : translations.form.convert}
            </Button>
          </div>
        )}
      </div>

      {convertedFiles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          
          <div className="mb-4">
            <Button
              type="button"
              onClick={downloadAllWebPs}
              variant="purple"
            >
              {translations.result.downloadAll}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {convertedFiles.map((file, index) => (
              <div 
                key={index} 
                className={`relative border rounded-lg overflow-hidden ${
                  file.status === 'error' ? 'border-red-500' : 'border-gray-500'
                }`}
              >
                {file.status === 'processing' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mx-auto"></div>
                      <p className="mt-2">{translations.status.convertingFile.replace('{filename}', file.originalFile.name)}</p>
                    </div>
                  </div>
                )}
                
                {file.status === 'error' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="text-red-500 text-center p-4">
                      <p>Error: {file.error}</p>
                    </div>
                  </div>
                )}
                
                {file.status === 'done' && (
                  <>
                    <div className="h-48 bg-gray-800 flex items-center justify-center">
                    <Image
                              src={file.convertedUrl} 
                              alt={`Converted ${file.fileName}`}
                              className="max-h-full max-w-full object-contain"
                              width={200}
                              height={150}
                              unoptimized
                            />
                   
                    </div>
                    <div className="p-3 bg-gray-700">
                      <p className="text-sm text-gray-300 truncate">{file.fileName}</p>
                      <Button
                        type="button"
                        onClick={() => downloadWebP(index)}
                        variant="purple"
                        className="mt-2 w-full"
                      >
                        {translations.result.download}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 
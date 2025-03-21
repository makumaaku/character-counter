'use client'

import { useState, useRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import heic2any from 'heic2any'

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
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileChange(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/heic': ['.heic', '.HEIC'],
      'image/heif': ['.heif', '.HEIF']
    },
    maxSize: MAX_FILE_SIZE,
    multiple: true
  })

  const handleFileChange = (files: File[]) => {
    if (!files.length) return

    setError(null)
    setConvertedFiles([])

    // Filter valid files
    const validFiles = files.filter(file => {
      // Check file type (HEIC or HEIF)
      const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                     file.type === 'image/heic' || 
                     file.name.toLowerCase().endsWith('.heif') || 
                     file.type === 'image/heif'
      
      if (!isHeic) {
        setError(translations.error.fileType)
        return false
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError(translations.error.fileSize)
        return false
      }

      return true
    })

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      handleFileChange(filesArray)
    }
  }

  const handleSelectFileClick = () => {
    fileInputRef.current?.click()
  }

  const convertToWebP = async () => {
    if (!selectedFiles.length) return

    setIsProcessing(true)
    setError(null)
    setConvertedFiles([])

    const newConvertedFiles: ConvertedFile[] = []

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        
        // Create a placeholder for this file
        const fileIndex = newConvertedFiles.length
        newConvertedFiles.push({
          originalFile: file,
          convertedUrl: '',
          fileName: file.name.replace(/\.(heic|heif)$/i, '.webp'),
          status: 'processing'
        })
        setConvertedFiles([...newConvertedFiles])

        try {
          // Convert HEIC to PNG Blob first (intermediate step)
          const pngBlob = await heic2any({
            blob: file,
            toType: 'image/png',
            quality: 0.9
          }) as Blob

          // Create canvas to convert PNG to WebP
          const img = new Image()
          const pngUrl = URL.createObjectURL(pngBlob)
          
          // Load the image and convert to WebP when loaded
          img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            
            if (ctx) {
              // Draw the image on the canvas
              ctx.drawImage(img, 0, 0)
              
              // Convert to WebP
              canvas.toBlob((webpBlob) => {
                if (webpBlob) {
                  // Create object URL from the blob
                  const webpUrl = URL.createObjectURL(webpBlob)
                  
                  // Update the converted file record
                  newConvertedFiles[fileIndex] = {
                    ...newConvertedFiles[fileIndex],
                    convertedUrl: webpUrl,
                    status: 'done'
                  }
                  setConvertedFiles([...newConvertedFiles])
                  
                  // Cleanup
                  URL.revokeObjectURL(pngUrl)
                } else {
                  throw new Error('Failed to convert to WebP format')
                }
              }, 'image/webp', 0.9)
            } else {
              throw new Error('Failed to get canvas context')
            }
          }
          
          img.onerror = () => {
            throw new Error('Failed to load image')
          }
          
          img.src = pngUrl
        } catch (error) {
          const errorMessage = (error as Error).message || 'Unknown error'
          
          // Update with error status
          newConvertedFiles[fileIndex] = {
            ...newConvertedFiles[fileIndex],
            status: 'error',
            error: errorMessage
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

        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <p className="text-gray-300 mb-2">
              {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
            </p>
            <button
              type="button"
              onClick={convertToWebP}
              disabled={isProcessing}
              className={`${
                isProcessing ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              } text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors`}
            >
              {isProcessing ? translations.status.processing : translations.form.convert}
            </button>
          </div>
        )}
      </div>

      {convertedFiles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          
          <div className="mb-4">
            <button
              type="button"
              onClick={downloadAllWebPs}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              {translations.result.downloadAll}
            </button>
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
                      <img 
                        src={file.convertedUrl} 
                        alt={`Converted ${file.fileName}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="p-3 bg-gray-700">
                      <p className="text-sm text-gray-300 truncate">{file.fileName}</p>
                      <button
                        type="button"
                        onClick={() => downloadWebP(index)}
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                      >
                        {translations.result.download}
                      </button>
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
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

export default function HeicToJpgClient({ translations }: Props) {
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

  const convertToJpg = async () => {
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
          fileName: file.name.replace(/\.(heic|heif)$/i, '.jpg'),
          status: 'processing'
        })
        setConvertedFiles([...newConvertedFiles])

        try {
          // Convert HEIC to JPEG Blob
          const jpegBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9
          }) as Blob

          // Create object URL from the blob
          const jpegUrl = URL.createObjectURL(jpegBlob)
          
          // Update the converted file record
          newConvertedFiles[fileIndex] = {
            ...newConvertedFiles[fileIndex],
            convertedUrl: jpegUrl,
            status: 'done'
          }
          setConvertedFiles([...newConvertedFiles])
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

  const downloadJpg = (fileIndex: number) => {
    const file = convertedFiles[fileIndex]
    if (!file || file.status !== 'done') return

    fetch(file.convertedUrl)
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, file.fileName)
      })
  }

  const downloadAllJpgs = async () => {
    const successfulFiles = convertedFiles.filter(file => file.status === 'done')
    if (successfulFiles.length === 0) return
    
    if (successfulFiles.length === 1) {
      // If only one file, just download it directly
      downloadJpg(convertedFiles.findIndex(file => file.status === 'done'))
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
            <h2 className="text-xl font-bold mb-2">
              {selectedFiles.length === 1 
                ? selectedFiles[0].name 
                : `${selectedFiles.length} HEIC files selected`}
            </h2>
            
            <button
              onClick={convertToJpg}
              disabled={isProcessing}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50"
            >
              {isProcessing ? translations.status.processing : translations.form.convert}
            </button>
          </div>
        )}

        {convertedFiles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Converted Images</h2>
            
            {convertedFiles.length > 1 && (
              <div className="mb-4">
                <button
                  onClick={downloadAllJpgs}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
                >
                  {translations.result.downloadAll}
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {convertedFiles.map((file, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2 truncate">{file.fileName}</p>
                  
                  {file.status === 'processing' && (
                    <div className="flex items-center justify-center h-40 bg-gray-800 rounded">
                      <div className="text-sm text-gray-400">
                        {translations.status.processing}
                      </div>
                    </div>
                  )}
                  
                  {file.status === 'error' && (
                    <div className="flex items-center justify-center h-40 bg-gray-800 rounded">
                      <div className="text-sm text-red-500 p-2 text-center">
                        {file.error || 'Error converting file'}
                      </div>
                    </div>
                  )}
                  
                  {file.status === 'done' && (
                    <>
                      <div className="h-40 bg-gray-800 rounded overflow-hidden mb-2">
                        <img 
                          src={file.convertedUrl} 
                          alt={file.fileName}
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <button
                        onClick={() => downloadJpg(index)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition-colors text-sm"
                      >
                        {translations.result.download}
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
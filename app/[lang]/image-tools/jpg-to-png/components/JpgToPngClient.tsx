'use client'

import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import Image from 'next/image'
import FileUploadArea from '@/components/FileUploadArea'
import { Button } from '@/components/ui/button'

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])

  // クリーンアップ処理
  useEffect(() => {
    return () => {
      // クリーンアップ時に作成したURL Objectsを解放
      convertedFiles.forEach(file => {
        if (file.convertedUrl && !file.convertedUrl.startsWith('data:')) {
          URL.revokeObjectURL(file.convertedUrl)
        }
      })
    }
  }, [convertedFiles])

  // ファイルアップロードエリアからのエラーハンドリング
  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage)
  }

  // ファイルアップロードエリアからのファイル選択ハンドリング
  const handleFilesSelected = (files: File[]) => {
    if (files.length === 0) return

    setError(null)
    setConvertedFiles([])
    setSelectedFiles(files)
  }

  const convertToPng = async () => {
    if (selectedFiles.length === 0) {
      setError(translations.status.noFile)
      return
    }

    setIsProcessing(true)
    setError(null)

    // 以前の変換結果をクリア
    convertedFiles.forEach(file => {
      if (file.convertedUrl && !file.convertedUrl.startsWith('data:')) {
        URL.revokeObjectURL(file.convertedUrl)
      }
    })
    setConvertedFiles([])

    const newConvertedFiles: ConvertedFile[] = []

    try {
      // 各ファイルを処理
      for (const file of selectedFiles) {
        const fileName = file.name.replace(/\.(jpg|jpeg)$/i, '.png')
        
        // 処理中状態で追加
        newConvertedFiles.push({
          originalFile: file,
          fileName,
          convertedUrl: '',
          status: 'processing'
        })
        
        // 処理中の状態を更新
        setConvertedFiles([...newConvertedFiles])
        
        try {
          // 画像要素を作成
          const image = new window.Image()
          image.src = URL.createObjectURL(file)

          await new Promise((resolve) => {
            image.onload = resolve
          })

          // キャンバスに描画
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            throw new Error('Could not get canvas context')
          }
          
          ctx.drawImage(image, 0, 0)

          // PNGに変換
          const pngUrl = canvas.toDataURL('image/png')
          
          // ファイル状態を更新
          const fileIndex = newConvertedFiles.findIndex(
            f => f.originalFile === file
          )
          
          if (fileIndex !== -1) {
            newConvertedFiles[fileIndex] = {
              ...newConvertedFiles[fileIndex],
              convertedUrl: pngUrl,
              status: 'done'
            }
            
            setConvertedFiles([...newConvertedFiles])
          }

          // オブジェクトURLを解放
          URL.revokeObjectURL(image.src)
        } catch (conversionError) {
          // このファイルの変換エラーを処理
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
          setError(errorMessage)
        }
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadPng = (fileIndex: number) => {
    const file = convertedFiles[fileIndex]
    if (!file || file.status !== 'done') return

    fetch(file.convertedUrl)
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, file.fileName)
      })
  }

  const downloadAllPngs = async () => {
    const successfulFiles = convertedFiles.filter(file => file.status === 'done')
    if (successfulFiles.length === 0) return
    
    if (successfulFiles.length === 1) {
      // ファイルが1つしかない場合は直接ダウンロード
      downloadPng(convertedFiles.findIndex(file => file.status === 'done'))
      return
    }

    // 複数ファイルのzipを作成
    const zip = new JSZip()
    
    // 成功した変換をzipに追加
    for (const file of successfulFiles) {
      const blob = await fetch(file.convertedUrl).then(res => res.blob())
      zip.file(file.fileName, blob)
    }

    // zipをダウンロード
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, 'converted_png_images.zip')
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
          limitText={translations.upload?.limit || "Maximum file size: 10MB per file"}
          buttonText={translations.form.upload.button}
          accept=".jpg,.jpeg"
          multiple={true}
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

      {selectedFiles.length > 0 && !convertedFiles.length && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">プレビュー</h2>
          <p className="text-gray-300 mb-2">
            {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
          </p>
          <Button
            onClick={convertToPng}
            disabled={isProcessing}
            isLoading={isProcessing}
            variant="primary"
            className="mt-4"
          >
            {isProcessing ? translations.status.processing : translations.form.convert}
          </Button>
        </div>
      )}

      {convertedFiles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">変換後のPNG</h2>
          
          {convertedFiles.filter(file => file.status === 'done').length > 1 && (
            <div className="mb-4">
              <Button
                type="button"
                onClick={downloadAllPngs}
                variant="primary"
              >
                全てのPNGをダウンロード
              </Button>
            </div>
          )}
          
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
                      <p className="mt-2">変換中...</p>
                    </div>
                  </div>
                )}
                
                {file.status === 'error' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="text-red-500 text-center p-4">
                      <p>エラー: {file.error}</p>
                    </div>
                  </div>
                )}
                
                {file.status === 'done' && (
                  <>
                    <div className="h-48 bg-gray-800 flex items-center justify-center">
                      <Image 
                        src={file.convertedUrl} 
                        alt={`変換後の ${file.fileName}`}
                        className="max-h-full max-w-full object-contain"
                        unoptimized={true}
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="p-3 bg-gray-700">
                      <p className="text-sm text-gray-300 truncate">{file.fileName}</p>
                      <Button
                        type="button"
                        onClick={() => downloadPng(index)}
                        variant="primary"
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
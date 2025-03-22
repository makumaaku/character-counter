'use client'

import { useState, useEffect, useRef } from 'react'
import { saveAs } from 'file-saver'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import JSZip from 'jszip'
import FileUploadArea from '../../components/FileUploadArea'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Translations = {
  title: string
  description: string
  form: {
    upload: {
      label: string
      button: string
      dragDrop: string
      limitText: string
    }
    convert: string
  }
  result: {
    download: string
    downloadAll: string
    preview: string
    selectedFiles: string
  }
  status: {
    processing: string
    noFile: string
    success: string
    browserProcessing: string
  }
  error: {
    fileType: string
    fileSize: string
    conversionFailed: string
  }
}

type Props = {
  translations: Translations
}

type ConvertedFile = {
  originalName: string
  jpgUrl: string
  jpgBlob: Blob
}

export default function SvgToJpgClient({ translations }: Props) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0)
  const [conversionComplete, setConversionComplete] = useState(false)
  
  // SVGレンダリング用のキャンバス参照
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('data:')) {
        URL.revokeObjectURL(previewUrl)
      }
      convertedFiles.forEach(file => {
        if (!file.jpgUrl.startsWith('data:')) {
          URL.revokeObjectURL(file.jpgUrl)
        }
      })
    }
  }, [previewUrl, convertedFiles])

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
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result)
        }
      }
      reader.readAsDataURL(files[0])
    }
  }

  const convertSvgToJpg = async () => {
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

      // Process each file sequentially
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        
        try {
          // SVGファイルの内容を読み込む
          const svgText = await readFileAsText(file)
          
          // SVGをJPGに変換 (固定の品質と幅を使用)
          const jpgBlob = await svgToJpg(svgText, file.name)
          
          // プレビュー用のURLを作成
          const jpgUrl = URL.createObjectURL(jpgBlob)
          
          converted.push({
            originalName: file.name.replace(/\.svg$/, ''),
            jpgUrl,
            jpgBlob
          })
        } catch (err) {
          console.error(`Error converting ${file.name}:`, err)
          setError(`${translations.error.conversionFailed}: ${file.name}`)
          setIsProcessing(false)
          return
        }
      }

      // 変換結果を設定
      setConvertedFiles(converted)
      
      // 最初のファイルのプレビューを表示
      if (converted.length > 0) {
        setCurrentPreviewIndex(0)
      }
      
      setConversionComplete(true)
    } catch (error) {
      console.error('Conversion error:', error)
      setError(translations.error.conversionFailed)
    } finally {
      setIsProcessing(false)
    }
  }

  // ファイルをテキストとして読み込む
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to read file as text'))
        }
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })
  }

  // SVGをJPGに変換する関数
  const svgToJpg = (svgText: string, fileName: string): Promise<Blob> => {
    // 固定値を使用
    const quality = 0.9 // 90%の品質
    const width = 1200 // 1200pxの幅
    
    return new Promise((resolve, reject) => {
      try {
        // Create a canvas element if it doesn't exist
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          throw new Error('Could not get canvas context')
        }
        
        // Create an image element
        const img = new globalThis.Image()
        
        // SVGに起因するCORSエラーを防ぐために、CORS設定を追加
        img.crossOrigin = 'anonymous'
        
        // イメージのロード時の処理
        img.onload = () => {
          try {
            // Calculate height while maintaining aspect ratio
            const ratio = img.height / img.width
            const height = Math.round(width * ratio)
            
            // Set canvas dimensions
            canvas.width = width
            canvas.height = height
            
            // Fill with white background (in case SVG has transparency)
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            
            // Draw the image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            
            // Convert to JPG
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob)
                } else {
                  reject(new Error('Failed to convert canvas to blob'))
                }
              },
              'image/jpeg',
              quality
            )
          } catch (err) {
            reject(err)
          }
        }
        
        // Image loading error handler
        img.onerror = () => {
          reject(new Error(`Failed to load SVG image: ${fileName}`))
        }
        
        // SVGデータをBase64エンコードして、インラインSVGとして読み込む
        const svgBase64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgText)))
        img.src = svgBase64
      } catch (err) {
        reject(err)
      }
    })
  }

  const downloadCurrentFile = () => {
    if (convertedFiles.length === 0 || currentPreviewIndex >= convertedFiles.length) return
    
    const file = convertedFiles[currentPreviewIndex]
    saveAs(file.jpgBlob, `${file.originalName}.jpg`)
  }

  const downloadAllFiles = () => {
    if (convertedFiles.length === 0) return
    
    if (convertedFiles.length === 1) {
      // 単一ファイルの場合はそのままダウンロード
      const file = convertedFiles[0]
      saveAs(file.jpgBlob, `${file.originalName}.jpg`)
    } else {
      // 複数ファイルの場合はZIPにまとめる
      const zip = new JSZip()
      
      convertedFiles.forEach(file => {
        zip.file(`${file.originalName}.jpg`, file.jpgBlob)
      })
      
      zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'svg-to-jpg-converted.zip')
      })
    }
  }

  const handlePrevPreview = () => {
    if (currentPreviewIndex > 0) {
      setCurrentPreviewIndex(currentPreviewIndex - 1)
    }
  }

  const handleNextPreview = () => {
    if (currentPreviewIndex < convertedFiles.length - 1) {
      setCurrentPreviewIndex(currentPreviewIndex + 1)
    }
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl max-w-4xl mx-auto mt-6">
      <h1 className="text-3xl font-bold text-white mb-2">{translations.title}</h1>
      <p className="text-gray-300 mb-6">{translations.description}</p>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-100 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <FileUploadArea
        title={translations.form.upload.label}
        dragDropText={translations.form.upload.dragDrop}
        limitText={translations.form.upload.limitText}
        buttonText={translations.form.upload.button}
        accept=".svg"
        multiple={true}
        maxSizeMB={20}
        totalMaxSizeMB={100}
        selectedFilesText={translations.result.selectedFiles}
        onFilesSelected={handleFilesSelected}
        onError={handleUploadError}
        validExtensions={['svg']}
      />
      
      {/* プレビュー表示 */}
      {previewUrl && !conversionComplete && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">{translations.result.preview}</h2>
          <div className="bg-gray-700 p-2 rounded-lg inline-block max-w-full mx-auto">
            <div className="w-full h-auto max-h-60 flex items-center justify-center overflow-hidden rounded shadow-md">
              <Image
                src={previewUrl}
                alt="SVG Preview"
                className="max-w-full max-h-60 object-contain"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* 変換ボタン */}
      <div className="mt-6 text-center">
        <Button
          onClick={convertSvgToJpg}
          disabled={isProcessing || selectedFiles.length === 0}
          isLoading={isProcessing}
          variant="purple"
        >
          {translations.form.convert}
        </Button>
      </div>
      
      {/* 変換結果と処理ステータス */}
      {isProcessing && (
        <div className="mt-4 text-center text-gray-300">
          <div className="inline-block animate-spin mr-2 h-5 w-5 text-white">⚙️</div>
          {translations.status.processing}
        </div>
      )}
      
      {conversionComplete && convertedFiles.length > 0 && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{translations.status.success}</h2>
            <div className="text-sm text-gray-400">
              {currentPreviewIndex + 1} / {convertedFiles.length}
            </div>
          </div>
          
          {/* プレビュー */}
          <div className="bg-gray-600 p-2 rounded-lg mb-4">
            <div className="aspect-auto w-full flex items-center justify-center bg-gray-800 rounded overflow-hidden">
              <Image
                src={convertedFiles[currentPreviewIndex]?.jpgUrl}
                alt="Converted JPG"
                className="max-w-full max-h-80 object-contain"
                width={400}
                height={400}
              />
            </div>
          </div>
          
          {/* ナビゲーションボタン */}
          {convertedFiles.length > 1 && (
            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={handlePrevPreview}
                disabled={currentPreviewIndex === 0}
                variant="outline"
              >
                前へ
              </Button>
              <Button
                onClick={handleNextPreview}
                disabled={currentPreviewIndex === convertedFiles.length - 1}
                variant="outline"
              >
                次へ
              </Button>
            </div>
          )}
          
          {/* ダウンロードボタン */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={downloadCurrentFile}
              variant="purple"
              className="flex items-center justify-center"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              {translations.result.download}
            </Button>
            
            {convertedFiles.length > 1 && (
              <Button
                onClick={downloadAllFiles}
                variant="purple"
                className="flex items-center justify-center"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                {translations.result.downloadAll}
              </Button>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-gray-400 text-sm">
        {translations.status.browserProcessing}
      </div>
      
      {/* Hidden canvas for rendering - not displayed */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
// eslint-disable-next-line
import heicConvert from "heic-convert/browser"
import FileUploadArea from '../../components/FileUploadArea'

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
    upload: {
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

export default function HeicToJpgClient({ translations }: Props) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [convertedCount, setConvertedCount] = useState(0)

  // BlobのURLを解放するためのクリーンアップ
  useEffect(() => {
    return () => {
      convertedFiles.forEach(file => {
        if (file.convertedUrl) {
          URL.revokeObjectURL(file.convertedUrl)
        }
      })
    }
  }, [convertedFiles])

  // 共通コンポーネントのエラーハンドラー
  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage)
  }

  // 共通コンポーネントのファイル選択ハンドラー
  const handleFilesSelected = (files: File[]) => {
    setError(null)
    setSelectedFiles(files)
    setConvertedFiles([])
    setConvertedCount(0)
  }

  const convertToJpg = async () => {
    if (selectedFiles.length === 0) {
      setError(translations.status.noFile)
      return
    }

    setIsProcessing(true)
    setError(null)
    
    // 古いURLを解放
    convertedFiles.forEach(file => {
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl)
      }
    })
    
    // 選択されたファイルごとにConvertedFileオブジェクトを初期化
    const initialConvertedFiles = selectedFiles.map(file => ({
      originalFile: file,
      convertedUrl: '',
      fileName: file.name.replace(/\.heic$/i, '.jpg'),
      status: 'processing' as const
    }))
    
    setConvertedFiles(initialConvertedFiles)
    setConvertedCount(0)

    try {
      let currentFiles: ConvertedFile[] = initialConvertedFiles;

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        
        try {
          // ファイル変換中のステータスを表示
          currentFiles = currentFiles.map((convertedFile, index) => {
            if (index === i) {
              return { ...convertedFile, status: 'processing' };
            }
            return convertedFile;
          });
          setConvertedFiles(currentFiles);
          
          // ファイル変換処理
          const arrayBuffer = await file.arrayBuffer()
          
          // ブラウザ環境でheic-convertを使用
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const convert = heicConvert as any;
          const outputBuffer = await convert({
            buffer: new Uint8Array(arrayBuffer),
            format: 'JPEG',
            quality: 0.8
          })
          
          // 変換結果を更新
          const jpgBlob = new Blob([outputBuffer], { type: 'image/jpeg' })
          const jpgUrl = URL.createObjectURL(jpgBlob)
          currentFiles = currentFiles.map((convertedFile, index) => {
            if (index === i) {
              return {
                originalFile: file,
                convertedUrl: jpgUrl,
                fileName: file.name.replace(/\.heic$/i, '.jpg'),
                status: 'done'
              };
            }
            return convertedFile;
          });
          
          setConvertedFiles(currentFiles);
          setConvertedCount(prev => prev + 1)
        } catch (err) {
          console.error(`Error converting file ${file.name}:`, err)
          currentFiles = currentFiles.map((convertedFile, index) => {
            if (index === i) {
              return {
                originalFile: file,
                convertedUrl: '',
                fileName: file.name,
                status: 'error',
                error: String(err)
              };
            }
            return convertedFile;
          });
          
          setConvertedFiles(currentFiles);
        }
      }
    } catch (err) {
      console.error('Conversion error:', err)
      setError(translations.error.conversion.replace('{error}', String(err)))
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadJpg = (fileIndex: number) => {
    const file = convertedFiles[fileIndex]
    if (file && file.status === 'done' && file.convertedUrl) {
      fetch(file.convertedUrl)
        .then(res => res.blob())
        .then(blob => {
          saveAs(blob, file.fileName)
        })
    }
  }

  const downloadAllJpgs = async () => {
    const successfulFiles = convertedFiles.filter(file => file.status === 'done')
    if (successfulFiles.length === 0) return

    try {
      setIsProcessing(true)
      const zip = new JSZip()

      // すべての成功したファイルの変換結果をFetchして取得
      const fetchPromises = successfulFiles.map(async (file) => {
        try {
          const response = await fetch(file.convertedUrl)
          const blob = await response.blob()
          zip.file(file.fileName, blob)
        } catch (err) {
          console.error(`Error adding file to zip: ${file.fileName}`, err)
        }
      })

      await Promise.all(fetchPromises)
      
      // ZIPファイル生成
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, 'converted_images.zip')
    } catch (err) {
      console.error('ZIP creation error:', err)
      setError('Failed to create ZIP file')
    } finally {
      setIsProcessing(false)
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
          limitText={translations.upload.limit}
          buttonText={translations.form.upload.button}
          accept=".heic"
          multiple={true}
          maxSizeMB={10}
          validExtensions={['heic']}
          onFilesSelected={handleFilesSelected}
          onError={handleUploadError}
        />
      </div>

      {/* 変換ボタン */}
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <button
          onClick={convertToJpg}
          disabled={isProcessing || selectedFiles.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isProcessing ? translations.status.processing : translations.form.convert}
        </button>
        
        {error && (
          <div className="mt-4 bg-red-900/30 border border-red-700 p-3 rounded-md text-red-200">
            {error}
          </div>
        )}
      </div>

      {/* 変換結果 */}
      {(convertedFiles.length > 0 || isProcessing) && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">プレビュー</h2>
            
            {convertedCount > 0 && (
              <button
                onClick={downloadAllJpgs}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {translations.result.downloadAll}
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {convertedFiles.map((file, index) => (
              <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                {file.status === 'processing' ? (
                  <div className="h-40 flex items-center justify-center text-gray-400">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                      <span>{translations.status.convertingFile.replace('{filename}', file.originalFile.name)}</span>
                    </div>
                  </div>
                ) : file.status === 'error' ? (
                  <div className="h-40 flex items-center justify-center p-3 text-red-300 text-center">
                    <div>
                      <div className="text-3xl mb-2">⚠️</div>
                      <div>{translations.error.conversion.replace('{error}', file.error || '')}</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="h-40 flex items-center justify-center bg-gray-900">
                      <img
                        src={file.convertedUrl}
                        alt={file.fileName}
                        className="max-h-40 max-w-full object-contain"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-gray-300 truncate text-sm">{file.fileName}</p>
                      <button
                        onClick={() => downloadJpg(index)}
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        {translations.result.download}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {convertedCount > 0 && (
            <p className="mt-4 text-center text-gray-400">
              {translations.status.success}
            </p>
          )}
        </div>
      )}
    </div>
  )
} 
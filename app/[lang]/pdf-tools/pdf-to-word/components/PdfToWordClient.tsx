'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { pdfjs } from 'react-pdf'
import { saveAs } from 'file-saver'
import { CloudArrowUpIcon, DocumentIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/button'
import { PdfToolsPdfToWordMessages } from '@/lib/i18n/types'

// PDFJSをグローバルに設定
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs'

// グローバルdocxオブジェクトの型定義
declare global {
  interface Window {
    docx: {
      convertPdfToDocx: (pdfData: ArrayBuffer | Uint8Array) => Promise<unknown>;
      Packer: {
        toBlob: (doc: unknown) => Promise<Blob>;
      };
    };
    JSZip: unknown;
    pdfjsLib: unknown;
  }
}

type Props = {
  translations: PdfToolsPdfToWordMessages
}

type OutputFormat = 'docx' | 'doc'

export default function PdfToWordClient({ translations }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wordDocument, setWordDocument] = useState<Blob | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('docx');
  const [librariesLoaded, setLibrariesLoaded] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ライブラリの読み込み状態を確認
  useEffect(() => {
    // 既に読み込まれているか確認
    if (typeof window !== 'undefined' && window.docx && window.JSZip) {
      setLibrariesLoaded(true);
      return;
    }
    
    // docxライブラリの読み込み完了イベントをリッスン
    const handleDocxLoaded = () => {
      console.log('DOCX library loaded event detected');
      if (window.JSZip) {
        console.log('Both libraries loaded successfully');
        setLibrariesLoaded(true);
      }
    };
    
    // イベントリスナーを追加
    document.addEventListener('docx-library-loaded', handleDocxLoaded);
    
    // 定期的にライブラリの存在を確認するフォールバック
    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.docx && window.JSZip) {
        console.log('Libraries detected through interval check');
        setLibrariesLoaded(true);
        clearInterval(checkInterval);
      }
    }, 1000);
    
    // クリーンアップ
    return () => {
      document.removeEventListener('docx-library-loaded', handleDocxLoaded);
      clearInterval(checkInterval);
    };
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    
    if (file.type !== 'application/pdf') {
      setError(translations.error.fileType)
      return
    }
    
    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      setError(translations.error.fileSize)
      return
    }
    
    setError('')
    setFile(file)
    setWordDocument(null)
  }, [translations.error.fileType, translations.error.fileSize])
  
  // 通常のファイル選択処理
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      
      if (file.type !== 'application/pdf') {
        setError(translations.error.fileType)
        return
      }
      
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        setError(translations.error.fileSize)
        return
      }
      
      setError('')
      setFile(file)
      setWordDocument(null)
    }
  }
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  // ファイル変換処理
  const handleConversion = async () => {
    if (!file) return;
    
    try {
      setConverting(true);
      setError(null);
      
      // ファイルをArrayBufferとして読み込む
      const fileData = await file.arrayBuffer();
      
      // PDFをWord文書に変換
      const blob = await convertToWord(fileData);
      setWordDocument(blob);
    } catch (error) {
      console.error('Error converting file:', error);
      setError(error instanceof Error ? error.message : 'Error converting PDF to Word. Please try again.');
    } finally {
      setConverting(false);
    }
  };
  
  const convertToWord = async (fileData: ArrayBuffer) => {
    try {
      // ライブラリが読み込まれているか確認
      if (!window.docx || !window.JSZip) {
        throw new Error(
          'Required libraries not loaded. Please refresh the page and try again. ' +
          `docx: ${window.docx ? 'loaded' : 'missing'}, ` +
          `JSZip: ${window.JSZip ? 'loaded' : 'missing'}`
        );
      }
      
      // docxライブラリを使用してPDFをWord文書に変換
      const doc = await window.docx.convertPdfToDocx(fileData);
      // Word文書をBlobに変換
      const blob = await window.docx.Packer.toBlob(doc);
      
      return blob;
    } catch (error) {
      console.error('Error in convertToWord:', error);
      throw error;
    }
  };

  const downloadWord = () => {
    if (!wordDocument || !file) return
    
    const fileName = file.name.replace('.pdf', outputFormat === 'docx' ? '.docx' : '.doc')
    saveAs(wordDocument, fileName)
  }

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{translations.title}</h1>
          <p className="text-xl text-gray-300">
            {translations.description}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{translations.form.upload.label}</h2>
          
          {!librariesLoaded && (
            <div className="mb-4 p-3 bg-yellow-900/50 text-yellow-200 rounded">
              ライブラリを読み込み中です。しばらくお待ちください...
            </div>
          )}
          
          <div className="flex flex-col items-center">
            {/* ドラッグ&ドロップエリア */}
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 w-full ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getInputProps()} />
              
              {!file ? (
                <>
                  <div className="mb-4">
                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {isDragActive
                      ? translations.form.upload.dragging
                      : translations.form.upload.instruction}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">{translations.form.upload.maxSize}</p>
                  
                  {!librariesLoaded && (
                    <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
                      <p>{translations.loading || 'Loading required libraries...'}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <DocumentIcon className="mx-auto h-12 w-12 text-blue-500" />
                  <p className="mt-2 text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-gray-300">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </>
              )}
            </div>
            
            {/* 直接ファイル選択ボタン */}
            <div className="mt-4">
              <input
                type="file"
                id="file-input"
                ref={fileInputRef}
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
              > 
                {translations.form.upload.button.split(',')[0]}
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded">
              {error}
            </div>
          )}
          
          {file && !error && (
            <div className="mt-6">
              <p className="text-lg font-medium mb-2 text-white">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
              
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                  {translations.form.format.label}
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-600"
                      checked={outputFormat === 'docx'}
                      onChange={() => setOutputFormat('docx')}
                    />
                    <span className="ml-2">{translations.form.format.docx}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-600"
                      checked={outputFormat === 'doc'}
                      onChange={() => setOutputFormat('doc')}
                    />
                    <span className="ml-2">{translations.form.format.doc}</span>
                  </label>
                </div>
              </div>
              
              <Button
                onClick={handleConversion}
                disabled={converting || !librariesLoaded}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {converting ? translations.status.processing : translations.form.convert}
              </Button>
            </div>
          )}
          
          {!file && !error && (
            <p className="mt-4 text-gray-400">{translations.status.noFile}</p>
          )}
        </div>
        
        {wordDocument && (
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            <Button
              onClick={downloadWord}
              variant="purple"
            >
              {translations.result.download}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 
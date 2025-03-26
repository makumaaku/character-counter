'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Document, Page, pdfjs } from 'react-pdf'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/button'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs'

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
      quality: {
        label: string
        low: string
        medium: string
        high: string
      }
      convert: string
    }
    result: {
      downloadAll: string
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

type ImageQuality = 'low' | 'medium' | 'high'
type ConvertedImage = {
  dataUrl: string
  pageNumber: number
}

export default function PdfToJpgClient({ translations }: Props) {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [quality, setQuality] = useState<ImageQuality>('medium')
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPdfJsReady, setIsPdfJsReady] = useState(false)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  // Check if PDF.js worker is loaded correctly
  useEffect(() => {
    const checkPdfJsWorker = async () => {
      try {
        console.log('PDF.js version:', pdfjs.version);
        
        // Check if the worker file is accessible
        const response = await fetch('/pdfjs/pdf.worker.mjs', { method: 'HEAD' });
        if (response.ok) {
          console.log('PDF.js worker file is accessible');
          
          // Add a small delay to ensure the worker is fully loaded
          setTimeout(() => {
            setIsPdfJsReady(true);
          }, 500);
        } else {
          console.error('PDF.js worker file is not accessible');
          setError('Error loading PDF.js worker. Please try again later.');
        }
      } catch (err) {
        console.error('Error checking PDF.js worker:', err);
        setError('Error loading PDF.js worker. Please try again later.');
      }
    };
    
    checkPdfJsWorker();
  }, []);

  // Quality settings
  const qualitySettings = {
    low: 0.5,
    medium: 0.8,
    high: 1.0
  }

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    setConvertedImages([])
    
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      setError(translations.error.fileType)
      return
    }
    
    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setError(translations.error.fileSize)
      return
    }
    
    setPdfFile(file)
  }, [translations.error.fileType, translations.error.fileSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  // Handle document load success
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    canvasRefs.current = Array(numPages).fill(null)
  }

  // Convert PDF pages to JPG
  const convertToJpg = async () => {
    if (!pdfFile) return
    
    try {
      setIsConverting(true)
      setConvertedImages([])
      setError(null)
      
      // Process each canvas that has been rendered
      const canvasElements = canvasRefs.current.filter(canvas => canvas !== null);
      if (canvasElements.length === 0) {
        setError("PDF pages are not ready yet. Please wait a moment and try again.");
        setIsConverting(false);
        return;
      }
      
      const images: ConvertedImage[] = []
      
      // Process each available canvas
      canvasElements.forEach((canvas, index) => {
        if (canvas) {
          try {
            // Get data URL with quality setting
            const dataUrl = canvas.toDataURL('image/jpeg', qualitySettings[quality])
            images.push({
              dataUrl,
              pageNumber: index + 1
            })
          } catch (err) {
            console.error(`Error converting page ${index + 1}:`, err);
          }
        }
      });
      
      if (images.length === 0) {
        setError("Failed to convert PDF pages to JPG. Please try again.");
        setIsConverting(false);
        return;
      }
      
      setConvertedImages(images)
    } catch (err) {
      console.error('Error during conversion:', err);
      setError("An error occurred during conversion. Please try again.");
    } finally {
      setIsConverting(false)
    }
  }

  // Download a single image
  const downloadImage = (dataUrl: string, pageNumber: number) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${pdfFile?.name.replace('.pdf', '')}_page_${pageNumber}.jpg`
    link.click()
  }

  // Download all images as ZIP
  const downloadAllImages = async () => {
    if (convertedImages.length === 0) return
    
    const zip = new JSZip()
    const folder = zip.folder('pdf_to_jpg')
    
    convertedImages.forEach((image) => {
      const base64Data = image.dataUrl.split(',')[1]
      folder?.file(
        `${pdfFile?.name.replace('.pdf', '')}_page_${image.pageNumber}.jpg`,
        base64Data,
        { base64: true }
      )
    })
    
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `${pdfFile?.name.replace('.pdf', '')}_all_pages.zip`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{translations.title}</h1>
        <p className="text-gray-300">{translations.description}</p>
      </div>

      {!isPdfJsReady && !error ? (
        <div className="bg-gray-700 rounded-lg p-6 mb-8 text-center">
          <p className="text-gray-300 mb-2">Loading PDF processor...</p>
          <div className="w-full flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">
              {translations.form.upload.label}
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
                  ? translations.form.upload.dragDrop
                  : translations.form.upload.button}
              </p>
              {pdfFile && (
                <p className="text-green-400 mt-2">
                  {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>

          {pdfFile && (
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">
                {translations.form.quality.label}
              </label>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => setQuality('low')}
                  className={`px-4 py-2 rounded ${
                    quality === 'low'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  {translations.form.quality.low}
                </Button>
                <Button
                  type="button"
                  onClick={() => setQuality('medium')}
                  className={`px-4 py-2 rounded ${
                    quality === 'medium'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  {translations.form.quality.medium}
                </Button>
                <Button
                  type="button"
                  onClick={() => setQuality('high')}
                  className={`px-4 py-2 rounded ${
                    quality === 'high'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  {translations.form.quality.high}
                </Button>
              </div>
            </div>
          )}

          {pdfFile && (
            <Button
              type="button"
              onClick={convertToJpg}
              disabled={isConverting}
              variant="purple"
            >
              {isConverting ? translations.status.processing : translations.form.convert}
            </Button>
          )}
        </div>
      )}

      {/* PDF Preview (hidden, used for rendering) */}
      <div className="hidden">
        {pdfFile && (
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages || 0), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                canvasRef={(ref) => {
                  canvasRefs.current[index] = ref
                }}
              />
            ))}
          </Document>
        )}
      </div>

      {/* Converted Images */}
      {convertedImages.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {convertedImages.length} {convertedImages.length === 1 ? 'Image' : 'Images'} Converted
            </h2>
            <Button
              onClick={downloadAllImages}
              variant="purple"
            >
              {translations.result.downloadAll}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {convertedImages.map((image) => (
              <div key={image.pageNumber} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.dataUrl}
                    alt={`Page ${image.pageNumber}`}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
                    {`Page ${image.pageNumber}`}
                  </div>
                </div>
                <div className="p-3">
                  <Button
                    onClick={() => downloadImage(image.dataUrl, image.pageNumber)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-sm"
                  >
                    {translations.result.download}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 
'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { jsPDF } from 'jspdf'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'

type Translations = {
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

type Props = {
  translations: Translations
}

export default function SvgToPdfClient({ translations }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Reset states
    setError(null)
    setPdfUrl(null)
    
    // Validate file types
    const invalidFiles = acceptedFiles.filter(file => !file.type.includes('image/svg+xml'))
    if (invalidFiles.length > 0) {
      setError(translations.error.fileType)
      return
    }
    
    // Validate file size (10MB total limit)
    const totalSize = acceptedFiles.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > 10 * 1024 * 1024) {
      setError(translations.error.fileSize)
      return
    }
    
    setFiles(acceptedFiles)
  }, [translations.error.fileType, translations.error.fileSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/svg+xml': ['.svg']
    },
    multiple: false // Only allow one SVG file at a time
  })

  // Convert SVG to PDF
  const convertToPdf = async () => {
    if (files.length === 0) {
      setError(translations.status.noFile)
      return
    }

    setIsProcessing(true)
    setError(null)
    setPdfUrl(null)

    try {
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm'
      })

      // Process the SVG file
      const file = files[0]
      
      // Read the SVG file as text
      const svgText = await file.text()
      
      // Create a new SVG element
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgElement = svgDoc.documentElement
      
      // Get SVG dimensions
      let width = parseFloat(svgElement.getAttribute('width') || '0')
      let height = parseFloat(svgElement.getAttribute('height') || '0')
      
      // If dimensions are not specified in the SVG, use viewBox
      if (!width || !height) {
        const viewBox = svgElement.getAttribute('viewBox')
        if (viewBox) {
          const [, , vbWidth, vbHeight] = viewBox.split(' ').map(parseFloat)
          width = vbWidth || 100
          height = vbHeight || 100
        } else {
          // Default dimensions if neither width/height nor viewBox is specified
          width = 100
          height = 100
        }
      }
      
      // Create a URL for the SVG
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
      const svgUrl = URL.createObjectURL(svgBlob)
      
      // Create an image element to render the SVG
      const img = new Image()
      
      // Wait for the image to load
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load SVG image'))
        img.src = svgUrl
      })
      
      // Calculate dimensions to fit the SVG within the page
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      let imgWidth = width
      let imgHeight = height
      
      // Scale the image to fit the page
      if (imgWidth > pageWidth || imgHeight > pageHeight) {
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
        imgWidth *= ratio
        imgHeight *= ratio
      }
      
      // Center the image on the page
      const x = (pageWidth - imgWidth) / 2
      const y = (pageHeight - imgHeight) / 2
      
      // Create a canvas element to draw the SVG
      const canvas = document.createElement('canvas')
      canvas.width = imgWidth * 4 // Multiply by 4 for better quality
      canvas.height = imgHeight * 4
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        // Scale for better quality
        ctx.scale(4, 4)
        
        // Draw the SVG image to the canvas
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
        
        // Convert canvas to data URL (PNG format)
        const dataUrl = canvas.toDataURL('image/png')
        
        // Add the image to the PDF
        pdf.addImage(dataUrl, 'PNG', x, y, imgWidth, imgHeight)
      }
      
      // Clean up the object URL
      URL.revokeObjectURL(svgUrl)
      
      // Generate the PDF as a blob URL
      const pdfBlob = pdf.output('blob')
      const pdfUrl = URL.createObjectURL(pdfBlob)
      setPdfUrl(pdfUrl)
    } catch (error) {
      console.error('Error converting SVG to PDF:', error)
      setError('An error occurred during conversion. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle PDF download
  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = `svg-to-pdf-${new Date().getTime()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{translations.title}</h1>
        <p className="text-xl text-gray-300">{translations.description}</p>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{translations.form.upload.label}</h2>
        
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-gray-600' : 'border-gray-500 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-300">{translations.form.upload.dragDrop}</p>
          ) : (
            <p>{translations.form.upload.button}</p>
          )}
          
          {files.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">{files.length} {files.length === 1 ? 'file' : 'files'} selected</p>
              <ul className="mt-2 text-left max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-300">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={convertToPdf}
          disabled={isProcessing || files.length === 0}
          className={`px-6 py-3 rounded-lg font-semibold ${
            isProcessing || files.length === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? translations.status.processing : translations.form.convert}
        </button>
      </div>

      {pdfUrl && (
        <div className="mt-8 bg-gray-700 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">PDF Ready!</h2>
          <button
            type="button"
            onClick={downloadPdf}
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            {translations.result.download}
          </button>
        </div>
      )}
    </div>
  )
} 
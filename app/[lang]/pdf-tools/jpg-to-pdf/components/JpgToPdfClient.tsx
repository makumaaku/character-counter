'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/button';
import { PdfToolsJpgToPdfMessages } from '@/lib/i18n/types'

// Define the PDF-lib global type
declare global {
  interface Window {
    PDFLib: {
      PDFDocument: {
        create: () => Promise<{
          embedJpg: (imageBytes: ArrayBuffer) => Promise<PDFImage>;
          embedPng: (imageBytes: ArrayBuffer) => Promise<PDFImage>;
          addPage: (size: [number, number]) => {
            getSize: () => { width: number; height: number };
            drawImage: (image: PDFImage, options: { x: number; y: number; width: number; height: number }) => void;
          };
          save: (options?: { useObjectStreams?: boolean }) => Promise<Uint8Array>;
        }>;
      };
      PageSizes: {
        A4: [number, number];
      };
    };
  }
}

// Define a type for PDF images
interface PDFImage {
  width: number;
  height: number;
}

type Props = {
  messages: PdfToolsJpgToPdfMessages
}

type ImageQuality = 'low' | 'medium' | 'high'

export default function JpgToPdfClient({ messages }: Props) {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [quality, setQuality] = useState<ImageQuality>('medium')
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPdfLibReady, setIsPdfLibReady] = useState(false)
  const imagePreviewsRef = useRef<HTMLDivElement>(null)

  // Check if PDF-lib is loaded correctly
  useEffect(() => {
    const checkPdfLib = async () => {
      try {
        // Check if the PDF-lib script is accessible
        const response = await fetch('/pdf-lib/pdf-lib.min.js', { method: 'HEAD' });
        if (response.ok) {
          console.log('PDF-lib is accessible');
          
          // Add a delay to ensure the library is fully loaded
          let attempts = 0;
          const maxAttempts = 10;
          const checkInterval = setInterval(() => {
            attempts++;
            console.log(`Checking PDF-lib (attempt ${attempts}/${maxAttempts})...`);
            
            if (window.PDFLib) {
              console.log('PDF-lib is loaded successfully');
              clearInterval(checkInterval);
              setIsPdfLibReady(true);
            } else if (attempts >= maxAttempts) {
              console.error('PDF-lib is not loaded properly after multiple attempts');
              clearInterval(checkInterval);
              setError('Error loading PDF library. Please refresh the page and try again.');
            }
          }, 500);
        } else {
          console.error('PDF-lib file is not accessible');
          setError('Error loading PDF library. Please try again later.');
        }
      } catch (err) {
        console.error('Error checking PDF-lib:', err);
        setError('Error loading PDF library. Please try again later.');
      }
    };
    
    checkPdfLib();
  }, []);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    setPdfUrl(null)
    
    if (acceptedFiles.length === 0) return
    
    // Check file types
    const validFiles = acceptedFiles.filter(file => 
      file.type === 'image/jpeg' || 
      file.type === 'image/jpg' || 
      file.type === 'image/png'
    )
    
    if (validFiles.length !== acceptedFiles.length) {
      setError(messages.error.fileType)
      return
    }
    
    // Check total file size (max 20MB)
    const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > 20 * 1024 * 1024) {
      setError(messages.error.fileSize)
      return
    }
    
    setImageFiles(validFiles)
  }, [messages.error.fileType, messages.error.fileSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  })

  // Convert JPG/PNG to PDF
  const convertToPdf = async () => {
    if (imageFiles.length === 0) return
    
    try {
      setIsConverting(true)
      setPdfUrl(null)
      setError(null)
      
      // Check if PDF-lib is available
      if (!window.PDFLib) {
        setError("PDF library is not loaded. Please refresh the page and try again.");
        setIsConverting(false);
        return;
      }
      
      const { PDFDocument, PageSizes } = window.PDFLib;
      
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      
      // Process each image
      for (const imageFile of imageFiles) {
        try {
          // Read the image file as ArrayBuffer
          const imageBytes = await readFileAsArrayBuffer(imageFile);
          
          // Embed the image in the PDF
          let image;
          if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(imageBytes);
          } else if (imageFile.type === 'image/png') {
            image = await pdfDoc.embedPng(imageBytes);
          } else {
            continue; // Skip unsupported file types
          }
          
          // Add a page to the PDF
          const page = pdfDoc.addPage(PageSizes.A4);
          
          // Get page dimensions
          const { width, height } = page.getSize();
          
          // Calculate image dimensions to fit the page while maintaining aspect ratio
          const imgWidth = image.width;
          const imgHeight = image.height;
          const aspectRatio = imgWidth / imgHeight;
          
          let drawWidth = width - 50; // Margin of 25 on each side
          let drawHeight = drawWidth / aspectRatio;
          
          // If the height exceeds the page height, scale it down
          if (drawHeight > height - 50) {
            drawHeight = height - 50; // Margin of 25 on top and bottom
            drawWidth = drawHeight * aspectRatio;
          }
          
          // Calculate position to center the image on the page
          const x = (width - drawWidth) / 2;
          const y = (height - drawHeight) / 2;
          
          // Draw the image on the page
          page.drawImage(image, {
            x,
            y,
            width: drawWidth,
            height: drawHeight,
          });
        } catch (err) {
          console.error(`Error processing image:`, err);
        }
      }
      
      // Apply quality settings - quality is not directly applicable to PDF generation
      // but we could use it for compression settings in the future
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false, // Better compatibility
      });
      
      // Create a blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
    } catch (err) {
      console.error('Error during conversion:', err);
      setError("An error occurred during conversion. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  // Helper function to read a file as ArrayBuffer
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Download the PDF
  const downloadPdf = () => {
    if (!pdfUrl) return;
    
    // Create a filename based on the first image file
    const baseFilename = imageFiles.length > 0 
      ? imageFiles[0].name.replace(/\.(jpg|jpeg|png)$/i, '')
      : 'converted';
    
    saveAs(pdfUrl, `${baseFilename}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{messages.title}</h1>
        <p className="text-gray-300">{messages.description}</p>
      </div>

      {!isPdfLibReady && !error ? (
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
              {messages.form.upload.label}
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-gray-600' : 'border-gray-500 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} multiple />
              <p className="text-gray-300 mb-2">
                {isDragActive
                  ? messages.form.upload.dragDrop
                  : messages.form.upload.button}
              </p>
              {imageFiles.length > 0 && (
                <p className="text-green-400 mt-2">
                  {imageFiles.length} {imageFiles.length === 1 ? 'image' : 'images'} selected
                </p>
              )}
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>

          {imageFiles.length > 0 && (
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">
                {messages.form.quality.label}
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
                  {messages.form.quality.low}
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
                  {messages.form.quality.medium}
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
                  {messages.form.quality.high}
                </Button>
              </div>
            </div>
          )}

          {imageFiles.length > 0 && (
            <Button
              type="button"
              onClick={convertToPdf}
              disabled={isConverting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConverting ? messages.status.processing : messages.form.convert}
            </Button>
          )}
        </div>
      )}

      {/* Image Previews */}
      {imageFiles.length > 0 && (
        <div className="mt-8" ref={imagePreviewsRef}>
          <h2 className="text-xl font-bold mb-4">
            {imageFiles.length} {imageFiles.length === 1 ? 'Image' : 'Images'} Selected
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageFiles.map((file, index) => (
              <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
                    {`Image ${index + 1}`}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-300 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Preview */}
      {pdfUrl && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">PDF Generated</h2>
            <button
              onClick={downloadPdf}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            >
              {messages.result.download}
            </button>
          </div>
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <iframe
              src={pdfUrl}
              className="w-full h-[500px] border-0"
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </div>
  )
} 
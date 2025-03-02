'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { translate } from '@/lib/i18n/client'

type DownloadButtonProps = {
  content: string
  filename: string
  className?: string
}

export default function DownloadButton({ 
  content, 
  filename, 
  className = "bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
}: DownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false)
  const params = useParams()
  const lang = params.lang as string

  const handleDownload = () => {
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' })
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob)
    
    // Create a temporary anchor element
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    
    // Append to the document, click it, and remove it
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    // Release the URL object
    URL.revokeObjectURL(url)
    
    // Show downloaded message temporarily
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  return (
    <button
      onClick={handleDownload}
      className={className}
    >
      {downloaded 
        ? translate(lang, 'common.download.downloaded') 
        : translate(lang, 'common.download.button')
      }
    </button>
  )
} 
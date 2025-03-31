'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type DownloadButtonProps = {
  content: string
  filename: string
  className?: string
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'purple'
  disabled?: boolean
  downloadText?: string
  downloadedText?: string
}

export default function DownloadButton({ 
  content, 
  filename,
  variant = 'secondary',
  className = "",
  disabled = false,
  downloadText = "Download",
  downloadedText = "Downloaded!"
}: DownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    if (disabled || !content) return;
    
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
    <Button
      onClick={handleDownload}
      variant={variant}
      className={className}
      disabled={disabled || !content}
    >
      {downloaded ? downloadedText : downloadText}
    </Button>
  )
} 
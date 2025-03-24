'use client'

import { useParams } from 'next/navigation'
import { translate } from '@/lib/i18n/client'
import CopyButton from './CopyButton'

interface HtmlViewerProps {
  title: string
  htmlContent: string
}

export default function HtmlViewer({ title, htmlContent }: HtmlViewerProps) {
  const params = useParams()
  const lang = params.lang as string

  // HTMLをハイライト表示用にフォーマット
  const formattedHtml = htmlContent
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/="([^"]*)"/g, '=<span class="text-yellow-400">"$1"</span>')
    .replace(/&lt;(\/?[a-zA-Z0-9]+)/g, '&lt;<span class="text-blue-400">$1</span>')
    .replace(/(&lt;script|&lt;\/script)/g, '$1<span class="text-red-400"></span>')

  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow-md mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <CopyButton text={htmlContent} />
      </div>
      
      <div className="bg-gray-800 rounded-md p-3 overflow-auto">
        <pre className="text-sm text-gray-300 font-mono">
          <code dangerouslySetInnerHTML={{ __html: formattedHtml }} />
        </pre>
      </div>
    </div>
  )
} 
'use client'

import { ReactNode, useState } from 'react'
import { useParams } from 'next/navigation'
import { translate } from '@/lib/i18n/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { Bars3Icon } from '@heroicons/react/24/solid'

type Props = {
  children: ReactNode
}

export default function PdfToolsLayout({ children }: Props) {
  const params = useParams()
  const lang = params.lang as string
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // List of PDF tools for the sidebar
  const navigationItems = [
    {
      name: translate(lang, 'pdfTools.tools.pdfToJpg.title'),
      path: `/pdf-tools/pdf-to-jpg`
    },
    {
      name: translate(lang, 'pdfTools.tools.jpgToPdf.title'),
      path: `/pdf-tools/jpg-to-pdf`
    },
    {
      name: translate(lang, 'pdfTools.tools.webToPdf.title'),
      path: `/pdf-tools/web-to-pdf`
    },
    {
      name: translate(lang, 'pdfTools.tools.pdfToWord.title'),
      path: `/pdf-tools/pdf-to-word`
    },
    {
      name: translate(lang, 'pdfTools.tools.pdfToPng.title'),
      path: `/pdf-tools/pdf-to-png`
    },
    {
      name: translate(lang, 'pdfTools.tools.pngToPdf.title'),
      path: `/pdf-tools/png-to-pdf`
    },
    {
      name: translate(lang, 'pdfTools.tools.svgToPdf.title'),
      path: `/pdf-tools/svg-to-pdf`
    },
    {
      name: translate(lang, 'pdfTools.tools.pdfToEpub.title'),
      path: `/pdf-tools/pdf-to-epub`
    },
    {
      name: translate(lang, 'pdfTools.tools.heicToPdf.title'),
      path: `/pdf-tools/heic-to-pdf`
    }
    // Add more PDF tools here as they become available
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={translate(lang, 'pdfTools.title')} 
        homeLink={`/${lang}/pdf-tools`}
      >
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white"
          aria-label="Open Menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </Header>
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          navigationItems={navigationItems}
          lang={lang}
        />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  )
} 
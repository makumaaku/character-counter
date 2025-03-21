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

export default function ImageToolsLayout({ children }: Props) {
  const params = useParams()
  const lang = params.lang as string
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // List of Image tools for the sidebar
  const navigationItems = [
    {
      name: translate(lang, 'imageTools.tools.jpgToPng.title'),
      path: `/image-tools/jpg-to-png`
    },
    {
      name: translate(lang, 'imageTools.tools.pngToJpg.title'),
      path: `/image-tools/png-to-jpg`
    },
    {
      name: translate(lang, 'imageTools.tools.heicToJpg.title'),
      path: `/image-tools/heic-to-jpg`
    },
    {
      name: translate(lang, 'imageTools.tools.heicToPng.title'),
      path: `/image-tools/heic-to-png`
    },
    {
      name: translate(lang, 'imageTools.tools.heicToWebp.title'),
      path: `/image-tools/heic-to-webp`
    },
    {
      name: translate(lang, 'imageTools.tools.jpgToWebp.title'),
      path: `/image-tools/jpg-to-webp`
    },
    {
      name: translate(lang, 'imageTools.tools.pngToWebp.title'),
      path: `/image-tools/png-to-webp`
    }
    // More image tools can be added here as they become available
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        // 多言語対応せず英語固定
        title={'Image Converters'} 
        homeLink={`/${lang}/image-tools`}
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
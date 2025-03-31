'use client'

import { ReactNode, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { ImageToolsCommonMessages } from '@/lib/i18n/types'

type Props = {
  children: ReactNode;
  messages: ImageToolsCommonMessages;
  lang: string;
}

export default function ImageToolsLayout({ children, messages, lang }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // List of Image tools for the sidebar
  const navigationItems = [
    {
      name: messages.tools.jpgToPng.title,
      path: `/image-tools/jpg-to-png`
    },
    {
      name: messages.tools.pngToJpg.title,
      path: `/image-tools/png-to-jpg`
    },
    {
      name: messages.tools.heicToJpg.title,
      path: `/image-tools/heic-to-jpg`
    },
    {
      name: messages.tools.heicToPng.title,
      path: `/image-tools/heic-to-png`
    },
    {
      name: messages.tools.heicToWebp.title,
      path: `/image-tools/heic-to-webp`
    },
    {
      name: messages.tools.jpgToWebp.title,
      path: `/image-tools/jpg-to-webp`
    },
    {
      name: messages.tools.pngToWebp.title,
      path: `/image-tools/png-to-webp`
    },
    {
      name: messages.tools.svgToJpg.title,
      path: `/image-tools/svg-to-jpg`
    },
    {
      name: messages.tools.svgToPng.title,
      path: `/image-tools/svg-to-png`
    },
    {
      name: messages.tools.svgToWebp.title,
      path: `/image-tools/svg-to-webp`
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={messages.title}
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
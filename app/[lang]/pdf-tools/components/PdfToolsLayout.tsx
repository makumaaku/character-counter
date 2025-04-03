'use client'

import { ReactNode, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { Bars3Icon } from '@heroicons/react/24/solid'

type NavigationItem = {
  name: string;
  path: string;
  translatedName?: string;
}

type Props = {
  children: ReactNode;
  navigationItems: NavigationItem[];
  title: string;
}

export default function PdfToolsLayout({ children, navigationItems, title }: Props) {
  const params = useParams()
  const lang = params.lang as string
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={title} 
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
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

export default function SeoToolsLayout({ children }: Props) {
  const params = useParams()
  const lang = params.lang as string
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // SEOツールのリスト（サイドバー用）
  const navigationItems = [
    {
      name: translate(lang, 'pageSpeedChecker.title'),
      path: `/seo-tools/page-speed-checker`
    },
    {
      name: translate(lang, 'link-status-checker.title'),
      path: `/seo-tools/link-status-checker`
    },
    {
      name: translate(lang, 'seoCannibalizationChecker.title'),
      path: `/seo-tools/seo-cannibalization-checker`
    },
    {
      name: translate(lang, 'seoVolumeGuess.title'),
      path: `/seo-tools/seo-volume-guess`
    }
    // 将来的に他のSEOツールを追加する場合はここに追加
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={translate(lang, 'seoTools.title')} 
        homeLink={`/${lang}/seo-tools`}
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
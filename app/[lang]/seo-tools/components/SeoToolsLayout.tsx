'use client'

import { ReactNode, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Bars3Icon } from '@heroicons/react/24/solid'

// layoutMessagesの型を、親コンポーネントで定義されているものと同じにする
type LayoutMessages = {
  title: string;
  pageSpeedChecker: {
    title: string;
  };
  linkStatusChecker: {
    title: string;
  };
  seoCannibalizationChecker: {
    title: string;
  };
  seoVolumeGuess: {
    title: string;
  };
  pageStructureChecker: {
    title: string;
  };
  metaCraftForLlm: {
    title: string;
  };
};

type Props = {
  children: ReactNode;
  messages: LayoutMessages;
  menuText?: string;
}

export default function SeoToolsLayout({ children, messages, menuText = "Menu" }: Props) {
  const params = useParams()
  const lang = params.lang as string
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // SEOツールのリスト（サイドバー用）
  const navigationItems = [
    {
      name: messages.pageSpeedChecker.title,
      path: `/seo-tools/page-speed-checker`
    },
    {
      name: messages.linkStatusChecker.title,
      path: `/seo-tools/link-status-checker`
    },
    {
      name: messages.seoCannibalizationChecker.title,
      path: `/seo-tools/seo-cannibalization-checker`
    },
    {
      name: messages.seoVolumeGuess.title,
      path: `/seo-tools/seo-volume-guess`
    },
    {
      name: messages.pageStructureChecker.title,
      path: `/seo-tools/page-structure-checker`
    },
    {
      name: messages.metaCraftForLlm.title,
      path: `/seo-tools/meta-craft-for-llm`
    }
    // 将来的に他のSEOツールを追加する場合はここに追加
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={messages.title} 
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
          menuText={menuText}
        />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
} 
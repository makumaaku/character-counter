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

export default function PasswordStrengthLayout({ children }: Props) {
  const params = useParams()
  const lang = params.lang as string
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // パスワード関連ツールのリスト（サイドバー用）
  const navigationItems = [
    {
      name: translate(lang, 'passwordStrength.title'),
      path: `/password-strength`
    },
    {
      name: translate(lang, 'passwordGenerator.title'),
      path: `/word-gen/password-generator`
    }
    // 将来的に他のパスワード関連ツールを追加する場合はここに追加
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={translate(lang, 'passwordStrength.title')} 
        homeLink={`/${lang}/password-strength`}
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
        <main className="flex-1 px-4 lg:px-8 py-6">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  )
} 
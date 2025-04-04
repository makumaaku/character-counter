'use client'

import { ReactNode } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'

type Props = {
  children: ReactNode
  title: string
}

export default function PasswordStrengthLayout({ children, title }: Props) {
  const params = useParams()
  const lang = params.lang as string

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={title}
        homeLink={`/${lang}/password-strength`}
      />
      
      <div className="flex flex-1">
        <main className="flex-1 px-4 lg:px-8 py-6">
          {children}
        </main>
      </div> 
    </div>
  )
} 
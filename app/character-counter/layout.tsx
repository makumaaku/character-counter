import { Metadata } from 'next'
import Sidebar from './components/Sidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Character Counter',
  description: 'Instantly count characters, lines, and bytes. A free tool perfect for SNS posts and article writing.',
}

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title="Character Counter" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
} 
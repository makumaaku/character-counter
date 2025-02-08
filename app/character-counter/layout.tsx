import { Metadata } from 'next'
import Sidebar from './components/Sidebar'

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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 
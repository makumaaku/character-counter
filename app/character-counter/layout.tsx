import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Counter',
  description: 'Instantly count characters, lines, and bytes. A free tool perfect for SNS posts and article writing.',
}

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 
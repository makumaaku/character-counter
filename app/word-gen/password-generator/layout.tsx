import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Random Password Generator - Boring Tool',
  description: 'Generate strong, secure passwords instantly with our free password generator tool. Customize password length and character types for maximum security.',
  openGraph: {
    title: 'Random Password Generator - Boring Tool',
    description: 'Generate strong, secure passwords instantly with our free password generator tool. Customize password length and character types for maximum security.',
    url: 'https://boring-tool.com/password-generator',
    type: 'website',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 
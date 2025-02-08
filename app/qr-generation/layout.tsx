import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Simple and easy-to-use QR code generator. Quickly create QR codes from URLs and text.',
}

export default function QRGenerationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 
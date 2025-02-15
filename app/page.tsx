import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boring Tools - Simple and Useful Tools for Everyone',
  description: 'A collection of simple and useful tools including character counter, QR code generator, name generator, and more to help with your everyday tasks.',
  openGraph: {
    type: 'website',
    url: 'https://boring-tool.com/',
    title: 'Boring Tools - Simple and Useful Tools for Everyone',
    description: 'A collection of simple and useful tools including character counter, QR code generator, name generator, and more to help with your everyday tasks.',
    images: [
      {
        url: 'https://boring-tool.com/boring_logo.png',
        width: 286,
        height: 286,
        alt: 'Boring Tools Logo',
      },
    ],
  },
  keywords: 'character counter, qr code generator, name generator, tools, utilities, web tools',
};

export default function Home() {
  return (
    <div className="bg-[url('/hp_bg.jpg')] bg-cover bg-center h-screen relative">
      <div className="absolute top-0 left-0 p-4">
        <Image src="/boring_logo.png" alt="Boring Logo" width={286} height={286} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mt-10">
          <h1 className="text-white text-2xl font-bold text-center">Boring Tools</h1>
          <ul className="mt-4">
            <li>
              <Link href="/character-counter" className="text-white hover:underline">Character Counter</Link>
            </li>
            <li>
              <Link href="/qr-generation" className="text-white hover:underline">QR Generation</Link>
            </li>
            <li>
              <Link href="/word-generator" className="text-white hover:underline">Random Word Generator</Link>
            </li>
            <li>
              <Link href="/word-card-generator" className="text-white hover:underline">Random Word Card Generator</Link>
            </li>
            <li>
              <Link href="/sentence-generator" className="text-white hover:underline">Random Sentence Generator</Link>
            </li>
            <li>
              <Link href="/name-generator" className="text-white hover:underline">Random Name Generator</Link>
            </li>
            <li>
              <Link href="/password-generator" className="text-white hover:underline">Password Generator</Link>
            </li>
            <li>
              <Link href="/story-generator" className="text-white hover:underline">Random Story Generator</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
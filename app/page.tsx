import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/hp_bg.jpg"
        alt="Background"
        fill
        className="object-cover fixed -z-10"
        priority
      />
      <div className="absolute top-0 left-0 p-4 z-10">
        <Image 
          src="/boring_logo.png" 
          alt="Boring Logo" 
          width={286} 
          height={286}
          className="w-[20vw] max-w-[286px]" 
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen z-10 pb-10">
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
              <Link href="/word-gen" className="text-white hover:underline font-bold">Word Generation Tools</Link>
            </li>
            <li>
              <Link href="/word-gen/word-generator" className="text-white hover:underline ml-4">Random Word Generator</Link>
            </li>
            <li>
              <Link href="/word-gen/word-card-generator" className="text-white hover:underline ml-4">Random Word Card Generator</Link>
            </li>
            <li>
              <Link href="/word-gen/sentence-generator" className="text-white hover:underline ml-4">Random Sentence Generator</Link>
            </li>
            <li>
              <Link href="/word-gen/name-generator" className="text-white hover:underline ml-4">Random Name Generator</Link>
            </li>
            <li>
              <Link href="/word-gen/password-generator" className="text-white hover:underline ml-4">Random Password Generator</Link>
            </li>
            <li>
              <Link href="/word-gen/story-generator" className="text-white hover:underline ml-4">Random Story Generator</Link>
            </li>
            <li>
              <Link href="/word-gen/japanese-kanji-generator" className="text-white hover:underline ml-4">Japanese Kanji Generator</Link>
            </li>
            <li>
              <Link href="/image-tools" className="text-white hover:underline font-bold">Image Converters</Link>
            </li>
            <li>
              <Link href="/image-tools/jpg-to-png" className="text-white hover:underline ml-4">JPG to PNG Converter</Link>
            </li>
            <li>
              <Link href="/image-tools/png-to-jpg" className="text-white hover:underline ml-4">PNG to JPG Converter</Link>
            </li>
            <li>
              <Link href="/image-tools/heic-to-jpg" className="text-white hover:underline ml-4">HEIC to JPG Converter</Link>
            </li>
            <li>
              <Link href="/image-tools/heic-to-png" className="text-white hover:underline ml-4">HEIC to PNG Converter</Link>
            </li>
            <li>
              <Link href="/image-tools/heic-to-webp" className="text-white hover:underline ml-4">HEIC to WebP Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools" className="text-white hover:underline font-bold">PDF Tools</Link>
            </li>
            <li>
              <Link href="/pdf-tools/pdf-to-jpg" className="text-white hover:underline ml-4">PDF to JPG Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/jpg-to-pdf" className="text-white hover:underline ml-4">JPG to PDF Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/pdf-to-png" className="text-white hover:underline ml-4">PDF to PNG Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/png-to-pdf" className="text-white hover:underline ml-4">PNG to PDF Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/web-to-pdf" className="text-white hover:underline ml-4">Web to PDF Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/pdf-to-word" className="text-white hover:underline ml-4">PDF to Word Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/svg-to-pdf" className="text-white hover:underline ml-4">SVG to PDF Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/pdf-to-epub" className="text-white hover:underline ml-4">PDF to EPUB Converter</Link>
            </li>
            <li>
              <Link href="/pdf-tools/heic-to-pdf" className="text-white hover:underline ml-4">HEIC to PDF Converter</Link>
            </li>
            <li>
              <Link href="/seo-tools" className="text-white hover:underline font-bold">SEO Tools</Link>
            </li>
            <li>
              <Link href="/seo-tools/page-speed-checker" className="text-white hover:underline ml-4">Page Speed Checker</Link>
            </li>
            <li>
              <Link href="/seo-tools/link-status-checker" className="text-white hover:underline ml-4">Link Status Checker</Link>
            </li>
            <li>
              <Link href="/seo-tools/seo-cannibalization-checker" className="text-white hover:underline ml-4">SEO Cannibalization Checker</Link>
            </li>
            <li>
              <Link href="/number-quiz" className="text-white hover:underline">Number Place</Link>
            </li>
            <li>
              <Link href="/country-data" className="text-white hover:underline">Country Area comparison data</Link>
            </li>
            <li>
              <Link href="/roulette" className="text-white hover:underline">Roulette</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
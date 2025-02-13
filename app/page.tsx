import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Boring Tools',
    description: 'A collection of simple and useful tools for everyday tasks',
    url: 'https://boring-tool.com/',
  };

  return (
    <>
      <NextSeo
        title="Boring Tools - Simple and Useful Tools for Everyone"
        description="A collection of simple and useful tools including character counter, QR code generator, and more to help with your everyday tasks."
        canonical="https://boring-tool.com/"
        openGraph={{
          type: 'website',
          url: 'https://boring-tool.com/',
          title: 'Boring Tools - Simple and Useful Tools for Everyone',
          description: 'A collection of simple and useful tools including character counter, QR code generator, and more to help with your everyday tasks.',
          images: [
            {
              url: 'https://boring-tool.com/boring_logo.png',
              width: 286,
              height: 286,
              alt: 'Boring Tools Logo',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'character counter, qr code generator, tools, utilities, web tools',
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
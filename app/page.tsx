import Image from 'next/image';
import Link from 'next/link';

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
          </ul>
        </div>
      </div>
    </div>
  );
}
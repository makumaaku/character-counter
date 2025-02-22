import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-800">
      <div className="text-center space-y-6 w-full max-w-2xl mx-auto">
        <Image
          src="/404.jpg"
          alt="404 Not Found"
          width={600}
          height={450}
          className="w-full h-auto"
          priority
        />
        <p className="text-xl text-gray-100">This page could not be found.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 
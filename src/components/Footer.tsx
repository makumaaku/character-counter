import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-center py-6 mt-10">
      <Link href="/">
        <div className="w-24 h-24 bg-black rounded-full mx-auto flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
          <span className="text-white font-bold">Boring.</span>
        </div>
      </Link>
      <p className="text-gray-400 mt-2">&copy; Boring Inc.</p>
    </footer>
  );
};

export default Footer;
import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title = 'Character Counter', children }) => {
  return (
    <header className="bg-primary text-white flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        {children}
        <Link href="/character-counter" className="hidden lg:block">
          <div className="text-2xl font-bold">Boring.</div>
        </Link>
      </div>
      <Link href="/character-counter">
        <h1 className="text-xl font-bold hover:text-gray-200 transition-colors cursor-pointer">{title}</h1>
      </Link>
      <div className="w-[76px]"></div>
    </header>
  );
};

export default Header;
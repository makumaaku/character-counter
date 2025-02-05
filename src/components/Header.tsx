import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white flex justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Boring.</h1>
      </Link>
      <h2 className="text-xl">Character Count</h2>
      <div className="w-[76px]"></div>
    </header>
  );
};

export default Header;
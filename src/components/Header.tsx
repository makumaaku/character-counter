import React from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  title: string;
  homeLink: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, homeLink, children }) => {
  return (
    <header className="bg-primary text-white flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        {children}
      </div>
      <Link href={homeLink}>
        <div className="text-xl font-bold hover:text-gray-200 transition-colors cursor-pointer">{title}</div>
      </Link>
      <div className="w-[76px] flex items-center justify-end">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
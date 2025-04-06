import React from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  title: string;
  homeLink: string;
  isH1?: boolean;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, homeLink, isH1 = false, children }) => {
  return (
    <header className="bg-primary text-white flex items-center p-4">
      <div className="flex-1 flex items-center gap-2">
        {children}
      </div>
      <Link href={homeLink} className="flex-1 flex justify-center">
        {isH1 ? (
          <h1 className="text-sm md:text-xl font-bold hover:text-gray-200 transition-colors cursor-pointer">{title}</h1>
        ) : (
          <div className="text-sm md:text-xl font-bold hover:text-gray-200 transition-colors cursor-pointer">{title}</div>
        )}
      </Link>
      <div className="flex-1 flex items-center justify-end">
        <div className="w-[90px]">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
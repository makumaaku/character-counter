'use client';

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { wordGenNavigation } from '../config/navigation';
import { usePathname } from 'next/navigation';
import { translate } from '@/lib/i18n/client';

type Props = {
  children: React.ReactNode;
};

export default function WordGenLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'en';

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={translate(lang, 'wordGen.title')} homeLink="/word-gen">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white"
          aria-label="Open Menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </Header>
      <div className="flex flex-1">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          navigationItems={wordGenNavigation}
          lang={lang}
        />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
} 
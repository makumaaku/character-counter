'use client';

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Sidebar from './Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title="Character Counter">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-white"
          aria-label="Open Menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </Header>
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
} 
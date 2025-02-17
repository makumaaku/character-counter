'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { translate } from '@/lib/i18n/client';
import Header from '@/components/Header';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

type Props = {
  children: React.ReactNode;
}

export default function CharacterCounterLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const params = useParams();
  const lang = params.lang as string;
  const t = (key: string) => translate(lang, key);

  const navigationItems = [
    { name: t('characterCounter.sidebar.function'), path: `/character-counter/function` },
    { name: t('characterCounter.sidebar.usecase'), path: `/character-counter/usecase` },
    { name: t('characterCounter.sidebar.faq'), path: `/character-counter/faq` },
    { name: t('characterCounter.sidebar.aboutUs'), path: `/character-counter/about-us` },
    { name: t('characterCounter.sidebar.contact'), path: `/character-counter/contact` },
    { name: t('characterCounter.sidebar.privacy'), path: `/character-counter/privacy` },
    { name: t('characterCounter.sidebar.plan'), path: `/character-counter/plan` },
    { name: t('characterCounter.sidebar.column'), path: `/character-counter/column` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={t('characterCounter.title')} homeLink={`/${lang}/character-counter`}>
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
          navigationItems={navigationItems}
        />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
} 
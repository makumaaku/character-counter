'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Header from '@/components/Header';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Sidebar from '@/components/Sidebar';

// レイアウト用メッセージインターフェース
interface CharacterCounterLayoutMessages {
  title: string;
  sidebar: {
    function: string;
    usecase: string;
    faq: string;
    aboutUs: string;
    contact: string;
    privacy: string;
    column: string;
  };
}

type Props = {
  children: React.ReactNode;
  messages?: CharacterCounterLayoutMessages;
}

export default function CharacterCounterLayout({ children, messages }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const lang = params.lang as string;
  
  // 文字数カウンターのトップページかどうかを判断
  const isCharacterCounterTop = pathname === `/${lang}/character-counter`;

  const navigationItems = [
    { name: messages?.sidebar.function || 'Function', path: `/character-counter/function` },
    { name: messages?.sidebar.usecase || 'Use Case', path: `/character-counter/usecase` },
    { name: messages?.sidebar.faq || 'FAQ', path: `/character-counter/faq` },
    { name: messages?.sidebar.contact || 'Contact', path: `/character-counter/contact` },
    { name: messages?.sidebar.column || 'Column', path: `/character-counter/column` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={messages?.title || 'Character Counter'} homeLink={`/${lang}/character-counter`} isH1={isCharacterCounterTop}>
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
          lang={lang}
        />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 
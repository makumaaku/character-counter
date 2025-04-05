'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Sidebar from '@/components/Sidebar';
import { WordGenCommonMessages } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  messages: WordGenCommonMessages;
  lang: string;
  menuText?: string;
};

export default function WordGenLayout({ children, messages, lang, menuText = "Menu" }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigationItems = [
    { name: messages.tools.wordGenerator.title, path: `/word-gen/word-generator` },
    { name: messages.tools.wordCardGenerator.title, path: `/word-gen/word-card-generator` },
    { name: messages.tools.sentenceGenerator.title, path: `/word-gen/sentence-generator` },
    { name: messages.tools.nameGenerator.title, path: `/word-gen/name-generator` },
    { name: messages.tools.passwordGenerator.title, path: `/word-gen/password-generator` },
    { name: messages.tools.storyGenerator.title, path: `/word-gen/story-generator` },
    { name: messages.tools.japaneseKanjiGenerator.title, path: `/word-gen/japanese-kanji-generator` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={messages.title} homeLink={`/${lang}/word-gen`}>
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
          menuText={menuText}
        />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 
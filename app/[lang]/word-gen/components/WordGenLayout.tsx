'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useMessages } from '@/hooks/useMessages';

type Props = {
  children: React.ReactNode;
};

// メッセージの型定義
type WordGenMessages = {
  title: string;
  description: string;
  wordGen: {
    tools: {
      wordGenerator: {
        title: string;
      };
      wordCardGenerator: {
        title: string;
      };
      sentenceGenerator: {
        title: string;
      };
      nameGenerator: {
        title: string;
      };
      passwordGenerator: {
        title: string;
      };
      storyGenerator: {
        title: string;
      };
      japaneseKanjiGenerator: {
        title: string;
      };
    };
  };
};

export default function WordGenLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const params = useParams();
  const lang = params.lang as string;
  
  // messagesを取得するカスタムフック
  const messages = useMessages<WordGenMessages>();

  // messagesがロードされるまでローディング表示
  if (!messages) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const navigationItems = [
    { name: messages.wordGen.tools.wordGenerator.title, path: `/word-gen/word-generator` },
    { name: messages.wordGen.tools.wordCardGenerator.title, path: `/word-gen/word-card-generator` },
    { name: messages.wordGen.tools.sentenceGenerator.title, path: `/word-gen/sentence-generator` },
    { name: messages.wordGen.tools.nameGenerator.title, path: `/word-gen/name-generator` },
    { name: messages.wordGen.tools.passwordGenerator.title, path: `/word-gen/password-generator` },
    { name: messages.wordGen.tools.storyGenerator.title, path: `/word-gen/story-generator` },
    { name: messages.wordGen.tools.japaneseKanjiGenerator.title, path: `/word-gen/japanese-kanji-generator` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* こちらは多言語対応の必要はない */}
      <Header title={'Word Generation Tools'} homeLink={`/${lang}/word-gen`}>
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
      <Footer />
    </div>
  );
} 
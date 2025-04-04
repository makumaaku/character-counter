'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface NavigationItem {
  name: string;
  path: string;
  translatedName?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  lang?: string;
  menuText?: string;
}

export default function Sidebar({ isOpen, onClose, navigationItems, lang = 'en', menuText = 'Menu' }: SidebarProps) {
  const pathname = usePathname();

  // 現在のパスと言語を考慮したアクティブ状態の判定
  const isActiveLink = (itemPath: string) => {
    // 言語パスを除いた現在のパスを取得
    const currentPathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '');
    return currentPathWithoutLang === itemPath;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out border-r border-gray-700 bg-gray-800 text-gray-100 z-50`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">{menuText}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="py-4 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={`/${lang}${item.path}`}
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    isActiveLink(item.path)
                      ? 'bg-gray-700 text-white'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.translatedName || item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
} 
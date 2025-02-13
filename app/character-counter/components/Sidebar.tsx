'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
    { name: 'Column', path: '/character-counter/column' },
  { name: 'Features & Usage', path: '/character-counter/function' },
  { name: 'Use Cases', path: '/character-counter/usecase' },
  { name: 'Plans', path: '/character-counter/plan' },
  { name: 'FAQ', path: '/character-counter/faq' },
  
//   { name: 'Contact', path: '/character-counter/contact' },
  { name: 'About Us', path: '/character-counter/profile' },
  { name: 'Privacy Policy', path: '/character-counter/privacy' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <nav
        className={`fixed lg:static inset-y-0 left-0 w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out border-r border-gray-700 bg-gray-800 text-gray-100 z-50`}
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
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
                  href={item.path}
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    pathname === item.path
                      ? 'bg-gray-700 text-white'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
} 
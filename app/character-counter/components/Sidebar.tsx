'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'Features & Usage', path: '/character-counter/function' },
  { name: 'Use Cases', path: '/character-counter/usecase' },
  { name: 'Plans', path: '/character-counter/plan' },
  { name: 'FAQ', path: '/character-counter/faq' },
  { name: 'Column', path: '/character-counter/column' },
//   { name: 'Contact', path: '/character-counter/contact' },
//   { name: 'About Us', path: '/character-counter/profile' },
//   { name: 'Privacy Policy', path: '/character-counter/privacy' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 border-r border-gray-700 bg-gray-800 text-gray-100">
      <div className="py-4 px-2">
        <Link href="/character-counter" className="block mb-4 px-2">
          <h2 className="text-lg font-bold hover:text-gray-300 transition-colors">Character Counter</h2>
        </Link>
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
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
  );
} 
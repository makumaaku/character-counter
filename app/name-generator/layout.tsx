import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Name Generator - Boring Tool',
  description: 'Generate random full names with our free online name generator tool. Perfect for writers, game developers, and creative projects.',
  openGraph: {
    title: 'Random Name Generator - Boring Tool',
    description: 'Generate random full names with our free online name generator tool. Perfect for writers, game developers, and creative projects.',
    url: 'https://boring-tool.com/name-generator',
    type: 'website',
  },
};

export default function NameGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 
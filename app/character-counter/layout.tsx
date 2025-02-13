import { Metadata } from 'next';
import CharacterCounterLayout from './components/CharacterCounterLayout';

export const metadata: Metadata = {
  title: 'Character Counter',
  description: 'Instantly count characters, lines, and bytes. A free tool perfect for SNS posts and article writing.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CharacterCounterLayout>{children}</CharacterCounterLayout>;
} 
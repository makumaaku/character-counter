import WordGenLayout from './components/WordGenLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WordGenLayout>{children}</WordGenLayout>;
} 
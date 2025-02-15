export default function SentenceGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800 min-h-screen">
      {children}
    </div>
  );
} 
'use client';

import { useParams } from 'next/navigation';
import { translate } from '@/lib/i18n/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  children: React.ReactNode;
}

export default function QRGenerationLayout({ children }: Props) {
  const params = useParams();
  const lang = params.lang as string;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header title={t('qrGeneration.title')} homeLink={`/${lang}/qr-generation`} />
      <main className="flex-1 px-4 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
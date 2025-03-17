import { translate } from '@/lib/i18n/server';
import LinkStatusCheckerForm from './components/LinkStatusCheckerForm';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function LinkStatusChecker({ params }: Props) {
  const { lang } = await params;

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'link-status-checker.title')}</h1>
          <p className="text-xl text-gray-300">
            {translate(lang, 'link-status-checker.description')}
          </p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <LinkStatusCheckerForm lang={lang} />
        </div>
      </div>
    </div>
  );
} 
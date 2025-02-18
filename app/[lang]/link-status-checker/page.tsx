import { translate } from '@/lib/i18n/server';
import LinkStatusCheckerForm from './components/LinkStatusCheckerForm';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function LinkStatusChecker({ params }: Props) {
  const { lang } = await params;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-purple-500">
            {translate(lang, 'link-status-checker.title')}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-300">
            {translate(lang, 'link-status-checker.description')}
          </p>
        </div>
        <LinkStatusCheckerForm lang={lang} />
      </div>
    </div>
  );
} 
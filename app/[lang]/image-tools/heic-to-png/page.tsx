import { Metadata } from 'next';
import { translate } from '@/lib/i18n/server';
import HeicToPngConverter from './components/HeicToPngConverter';

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: translate(lang, 'heicToPng.metadata.title'),
    description: translate(lang, 'heicToPng.metadata.description'),
    keywords: translate(lang, 'heicToPng.metadata.keywords'),
  };
}

export default async function HeicToPngPage({ params }: Props) {
  const { lang } = await params;

  const translations = {
    title: translate(lang, 'heicToPng.title'),
    description: translate(lang, 'heicToPng.description'),
    upload: {
      title: translate(lang, 'heicToPng.upload.title'),
      button: translate(lang, 'heicToPng.upload.button'),
      dragndrop: translate(lang, 'heicToPng.upload.dragndrop'),
      limit: translate(lang, 'heicToPng.upload.limit')
    },
    convert: {
      button: translate(lang, 'heicToPng.convert.button'),
      processing: translate(lang, 'heicToPng.convert.processing'),
      download: translate(lang, 'heicToPng.convert.download'),
      downloadAll: translate(lang, 'heicToPng.convert.downloadAll'),
      converted: translate(lang, 'heicToPng.convert.converted')
    },
    preview: {
      title: translate(lang, 'heicToPng.preview.title'),
      nofiles: translate(lang, 'heicToPng.preview.nofiles')
    },
    error: {
      noFiles: translate(lang, 'heicToPng.error.noFiles'),
      invalidFormat: translate(lang, 'heicToPng.error.invalidFormat'),
      tooLarge: translate(lang, 'heicToPng.error.tooLarge'),
      failed: translate(lang, 'heicToPng.error.failed')
    }
  };

  return (
    <div className="w-full">
      <HeicToPngConverter translations={translations} />
    </div>
  );
} 
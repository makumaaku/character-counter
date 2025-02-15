import Image from 'next/image';
import Link from 'next/link';
import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function Home(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="bg-[url('/hp_bg.jpg')] bg-cover bg-center h-screen relative">
      <div className="absolute top-0 left-0 p-4">
        <Image src="/boring_logo.png" alt="Boring Logo" width={286} height={286} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mt-10">
          <h1 className="text-white text-2xl font-bold text-center">
            {t('home.title')}
          </h1>
          <ul className="mt-4">
            <li>
              <Link href={`/${lang}/character-counter`} className="text-white hover:underline">
                {t('home.tools.characterCounter')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/qr-generation`} className="text-white hover:underline">
                {t('home.tools.qrGeneration')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/word-gen`} className="text-white hover:underline font-bold">
                {t('home.tools.wordGeneration')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/word-gen/word-generator`} className="text-white hover:underline ml-4">
                {t('home.tools.wordGenerator')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/word-gen/word-card-generator`} className="text-white hover:underline ml-4">
                {t('home.tools.wordCardGenerator')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/word-gen/sentence-generator`} className="text-white hover:underline ml-4">
                {t('home.tools.sentenceGenerator')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/word-gen/name-generator`} className="text-white hover:underline ml-4">
                {t('home.tools.nameGenerator')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/word-gen/password-generator`} className="text-white hover:underline ml-4">
                {t('home.tools.passwordGenerator')}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/word-gen/story-generator`} className="text-white hover:underline ml-4">
                {t('home.tools.storyGenerator')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 
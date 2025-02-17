import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { translate } from '@/lib/i18n/server';

type Props = {
  params: Promise<{ lang: string }>
}

interface ColumnData {
  title: string;
  slug: string;
}

async function getColumnData(lang: string): Promise<ColumnData[]> {
  console.log(lang)
  const columnsDirectory = path.join(process.cwd(), `assets/mdx/character-counter`);
  const fileNames = fs.readdirSync(columnsDirectory);

  const columnData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const fullPath = path.join(columnsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        title: data.title,
        slug: fileName.replace(/\.mdx$/, ''),
      };
    });

  return columnData;
}

export default async function ColumnList(props: Props) {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);
  const columnData = await getColumnData(lang);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">{t('characterCounter.column.title')}</h1>        
        <ul>
          {columnData.map(({ title, slug }) => (
            <li key={slug} className="bg-gray-700 p-6 rounded-lg mt-6">
              <Link href={`/${lang}/character-counter/column/${slug}`} className="block text-xl font-bold text-center">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { metadata } from './metadata';

interface ColumnData {
  title: string;
  slug: string;
}

async function getColumnData(): Promise<ColumnData[]> {
  const columnsDirectory = path.join(process.cwd(), 'app/character-counter/columns');
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

export { metadata };

export default async function ColumnList() {
  const columnData = await getColumnData();

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-10">
        <ul>
          {columnData.map(({ title, slug }) => (
            <li key={slug} className="bg-gray-700 p-6 rounded-lg mt-6">
              <Link href={`/character-counter/column/${slug}`} className="block text-xl font-bold text-center">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
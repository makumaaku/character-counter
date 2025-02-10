import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import matter from 'gray-matter';

interface ColumnData {
  title: string;
  slug: string;
}

async function getColumnData(): Promise<ColumnData[]> {
  const columnsDirectory = path.join(process.cwd(), 'app', 'character-counter', 'columns');
  const filenames = fs.readdirSync(columnsDirectory);
  const columnSlugs = filenames.filter((file) => file.endsWith('.mdx'));

  const columnData = columnSlugs.map((file) => {
    const filePath = path.join(columnsDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slug = file.replace('.mdx', '');

    return {
      title: data.title || slug, // フロントマターからタイトルを取得、なければslugを使用
      slug,
    };
  });

  return columnData;
}

export default async function ColumnList() {
  const columnData = await getColumnData();

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex flex-col">
      <Header title="Character Counter Column" />
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
      <Footer />
    </div>
  )
}
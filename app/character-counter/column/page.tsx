import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

async function getColumnData() {
  const columnsDirectory = path.join(process.cwd(), 'app', 'character-counter', 'columns');
  const filenames = fs.readdirSync(columnsDirectory);
  const columnSlugs = filenames.filter((file) => file.endsWith('.mdx'));

  const columnData = [];
  for (const file of columnSlugs) {
    const filePath = path.join(columnsDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const titleMatch = fileContent.match(/^#\s+(.*)/m); // MDXファイルの先頭行の # タイトル を抽出
    const title = titleMatch ? titleMatch[1] : file.replace('.mdx', ''); // タイトルがない場合はファイル名をslugとする
    const slug = file.replace('.mdx', '');
    columnData.push({ title, slug });
  }
  return columnData;
}

export default async function ColumnList() {
  const columnData = await getColumnData();

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h2 className="text-xl mb-4">Column List</h2>
        </div>
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
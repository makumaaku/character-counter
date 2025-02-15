import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Character Counter Blog - Tips & Guides | Text Analysis Articles',
  description: 'Read our collection of articles about text analysis, character counting tips, and best practices for content creation. Learn how to optimize your writing with our guides.',
  keywords: 'character counter blog, text analysis tips, content writing guide, word count articles, writing optimization',
  openGraph: {
    title: 'Character Counter Blog - Tips & Guides | Text Analysis Articles',
    description: 'Read our collection of articles about text analysis, character counting tips, and best practices for content creation. Learn how to optimize your writing with our guides.',
    url: 'https://boring-tool.com/character-counter/column',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/column'
  }
}

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

export default async function ColumnList() {
  const columnData = await getColumnData();

  return (
    <>
      <Script
        id="column-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Character Counter Blog",
            "description": "Articles about text analysis, character counting tips, and content creation best practices",
            "url": "https://boring-tool.com/character-counter/column",
            "blogPost": columnData.map(({ title, slug }) => ({
              "@type": "BlogPosting",
              "headline": title,
              "url": `https://boring-tool.com/character-counter/column/${slug}`
            }))
          })
        }}
      />
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
    </>
  )
}
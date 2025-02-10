import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import fs from 'fs';
import path from 'path';

interface FrontMatter {
  title: string;
}

async function getColumn(slug: string) {
  try {
    // columnsディレクトリのパスを取得
    const columnsDirectory = path.join(process.cwd(), 'app', 'character-counter', 'columns');
    const filePath = path.join(columnsDirectory, `${slug}.mdx`);
    
    // ファイルの内容を読み込む
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
    });

    return { 
      content,
      title: frontmatter.title || slug // フロントマターからタイトルを取得、なければslugを使用
    };
  } catch (error) {
    console.error("Failed to load column", slug, error);
    notFound();
  }
}

interface ColumnPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ColumnPage({ params }: ColumnPageProps) {
  const resolvedParams = await params;
  const { content, title } = await getColumn(resolvedParams.slug);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex flex-col">
      <Header title="Character Counter Column" />
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-10">
        <article className="bg-gray-700 p-8 rounded-lg prose prose-invert prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
          {content}
        </article>
      </main>
      <Footer />
    </div>
  );
}

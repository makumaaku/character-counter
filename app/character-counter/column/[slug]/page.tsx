import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';

interface FrontMatter {
  title: string;
}

async function getColumn(slug: string) {
  const columnsDirectory = path.join(process.cwd(), 'app/character-counter/columns');
  const filePath = path.join(columnsDirectory, `${slug}.mdx`);

  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source,
      options: { parseFrontmatter: true }
    });

    return {
      content,
      title: frontmatter.title
    };
  } catch {
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
    <div className="text-gray-100">
      <main className="max-w-4xl w-full mx-auto px-4 py-10">
        <article className="bg-gray-700 p-8 rounded-lg prose prose-invert prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
          {content}
        </article>
      </main>
    </div>
  );
}

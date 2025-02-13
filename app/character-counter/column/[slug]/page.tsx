import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';

interface FrontMatter {
  title: string;
  description?: string;
  keywords?: string;
  publishedTime?: string;
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
      title: frontmatter.title,
      description: frontmatter.description,
      keywords: frontmatter.keywords,
      publishedTime: frontmatter.publishedTime
    };
  } catch {
    notFound();
  }
}

interface ColumnPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ColumnPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { title, description, keywords } = await getColumn(resolvedParams.slug);

  return {
    title: `${title} | Character Counter Blog`,
    description: description || `Read our article about ${title.toLowerCase()}. Learn more about text analysis and character counting.`,
    keywords: keywords || 'character counter, text analysis, content writing',
    openGraph: {
      title: `${title} | Character Counter Blog`,
      description: description || `Read our article about ${title.toLowerCase()}. Learn more about text analysis and character counting.`,
      url: `https://boring-tool.com/character-counter/column/${resolvedParams.slug}`,
      type: 'article'
    },
    alternates: {
      canonical: `https://boring-tool.com/character-counter/column/${resolvedParams.slug}`
    }
  };
}

export default async function ColumnPage({ params }: ColumnPageProps) {
  const resolvedParams = await params;
  const { content, title } = await getColumn(resolvedParams.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": `Read our article about ${title.toLowerCase()}. Learn more about text analysis and character counting.`,
            "url": `https://boring-tool.com/character-counter/column/${resolvedParams.slug}`,
            "publisher": {
              "@type": "Organization",
              "name": "Character Counter Tool",
              "url": "https://boring-tool.com"
            }
          })
        }}
      />
      <div className="text-gray-100">
        <main className="max-w-4xl w-full mx-auto px-4 py-10">
          <article className="bg-gray-700 p-8 rounded-lg prose prose-invert prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
            {content}
          </article>
        </main>
      </div>
    </>
  );
}

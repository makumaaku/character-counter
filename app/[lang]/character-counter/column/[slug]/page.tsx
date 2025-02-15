import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { translate } from '@/lib/i18n/server';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-6 text-gray-100">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold mb-4 text-gray-100">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-medium mb-3 text-gray-100">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-200 mb-4">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-blue-400 hover:text-blue-300">
      {children}
    </a>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-gray-100">{children}</strong>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="text-gray-100 bg-gray-800 px-1 py-0.5 rounded">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg mb-4 overflow-x-auto">
      {children}
    </pre>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="text-gray-200 list-disc pl-5 mb-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="text-gray-200 list-decimal pl-5 mb-4">{children}</ol>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 text-gray-300 italic mb-4">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="rounded-lg mb-4" />
  ),
};

async function getColumn(slug: string, lang: string) {
  console.log(lang)
  const columnsDirectory = path.join(process.cwd(), `app/[lang]/character-counter/columns`);
  const filePath = path.join(columnsDirectory, `${slug}.mdx`);

  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    
    return {
      content,
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      publishedTime: data.publishedTime
    };
  } catch (error) {
    console.error('Error processing MDX:', error);
    notFound();
  }
}

interface ColumnPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateMetadata({ params }: ColumnPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { title, description, keywords } = await getColumn(resolvedParams.slug, resolvedParams.lang);
  const t = (key: string) => translate(resolvedParams.lang, key);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description || t(`characterCounter.column.article.defaultDescription.${title.toLowerCase()}`),
    "url": `https://boring-tool.com/${resolvedParams.lang}/character-counter/column/${resolvedParams.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Boring Tool",
      "url": "https://boring-tool.com"
    },
    "inLanguage": resolvedParams.lang
  };

  return {
    title: title,
    description: description || t(`characterCounter.column.article.defaultDescription.${title.toLowerCase()}`),
    keywords: keywords || t('characterCounter.column.article.defaultKeywords'),
    openGraph: {
      title: title,
      description: description || t(`characterCounter.column.article.defaultDescription.${title.toLowerCase()}`),
      url: `https://boring-tool.com/${resolvedParams.lang}/character-counter/column/${resolvedParams.slug}`,
      type: 'article'
    },
    alternates: {
      canonical: `https://boring-tool.com/${resolvedParams.lang}/character-counter/column/${resolvedParams.slug}`,
      languages: {
        'en': `https://boring-tool.com/en/character-counter/column/${resolvedParams.slug}`,
        'ja': `https://boring-tool.com/ja/character-counter/column/${resolvedParams.slug}`,
      }
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLdData)
    }
  };
}

export default async function ColumnPage({ params }: ColumnPageProps) {
  const resolvedParams = await params;
  const { content, title } = await getColumn(resolvedParams.slug, resolvedParams.lang);

  return (
    <div className="text-gray-100">
      <main className="max-w-4xl w-full mx-auto px-4 py-10">
        <article className="bg-gray-700 p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
          <MDXRemote source={content} components={components} />
        </article>
      </main>
    </div>
  );
}
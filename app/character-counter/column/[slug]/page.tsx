import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { readColumn } from '@/lib/columns';

async function getColumn(slug: string) {
  try {
    const column = await readColumn(slug);
    if (!column) {
      notFound();
    }

    const { content } = await compileMDX({
      source: column.content,
      components: {},
    });

    return content;
  } catch (error) {
    console.error("Failed to load column", slug, error);
    notFound();
  }
}

interface ColumnPageProps {
  params: Promise<{ slug: string }>;
}


export default async function ColumnPage({ params }: ColumnPageProps) {
  const { slug } = await params;
  const content = await getColumn(slug);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <article className="bg-secondary text-foreground p-8 rounded-lg">
          {content}
        </article>
      </main>
      <Footer />
    </div>
  );
}

import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import Header from '@/components/Header'; // ヘッダーコンポーネントをインポート
import Footer from '@/components/Footer'; // フッターコンポーネントをインポート

const components = {}

async function getColumn(slug: string) {
  try {
    const columnsDirectory = path.join(process.cwd(), 'app', 'character-counter', 'columns')
    const filePath = path.join(columnsDirectory, `${slug}.mdx`)
    const source = fs.readFileSync(filePath, 'utf8')

    const { content } = await compileMDX({
      source,
      components
    })

    return content
  } catch {
    notFound()
  }
}

export default async function ColumnPage({ params }: { params: { slug: string } }) {
  const content = await getColumn(params.slug)
  return (
    <div className="bg-background min-h-screen">
      <Header /> {/* ヘッダーコンポーネントを使用 */}

      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <article className="bg-secondary text-foreground p-8 rounded-lg">
          {content}
        </article>
      </main>

      <Footer /> {/* フッターコンポーネントを使用 */}
    </div>
  )
}
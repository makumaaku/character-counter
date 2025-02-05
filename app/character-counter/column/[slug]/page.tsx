import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'

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
    <article>
      {content}
    </article>
  )
}
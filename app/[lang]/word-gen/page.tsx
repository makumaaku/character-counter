import Link from 'next/link'
import { translate } from '@/lib/i18n/server'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function WordGenTools({ params }: Props) {
  const { lang } = await params
  
  const tools = [
    {
      title: translate(lang, 'wordGen.tools.wordGenerator.title'),
      description: translate(lang, 'wordGen.tools.wordGenerator.description'),
      path: `/${lang}/word-gen/word-generator`,
      icon: "📝"
    },
    {
      title: translate(lang, 'wordGen.tools.wordCardGenerator.title'),
      description: translate(lang, 'wordGen.tools.wordCardGenerator.description'),
      path: `/${lang}/word-gen/word-card-generator`,
      icon: "🗂️"
    },
    {
      title: translate(lang, 'wordGen.tools.sentenceGenerator.title'),
      description: translate(lang, 'wordGen.tools.sentenceGenerator.description'),
      path: `/${lang}/word-gen/sentence-generator`,
      icon: "✍️"
    },
    {
      title: translate(lang, 'wordGen.tools.nameGenerator.title'),
      description: translate(lang, 'wordGen.tools.nameGenerator.description'),
      path: `/${lang}/word-gen/name-generator`,
      icon: "👤"
    },
    {
      title: translate(lang, 'wordGen.tools.passwordGenerator.title'),
      description: translate(lang, 'wordGen.tools.passwordGenerator.description'),
      path: `/${lang}/word-gen/password-generator`,
      icon: "🔒"
    },
    {
      title: translate(lang, 'wordGen.tools.storyGenerator.title'),
      description: translate(lang, 'wordGen.tools.storyGenerator.description'),
      path: `/${lang}/word-gen/story-generator`,
      icon: "📚"
    },
  ]

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'wordGen.title')}</h1>
          <p className="text-xl text-gray-300">
            {translate(lang, 'wordGen.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl">{tool.icon}</span>
                <div>
                  <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
                  <p className="text-gray-300">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
} 
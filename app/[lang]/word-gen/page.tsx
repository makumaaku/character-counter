import { translate } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function WordGenTools({ params }: Props) {
  const { lang } = await params

  // 並列で翻訳を取得
  const [
    title,
    description,
    wordGeneratorTitle,
    wordGeneratorDescription,
    wordCardGeneratorTitle,
    wordCardGeneratorDescription,
    sentenceGeneratorTitle,
    sentenceGeneratorDescription,
    nameGeneratorTitle,
    nameGeneratorDescription,
    passwordGeneratorTitle,
    passwordGeneratorDescription,
    storyGeneratorTitle,
    storyGeneratorDescription,
    japaneseKanjiGeneratorTitle,
    japaneseKanjiGeneratorDescription
  ] = await Promise.all([
    translate(lang, 'wordGen.title'),
    translate(lang, 'wordGen.description'),
    translate(lang, 'wordGen.tools.wordGenerator.title'),
    translate(lang, 'wordGen.tools.wordGenerator.description'),
    translate(lang, 'wordGen.tools.wordCardGenerator.title'),
    translate(lang, 'wordGen.tools.wordCardGenerator.description'),
    translate(lang, 'wordGen.tools.sentenceGenerator.title'),
    translate(lang, 'wordGen.tools.sentenceGenerator.description'),
    translate(lang, 'wordGen.tools.nameGenerator.title'),
    translate(lang, 'wordGen.tools.nameGenerator.description'),
    translate(lang, 'wordGen.tools.passwordGenerator.title'),
    translate(lang, 'wordGen.tools.passwordGenerator.description'),
    translate(lang, 'wordGen.tools.storyGenerator.title'),
    translate(lang, 'wordGen.tools.storyGenerator.description'),
    translate(lang, 'wordGen.tools.japaneseKanjiGenerator.title'),
    translate(lang, 'wordGen.tools.japaneseKanjiGenerator.description')
  ])
  
  const tools = [
    {
      title: wordGeneratorTitle,
      description: wordGeneratorDescription,
      path: `/${lang}/word-gen/word-generator`,
      icon: "📝"
    },
    {
      title: wordCardGeneratorTitle,
      description: wordCardGeneratorDescription,
      path: `/${lang}/word-gen/word-card-generator`,
      icon: "🗂️"
    },
    {
      title: sentenceGeneratorTitle,
      description: sentenceGeneratorDescription,
      path: `/${lang}/word-gen/sentence-generator`,
      icon: "✍️"
    },
    {
      title: nameGeneratorTitle,
      description: nameGeneratorDescription,
      path: `/${lang}/word-gen/name-generator`,
      icon: "👤"
    },
    {
      title: passwordGeneratorTitle,
      description: passwordGeneratorDescription,
      path: `/${lang}/word-gen/password-generator`,
      icon: "🔒"
    },
    {
      title: storyGeneratorTitle,
      description: storyGeneratorDescription,
      path: `/${lang}/word-gen/story-generator`,
      icon: "📚"
    },
    {
      title: japaneseKanjiGeneratorTitle,
      description: japaneseKanjiGeneratorDescription,
      path: `/${lang}/word-gen/japanese-kanji-generator`,
      icon: "漢"
    }
  ]

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.path}
              title={tool.title}
              description={tool.description}
              path={tool.path}
              icon={tool.icon}
            />
          ))}
        </div>
      </main>
    </div>
  )
} 

                 
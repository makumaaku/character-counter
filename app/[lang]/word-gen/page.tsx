import { translate, loadToolMessages } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'
import { Language, WordGenCommonMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function WordGenTools({ params }: Props) {
  const { lang } = await params

  // word-gen用の翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen');

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
  
  // WordGenCommonMessagesの構造に合わせてmessagesオブジェクトを作成
  const messages: WordGenCommonMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    common: {
      copyButton: "",
      copied: "",
      generateButton: "",
      downloadButton: "",
      resetButton: "",
      settings: "",
      preview: "",
      result: "",
      length: "",
      options: "",
      customize: ""
    },
    title,
    description,
    tools: {
      wordGenerator: {
        title: wordGeneratorTitle,
        description: wordGeneratorDescription
      },
      wordCardGenerator: {
        title: wordCardGeneratorTitle,
        description: wordCardGeneratorDescription
      },
      sentenceGenerator: {
        title: sentenceGeneratorTitle,
        description: sentenceGeneratorDescription
      },
      nameGenerator: {
        title: nameGeneratorTitle,
        description: nameGeneratorDescription
      },
      passwordGenerator: {
        title: passwordGeneratorTitle,
        description: passwordGeneratorDescription
      },
      storyGenerator: {
        title: storyGeneratorTitle,
        description: storyGeneratorDescription
      },
      japaneseKanjiGenerator: {
        title: japaneseKanjiGeneratorTitle,
        description: japaneseKanjiGeneratorDescription
      }
    }
  };
  
  const tools = [
    {
      title: messages.tools.wordGenerator.title,
      description: messages.tools.wordGenerator.description,
      path: `/${lang}/word-gen/word-generator`,
      icon: "📝"
    },
    {
      title: messages.tools.wordCardGenerator.title,
      description: messages.tools.wordCardGenerator.description,
      path: `/${lang}/word-gen/word-card-generator`,
      icon: "🗂️"
    },
    {
      title: messages.tools.sentenceGenerator.title,
      description: messages.tools.sentenceGenerator.description,
      path: `/${lang}/word-gen/sentence-generator`,
      icon: "✍️"
    },
    {
      title: messages.tools.nameGenerator.title,
      description: messages.tools.nameGenerator.description,
      path: `/${lang}/word-gen/name-generator`,
      icon: "👤"
    },
    {
      title: messages.tools.passwordGenerator.title,
      description: messages.tools.passwordGenerator.description,
      path: `/${lang}/word-gen/password-generator`,
      icon: "🔒"
    },
    {
      title: messages.tools.storyGenerator.title,
      description: messages.tools.storyGenerator.description,
      path: `/${lang}/word-gen/story-generator`,
      icon: "📚"
    },
    {
      title: messages.tools.japaneseKanjiGenerator.title,
      description: messages.tools.japaneseKanjiGenerator.description,
      path: `/${lang}/word-gen/japanese-kanji-generator`,
      icon: "漢"
    }
  ]

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{messages.title}</h1>
          <p className="text-xl text-gray-300">
            {messages.description}
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

                 
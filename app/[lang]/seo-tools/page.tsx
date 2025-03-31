import { translate, loadToolMessages } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'
import { Language, SeoToolsCommonMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SeoTools({ params }: Props) {
  const { lang } = await params
  
  // seo-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'seo-tools');

  // 並列で翻訳を取得
  const [
    title,
    description,
    pageSpeedCheckerTitle,
    pageSpeedCheckerDescription,
    linkStatusCheckerTitle,
    linkStatusCheckerDescription,
    seoCannibalizationCheckerTitle,
    seoCannibalizationCheckerDescription,
    seoVolumeGuessTitle,
    seoVolumeGuessDescription,
    pageStructureCheckerTitle,
    pageStructureCheckerDescription,
    metaCraftForLlmTitle,
    metaCraftForLlmDescription
  ] = await Promise.all([
    translate(lang, 'seoTools.title'),
    translate(lang, 'seoTools.description'),
    translate(lang, 'seoTools.tools.pageSpeedChecker.title'),
    translate(lang, 'seoTools.tools.pageSpeedChecker.description'),
    translate(lang, 'seoTools.tools.linkStatusChecker.title'),
    translate(lang, 'seoTools.tools.linkStatusChecker.description'),
    translate(lang, 'seoTools.tools.seoCannibalizationChecker.title'),
    translate(lang, 'seoTools.tools.seoCannibalizationChecker.description'),
    translate(lang, 'seoTools.tools.seoVolumeGuess.title'),
    translate(lang, 'seoTools.tools.seoVolumeGuess.description'),
    translate(lang, 'seoTools.tools.pageStructureChecker.title'),
    translate(lang, 'seoTools.tools.pageStructureChecker.description'),
    translate(lang, 'seoTools.tools.metaCraftForLlm.title'),
    translate(lang, 'seoTools.tools.metaCraftForLlm.description')
  ])
  
  // SeoToolsCommonMessagesの構造に合わせてmessagesオブジェクトを作成
  const messages: SeoToolsCommonMessages & {
    seoVolumeGuess: {
      title: string;
      description: string;
    }
  } = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    tools: {
      pageSpeedChecker: {
        title: pageSpeedCheckerTitle,
        description: pageSpeedCheckerDescription
      },
      linkStatusChecker: {
        title: linkStatusCheckerTitle,
        description: linkStatusCheckerDescription
      },
      seoCannibalizationChecker: {
        title: seoCannibalizationCheckerTitle,
        description: seoCannibalizationCheckerDescription
      },
      seoVolumeGuess: {
        title: seoVolumeGuessTitle,
        description: seoVolumeGuessDescription
      },
      pageStructureChecker: {
        title: pageStructureCheckerTitle,
        description: pageStructureCheckerDescription
      },
      metaCraftForLlm: {
        title: metaCraftForLlmTitle,
        description: metaCraftForLlmDescription
      }
    },
    seoVolumeGuess: {
      title: seoVolumeGuessTitle,
      description: seoVolumeGuessDescription
    }
  };

  const tools = [
    {
      title: messages.tools.pageSpeedChecker.title,
      description: messages.tools.pageSpeedChecker.description,
      path: `/${lang}/seo-tools/page-speed-checker`,
      icon: "⚡"
    },
    {
      title: messages.tools.linkStatusChecker.title,
      description: messages.tools.linkStatusChecker.description,
      path: `/${lang}/seo-tools/link-status-checker`,
      icon: "🔗"
    },
    {
      title: messages.tools.seoCannibalizationChecker.title,
      description: messages.tools.seoCannibalizationChecker.description,
      path: `/${lang}/seo-tools/seo-cannibalization-checker`,
      icon: "🔍"
    },
    {
      title: messages.seoVolumeGuess.title,
      description: messages.seoVolumeGuess.description,
      path: `/${lang}/seo-tools/seo-volume-guess`,
      icon: "📊"
    },
    {
      title: messages.tools.pageStructureChecker.title,
      description: messages.tools.pageStructureChecker.description,
      path: `/${lang}/seo-tools/page-structure-checker`,
      icon: "📋"
    },
    {
      title: messages.tools.metaCraftForLlm.title,
      description: messages.tools.metaCraftForLlm.description,
      path: `/${lang}/seo-tools/meta-craft-for-llm`,
      icon: "🤖"
    }
    // 将来的に他のSEOツールを追加する場合はここに追加
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

import { translate } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SeoTools({ params }: Props) {
  const { lang } = await params
  
  const tools = [
    {
      title: translate(lang, 'page-structure-checker.title'),
      description: translate(lang, 'page-structure-checker.description'),
      path: `/${lang}/seo-tools/page-structure-checker`,
      icon: "📋"
    },
    {
      title: translate(lang, 'seoTools.tools.pageSpeedChecker.title'),
      description: translate(lang, 'seoTools.tools.pageSpeedChecker.description'),
      path: `/${lang}/seo-tools/page-speed-checker`,
      icon: "⚡"
    },
    {
      title: translate(lang, 'seoTools.tools.linkStatusChecker.title'),
      description: translate(lang, 'seoTools.tools.linkStatusChecker.description'),
      path: `/${lang}/seo-tools/link-status-checker`,
      icon: "🔗"
    },
    {
      title: translate(lang, 'seoTools.tools.seoCannibalizationChecker.title'),
      description: translate(lang, 'seoTools.tools.seoCannibalizationChecker.description'),
      path: `/${lang}/seo-tools/seo-cannibalization-checker`,
      icon: "🔍"
    },
    {
      title: translate(lang, 'seoVolumeGuess.title'),
      description: translate(lang, 'seoVolumeGuess.description'),
      path: `/${lang}/seo-tools/seo-volume-guess`,
      icon: "📊"
    },
    {
      title: translate(lang, 'metaCraftForLlm.title'),
      description: translate(lang, 'metaCraftForLlm.description'),
      path: `/${lang}/seo-tools/meta-craft-for-llm`,
      icon: "🤖"
    }
    // 将来的に他のSEOツールを追加する場合はここに追加
  ]

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'seoTools.title')}</h1>
          <p className="text-xl text-gray-300">
            {translate(lang, 'seoTools.description')}
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

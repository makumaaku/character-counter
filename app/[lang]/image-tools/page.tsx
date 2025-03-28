import { translate } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ImageTools({ params }: Props) {
  const { lang } = await params
  
  const tools = [
    {
      title: translate(lang, 'imageTools.tools.jpgToPng.title'),
      description: translate(lang, 'imageTools.tools.jpgToPng.description'),
      path: `/${lang}/image-tools/jpg-to-png`,
      icon: "🖼️"
    },
    {
      title: translate(lang, 'imageTools.tools.pngToJpg.title'),
      description: translate(lang, 'imageTools.tools.pngToJpg.description'),
      path: `/${lang}/image-tools/png-to-jpg`,
      icon: "📸"
    },
    {
      title: translate(lang, 'imageTools.tools.heicToJpg.title'),
      description: translate(lang, 'imageTools.tools.heicToJpg.description'),
      path: `/${lang}/image-tools/heic-to-jpg`,
      icon: "📱"
    },
    {
      title: translate(lang, 'imageTools.tools.heicToPng.title'),
      description: translate(lang, 'imageTools.tools.heicToPng.description'),
      path: `/${lang}/image-tools/heic-to-png`,
      icon: "🔄"
    },
    {
      title: translate(lang, 'imageTools.tools.heicToWebp.title'),
      description: translate(lang, 'imageTools.tools.heicToWebp.description'),
      path: `/${lang}/image-tools/heic-to-webp`,
      icon: "🌐"
    },
    {
      title: translate(lang, 'imageTools.tools.jpgToWebp.title'),
      description: translate(lang, 'imageTools.tools.jpgToWebp.description'),
      path: `/${lang}/image-tools/jpg-to-webp`,
      icon: "🖼️"
    },
    {
      title: translate(lang, 'imageTools.tools.pngToWebp.title'),
      description: translate(lang, 'imageTools.tools.pngToWebp.description'),
      path: `/${lang}/image-tools/png-to-webp`,
      icon: "🖼️"
    },
    {
      title: translate(lang, 'imageTools.tools.svgToJpg.title'),
      description: translate(lang, 'imageTools.tools.svgToJpg.description'),
      path: `/${lang}/image-tools/svg-to-jpg`,
      icon: "🎨"
    },
    {
      title: translate(lang, 'imageTools.tools.svgToPng.title'),
      description: translate(lang, 'imageTools.tools.svgToPng.description'),
      path: `/${lang}/image-tools/svg-to-png`,
      icon: "🖼️"
    },
    {
      title: translate(lang, 'imageTools.tools.svgToWebp.title'),
      description: translate(lang, 'imageTools.tools.svgToWebp.description'),
      path: `/${lang}/image-tools/svg-to-webp`,
      icon: "🖼️"
    }
    // More image conversion tools can be added here in the future
  ]

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'imageTools.title')}</h1>
          <p className="text-xl text-gray-300">
            {translate(lang, 'imageTools.description')}
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
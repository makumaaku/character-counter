import { translate, loadToolMessages } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'
import { Language, ImageToolsCommonMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ImageTools({ params }: Props) {
  const { lang } = await params
  
  // image-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools');

  // 並列で翻訳を取得
  const [
    title,
    description,
    jpgToPngTitle,
    jpgToPngDescription,
    pngToJpgTitle,
    pngToJpgDescription,
    heicToJpgTitle,
    heicToJpgDescription,
    heicToPngTitle,
    heicToPngDescription,
    heicToWebpTitle,
    heicToWebpDescription,
    jpgToWebpTitle,
    jpgToWebpDescription,
    pngToWebpTitle,
    pngToWebpDescription,
    svgToJpgTitle,
    svgToJpgDescription,
    svgToPngTitle,
    svgToPngDescription,
    svgToWebpTitle,
    svgToWebpDescription
  ] = await Promise.all([
    translate(lang, 'imageTools.title'),
    translate(lang, 'imageTools.description'),
    translate(lang, 'imageTools.tools.jpgToPng.title'),
    translate(lang, 'imageTools.tools.jpgToPng.description'),
    translate(lang, 'imageTools.tools.pngToJpg.title'),
    translate(lang, 'imageTools.tools.pngToJpg.description'),
    translate(lang, 'imageTools.tools.heicToJpg.title'),
    translate(lang, 'imageTools.tools.heicToJpg.description'),
    translate(lang, 'imageTools.tools.heicToPng.title'),
    translate(lang, 'imageTools.tools.heicToPng.description'),
    translate(lang, 'imageTools.tools.heicToWebp.title'),
    translate(lang, 'imageTools.tools.heicToWebp.description'),
    translate(lang, 'imageTools.tools.jpgToWebp.title'),
    translate(lang, 'imageTools.tools.jpgToWebp.description'),
    translate(lang, 'imageTools.tools.pngToWebp.title'),
    translate(lang, 'imageTools.tools.pngToWebp.description'),
    translate(lang, 'imageTools.tools.svgToJpg.title'),
    translate(lang, 'imageTools.tools.svgToJpg.description'),
    translate(lang, 'imageTools.tools.svgToPng.title'),
    translate(lang, 'imageTools.tools.svgToPng.description'),
    translate(lang, 'imageTools.tools.svgToWebp.title'),
    translate(lang, 'imageTools.tools.svgToWebp.description')
  ])
  
  // ImageToolsCommonMessagesの構造に合わせてmessagesオブジェクトを作成
  const messages: ImageToolsCommonMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    tools: {
      jpgToPng: {
        title: jpgToPngTitle,
        description: jpgToPngDescription
      },
      pngToJpg: {
        title: pngToJpgTitle,
        description: pngToJpgDescription
      },
      heicToJpg: {
        title: heicToJpgTitle,
        description: heicToJpgDescription
      },
      heicToPng: {
        title: heicToPngTitle,
        description: heicToPngDescription
      },
      heicToWebp: {
        title: heicToWebpTitle,
        description: heicToWebpDescription
      },
      jpgToWebp: {
        title: jpgToWebpTitle,
        description: jpgToWebpDescription
      },
      pngToWebp: {
        title: pngToWebpTitle,
        description: pngToWebpDescription
      },
      svgToJpg: {
        title: svgToJpgTitle,
        description: svgToJpgDescription
      },
      svgToPng: {
        title: svgToPngTitle,
        description: svgToPngDescription
      },
      svgToWebp: {
        title: svgToWebpTitle,
        description: svgToWebpDescription
      }
    }
  };
  
  const tools = [
    {
      title: messages.tools.jpgToPng.title,
      description: messages.tools.jpgToPng.description,
      path: `/${lang}/image-tools/jpg-to-png`,
      icon: "🖼️"
    },
    {
      title: messages.tools.pngToJpg.title,
      description: messages.tools.pngToJpg.description,
      path: `/${lang}/image-tools/png-to-jpg`,
      icon: "📸"
    },
    {
      title: messages.tools.heicToJpg.title,
      description: messages.tools.heicToJpg.description,
      path: `/${lang}/image-tools/heic-to-jpg`,
      icon: "📱"
    },
    {
      title: messages.tools.heicToPng.title,
      description: messages.tools.heicToPng.description,
      path: `/${lang}/image-tools/heic-to-png`,
      icon: "🔄"
    },
    {
      title: messages.tools.heicToWebp.title,
      description: messages.tools.heicToWebp.description,
      path: `/${lang}/image-tools/heic-to-webp`,
      icon: "🌐"
    },
    {
      title: messages.tools.jpgToWebp.title,
      description: messages.tools.jpgToWebp.description,
      path: `/${lang}/image-tools/jpg-to-webp`,
      icon: "🖼️"
    },
    {
      title: messages.tools.pngToWebp.title,
      description: messages.tools.pngToWebp.description,
      path: `/${lang}/image-tools/png-to-webp`,
      icon: "🖼️"
    },
    {
      title: messages.tools.svgToJpg.title,
      description: messages.tools.svgToJpg.description,
      path: `/${lang}/image-tools/svg-to-jpg`,
      icon: "🎨"
    },
    {
      title: messages.tools.svgToPng.title,
      description: messages.tools.svgToPng.description,
      path: `/${lang}/image-tools/svg-to-png`,
      icon: "🖼️"
    },
    {
      title: messages.tools.svgToWebp.title,
      description: messages.tools.svgToWebp.description,
      path: `/${lang}/image-tools/svg-to-webp`,
      icon: "🖼️"
    }
    // More image conversion tools can be added here in the future
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
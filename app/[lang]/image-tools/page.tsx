import Link from 'next/link'
import { translate } from '@/lib/i18n/server'

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
import { translate } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PdfTools({ params }: Props) {
  const { lang } = await params
  
  const tools = [
    {
      title: translate(lang, 'pdfTools.tools.pdfToJpg.title'),
      description: translate(lang, 'pdfTools.tools.pdfToJpg.description'),
      path: `/${lang}/pdf-tools/pdf-to-jpg`,
      icon: "🖼️"
    },
    {
      title: translate(lang, 'pdfTools.tools.jpgToPdf.title'),
      description: translate(lang, 'pdfTools.tools.jpgToPdf.description'),
      path: `/${lang}/pdf-tools/jpg-to-pdf`,
      icon: "📄"
    },
    {
      title: translate(lang, 'pdfTools.tools.webToPdf.title'),
      description: translate(lang, 'pdfTools.tools.webToPdf.description'),
      path: `/${lang}/pdf-tools/web-to-pdf`,
      icon: "🌐"
    },
    {
      title: translate(lang, 'pdfTools.tools.pdfToWord.title'),
      description: translate(lang, 'pdfTools.tools.pdfToWord.description'),
      path: `/${lang}/pdf-tools/pdf-to-word`,
      icon: "📝"
    },
    {
      title: translate(lang, 'pdfTools.tools.pdfToPng.title'),
      description: translate(lang, 'pdfTools.tools.pdfToPng.description'),
      path: `/${lang}/pdf-tools/pdf-to-png`,
      icon: "🔍"
    },
    {
      title: translate(lang, 'pdfTools.tools.pngToPdf.title'),
      description: translate(lang, 'pdfTools.tools.pngToPdf.description'),
      path: `/${lang}/pdf-tools/png-to-pdf`,
      icon: "📊"
    },
    {
      title: translate(lang, 'pdfTools.tools.svgToPdf.title'),
      description: translate(lang, 'pdfTools.tools.svgToPdf.description'),
      path: `/${lang}/pdf-tools/svg-to-pdf`,
      icon: "🔄"
    },
    {
      title: translate(lang, 'pdfTools.tools.pdfToEpub.title'),
      description: translate(lang, 'pdfTools.tools.pdfToEpub.description'),
      path: `/${lang}/pdf-tools/pdf-to-epub`,
      icon: "📚"
    },
    {
      title: translate(lang, 'pdfTools.tools.heicToPdf.title'),
      description: translate(lang, 'pdfTools.tools.heicToPdf.description'),
      path: `/${lang}/pdf-tools/heic-to-pdf`,
      icon: "📱"
    }
    // More PDF tools can be added here in the future
  ]

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{translate(lang, 'pdfTools.title')}</h1>
          <p className="text-xl text-gray-300">
            {translate(lang, 'pdfTools.description')}
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
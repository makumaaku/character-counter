import Link from 'next/link'
import { translate } from '@/lib/i18n/server'

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
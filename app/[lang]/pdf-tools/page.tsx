import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import ToolCard from '@/components/ToolCard'
import { Language } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PdfTools({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    pdfToJpgTitle,
    pdfToJpgDescription,
    jpgToPdfTitle,
    jpgToPdfDescription,
    // pdfToWordTitle,
    // pdfToWordDescription,
    pdfToPngTitle,
    pdfToPngDescription,
    pngToPdfTitle,
    pngToPdfDescription,
    svgToPdfTitle,
    svgToPdfDescription,
    pdfToEpubTitle,
    pdfToEpubDescription,
    heicToPdfTitle,
    heicToPdfDescription
  ] = await Promise.all([
    translate(lang, 'pdfTools.title'),
    translate(lang, 'pdfTools.description'),
    translate(lang, 'pdfTools.tools.pdfToJpg.title'),
    translate(lang, 'pdfTools.tools.pdfToJpg.description'),
    translate(lang, 'pdfTools.tools.jpgToPdf.title'),
    translate(lang, 'pdfTools.tools.jpgToPdf.description'),
    translate(lang, 'pdfTools.tools.pdfToWord.title'),
    translate(lang, 'pdfTools.tools.pdfToWord.description'),
    translate(lang, 'pdfTools.tools.pdfToPng.title'),
    translate(lang, 'pdfTools.tools.pdfToPng.description'),
    translate(lang, 'pdfTools.tools.pngToPdf.title'),
    translate(lang, 'pdfTools.tools.pngToPdf.description'),
    translate(lang, 'pdfTools.tools.svgToPdf.title'),
    translate(lang, 'pdfTools.tools.svgToPdf.description'),
    translate(lang, 'pdfTools.tools.pdfToEpub.title'),
    translate(lang, 'pdfTools.tools.pdfToEpub.description'),
    translate(lang, 'pdfTools.tools.heicToPdf.title'),
    translate(lang, 'pdfTools.tools.heicToPdf.description')
  ]);

  const tools = [
    {
      title: pdfToJpgTitle,
      description: pdfToJpgDescription,
      path: `/${lang}/pdf-tools/pdf-to-jpg`,
      icon: "🖼️"
    },
    {
      title: jpgToPdfTitle,
      description: jpgToPdfDescription,
      path: `/${lang}/pdf-tools/jpg-to-pdf`,
      icon: "📄"
    },
    // {
    //   title: webToPdfTitle,
    //   description: webToPdfDescription,
    //   path: `/${lang}/pdf-tools/web-to-pdf`,
    //   icon: "🌐"
    // },
    // {
    //   title: pdfToWordTitle,
    //   description: pdfToWordDescription,
    //   path: `/${lang}/pdf-tools/pdf-to-word`,
    //   icon: "📝"
    // },
    {
      title: pdfToPngTitle,
      description: pdfToPngDescription,
      path: `/${lang}/pdf-tools/pdf-to-png`,
      icon: "🔍"
    },
    {
      title: pngToPdfTitle,
      description: pngToPdfDescription,
      path: `/${lang}/pdf-tools/png-to-pdf`,
      icon: "📊"
    },
    {
      title: svgToPdfTitle,
      description: svgToPdfDescription,
      path: `/${lang}/pdf-tools/svg-to-pdf`,
      icon: "🔄"
    },
    {
      title: pdfToEpubTitle,
      description: pdfToEpubDescription,
      path: `/${lang}/pdf-tools/pdf-to-epub`,
      icon: "📚"
    },
    {
      title: heicToPdfTitle,
      description: heicToPdfDescription,
      path: `/${lang}/pdf-tools/heic-to-pdf`,
      icon: "📱"
    }
    // More PDF tools can be added here in the future
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
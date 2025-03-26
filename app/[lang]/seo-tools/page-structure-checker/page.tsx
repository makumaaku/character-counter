import { translate } from '@/lib/i18n/server'
import PageStructureCheckerClient from './components/PageStructureCheckerClient'

type Props = {
  params: Promise<{ lang: string }> | { lang: string }
}

export default async function PageStructureCheckerPage({ params }: Props) {
  const { lang } = await (Promise.resolve(params) as Promise<{ lang: string }>)
  const t = (key: string) => translate(lang, key)

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen p-4">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('page-structure-checker.title')}</h1>
        <p className="text-lg text-gray-300">
          {t('page-structure-checker.description')}
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <PageStructureCheckerClient lang={lang} />
      </main>
    </div>
  )
} 
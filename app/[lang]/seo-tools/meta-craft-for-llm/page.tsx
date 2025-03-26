import { translate } from '@/lib/i18n/server'
import MetaCraftClient from './components/MetaCraftClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function MetaCraftForLlm({ params }: Props) {
  const { lang } = await params

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">{translate(lang, 'metaCraftForLlm.title')}</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {translate(lang, 'metaCraftForLlm.description')}
        </p>
      </div>

      <MetaCraftClient />
    </div>
  )
} 
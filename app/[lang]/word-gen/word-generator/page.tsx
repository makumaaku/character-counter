import { getLanguageFromParams } from '@/lib/i18n/server'
import WordGeneratorClient from './components/WordGeneratorClient'

type Props = {
  params: { lang: string }
}

export default async function WordGenerator({ params }: Props) {
  // パラメータから言語情報を取得（将来的に必要になる場合に備えて型の解決のために呼び出し）
  await getLanguageFromParams(params);

  return (
    <div className="text-gray-100 font-sans">
      <WordGeneratorClient />
    </div>
  );
} 
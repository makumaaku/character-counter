import WordCardGeneratorClient from './components/WordCardGeneratorClient'
import { getLanguageFromParams } from '@/lib/i18n/server'

type Props = {
  params: { lang: string }
}

export default async function WordCardGenerator({ params }: Props) {
  // パラメータから言語情報を取得（将来的に必要になる場合に備えて型の解決のために呼び出し）
  await getLanguageFromParams(params);

  return (
    <div className="text-gray-100 font-sans max-w-4xl mx-auto px-4 pt-10">
      <WordCardGeneratorClient />
    </div>
  );
} 
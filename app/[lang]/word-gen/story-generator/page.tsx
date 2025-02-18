import StoryGeneratorClient from './components/StoryGeneratorClient'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function StoryGenerator({ params }: Props) {
  const { lang } = await params
  return <StoryGeneratorClient lang={lang} />
} 
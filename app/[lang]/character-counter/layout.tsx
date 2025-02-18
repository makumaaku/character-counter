import CharacterCounterLayout from './components/CharacterCounterLayout'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CharacterCounterLayout>
      {children}
    </CharacterCounterLayout>
  )
} 
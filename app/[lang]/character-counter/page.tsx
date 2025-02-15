import { CharacterCounterClient } from './components/CharacterCounterClient';

export default async function CharacterCounter() {
  return (
    <div className="container mx-auto px-4">
      <CharacterCounterClient />
    </div>
  );
}
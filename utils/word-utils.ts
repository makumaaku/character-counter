const wordList = [
  "recall", "abundant", "sulphuric", "refer", "explanation", "nearly", "vexation", "perfection", "four", "castle",
  "confuse", "farther", "administer", "instant", "spoil", "junction", "mast", "ministry", "eclipse", "rake",
  "suborder", "prolific", "forbear", "tribunal", "irritation", "boom", "divination", "vacant", "sinister", "inspired",
  "sensibility", "exist", "stated", "graduate", "intercourse", "gland", "chapel", "calm", "perverse", "modest",
  "spell", "legitimate", "mortgage", "ardent", "manifold", "league", "blunt", "frequently", "limitation", "framework",
  "worse", "stitch", "fund", "equally", "shrill", "larva", "inflammation", "bundle", "immature", "pepper",
  "called", "frontal", "culture", "date", "planet", "condemn", "nasal", "willing", "disciple", "wine",
  "expense", "marshal", "cowardly", "riddle", "smart", "contrivance", "shank", "cutter", "director", "hasty",
  "gauge", "merit", "elementary", "sheep", "trail", "trimming", "marking", "always", "ticket", "precipitate",
  "interpret", "saving", "depressed", "regiment", "decoration", "permit", "abroad", "specious", "subtile", "cipher",
  "combat", "arsenic", "tough", "sentinel", "adequate", "import", "spare", "digestion", "adorn", "then"
] as const

export function randomWords(count: number): string[] {
  const words: string[] = []
  const availableWords = [...wordList]

  for (let i = 0; i < count; i++) {
    if (availableWords.length === 0) break
    const randomIndex = Math.floor(Math.random() * availableWords.length)
    const word = availableWords.splice(randomIndex, 1)[0]
    words.push(word as string)
  }

  return words
} 
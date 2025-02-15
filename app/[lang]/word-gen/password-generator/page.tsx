import { translate } from '@/lib/i18n/server'
import PasswordGeneratorClient from './components/PasswordGeneratorClient'

const FEATURES_COUNT = 4
const HOWTO_STEPS_COUNT = 4
const SECURITY_TIPS_COUNT = 4

export default async function PasswordGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const pram = await params;
  const lang = pram.lang;

  const translations = {
    title: translate(lang, 'passwordGenerator.meta.title'),
    generatedPassword: translate(lang, 'passwordGenerator.generatedPassword'),
    copyButton: translate(lang, 'passwordGenerator.copyButton'),
    copied: translate(lang, 'passwordGenerator.copied'),
    passwordLength: translate(lang, 'passwordGenerator.passwordLength'),
    characterTypes: {
      uppercase: translate(lang, 'passwordGenerator.characterTypes.uppercase'),
      lowercase: translate(lang, 'passwordGenerator.characterTypes.lowercase'),
      numbers: translate(lang, 'passwordGenerator.characterTypes.numbers'),
      symbols: translate(lang, 'passwordGenerator.characterTypes.symbols'),
    },
    generateButton: translate(lang, 'passwordGenerator.generateButton'),
    description: {
      title: translate(lang, 'passwordGenerator.description.title'),
      intro: translate(lang, 'passwordGenerator.description.intro'),
      features: {
        title: translate(lang, 'passwordGenerator.description.features.title'),
        list: Array.from({ length: FEATURES_COUNT }, (_, i) => 
          translate(lang, `passwordGenerator.description.features.list.${i}`)
        ),
      },
      howToUse: {
        title: translate(lang, 'passwordGenerator.description.howToUse.title'),
        list: Array.from({ length: HOWTO_STEPS_COUNT }, (_, i) => 
          translate(lang, `passwordGenerator.description.howToUse.list.${i}`)
        ),
      },
      securityTips: {
        title: translate(lang, 'passwordGenerator.description.securityTips.title'),
        list: Array.from({ length: SECURITY_TIPS_COUNT }, (_, i) => 
          translate(lang, `passwordGenerator.description.securityTips.list.${i}`)
        ),
      },
    },
  }

  return <PasswordGeneratorClient translations={translations} />
} 
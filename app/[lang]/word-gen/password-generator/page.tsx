import { translate } from '@/lib/i18n/server'
import PasswordGeneratorClient from './components/PasswordGeneratorClient'

const FEATURES_COUNT = 4
const HOWTO_STEPS_COUNT = 4
const SECURITY_TIPS_COUNT = 4

export default async function PasswordGeneratorPage({ params }: { params: { lang: string } }) {
  const translations = {
    title: translate(params.lang, 'passwordGenerator.meta.title'),
    generatedPassword: translate(params.lang, 'passwordGenerator.generatedPassword'),
    copyButton: translate(params.lang, 'passwordGenerator.copyButton'),
    copied: translate(params.lang, 'passwordGenerator.copied'),
    passwordLength: translate(params.lang, 'passwordGenerator.passwordLength'),
    characterTypes: {
      uppercase: translate(params.lang, 'passwordGenerator.characterTypes.uppercase'),
      lowercase: translate(params.lang, 'passwordGenerator.characterTypes.lowercase'),
      numbers: translate(params.lang, 'passwordGenerator.characterTypes.numbers'),
      symbols: translate(params.lang, 'passwordGenerator.characterTypes.symbols'),
    },
    generateButton: translate(params.lang, 'passwordGenerator.generateButton'),
    description: {
      title: translate(params.lang, 'passwordGenerator.description.title'),
      intro: translate(params.lang, 'passwordGenerator.description.intro'),
      features: {
        title: translate(params.lang, 'passwordGenerator.description.features.title'),
        list: Array.from({ length: FEATURES_COUNT }, (_, i) => 
          translate(params.lang, `passwordGenerator.description.features.list.${i}`)
        ),
      },
      howToUse: {
        title: translate(params.lang, 'passwordGenerator.description.howToUse.title'),
        list: Array.from({ length: HOWTO_STEPS_COUNT }, (_, i) => 
          translate(params.lang, `passwordGenerator.description.howToUse.list.${i}`)
        ),
      },
      securityTips: {
        title: translate(params.lang, 'passwordGenerator.description.securityTips.title'),
        list: Array.from({ length: SECURITY_TIPS_COUNT }, (_, i) => 
          translate(params.lang, `passwordGenerator.description.securityTips.list.${i}`)
        ),
      },
    },
  }

  return <PasswordGeneratorClient translations={translations} />
} 
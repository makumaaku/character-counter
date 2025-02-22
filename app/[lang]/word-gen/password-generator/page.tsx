import { translate } from '@/lib/i18n/server'
import PasswordGeneratorClient from './components/PasswordGeneratorClient'

export default async function PasswordGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const pram = await params;
  const lang = pram.lang;

  const translations = {
    title: translate(lang, 'passwordGenerator.title'),
    catchphrase: translate(lang, 'passwordGenerator.catchphrase'),
    description: translate(lang, 'passwordGenerator.description'),
    features: {
      title: translate(lang, 'passwordGenerator.features.title'),
      easyOperation: {
        title: translate(lang, 'passwordGenerator.features.easyOperation.title'),
        description: translate(lang, 'passwordGenerator.features.easyOperation.description')
      },
      customization: {
        title: translate(lang, 'passwordGenerator.features.customization.title'),
        description: translate(lang, 'passwordGenerator.features.customization.description')
      },
      security: {
        title: translate(lang, 'passwordGenerator.features.security.title'),
        description: translate(lang, 'passwordGenerator.features.security.description')
      }
    },
    useCases: {
      title: translate(lang, 'passwordGenerator.useCases.title'),
      onlineAccounts: {
        title: translate(lang, 'passwordGenerator.useCases.onlineAccounts.title'),
        description: translate(lang, 'passwordGenerator.useCases.onlineAccounts.description')
      },
      corporate: {
        title: translate(lang, 'passwordGenerator.useCases.corporate.title'),
        description: translate(lang, 'passwordGenerator.useCases.corporate.description')
      },
      privacy: {
        title: translate(lang, 'passwordGenerator.useCases.privacy.title'),
        description: translate(lang, 'passwordGenerator.useCases.privacy.description')
      }
    },
    technical: {
      title: translate(lang, 'passwordGenerator.technical.title'),
      algorithm: {
        title: translate(lang, 'passwordGenerator.technical.algorithm.title'),
        description: translate(lang, 'passwordGenerator.technical.algorithm.description')
      },
      performance: {
        title: translate(lang, 'passwordGenerator.technical.performance.title'),
        description: translate(lang, 'passwordGenerator.technical.performance.description')
      },
      privacy: {
        title: translate(lang, 'passwordGenerator.technical.privacy.title'),
        description: translate(lang, 'passwordGenerator.technical.privacy.description')
      }
    },
    faq: {
      title: translate(lang, 'passwordGenerator.faq.title'),
      questions: {
        security: {
          question: translate(lang, 'passwordGenerator.faq.questions.security.question'),
          answer: translate(lang, 'passwordGenerator.faq.questions.security.answer')
        },
        customization: {
          question: translate(lang, 'passwordGenerator.faq.questions.customization.question'),
          answer: translate(lang, 'passwordGenerator.faq.questions.customization.answer')
        },
        commercial: {
          question: translate(lang, 'passwordGenerator.faq.questions.commercial.question'),
          answer: translate(lang, 'passwordGenerator.faq.questions.commercial.answer')
        }
      }
    },
    conclusion: {
      title: translate(lang, 'passwordGenerator.conclusion.title'),
      description: translate(lang, 'passwordGenerator.conclusion.description')
    },
    generatedPassword: translate(lang, 'passwordGenerator.generatedPassword'),
    copyButton: translate(lang, 'passwordGenerator.copyButton'),
    copied: translate(lang, 'passwordGenerator.copied'),
    passwordLength: translate(lang, 'passwordGenerator.passwordLength'),
    characterTypes: {
      uppercase: translate(lang, 'passwordGenerator.characterTypes.uppercase'),
      lowercase: translate(lang, 'passwordGenerator.characterTypes.lowercase'),
      numbers: translate(lang, 'passwordGenerator.characterTypes.numbers'),
      symbols: translate(lang, 'passwordGenerator.characterTypes.symbols')
    },
    generateButton: translate(lang, 'passwordGenerator.generateButton')
  }

  return <PasswordGeneratorClient translations={translations} />
} 
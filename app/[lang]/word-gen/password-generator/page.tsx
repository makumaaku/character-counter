import { translate } from '@/lib/i18n/server'
import { Language } from '@/lib/i18n/types'
import { loadToolMessages } from '@/lib/i18n/server'
import PasswordGeneratorClient from './components/PasswordGeneratorClient'

export default async function PasswordGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const pram = await params;
  const lang = pram.lang;

  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/password-generator');

  // 必要な翻訳を一括で取得
  const [
    title,
    description,
    catchphrase,
    intro,
    featuresTitle,
    easyOperationTitle,
    easyOperationDescription,
    customizationTitle,
    customizationDescription,
    securityTitle,
    securityDescription,
    useCasesTitle,
    onlineAccountsTitle,
    onlineAccountsDescription,
    corporateTitle,
    corporateDescription,
    privacyTitle,
    privacyDescription,
    technicalTitle,
    algorithmTitle,
    algorithmDescription,
    performanceTitle,
    performanceDescription,
    technicalPrivacyTitle,
    technicalPrivacyDescription,
    faqTitle,
    securityQuestion,
    securityAnswer,
    customizationQuestion,
    customizationAnswer,
    commercialQuestion,
    commercialAnswer,
    conclusionTitle,
    conclusionDescription,
    generatedPassword,
    copyButton,
    copied,
    passwordLength,
    uppercaseLabel,
    lowercaseLabel,
    numbersLabel,
    symbolsLabel,
    generateButton
  ] = await Promise.all([
    translate(lang, 'wordGen.passwordGenerator.title'),
    translate(lang, 'wordGen.passwordGenerator.description'),
    translate(lang, 'wordGen.passwordGenerator.catchphrase'),
    translate(lang, 'wordGen.passwordGenerator.intro'),
    translate(lang, 'wordGen.passwordGenerator.features.title'),
    translate(lang, 'wordGen.passwordGenerator.features.easyOperation.title'),
    translate(lang, 'wordGen.passwordGenerator.features.easyOperation.description'),
    translate(lang, 'wordGen.passwordGenerator.features.customization.title'),
    translate(lang, 'wordGen.passwordGenerator.features.customization.description'),
    translate(lang, 'wordGen.passwordGenerator.features.security.title'),
    translate(lang, 'wordGen.passwordGenerator.features.security.description'),
    translate(lang, 'wordGen.passwordGenerator.useCases.title'),
    translate(lang, 'wordGen.passwordGenerator.useCases.onlineAccounts.title'),
    translate(lang, 'wordGen.passwordGenerator.useCases.onlineAccounts.description'),
    translate(lang, 'wordGen.passwordGenerator.useCases.corporate.title'),
    translate(lang, 'wordGen.passwordGenerator.useCases.corporate.description'),
    translate(lang, 'wordGen.passwordGenerator.useCases.privacy.title'),
    translate(lang, 'wordGen.passwordGenerator.useCases.privacy.description'),
    translate(lang, 'wordGen.passwordGenerator.technical.title'),
    translate(lang, 'wordGen.passwordGenerator.technical.algorithm.title'),
    translate(lang, 'wordGen.passwordGenerator.technical.algorithm.description'),
    translate(lang, 'wordGen.passwordGenerator.technical.performance.title'),
    translate(lang, 'wordGen.passwordGenerator.technical.performance.description'),
    translate(lang, 'wordGen.passwordGenerator.technical.privacy.title'),
    translate(lang, 'wordGen.passwordGenerator.technical.privacy.description'),
    translate(lang, 'wordGen.passwordGenerator.faq.title'),
    translate(lang, 'wordGen.passwordGenerator.faq.questions.security.question'),
    translate(lang, 'wordGen.passwordGenerator.faq.questions.security.answer'),
    translate(lang, 'wordGen.passwordGenerator.faq.questions.customization.question'),
    translate(lang, 'wordGen.passwordGenerator.faq.questions.customization.answer'),
    translate(lang, 'wordGen.passwordGenerator.faq.questions.commercial.question'),
    translate(lang, 'wordGen.passwordGenerator.faq.questions.commercial.answer'),
    translate(lang, 'wordGen.passwordGenerator.conclusion.title'),
    translate(lang, 'wordGen.passwordGenerator.conclusion.description'),
    translate(lang, 'wordGen.passwordGenerator.generatedPassword'),
    translate(lang, 'wordGen.common.copyButton'),
    translate(lang, 'wordGen.common.copied'),
    translate(lang, 'wordGen.passwordGenerator.passwordLength'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.uppercase'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.lowercase'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.numbers'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.symbols'),
    translate(lang, 'wordGen.common.generateButton')
  ]);

  const translations = {
    title,
    description,
    catchphrase,
    intro,
    features: {
      title: featuresTitle,
      easyOperation: {
        title: easyOperationTitle,
        description: easyOperationDescription
      },
      customization: {
        title: customizationTitle,
        description: customizationDescription
      },
      security: {
        title: securityTitle,
        description: securityDescription
      }
    },
    useCases: {
      title: useCasesTitle,
      onlineAccounts: {
        title: onlineAccountsTitle,
        description: onlineAccountsDescription
      },
      corporate: {
        title: corporateTitle,
        description: corporateDescription
      },
      privacy: {
        title: privacyTitle,
        description: privacyDescription
      }
    },
    technical: {
      title: technicalTitle,
      algorithm: {
        title: algorithmTitle,
        description: algorithmDescription
      },
      performance: {
        title: performanceTitle,
        description: performanceDescription
      },
      privacy: {
        title: technicalPrivacyTitle,
        description: technicalPrivacyDescription
      }
    },
    faq: {
      title: faqTitle,
      questions: {
        security: {
          question: securityQuestion,
          answer: securityAnswer
        },
        customization: {
          question: customizationQuestion,
          answer: customizationAnswer
        },
        commercial: {
          question: commercialQuestion,
          answer: commercialAnswer
        }
      }
    },
    conclusion: {
      title: conclusionTitle,
      description: conclusionDescription
    },
    generatedPassword,
    copyButton,
    copied,
    passwordLength,
    characterTypes: {
      uppercase: uppercaseLabel,
      lowercase: lowercaseLabel,
      numbers: numbersLabel,
      symbols: symbolsLabel
    },
    generateButton
  };

  return <PasswordGeneratorClient translations={translations} />;
} 
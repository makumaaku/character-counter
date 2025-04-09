import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import PasswordGeneratorClient from './components/PasswordGeneratorClient'
import { Language, WordGenPasswordGeneratorMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PasswordGeneratorPage({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);

  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/password-generator');

  // 必要な翻訳を一括で取得
  const [
    metaTitle,
    metaDescription,
    metaKeywords,
    title,
    description_title,
    description_intro,
    generatedPassword,
    copyButton,
    copied,
    passwordLength,
    uppercaseLabel,
    lowercaseLabel,
    numbersLabel,
    symbolsLabel,
    generateButton,
    // SEOテキスト関連の翻訳
    seoOverviewTitle,
    seoOverviewContent,
    seoHowToTitle,
    seoHowToStep1Title,
    seoHowToStep1Desc,
    seoHowToStep2Title,
    seoHowToStep2Desc,
    seoHowToStep3Title,
    seoHowToStep3Desc,
    seoTestimonialsTitle,
    seoTestimonialsUser1Name,
    seoTestimonialsUser1Comment,
    seoTestimonialsUser2Name,
    seoTestimonialsUser2Comment,
    seoTestimonialsUser3Name,
    seoTestimonialsUser3Comment,
    seoFeaturesTitle,
    seoFeaturesItem1Title,
    seoFeaturesItem1Desc,
    seoFeaturesItem2Title,
    seoFeaturesItem2Desc,
    seoFeaturesItem3Title,
    seoFeaturesItem3Desc,
    seoFeaturesItem4Title,
    seoFeaturesItem4Desc,
    seoFaqTitle,
    seoFaqQ1,
    seoFaqA1,
    seoFaqQ2,
    seoFaqA2,
    seoFaqQ3,
    seoFaqA3,
    seoFaqQ4,
    seoFaqA4,
    seoFaqQ5,
    seoFaqA5
  ] = await Promise.all([
    translate(lang, 'wordGen.passwordGenerator.meta.title'),
    translate(lang, 'wordGen.passwordGenerator.meta.description'),
    translate(lang, 'wordGen.passwordGenerator.meta.keywords'),
    translate(lang, 'wordGen.passwordGenerator.title'),
    translate(lang, 'wordGen.passwordGenerator.description.title'),
    translate(lang, 'wordGen.passwordGenerator.description.intro'),
    translate(lang, 'wordGen.passwordGenerator.generatedPassword'),
    translate(lang, 'wordGen.common.copyButton'),
    translate(lang, 'wordGen.common.copied'),
    translate(lang, 'wordGen.passwordGenerator.passwordLength'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.uppercase'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.lowercase'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.numbers'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.symbols'),
    translate(lang, 'wordGen.common.generateButton'),
    // SEOテキスト関連の翻訳
    translate(lang, 'wordGen.passwordGenerator.seoText.overview.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.overview.content'),
    translate(lang, 'wordGen.passwordGenerator.seoText.howTo.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.howTo.steps.0.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.howTo.steps.0.description'),
    translate(lang, 'wordGen.passwordGenerator.seoText.howTo.steps.1.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.howTo.steps.1.description'),
    translate(lang, 'wordGen.passwordGenerator.seoText.howTo.steps.2.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.howTo.steps.2.description'),
    translate(lang, 'wordGen.passwordGenerator.seoText.testimonials.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.testimonials.users.0.name'),
    translate(lang, 'wordGen.passwordGenerator.seoText.testimonials.users.0.comment'),
    translate(lang, 'wordGen.passwordGenerator.seoText.testimonials.users.1.name'),
    translate(lang, 'wordGen.passwordGenerator.seoText.testimonials.users.1.comment'),
    translate(lang, 'wordGen.passwordGenerator.seoText.testimonials.users.2.name'),
    translate(lang, 'wordGen.passwordGenerator.seoText.testimonials.users.2.comment'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.0.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.0.description'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.1.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.1.description'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.2.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.2.description'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.3.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.features.items.3.description'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.title'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.0.question'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.0.answer'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.1.question'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.1.answer'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.2.question'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.2.answer'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.3.question'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.3.answer'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.4.question'),
    translate(lang, 'wordGen.passwordGenerator.seoText.faq.questions.4.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: WordGenPasswordGeneratorMessages = {
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords
    },
    title,
    description: {
      title: description_title,
      intro: description_intro
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
    generateButton,
    seoText: {
      overview: {
        title: seoOverviewTitle,
        content: seoOverviewContent
      },
      howTo: {
        title: seoHowToTitle,
        steps: [
          {
            title: seoHowToStep1Title,
            description: seoHowToStep1Desc
          },
          {
            title: seoHowToStep2Title,
            description: seoHowToStep2Desc
          },
          {
            title: seoHowToStep3Title,
            description: seoHowToStep3Desc
          }
        ]
      },
      testimonials: {
        title: seoTestimonialsTitle,
        users: [
          {
            name: seoTestimonialsUser1Name,
            comment: seoTestimonialsUser1Comment
          },
          {
            name: seoTestimonialsUser2Name,
            comment: seoTestimonialsUser2Comment
          },
          {
            name: seoTestimonialsUser3Name,
            comment: seoTestimonialsUser3Comment
          }
        ]
      },
      features: {
        title: seoFeaturesTitle,
        items: [
          {
            title: seoFeaturesItem1Title,
            description: seoFeaturesItem1Desc
          },
          {
            title: seoFeaturesItem2Title,
            description: seoFeaturesItem2Desc
          },
          {
            title: seoFeaturesItem3Title,
            description: seoFeaturesItem3Desc
          },
          {
            title: seoFeaturesItem4Title,
            description: seoFeaturesItem4Desc
          }
        ]
      },
      faq: {
        title: seoFaqTitle,
        questions: [
          {
            question: seoFaqQ1,
            answer: seoFaqA1
          },
          {
            question: seoFaqQ2,
            answer: seoFaqA2
          },
          {
            question: seoFaqQ3,
            answer: seoFaqA3
          },
          {
            question: seoFaqQ4,
            answer: seoFaqA4
          },
          {
            question: seoFaqQ5,
            answer: seoFaqA5
          }
        ]
      }
    }
  };

  // SEOテキスト用のコンテンツを作成
  const seoTextContent: SeoTextContent = messages.seoText;
  return (
    <PageContainer>
      <PasswordGeneratorClient messages={messages} />
      <SeoText content={seoTextContent} />
    </PageContainer>
  );
} 
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { loadToolMessages, translate } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

type JsonLdType = {
  "@context": "https://schema.org";
  "@type": string;
  name: string;
  description: string;
  url: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
      width: number;
      height: number;
    };
  };
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  featureList: string[];
  isAccessibleForFree: boolean;
  browserRequirements: string;
  keywords: string[];
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/password-generator');
  
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: await t(SITE_CONFIG.siteName),
    publisher: await t(SITE_CONFIG.publisher),
    logoAlt: await t('common.meta.logoAlt'),
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": await t('word-gen.password-generator.meta.title'),
    "description": await t('word-gen.password-generator.meta.description'),
    "url": `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Secure password generation",
      "Custom password length",
      "Special characters support",
      "Password strength indicator",
      "Multiple character sets",
      "Memorable password options",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "keywords": [
      "password generator",
      "secure password",
      "strong password",
      "password creation",
      "security tool",
      "password safety"
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: await t('word-gen.password-generator.meta.title'),
      description: await t('word-gen.password-generator.meta.description'),
      keywords: await t('word-gen.password-generator.meta.keywords'),
      url: `${SITE_CONFIG.baseURL}/${lang}/word-gen/password-generator`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children, params }: Props) {
  const pram = await params;
  const lang = pram.lang;

  // 翻訳をロード
  await loadToolMessages(lang as Language, 'word-gen/password-generator');

  // クライアントコンポーネントで使用する翻訳を取得
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
    translate(lang, 'wordGen.passwordGenerator.title', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.description', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.catchphrase', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.intro', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.features.title', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.features.easyOperation.title', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.features.easyOperation.description', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.features.customization.title', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.features.customization.description', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.features.security.title', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.features.security.description', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.generatedPassword', 'word-gen/password-generator'),
    translate(lang, 'wordGen.common.copyButton', 'word-gen/password-generator'),
    translate(lang, 'wordGen.common.copied', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.passwordLength', 'word-gen/password-generator'),
      translate(lang, 'wordGen.passwordGenerator.characterTypes.uppercase', 'word-gen/password-generator'),
      translate(lang, 'wordGen.passwordGenerator.characterTypes.lowercase', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.numbers', 'word-gen/password-generator'),
    translate(lang, 'wordGen.passwordGenerator.characterTypes.symbols', 'word-gen/password-generator'),
    translate(lang, 'wordGen.common.generateButton', 'word-gen/password-generator')
  ]);

  const messages = {
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

  return (
    <>
      <script
        id="messages"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(messages),
        }}
      />
      {children}
    </>
  );
} 
import { loadToolMessages, translate } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language, HealthToolsCommonMessages } from '@/lib/i18n/types';
import HealthToolsLayout from './components/HealthToolsLayout';


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
  hasPart: {
    "@type": string;
    name: string;
    description: string;
    url: string;
  }[];
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;

  // health-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'health-tools');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    bmiCalculatorTitle,
    bmiCalculatorDescription,
    calorieCounterTitle,
    calorieCounterDescription,
    heartRateZonesTitle,
    heartRateZonesDescription,
    waterIntakeCalculatorTitle,
    waterIntakeCalculatorDescription,
    sleepCalculatorTitle,
    sleepCalculatorDescription,
    stressLevelTestTitle,
    stressLevelTestDescription
  ] = await Promise.all([
    translate(lang, 'healthTools.meta.title'),
    translate(lang, 'healthTools.meta.description'),
    translate(lang, 'healthTools.meta.keywords'),
    translate(lang, 'healthTools.tools.bmiCalculator.title'),
    translate(lang, 'healthTools.tools.bmiCalculator.description'),
    translate(lang, 'healthTools.tools.calorieCounter.title'),
    translate(lang, 'healthTools.tools.calorieCounter.description'),
    translate(lang, 'healthTools.tools.heartRateZones.title'),
    translate(lang, 'healthTools.tools.heartRateZones.description'),
    translate(lang, 'healthTools.tools.waterIntakeCalculator.title'),
    translate(lang, 'healthTools.tools.waterIntakeCalculator.description'),
    translate(lang, 'healthTools.tools.sleepCalculator.title'),
    translate(lang, 'healthTools.tools.sleepCalculator.description'),
    translate(lang, 'healthTools.tools.stressLevelTest.title'),
    translate(lang, 'healthTools.tools.stressLevelTest.description')
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/health-tools`,
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
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "BMI Calculator",
      "Calorie Counter",
      "Heart Rate Zones Calculator",
      "Water Intake Calculator",
      "Sleep Calculator",
      "Stress Level Test",
      "Free to use",
      "No registration required",
      "Fast processing",
      "Browser-based calculations"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": bmiCalculatorTitle,
        "description": bmiCalculatorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/health-tools/bmi-calculator`
      },
      {
        "@type": "WebApplication",
        "name": calorieCounterTitle,
        "description": calorieCounterDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/health-tools/calorie-counter`
      },
      {
        "@type": "WebApplication",
        "name": heartRateZonesTitle,
        "description": heartRateZonesDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/health-tools/heart-rate-zones`
      },
      {
        "@type": "WebApplication",
        "name": waterIntakeCalculatorTitle,
        "description": waterIntakeCalculatorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/health-tools/water-intake-calculator`
      },
      {
        "@type": "WebApplication",
        "name": sleepCalculatorTitle,
        "description": sleepCalculatorDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/health-tools/sleep-calculator`
      },
      {
        "@type": "WebApplication",
        "name": stressLevelTestTitle,
        "description": stressLevelTestDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/health-tools/stress-level-test`
      }
    ]
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/health-tools`,
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
  const { lang } = await params;
  
  // health-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'health-tools');

  // クライアントコンポーネント用の翻訳を準備
  const [
    title, 
    description,
    bmiCalculatorTitle,
    bmiCalculatorDescription,
    calorieCounterTitle,
    calorieCounterDescription,
    heartRateZonesTitle,
    heartRateZonesDescription,
    waterIntakeCalculatorTitle,
    waterIntakeCalculatorDescription,
    sleepCalculatorTitle,
    sleepCalculatorDescription,
    stressLevelTestTitle,
    stressLevelTestDescription
  ] = await Promise.all([
    translate(lang, 'healthTools.title'),
    translate(lang, 'healthTools.description'),
    translate(lang, 'healthTools.tools.bmiCalculator.title'),
    translate(lang, 'healthTools.tools.bmiCalculator.description'),
    translate(lang, 'healthTools.tools.calorieCounter.title'),
    translate(lang, 'healthTools.tools.calorieCounter.description'),
    translate(lang, 'healthTools.tools.heartRateZones.title'),
    translate(lang, 'healthTools.tools.heartRateZones.description'),
    translate(lang, 'healthTools.tools.waterIntakeCalculator.title'),
    translate(lang, 'healthTools.tools.waterIntakeCalculator.description'),
    translate(lang, 'healthTools.tools.sleepCalculator.title'),
    translate(lang, 'healthTools.tools.sleepCalculator.description'),
    translate(lang, 'healthTools.tools.stressLevelTest.title'),
    translate(lang, 'healthTools.tools.stressLevelTest.description')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクト
  const messages: HealthToolsCommonMessages = {
    meta: {
      title: '',
      description: '',
      keywords: ''
    },
    common: {
      copyButton: '',
      copied: '',
      generateButton: '',
      downloadButton: '',
      resetButton: '',
      settings: '',
      preview: '',
      result: '',
      options: '',
      customize: ''
    },
    title,
    description,
    tools: {
      bmiCalculator: {
        title: bmiCalculatorTitle,
        description: bmiCalculatorDescription
      },
      calorieCounter: {
        title: calorieCounterTitle,
        description: calorieCounterDescription
      },
      heartRateZones: {
        title: heartRateZonesTitle,
        description: heartRateZonesDescription
      },
      waterIntakeCalculator: {
        title: waterIntakeCalculatorTitle,
        description: waterIntakeCalculatorDescription
      },
      sleepCalculator: {
        title: sleepCalculatorTitle,
        description: sleepCalculatorDescription
      },
      stressLevelTest: {
        title: stressLevelTestTitle,
        description: stressLevelTestDescription
      }
    }
  };

  return (
    <HealthToolsLayout
      messages={messages}
      lang={lang}
    >
      {children}
    </HealthToolsLayout>
  );
} 
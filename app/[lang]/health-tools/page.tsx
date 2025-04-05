import { loadToolMessages, translate } from '@/lib/i18n/server'
import { Language } from '@/lib/i18n/types'
import ToolCard from '@/components/ToolCard'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function HealthTools({ params }: Props) {
  const { lang } = await params

  // health-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'health-tools')

  // 並列で翻訳を取得
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
  ])

  // 翻訳情報をまとめる
  const messages = {
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
  }
  
  const tools = [
    {
      title: messages.tools.bmiCalculator.title,
      description: messages.tools.bmiCalculator.description,
      path: `/${lang}/health-tools/bmi-calculator`,
      icon: "📏"
    },
    // {
    //   title: messages.tools.calorieCounter.title,
    //   description: messages.tools.calorieCounter.description,
    //   path: `/${lang}/health-tools/calorie-counter`,
    //   icon: "🍽️"
    // },
    // {
    //   title: messages.tools.heartRateZones.title,
    //   description: messages.tools.heartRateZones.description,
    //   path: `/${lang}/health-tools/heart-rate-zones`,
    //   icon: "❤️"
    // },
    // {
    //   title: messages.tools.waterIntakeCalculator.title,
    //   description: messages.tools.waterIntakeCalculator.description,
    //   path: `/${lang}/health-tools/water-intake-calculator`,
    //   icon: "💧"
    // },
    // {
    //   title: messages.tools.sleepCalculator.title,
    //   description: messages.tools.sleepCalculator.description,
    //   path: `/${lang}/health-tools/sleep-calculator`,
    //   icon: "😴"
    // },
    // {
    //   title: messages.tools.stressLevelTest.title,
    //   description: messages.tools.stressLevelTest.description,
    //   path: `/${lang}/health-tools/stress-level-test`,
    //   icon: "🧠"
    // }
  ]

  return (
    <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{messages.title}</h1>
          <p className="text-xl text-gray-300">
            {messages.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.path}
              title={tool.title}
              description={tool.description}
              path={tool.path}
              icon={tool.icon}
            />
          ))}
        </div>
      </main>
    </div>
  )
} 
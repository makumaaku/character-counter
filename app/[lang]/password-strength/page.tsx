import { translate } from '@/lib/i18n/server'
import PasswordStrengthClient from './components/PasswordStrengthClient'

export default async function PasswordStrength({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // パスワード強度測定に必要な翻訳を取得
  const [
    title,
    description,
    passwordLabel,
    strengthLabel,
    // 強度レベルの翻訳
    veryWeak,
    weak,
    medium,
    strong,
    veryStrong,
    // 時間計算の翻訳
    timeToCrack,
    // 時間単位の翻訳
    timeUnitsInstantly,
    timeUnitsSeconds,
    timeUnitsMinutes,
    timeUnitsHours,
    timeUnitsDays,
    timeUnitsMonths,
    timeUnitsYears,
    timeUnitsCenturies,
    timeUnitsImpossible,
    // 提案メッセージの翻訳
    suggestionsTitle,
    addLength,
    addNumbers,
    addSymbols,
    addUppercase,
    addLowercase,
    avoidCommon,
    // 可視性トグルの翻訳
    passwordVisible,
    passwordHidden
  ] = await Promise.all([
    translate(lang, 'passwordStrength.title'),
    translate(lang, 'passwordStrength.description'),
    translate(lang, 'passwordStrength.passwordLabel'),
    translate(lang, 'passwordStrength.strengthLabel'),
    // 強度レベルの翻訳
    translate(lang, 'passwordStrength.strengthLevel.veryWeak'),
    translate(lang, 'passwordStrength.strengthLevel.weak'),
    translate(lang, 'passwordStrength.strengthLevel.medium'),
    translate(lang, 'passwordStrength.strengthLevel.strong'),
    translate(lang, 'passwordStrength.strengthLevel.veryStrong'),
    // 時間計算の翻訳
    translate(lang, 'passwordStrength.timeToCrack'),
    // 時間単位の翻訳
    translate(lang, 'passwordStrength.timeUnits.instantly'),
    translate(lang, 'passwordStrength.timeUnits.seconds'),
    translate(lang, 'passwordStrength.timeUnits.minutes'),
    translate(lang, 'passwordStrength.timeUnits.hours'),
    translate(lang, 'passwordStrength.timeUnits.days'),
    translate(lang, 'passwordStrength.timeUnits.months'),
    translate(lang, 'passwordStrength.timeUnits.years'),
    translate(lang, 'passwordStrength.timeUnits.centuries'),
    translate(lang, 'passwordStrength.timeUnits.impossible'),
    // 提案メッセージの翻訳
    translate(lang, 'passwordStrength.suggestions.title'),
    translate(lang, 'passwordStrength.suggestions.addLength'),
    translate(lang, 'passwordStrength.suggestions.addNumbers'),
    translate(lang, 'passwordStrength.suggestions.addSymbols'),
    translate(lang, 'passwordStrength.suggestions.addUppercase'),
    translate(lang, 'passwordStrength.suggestions.addLowercase'),
    translate(lang, 'passwordStrength.suggestions.avoidCommon'),
    // 可視性トグルの翻訳
    translate(lang, 'passwordStrength.passwordVisible'),
    translate(lang, 'passwordStrength.passwordHidden')
  ])

  const translations = {
    title,
    description,
    passwordLabel,
    strengthLabel,
    strengthLevel: {
      veryWeak,
      weak,
      medium,
      strong,
      veryStrong
    },
    timeToCrack,
    timeUnits: {
      instantly: timeUnitsInstantly,
      seconds: timeUnitsSeconds,
      minutes: timeUnitsMinutes,
      hours: timeUnitsHours,
      days: timeUnitsDays,
      months: timeUnitsMonths,
      years: timeUnitsYears,
      centuries: timeUnitsCenturies,
      impossible: timeUnitsImpossible
    },
    suggestions: {
      title: suggestionsTitle,
      addLength,
      addNumbers,
      addSymbols,
      addUppercase,
      addLowercase,
      avoidCommon
    },
    passwordVisible,
    passwordHidden
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-300">{description}</p>
      </div>
      <PasswordStrengthClient translations={translations} />
    </div>
  )
} 
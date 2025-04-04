import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import BmiCalculatorClient from './components/BmiCalculatorClient'
import { Language, HealthToolsBmiCalculatorMessages } from '@/lib/i18n/types'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function BmiCalculator({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'health-tools/bmi-calculator');
  
  // サーバーコンポーネントで翻訳を取得
  const [
    // タイトルと説明
    title,
    description,
    // フォームの要素
    formHeightLabel,
    formHeightCm,
    formHeightFeet,
    formHeightInches,
    formHeightPlaceholder,
    formWeightLabel,
    formWeightKg,
    formWeightLbs,
    formWeightPlaceholder,
    formCalculate,
    formReset,
    formUnitsLabel,
    formUnitsMetric,
    formUnitsImperial,
    // 結果セクション
    resultTitle,
    resultBmi,
    resultEmpty,
    resultCategoryUnderweight,
    resultCategoryUnderweightDesc,
    resultCategoryNormal,
    resultCategoryNormalDesc,
    resultCategoryOverweight,
    resultCategoryOverweightDesc,
    resultCategoryObese,
    resultCategoryObeseDesc,
    // About section
    aboutWhatIsBmiTitle,
    aboutWhatIsBmiDescription,
    aboutHowToCalculateTitle,
    aboutHowToCalculateDescription,
    aboutLimitationsTitle,
    aboutLimitationsDescription,
    aboutHealthyRangeTitle,
    aboutHealthyRangeDescription,
    aboutWhatToDoTitle,
    aboutWhatToDoDescription
  ] = await Promise.all([
    // タイトルと説明
    translate(lang, 'healthTools.bmiCalculator.title'),
    translate(lang, 'healthTools.bmiCalculator.description'),
    // フォームの要素
    translate(lang, 'healthTools.bmiCalculator.form.height.label'),
    translate(lang, 'healthTools.bmiCalculator.form.height.cm'),
    translate(lang, 'healthTools.bmiCalculator.form.height.feet'),
    translate(lang, 'healthTools.bmiCalculator.form.height.inches'),
    translate(lang, 'healthTools.bmiCalculator.form.height.placeholder'),
    translate(lang, 'healthTools.bmiCalculator.form.weight.label'),
    translate(lang, 'healthTools.bmiCalculator.form.weight.kg'),
    translate(lang, 'healthTools.bmiCalculator.form.weight.lbs'),
    translate(lang, 'healthTools.bmiCalculator.form.weight.placeholder'),
    translate(lang, 'healthTools.bmiCalculator.form.calculate'),
    translate(lang, 'healthTools.bmiCalculator.form.reset'),
    translate(lang, 'healthTools.bmiCalculator.form.units.label'),
    translate(lang, 'healthTools.bmiCalculator.form.units.metric'),
    translate(lang, 'healthTools.bmiCalculator.form.units.imperial'),
    // 結果セクション
    translate(lang, 'healthTools.bmiCalculator.result.title'),
    translate(lang, 'healthTools.bmiCalculator.result.bmi'),
    translate(lang, 'healthTools.bmiCalculator.result.empty'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.underweight'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.underweightDesc'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.normal'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.normalDesc'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.overweight'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.overweightDesc'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.obese'),
    translate(lang, 'healthTools.bmiCalculator.result.categories.obeseDesc'),
    // About section
    translate(lang, 'healthTools.bmiCalculator.about.whatIsBmi.title'),
    translate(lang, 'healthTools.bmiCalculator.about.whatIsBmi.description'),
    translate(lang, 'healthTools.bmiCalculator.about.howToCalculate.title'),
    translate(lang, 'healthTools.bmiCalculator.about.howToCalculate.description'),
    translate(lang, 'healthTools.bmiCalculator.about.limitations.title'),
    translate(lang, 'healthTools.bmiCalculator.about.limitations.description'),
    translate(lang, 'healthTools.bmiCalculator.about.healthyRange.title'),
    translate(lang, 'healthTools.bmiCalculator.about.healthyRange.description'),
    translate(lang, 'healthTools.bmiCalculator.about.whatToDo.title'),
    translate(lang, 'healthTools.bmiCalculator.about.whatToDo.description')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: HealthToolsBmiCalculatorMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    form: {
      height: {
        label: formHeightLabel,
        cm: formHeightCm,
        feet: formHeightFeet,
        inches: formHeightInches,
        placeholder: formHeightPlaceholder
      },
      weight: {
        label: formWeightLabel,
        kg: formWeightKg,
        lbs: formWeightLbs,
        placeholder: formWeightPlaceholder
      },
      calculate: formCalculate,
      reset: formReset,
      units: {
        label: formUnitsLabel,
        metric: formUnitsMetric,
        imperial: formUnitsImperial
      }
    },
    result: {
      title: resultTitle,
      bmi: resultBmi,
      empty: resultEmpty,
      categories: {
        underweight: resultCategoryUnderweight,
        underweightDesc: resultCategoryUnderweightDesc,
        normal: resultCategoryNormal,
        normalDesc: resultCategoryNormalDesc,
        overweight: resultCategoryOverweight,
        overweightDesc: resultCategoryOverweightDesc,
        obese: resultCategoryObese,
        obeseDesc: resultCategoryObeseDesc
      }
    },
    about: {
      whatIsBmi: {
        title: aboutWhatIsBmiTitle,
        description: aboutWhatIsBmiDescription
      },
      howToCalculate: {
        title: aboutHowToCalculateTitle,
        description: aboutHowToCalculateDescription
      },
      limitations: {
        title: aboutLimitationsTitle,
        description: aboutLimitationsDescription
      },
      healthyRange: {
        title: aboutHealthyRangeTitle,
        description: aboutHealthyRangeDescription
      },
      whatToDo: {
        title: aboutWhatToDoTitle,
        description: aboutWhatToDoDescription
      }
    }
  };

  return (
    <BmiCalculatorClient messages={messages} />
  );
} 
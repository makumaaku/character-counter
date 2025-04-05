'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { HealthToolsBmiCalculatorMessages } from '@/lib/i18n/types'

// PropsインターフェースにBMI計算機のメッセージを追加
interface BmiCalculatorClientProps {
  messages: HealthToolsBmiCalculatorMessages;
}

// BMIカテゴリの定義
type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export default function BmiCalculatorClient({ messages }: BmiCalculatorClientProps) {
  // 単位系の状態管理（メートル法/ヤード・ポンド法）
  const [isMetric, setIsMetric] = useState(true);
  
  // 入力値の状態管理
  const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  
  // 結果の状態管理
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BmiCategory | null>(null);
  
  // BMIを計算する関数
  const calculateBmi = () => {
    let calculatedBmi: number | null = null;
    
    if (isMetric) {
      // メートル法での計算 (kg/m²)
      const heightInMeters = Number(height) / 100;
      const weightInKg = Number(weight);
      
      if (heightInMeters > 0 && weightInKg > 0) {
        calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      }
    } else {
      // ヤード・ポンド法での計算 ([lbs/in²] * 703)
      const heightInInches = (Number(heightFeet) * 12) + Number(heightInches);
      const weightInLbs = Number(weight);
      
      if (heightInInches > 0 && weightInLbs > 0) {
        calculatedBmi = (weightInLbs / (heightInInches * heightInInches)) * 703;
      }
    }
    
    // 結果を小数点第1位まで丸める
    if (calculatedBmi !== null) {
      calculatedBmi = Math.round(calculatedBmi * 10) / 10;
    }
    
    // 結果をセット
    setBmi(calculatedBmi);
    
    // カテゴリを決定
    if (calculatedBmi !== null) {
      if (calculatedBmi < 18.5) {
        setCategory('underweight');
      } else if (calculatedBmi < 25) {
        setCategory('normal');
      } else if (calculatedBmi < 30) {
        setCategory('overweight');
      } else {
        setCategory('obese');
      }
    } else {
      setCategory(null);
    }
  };
  
  // フォームをリセットする関数
  const resetForm = () => {
    setHeight('');
    setHeightFeet('');
    setHeightInches('');
    setWeight('');
    setBmi(null);
    setCategory(null);
  };
  
  // 翻訳メッセージを取得
  const { title, description, form, result, about } = messages;
  
  return (
    <div className="min-h-screen bg-gray-800 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-300">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 入力フォーム */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              {form.units.label}
            </h2>
            
            {/* 単位切替 */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-600 rounded-lg p-1 inline-flex">
                <button 
                  className={`px-4 py-2 rounded-md ${isMetric ? 'bg-purple-600' : 'hover:bg-gray-500'}`}
                  onClick={() => setIsMetric(true)}
                >
                  {form.units.metric}
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${!isMetric ? 'bg-purple-600' : 'hover:bg-gray-500'}`}
                  onClick={() => setIsMetric(false)}
                >
                  {form.units.imperial}
                </button>
              </div>
            </div>
            
            {/* 身長入力 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {form.height.label}
              </label>
              {isMetric ? (
                <div className="flex">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={form.height.placeholder}
                    className="bg-gray-800 text-white px-3 py-2 rounded flex-grow"
                    min="1"
                  />
                  <span className="ml-2 flex items-center">{form.height.cm}</span>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <div className="flex flex-1">
                    <input
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      placeholder={form.height.feet}
                      className="bg-gray-800 text-white px-3 py-2 rounded flex-grow"
                      min="0"
                    />
                    <span className="ml-2 flex items-center">{form.height.feet}</span>
                  </div>
                  <div className="flex flex-1">
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      placeholder={form.height.inches}
                      className="bg-gray-800 text-white px-3 py-2 rounded flex-grow"
                      min="0"
                      max="11"
                    />
                    <span className="ml-2 flex items-center">{form.height.inches}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* 体重入力 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {form.weight.label}
              </label>
              <div className="flex">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={form.weight.placeholder}
                  className="bg-gray-800 text-white px-3 py-2 rounded flex-grow"
                  min="1"
                />
                <span className="ml-2 flex items-center">
                  {isMetric ? form.weight.kg : form.weight.lbs}
                </span>
              </div>
            </div>
            
            {/* ボタン */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={calculateBmi}
                variant="purple"
                className="px-6"
              >
                {form.calculate}
              </Button>
              <Button
                onClick={resetForm}
                variant="secondary"
              >
                {form.reset}
              </Button>
            </div>
          </div>
          
          {/* 結果表示 */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              {result.title}
            </h2>
            
            {bmi !== null ? (
              <div className="text-center">
                <p className="text-3xl mb-4">
                  {result.bmi} <span className="font-bold">{bmi}</span>
                </p>
                
                {/* BMIゲージ */}
                <div className="relative h-10 bg-gray-600 rounded-full mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="h-full bg-blue-500 flex-1"></div>
                    <div className="h-full bg-green-500 flex-1"></div>
                    <div className="h-full bg-yellow-500 flex-1"></div>
                    <div className="h-full bg-red-500 flex-1"></div>
                  </div>
                  
                  {/* インジケーター */}
                  <div 
                    className="absolute top-0 h-10 w-3 bg-white"
                    style={{ 
                      left: `${Math.min(Math.max((bmi - 10) * 100 / 30, 0), 100)}%`,
                      transform: 'translateX(-50%)'
                    }}
                  ></div>
                </div>
                
                {/* カテゴリ表示 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className={`p-4 rounded-lg ${category === 'underweight' ? 'ring-4 ring-white' : ''}`}>
                    <div className="w-full h-2 bg-blue-500 rounded mb-2"></div>
                    <h3 className="font-bold">{result.categories.underweight}</h3>
                    <p className="text-sm text-gray-300">{result.categories.underweightDesc}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${category === 'normal' ? 'ring-4 ring-white' : ''}`}>
                    <div className="w-full h-2 bg-green-500 rounded mb-2"></div>
                    <h3 className="font-bold">{result.categories.normal}</h3>
                    <p className="text-sm text-gray-300">{result.categories.normalDesc}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${category === 'overweight' ? 'ring-4 ring-white' : ''}`}>
                    <div className="w-full h-2 bg-yellow-500 rounded mb-2"></div>
                    <h3 className="font-bold">{result.categories.overweight}</h3>
                    <p className="text-sm text-gray-300">{result.categories.overweightDesc}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${category === 'obese' ? 'ring-4 ring-white' : ''}`}>
                    <div className="w-full h-2 bg-red-500 rounded mb-2"></div>
                    <h3 className="font-bold">{result.categories.obese}</h3>
                    <p className="text-sm text-gray-300">{result.categories.obeseDesc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400">
                {result.empty}
              </p>
            )}
          </div>
        </div>
        
        {/* About Section */}
        <div className="mt-12 bg-gray-700 p-8 rounded-lg">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">{about.whatIsBmi.title}</h3>
              <p className="text-gray-300">{about.whatIsBmi.description}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-3">{about.howToCalculate.title}</h3>
              <p className="text-gray-300">{about.howToCalculate.description}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-3">{about.healthyRange.title}</h3>
              <p className="text-gray-300">{about.healthyRange.description}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-3">{about.limitations.title}</h3>
              <p className="text-gray-300">{about.limitations.description}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-3">{about.whatToDo.title}</h3>
              <p className="text-gray-300">{about.whatToDo.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
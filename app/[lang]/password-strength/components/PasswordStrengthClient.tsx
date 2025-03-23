'use client';

import { useState, useEffect } from 'react';
import { analyzePassword, StrengthLevel, estimateCrackTime } from './passwordUtils';
import PasswordInput from './PasswordInput';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import PasswordSuggestions from './PasswordSuggestions';

type Translations = {
  title: string;
  description: string;
  passwordLabel: string;
  strengthLabel: string;
  strengthLevel: {
    veryWeak: string;
    weak: string;
    medium: string;
    strong: string;
    veryStrong: string;
  };
  timeToCrack: string;
  timeUnits: {
    instantly: string;
    seconds: string;
    minutes: string;
    hours: string;
    days: string;
    months: string;
    years: string;
    centuries: string;
    impossible: string;
  };
  suggestions: {
    title: string;
    addLength: string;
    addNumbers: string;
    addSymbols: string;
    addUppercase: string;
    addLowercase: string;
    avoidCommon: string;
  };
  passwordVisible: string;
  passwordHidden: string;
};

export default function PasswordStrengthClient({ translations }: { translations: Translations }) {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(analyzePassword(''));

  // パスワードが変更されたときに強度を再分析
  useEffect(() => {
    setAnalysis(analyzePassword(password));
  }, [password]);

  // 強度レベルに対応するテキストを取得
  const getStrengthLevelText = () => {
    switch (analysis.strengthLevel) {
      case StrengthLevel.VERY_WEAK:
        return translations.strengthLevel.veryWeak;
      case StrengthLevel.WEAK:
        return translations.strengthLevel.weak;
      case StrengthLevel.MEDIUM:
        return translations.strengthLevel.medium;
      case StrengthLevel.STRONG:
        return translations.strengthLevel.strong;
      case StrengthLevel.VERY_STRONG:
        return translations.strengthLevel.veryStrong;
      default:
        return '';
    }
  };

  // 解読時間のテキストを取得
  const getTimeToCrackText = () => {
    const timeWithUnits = estimateCrackTime(analysis.entropy, translations.timeUnits);
    return translations.timeToCrack.replace('{{time}}', timeWithUnits);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <label htmlFor="password" className="block text-xl font-medium mb-2">
          {translations.passwordLabel}
        </label>

        <PasswordInput
          password={password}
          setPassword={setPassword}
          placeholder={translations.passwordLabel}
          visibleText={translations.passwordVisible}
          hiddenText={translations.passwordHidden}
        />

        {/* 強度メーターを表示 */}
        <PasswordStrengthMeter
          score={analysis.score}
          strengthLevel={analysis.strengthLevel}
          strengthLevelText={getStrengthLevelText()}
          strengthLabel={translations.strengthLabel}
        />

        {/* 解読時間を表示（パスワードが入力されている場合のみ） */}
        {password && (
          <div className="mt-4 text-center">
            <p className="text-gray-300">{getTimeToCrackText()}</p>
          </div>
        )}

        {/* パスワード改善のための提案を表示 */}
        {password && (
          <PasswordSuggestions
            analysis={analysis}
            translations={translations.suggestions}
          />
        )}
      </div>
    </div>
  );
} 
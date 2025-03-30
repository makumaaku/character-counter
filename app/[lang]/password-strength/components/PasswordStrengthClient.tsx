'use client';

import { useState, useEffect } from 'react';
import { analyzePassword, StrengthLevel, estimateCrackTime } from './passwordUtils';
import PasswordInput from './PasswordInput';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import PasswordSuggestions from './PasswordSuggestions';
import { PasswordStrengthMessages } from '@/lib/i18n/types';

export default function PasswordStrengthClient({ messages }: { messages: PasswordStrengthMessages }) {
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
        return messages.strengthLevel.veryWeak;
      case StrengthLevel.WEAK:
        return messages.strengthLevel.weak;
      case StrengthLevel.MEDIUM:
        return messages.strengthLevel.medium;
      case StrengthLevel.STRONG:
        return messages.strengthLevel.strong;
      case StrengthLevel.VERY_STRONG:
        return messages.strengthLevel.veryStrong;
      default:
        return '';
    }
  };

  // 解読時間のテキストを取得
  const getTimeToCrackText = () => {
    const timeWithUnits = estimateCrackTime(analysis.entropy, messages.timeUnits);
    return messages.timeToCrack.replace('{{time}}', timeWithUnits);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <label htmlFor="password" className="block text-xl font-medium mb-2">
          {messages.passwordLabel}
        </label>

        <PasswordInput
          password={password}
          setPassword={setPassword}
          placeholder={messages.passwordLabel}
          visibleText={messages.passwordVisible}
          hiddenText={messages.passwordHidden}
        />

        {/* 強度メーターを表示 */}
        <PasswordStrengthMeter
          score={analysis.score}
          strengthLevel={analysis.strengthLevel}
          strengthLevelText={getStrengthLevelText()}
          strengthLabel={messages.strengthLabel}
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
            translations={messages.suggestions}
          />
        )}
      </div>
    </div>
  );
} 
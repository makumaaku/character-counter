'use client';

import { StrengthLevel } from './passwordUtils';
import { motion } from 'framer-motion';

type Props = {
  score: number;
  strengthLevel: StrengthLevel;
  strengthLevelText: string;
  strengthLabel: string;
};

export default function PasswordStrengthMeter({ score, strengthLevel, strengthLevelText, strengthLabel }: Props) {
  // 強度レベルに応じた色の設定
  const getColor = () => {
    switch (strengthLevel) {
      case StrengthLevel.VERY_WEAK:
        return 'bg-red-600';
      case StrengthLevel.WEAK:
        return 'bg-orange-500';
      case StrengthLevel.MEDIUM:
        return 'bg-yellow-500';
      case StrengthLevel.STRONG:
        return 'bg-green-500';
      case StrengthLevel.VERY_STRONG:
        return 'bg-blue-500';
      default:
        return 'bg-gray-600';
    }
  };

  // 強度レベルに応じたテキスト色の設定
  const getTextColor = () => {
    switch (strengthLevel) {
      case StrengthLevel.VERY_WEAK:
        return 'text-red-500';
      case StrengthLevel.WEAK:
        return 'text-orange-500';
      case StrengthLevel.MEDIUM:
        return 'text-yellow-400';
      case StrengthLevel.STRONG:
        return 'text-green-500';
      case StrengthLevel.VERY_STRONG:
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-300">{strengthLabel}: </div>
        <div className={`text-sm font-bold ${getTextColor()}`}>
          {strengthLevelText}
        </div>
      </div>

      {/* 強度メーター */}
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* 強度レベルマーカー */}
      <div className="w-full flex justify-between mt-1">
        <div className="w-1/5 text-center">
          <div className={`w-1 h-1 rounded-full mx-auto ${strengthLevel >= StrengthLevel.VERY_WEAK ? getColor() : 'bg-gray-600'}`}></div>
        </div>
        <div className="w-1/5 text-center">
          <div className={`w-1 h-1 rounded-full mx-auto ${strengthLevel >= StrengthLevel.WEAK ? getColor() : 'bg-gray-600'}`}></div>
        </div>
        <div className="w-1/5 text-center">
          <div className={`w-1 h-1 rounded-full mx-auto ${strengthLevel >= StrengthLevel.MEDIUM ? getColor() : 'bg-gray-600'}`}></div>
        </div>
        <div className="w-1/5 text-center">
          <div className={`w-1 h-1 rounded-full mx-auto ${strengthLevel >= StrengthLevel.STRONG ? getColor() : 'bg-gray-600'}`}></div>
        </div>
        <div className="w-1/5 text-center">
          <div className={`w-1 h-1 rounded-full mx-auto ${strengthLevel >= StrengthLevel.VERY_STRONG ? getColor() : 'bg-gray-600'}`}></div>
        </div>
      </div>
    </div>
  );
} 
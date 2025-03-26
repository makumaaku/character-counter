'use client';

import { PasswordAnalysis } from './passwordUtils';
import { BiCheck, BiX } from 'react-icons/bi';

type Props = {
  analysis: PasswordAnalysis;
  translations: {
    title: string;
    addLength: string;
    addNumbers: string;
    addSymbols: string;
    addUppercase: string;
    addLowercase: string;
    avoidCommon: string;
  };
};

export default function PasswordSuggestions({ analysis, translations }: Props) {
  const SuggestionItem = ({ passed, text }: { passed: boolean; text: string }) => (
    <li className="flex items-center gap-2 py-1">
      {passed ? (
        <BiCheck className="text-green-500 text-xl flex-shrink-0" />
      ) : (
        <BiX className="text-red-500 text-xl flex-shrink-0" />
      )}
      <span className={passed ? 'text-gray-300' : 'text-gray-400'}>{text}</span>
    </li>
  );

  return (
    <div className="mt-6 p-4 rounded-lg bg-gray-800 border border-gray-700">
      <h3 className="text-lg font-semibold mb-3">{translations.title}</h3>
      <ul className="space-y-1">
        <SuggestionItem
          passed={analysis.isLongEnough}
          text={translations.addLength}
        />
        <SuggestionItem
          passed={analysis.hasLowercase}
          text={translations.addLowercase}
        />
        <SuggestionItem
          passed={analysis.hasUppercase}
          text={translations.addUppercase}
        />
        <SuggestionItem
          passed={analysis.hasNumbers}
          text={translations.addNumbers}
        />
        <SuggestionItem
          passed={analysis.hasSymbols}
          text={translations.addSymbols}
        />
        <SuggestionItem
          // エントロピーが30以上であれば一般的なパターンは避けていると見なす
          passed={analysis.entropy >= 30}
          text={translations.avoidCommon}
        />
      </ul>
    </div>
  );
} 
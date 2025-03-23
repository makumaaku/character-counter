// パスワード強度計算のためのユーティリティ関数

// 強度レベルの定義
export enum StrengthLevel {
  VERY_WEAK = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3,
  VERY_STRONG = 4
}

// パスワード解析結果の型
export type PasswordAnalysis = {
  score: number;             // 0-100の数値スコア
  strengthLevel: StrengthLevel; // 強度レベル
  timeToCrack: string;       // 解読時間の文字列表現
  hasLowercase: boolean;     // 小文字を含むか
  hasUppercase: boolean;     // 大文字を含むか
  hasNumbers: boolean;       // 数字を含むか
  hasSymbols: boolean;       // 記号を含むか
  isLongEnough: boolean;     // 十分な長さがあるか（8文字以上）
  entropy: number;           // エントロピー値
}

// 複雑なパターンのチェック（キーボード配列パターンなど）
const COMMON_PATTERNS = [
  'qwerty', 'asdfgh', 'zxcvbn', '123456', 'abcdef', // キーボード配列
  'password', 'letmein', 'welcome', 'admin', 'monkey', // 一般的なパスワード
];

// TimeUnits型の定義を追加
export type TimeUnits = {
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

/**
 * パスワードのエントロピーを計算
 * エントロピー = 文字セットのサイズのlog2 × パスワードの長さ
 */
export function calculateEntropy(password: string): number {
  let charsetSize = 0;
  
  // 使用する文字セットサイズを計算
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>\/?~`'"\\]/.test(password)) charsetSize += 33; // 一般的な記号の数
  
  // 文字セットが空の場合（ありえないが）、最小値を設定
  if (charsetSize === 0) charsetSize = 1;
  
  return Math.log2(charsetSize) * password.length;
}

/**
 * エントロピーに基づく解読時間を推定
 * 1秒間に10^10回の試行が可能と仮定
 */
export function estimateCrackTime(entropy: number, timeUnits: TimeUnits): string {
  // 2^エントロピー / 10^10（1秒間あたりの試行回数）= 解読にかかる秒数
  const seconds = Math.pow(2, entropy) / Math.pow(10, 10);
  
  if (seconds < 1) {
    return timeUnits.instantly;
  } else if (seconds < 60) {
    return `${Math.ceil(seconds)} ${timeUnits.seconds}`;
  } else if (seconds < 3600) {
    return `${Math.ceil(seconds / 60)} ${timeUnits.minutes}`;
  } else if (seconds < 86400) {
    return `${Math.ceil(seconds / 3600)} ${timeUnits.hours}`;
  } else if (seconds < 2592000) { // 30日
    return `${Math.ceil(seconds / 86400)} ${timeUnits.days}`;
  } else if (seconds < 31536000) { // 365日
    return `${Math.ceil(seconds / 2592000)} ${timeUnits.months}`;
  } else if (seconds < 3153600000) { // 100年
    return `${Math.ceil(seconds / 31536000)} ${timeUnits.years}`;
  } else if (seconds < 31536000000) { // 1000年
    return `${Math.ceil(seconds / 3153600000)} ${timeUnits.centuries}`;
  } else {
    return timeUnits.impossible;
  }
}

/**
 * パターンに基づくペナルティを計算
 */
function calculatePatternPenalty(password: string): number {
  const lowerPassword = password.toLowerCase();
  let penalty = 0;
  
  // 一般的なパターンのチェック
  for (const pattern of COMMON_PATTERNS) {
    if (lowerPassword.includes(pattern)) {
      penalty += 10; // パターンごとに10%減少
    }
  }
  
  // 連続した文字のチェック（例: 'aaa', '111'）
  let repeatedChars = 0;
  for (let i = 2; i < password.length; i++) {
    if (password[i] === password[i-1] && password[i] === password[i-2]) {
      repeatedChars++;
    }
  }
  penalty += repeatedChars * 5; // 連続文字ごとに5%減少
  
  // 増加パターン（例: 'abc', '123'）
  let sequentialChars = 0;
  for (let i = 2; i < password.length; i++) {
    if (
      (password.charCodeAt(i) === password.charCodeAt(i-1) + 1 &&
       password.charCodeAt(i) === password.charCodeAt(i-2) + 2) ||
      (password.charCodeAt(i) === password.charCodeAt(i-1) - 1 &&
       password.charCodeAt(i) === password.charCodeAt(i-2) - 2)
    ) {
      sequentialChars++;
    }
  }
  penalty += sequentialChars * 5; // 連続パターンごとに5%減少
  
  return Math.min(penalty, 30); // 最大30%のペナルティ
}

/**
 * パスワードの強度を分析する
 */
export function analyzePassword(password: string): PasswordAnalysis {
  // 空パスワードの場合
  if (!password) {
    return {
      score: 0,
      strengthLevel: StrengthLevel.VERY_WEAK,
      timeToCrack: '即時',
      hasLowercase: false,
      hasUppercase: false,
      hasNumbers: false,
      hasSymbols: false,
      isLongEnough: false,
      entropy: 0
    };
  }
  
  // 各種チェック
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>\/?~`'"\\]/.test(password);
  const isLongEnough = password.length >= 8;
  
  // エントロピー計算
  const entropy = calculateEntropy(password);
  
  // パターンによるペナルティを適用
  const patternPenalty = calculatePatternPenalty(password);
  const adjustedEntropy = Math.max(0, entropy * (1 - patternPenalty / 100));
  
  // 0-100のスコアに変換
  // エントロピー50以上で満点、0で最低点とする
  const score = Math.min(100, Math.round((adjustedEntropy / 50) * 100));
  
  // 強度レベルの判定
  let strengthLevel: StrengthLevel;
  if (score < 20) {
    strengthLevel = StrengthLevel.VERY_WEAK;
  } else if (score < 40) {
    strengthLevel = StrengthLevel.WEAK;
  } else if (score < 60) {
    strengthLevel = StrengthLevel.MEDIUM;
  } else if (score < 80) {
    strengthLevel = StrengthLevel.STRONG;
  } else {
    strengthLevel = StrengthLevel.VERY_STRONG;
  }
  
  return {
    score,
    strengthLevel,
    timeToCrack: "", // クライアント側で言語に応じた時間を生成
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    isLongEnough,
    entropy: adjustedEntropy
  };
} 
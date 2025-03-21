/**
 * 日本語漢字ジェネレーターのユーティリティ関数
 */

// 常用漢字のUnicode範囲
const COMMON_KANJI_START = 0x4E00; // 一
const COMMON_KANJI_END = 0x9FAF;   // 鿯

/**
 * ランダムな漢字を生成する
 * @returns ランダムに生成された漢字
 */
export function generateRandomKanji(): string {
  // Unicode範囲内でランダムなコードポイントを生成
  const randomCodePoint = Math.floor(
    Math.random() * (COMMON_KANJI_END - COMMON_KANJI_START + 1) + COMMON_KANJI_START
  );
  
  // コードポイントから文字を生成
  return String.fromCodePoint(randomCodePoint);
}

/**
 * 漢字を画像に変換する
 * @param kanji 漢字
 * @param size 画像サイズ (デフォルト: 512x512)
 * @param backgroundColor 背景色 (デフォルト: 白。PNGの場合は透明)
 * @param textColor テキスト色 (デフォルト: 黒)
 * @param fontFamily フォント (デフォルト: serif - 明朝体相当)
 * @param imageFormat 画像形式 ('jpg' または 'png')
 * @returns 画像のData URL
 */
export function kanjiToImage(
  kanji: string,
  size: number = 512,
  backgroundColor: string = '#ffffff',
  textColor: string = '#000000',
  fontFamily: string = 'serif',
  imageFormat: 'jpg' | 'png' = 'png'
): string {
  // キャンバス要素を作成
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context could not be created');
  }
  
  // 背景を描画（PNG形式で透明にする場合は背景を描画しない）
  if (imageFormat === 'jpg' || backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);
  }
  
  // 漢字を描画
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 漢字のサイズを調整 (キャンバスサイズの約70%)
  const fontSize = Math.floor(size * 0.7);
  ctx.font = `${fontSize}px ${fontFamily}`;
  
  // 漢字を中央に描画
  ctx.fillText(kanji, size / 2, size / 2);
  
  // Data URLとして返す
  const mimeType = imageFormat === 'jpg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mimeType, 0.95);
}

/**
 * 画像をダウンロードする
 * @param dataUrl 画像のData URL
 * @param format ファイル形式 ('jpg' または 'png')
 * @param kanji 漢字 (ファイル名に使用)
 */
export function downloadImage(dataUrl: string, format: 'jpg' | 'png', kanji: string): void {
  // ダウンロード用のリンク要素を作成
  const link = document.createElement('a');
  
  // Data URLを設定
  link.href = dataUrl;
  
  // ファイル名を設定
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  link.download = `kanji-${kanji}-${timestamp}.${format}`;
  
  // クリックイベントをシミュレート
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 指定された形式で画像をダウンロードする
 * @param kanji 漢字
 * @param format 形式 ('jpg' または 'png')
 */
export function downloadKanjiImage(kanji: string, format: 'jpg' | 'png'): void {
  // PNG形式の場合は透明背景、JPGの場合は白背景
  const backgroundColor = format === 'png' ? 'transparent' : '#ffffff';
  const image = kanjiToImage(kanji, 512, backgroundColor, '#000000', 'serif', format);
  downloadImage(image, format, kanji);
} 
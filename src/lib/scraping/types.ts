// 両方の環境で共通のインターフェース定義のみを含む
// puppeteer/puppeteer-core特有の型は個別ファイルに分離

// PDFオプションの型
export interface PDFOptions {
  format: 'a4' | 'letter' | 'legal';
  landscape: boolean;
  printBackground: boolean;
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  scale?: number;
  preferCSSPageSize?: boolean;
  displayHeaderFooter?: boolean;
  timeout?: number;
}

// ページ設定のための型
export interface PageSetupOptions {
  url: string;
  width: number;
  height?: number;
  scale: 'fit' | number;
} 
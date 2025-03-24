/**
 * HTML文書からメタデータを抽出するユーティリティ関数
 */

export interface ExtractedMetadata {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  mainContent: string;
  firstParagraph: string;
  topKeywords: string[];
  url: string;
  ogTags: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
  };
  twitterTags: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  jsonLd?: any;
}

/**
 * HTML文字列からメタデータを抽出する
 */
export function extractMetadata(html: string, url: string): ExtractedMetadata {
  // DOMParserはブラウザ環境でのみ利用可能
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 基本メタデータの抽出
  const title = extractTitle(doc);
  const description = extractMetaContent(doc, 'description');
  const keywords = extractMetaContent(doc, 'keywords');
  const h1 = extractH1(doc);
  const mainContent = extractMainContent(doc);
  const firstParagraph = extractFirstParagraph(doc);
  const topKeywords = extractTopKeywords(mainContent);

  // OGPタグの抽出
  const ogTags = {
    title: extractMetaContent(doc, 'og:title', 'property'),
    description: extractMetaContent(doc, 'og:description', 'property'),
    image: extractMetaContent(doc, 'og:image', 'property'),
    url: extractMetaContent(doc, 'og:url', 'property'),
    type: extractMetaContent(doc, 'og:type', 'property'),
    siteName: extractMetaContent(doc, 'og:site_name', 'property'),
  };

  // Twitterカードの抽出
  const twitterTags = {
    card: extractMetaContent(doc, 'twitter:card', 'name'),
    title: extractMetaContent(doc, 'twitter:title', 'name'),
    description: extractMetaContent(doc, 'twitter:description', 'name'),
    image: extractMetaContent(doc, 'twitter:image', 'name'),
  };

  // JSON-LDの抽出
  const jsonLd = extractJsonLd(doc);

  return {
    title,
    description,
    keywords,
    h1,
    mainContent,
    firstParagraph,
    topKeywords,
    url,
    ogTags,
    twitterTags,
    jsonLd,
  };
}

/**
 * タイトルを抽出する
 */
function extractTitle(doc: Document): string {
  const titleElement = doc.querySelector('title');
  return titleElement?.textContent?.trim() || '';
}

/**
 * メタタグの内容を抽出する
 */
function extractMetaContent(doc: Document, name: string, attr: 'name' | 'property' = 'name'): string {
  const metaElement = doc.querySelector(`meta[${attr}="${name}"]`);
  return metaElement?.getAttribute('content')?.trim() || '';
}

/**
 * H1タグを抽出する
 */
function extractH1(doc: Document): string {
  const h1Element = doc.querySelector('h1');
  return h1Element?.textContent?.trim() || '';
}

/**
 * メインコンテンツを抽出する
 */
function extractMainContent(doc: Document): string {
  // 優先度順にメインコンテンツを試行
  const mainSelectors = [
    'main',
    'article',
    '.content',
    '#content',
    '.main-content',
    '#main-content',
  ];

  for (const selector of mainSelectors) {
    const element = doc.querySelector(selector);
    if (element && element.textContent) {
      return element.textContent.trim();
    }
  }

  // メインコンテンツが見つからない場合は、bodyの内容を取得
  const bodyText = doc.body?.textContent?.trim() || '';
  
  // bodyから最初の500文字程度を取得（要約用）
  return bodyText.length > 500 ? bodyText.substring(0, 500) + '...' : bodyText;
}

/**
 * 最初の段落を抽出する
 */
function extractFirstParagraph(doc: Document): string {
  const firstParagraph = doc.querySelector('p');
  return firstParagraph?.textContent?.trim() || '';
}

/**
 * 頻出キーワードを抽出する
 */
function extractTopKeywords(text: string): string[] {
  // ストップワード（除外する一般的な単語）
  const stopWords = [
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
    'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'did', 'do', 'does', 'doing', 'down', 'during',
    'each', 'few', 'for', 'from', 'further',
    'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how',
    'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself',
    'just',
    'me', 'more', 'most', 'my', 'myself',
    'no', 'nor', 'not', 'now',
    'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
    'same', 'she', 'should', 'so', 'some', 'such',
    'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too',
    'under', 'until', 'up',
    'very',
    'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with',
    'you', 'your', 'yours', 'yourself', 'yourselves'
  ];

  // 単語を分割し、カウント
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // 記号を削除
    .split(/\s+/) // 空白で分割
    .filter(word => word.length > 3 && !stopWords.includes(word)); // ストップワードと短い単語を除外

  // 単語の出現回数をカウント
  const wordCount = words.reduce((acc: Record<string, number>, word: string) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  // 出現回数順にソート
  const sortedWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // トップ5キーワードを取得
    .map(entry => entry[0]);

  return sortedWords;
}

/**
 * JSON-LDを抽出する
 */
function extractJsonLd(doc: Document): any {
  const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLdScripts.length === 0) return null;

  // 最初のJSON-LDを解析
  try {
    const jsonLdText = jsonLdScripts[0].textContent;
    if (!jsonLdText) return null;
    
    return JSON.parse(jsonLdText);
  } catch (error) {
    console.error('Error parsing JSON-LD:', error);
    return null;
  }
} 
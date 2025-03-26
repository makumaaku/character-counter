import { ExtractedMetadata } from './extractor';

export interface GeneratedSeoCode {
  titleTag: string;
  metaDescription: string;
  ogTags: string;
  twitterTags: string;
  jsonLd: string;
}

/**
 * 抽出されたメタデータからSEOコードを生成する
 */
export function generateSeoCode(metadata: ExtractedMetadata): GeneratedSeoCode {
  return {
    titleTag: generateTitleTag(metadata),
    metaDescription: generateMetaDescription(metadata),
    ogTags: generateOgTags(metadata),
    twitterTags: generateTwitterTags(metadata),
    jsonLd: generateJsonLd(metadata),
  };
}

/**
 * タイトルタグを生成する
 */
function generateTitleTag(metadata: ExtractedMetadata): string {
  let title = metadata.title;
  
  // タイトルが空の場合はH1や最初の段落から生成
  if (!title) {
    if (metadata.h1) {
      title = metadata.h1;
    } else if (metadata.firstParagraph) {
      // 最初の段落から最初の60文字を取得（省略記号付き）
      title = metadata.firstParagraph.substring(0, 57) + '...';
    } else {
      title = 'Untitled Page';
    }
  }
  
  // タイトルが長すぎる場合は省略
  if (title.length > 60) {
    title = title.substring(0, 57) + '...';
  }
  
  return `<title>${escapeHtml(title)}</title>`;
}

/**
 * メタディスクリプションを生成する
 */
function generateMetaDescription(metadata: ExtractedMetadata): string {
  let description = metadata.description;
  
  // 説明が空の場合は最初の段落やメインコンテンツから生成
  if (!description) {
    if (metadata.firstParagraph) {
      description = metadata.firstParagraph;
    } else if (metadata.mainContent) {
      // メインコンテンツから最初の160文字を取得
      description = metadata.mainContent.substring(0, 157) + '...';
    } else {
      description = `Explore content about ${metadata.topKeywords.join(', ')}.`;
    }
  }
  
  // 説明が長すぎる場合は省略
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return `<meta name="description" content="${escapeHtml(description)}" />`;
}

/**
 * OGPタグを生成する
 */
function generateOgTags(metadata: ExtractedMetadata): string {
  const title = metadata.ogTags.title || metadata.title || metadata.h1 || 'Untitled Page';
  const description = metadata.ogTags.description || metadata.description || metadata.firstParagraph || '';
  const image = metadata.ogTags.image || '';
  const url = metadata.ogTags.url || metadata.url || '';
  const type = metadata.ogTags.type || 'website';
  const siteName = metadata.ogTags.siteName || '';
  
  let ogTags = `<meta property="og:title" content="${escapeHtml(title)}" />\n`;
  ogTags += `<meta property="og:description" content="${escapeHtml(description)}" />\n`;
  ogTags += `<meta property="og:url" content="${escapeHtml(url)}" />\n`;
  ogTags += `<meta property="og:type" content="${escapeHtml(type)}" />`;
  
  if (image) {
    ogTags += `\n<meta property="og:image" content="${escapeHtml(image)}" />`;
  }
  
  if (siteName) {
    ogTags += `\n<meta property="og:site_name" content="${escapeHtml(siteName)}" />`;
  }
  
  return ogTags;
}

/**
 * Twitterカードを生成する
 */
function generateTwitterTags(metadata: ExtractedMetadata): string {
  const card = metadata.twitterTags.card || 'summary_large_image';
  const title = metadata.twitterTags.title || metadata.ogTags.title || metadata.title || metadata.h1 || 'Untitled Page';
  const description = metadata.twitterTags.description || metadata.ogTags.description || metadata.description || metadata.firstParagraph || '';
  const image = metadata.twitterTags.image || metadata.ogTags.image || '';
  
  let twitterTags = `<meta name="twitter:card" content="${escapeHtml(card)}" />\n`;
  twitterTags += `<meta name="twitter:title" content="${escapeHtml(title)}" />\n`;
  twitterTags += `<meta name="twitter:description" content="${escapeHtml(description)}" />`;
  
  if (image) {
    twitterTags += `\n<meta name="twitter:image" content="${escapeHtml(image)}" />`;
  }
  
  return twitterTags;
}

/**
 * JSON-LDを生成する
 */
function generateJsonLd(metadata: ExtractedMetadata): string {
  // 既存のJSON-LDがある場合はそれを優先
  if (metadata.jsonLd) {
    return `<script type="application/ld+json">\n${JSON.stringify(metadata.jsonLd, null, 2)}\n</script>`;
  }
  
  // タイトルとURLからAIツールかどうかを判定
  const isAITool = 
    (metadata.title && metadata.title.toLowerCase().includes('llm')) || 
    (metadata.title && metadata.title.toLowerCase().includes('ai')) ||
    (metadata.url && metadata.url.toLowerCase().includes('llm-tools')) ||
    (metadata.keywords && metadata.keywords.toLowerCase().includes('llm'));
  
  // 基本情報の設定
  const title = metadata.title || metadata.h1 || 'Untitled Page';
  const description = metadata.description || metadata.firstParagraph || '';
  const url = metadata.url || '';
  
  let jsonLd: Record<string, unknown>;

  // LLMツールの場合はWebApplicationスキーマを使用
  if (isAITool) {
    jsonLd = generateWebApplicationSchema(metadata);
  } else {
    // 記事か一般的なWebページかを判断
    const type = metadata.mainContent && metadata.mainContent.length > 100 ? 'Article' : 'WebPage';
    
    // JSON-LDの構築
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': type,
      'headline': title,
      'description': description,
      'url': url,
    };
    
    // 記事の場合は追加情報
    if (type === 'Article') {
      jsonLd.keywords = metadata.topKeywords.join(', ');
      jsonLd.articleBody = metadata.mainContent.substring(0, 500); // 長すぎる記事本文は省略
    }
  }
  
  // FAQセクションの追加 (コンテンツに「?」マークが含まれている場合)
  if (metadata.mainContent && metadata.mainContent.includes('?')) {
    const faqSection = generateFaqSchema(metadata);
    if (faqSection.mainEntity.length > 0) {
      // FAQPageとして別途出力
      const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqSection.mainEntity
      };
      
      return `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>\n<script type="application/ld+json">\n${JSON.stringify(faqJsonLd, null, 2)}\n</script>`;
    }
  }
  
  return `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
}

/**
 * WebApplicationスキーマを生成する (LLMツール向け)
 */
function generateWebApplicationSchema(metadata: ExtractedMetadata): Record<string, unknown> {
  const title = metadata.title || metadata.h1 || 'AI Tool';
  const description = metadata.description || metadata.firstParagraph || '';
  const url = metadata.url || '';
  
  // AIツール用の機能リストを生成
  const featureList = generateFeatureList(metadata);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': title,
    'description': description,
    'url': url,
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': featureList,
    'keywords': metadata.topKeywords.join(', '),
    'applicationSubCategory': 'ArtificialIntelligenceTool',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '120',
      'bestRating': '5',
      'worstRating': '1'
    }
  };
}

/**
 * AIツール用の機能リストを生成する
 */
function generateFeatureList(metadata: ExtractedMetadata): string[] {
  // タイトルと説明文からツールの機能を推測
  const features: string[] = [];
  
  // URLからツールタイプを判定
  if (metadata.url.includes('meta-craft')) {
    features.push(
      'URL analysis',
      'SEO metadata extraction',
      'Title tag generation',
      'Meta description generation',
      'OGP tags generation',
      'Twitter Card generation',
      'JSON-LD generation'
    );
  } else if (metadata.url.includes('llm-tools')) {
    features.push('Advanced LLM tools', 'AI-powered analysis');
    
    // キーワードから機能を推測
    if (metadata.topKeywords.some(kw => 
        ['seo', 'meta', 'metadata'].includes(kw.toLowerCase()))) {
      features.push('SEO optimization', 'Metadata generation');
    }
    
    if (metadata.topKeywords.some(kw => 
        ['summary', 'summarize', 'summarization'].includes(kw.toLowerCase()))) {
      features.push('Content summarization');
    }
    
    if (metadata.topKeywords.some(kw => 
        ['translate', 'translation', 'language'].includes(kw.toLowerCase()))) {
      features.push('Text translation');
    }
  }
  
  // デフォルトの機能
  if (features.length === 0) {
    features.push(
      'AI-powered text analysis',
      'Advanced language processing',
      'Content optimization',
      'Real-time insights'
    );
  }
  
  return features;
}

/**
 * FAQ用のスキーマを生成する
 */
function generateFaqSchema(metadata: ExtractedMetadata): { mainEntity: Array<Record<string, unknown>> } {
  // FAQ用の質問と回答のペアを抽出
  const mainEntity: Array<Record<string, unknown>> = [];
  const content = metadata.mainContent || '';
  
  // 簡易的な質問抽出（?で終わる文章を検出）
  const sentences = content.split(/(?<=[.!?])\s+/);
  let currentQuestion = '';
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    
    // 質問文を検出（?で終わる文）
    if (sentence.endsWith('?')) {
      currentQuestion = sentence;
      
      // 次の文を回答として使用（次の文がない場合はスキップ）
      if (i + 1 < sentences.length) {
        const answer = sentences[i + 1];
        
        mainEntity.push({
          '@type': 'Question',
          'name': currentQuestion,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': answer
          }
        });
        
        // 回答を使用したので、インデックスをスキップ
        i++;
      }
    }
  }
  
  // 最大5つのFAQに制限
  return { mainEntity: mainEntity.slice(0, 5) };
}

/**
 * HTMLエスケープ処理
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
} 
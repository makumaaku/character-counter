# 多言語対応ディレクトリ構造

## 基本構造

```
assets/locales/
├── en/ # 英語翻訳ファイル
│ ├── common.json # 共通部分（ヘッダー、フッター、エラーメッセージなど）
│ ├── meta.json # メタデータ（タイトル、説明文など）
│ ├── character-counter.json # 文字カウントツール
│ ├── country-data.json # 国データツール
│ ├── number-quiz.json # 数字クイズツール
│ ├── pdf-tools/ # PDFツール関連
│ │ ├── common.json # PDF共通文字列
│ │ └── heic-to-pdf.json # HEIC→PDF変換専用
│ ├── qr-generation.json # QRコード生成ツール
│ ├── roulette.json # ルーレットツール
│ ├── seo-tools/ # SEOツール関連
│ │ ├── common.json # SEO共通文字列
│ │ └── link-status-checker.json # リンクステータスチェッカー
│ └── word-gen/ # 単語生成ツール関連
│ ├── common.json # 単語生成共通
│ ├── name-generator.json # 名前生成
│ ├── sentence-generator.json # 文章生成
│ └── story-generator.json # ストーリー生成
├── ja/ # 日本語翻訳ファイル（英語と同じ構造）
│ ├── common.json
│ ├── meta.json
│ └── ...（以下同様）
├── es/ # スペイン語翻訳ファイル（英語と同じ構造）
│ ├── common.json
│ ├── meta.json
│ └── ...（以下同様）
└── [他の言語]/ # 将来追加される言語（同じ構造を維持）
```

## ファイル構造の特徴

1. **言語ごとのディレクトリ**
   - 各言語は独自のディレクトリを持つ（en, ja, es など）
   - 将来の言語拡張に対応

2. **共通ファイル**
   - `common.json` - すべてのページで使われる共通テキスト
   - `meta.json` - メタデータ用テキスト（SEO対策用）

3. **ツール構造**
   - 単独ツール - 直接jsonファイルとして配置（例: `character-counter.json`）
   - カテゴリツール - サブディレクトリで管理
     - カテゴリ共通部分は `[カテゴリ名]/common.json`
     - 個別ツールは `[カテゴリ名]/[ツール名].json`

4. **読み込み優先順位**
   - ツール固有の翻訳 > カテゴリ共通翻訳 > メタデータ > 全体共通翻訳

## 拡張性

このディレクトリ構造は1000ツール以上にも対応できる柔軟な設計になっています。
新しいツールやカテゴリを追加する場合は、既存のパターンに従って追加するだけです。
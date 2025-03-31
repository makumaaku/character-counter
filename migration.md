# 多言語対応ディレクトリ構造への移行手順

## 概要
既存の翻訳ファイル（ja.json, en.json）から新しいディレクトリ構造への移行作業の手順を説明します。
この移行により、翻訳キーが `translate(lang, 'toolCategory.toolName.xxx')` の形式で実装され、
より管理しやすい構造になります。

## 移行手順

### 1. 新規ディレクトリ構造の作成
```bash
mkdir -p assets/locales/{en,ja,es}/{pdf-tools,seo-tools,word-gen}
```

### 2. 共通ファイルの作成
各言語ディレクトリに以下のファイルを作成：
- `common.json` - ヘッダー、フッター、エラーメッセージなど
- `meta.json` - メタデータ（タイトル、説明文など）

### 3. 既存の翻訳キーの移行
#### 3.1 単独ツールの移行
以下のツールは直接jsonファイルとして配置：
- character-counter.json
- country-data.json
- number-quiz.json
- qr-generation.json
- roulette.json

移行例（character-counter）：
```json
// 移行前（ja.json/en.json）
{
  "characterCounter": {
    "title": "文字数カウンター",
    "description": "..."
  }
}

// 移行後（assets/locales/ja/character-counter.json）
{
  "characterCounter": {
    "title": "文字数カウンター",
    "description": "..."
  }
}
```

#### 3.2 カテゴリツールの移行
以下のカテゴリは専用ディレクトリを作成：

**PDFツール**
- common.json - PDF共通の翻訳
- heic-to-pdf.json - HEIC→PDF変換専用の翻訳

**SEOツール**
- common.json - SEO共通の翻訳
- link-status-checker.json - リンクステータスチェッカー専用の翻訳

**単語生成ツール**
- common.json - 単語生成共通の翻訳
- name-generator.json - 名前生成専用の翻訳
- sentence-generator.json - 文章生成専用の翻訳
- story-generator.json - ストーリー生成専用の翻訳

移行例（PDF Tools）：
```json
// 移行前（ja.json/en.json）
{
  "pdfTools": {
    "common": {
      "title": "PDFツール",
      "description": "..."
    },
    "heicToPdf": {
      "title": "HEIC to PDF変換",
      "description": "..."
    }
  }

}

// 移行後
// assets/locales/ja/pdf-tools/common.json
{
  "title": "PDFツール",
  "description": "..."
}

// assets/locales/ja/pdf-tools/heic-to-pdf.json
{
  "title": "HEIC to PDF変換",
  "description": "..."
}
```

### 4. コードの更新
#### 4.1 翻訳キーの更新
既存の翻訳呼び出しを新しい形式に更新：

```typescript
// 移行後
const title = await translate(lang, 'pdfTools.heicToPdf.title');
```

#### 4.2 型定義の更新
`src/lib/i18n/types.ts`の型定義を新しい構造に合わせて更新。

### 5. 動作確認
1. すべての翻訳キーが正しく移行されているか確認
2. 各ページで翻訳が正しく表示されるか確認
3. 新規追加したツールで翻訳が正しく機能するか確認

### 6. クリーンアップ
1. 古い翻訳ファイル（ja.json, en.json）のバックアップを取得
2. 問題がないことを確認後、古いファイルの移行対象のkeyを削除

## 注意事項
- 既存の翻訳テキストは変更せず、構造のみを変更
- 移行中は両方の構造を並行して維持し、段階的に移行
- 各ステップでバックアップを取得
- 移行後も古い翻訳ファイルはしばらく保持

## 移行スケジュール
1. 開発環境での移行テスト（1-2日）
2. 本番環境への段階的な適用（2-3日）
3. 完全移行の確認期間（1週間）
4. 古いファイルの削除（確認後）

## トラブルシューティング
### よくある問題と解決方法
1. 翻訳キーが見つからない
   - 新旧のパスを確認
   - ファイル名とディレクトリ名の区切り文字（ドット）を確認

2. 翻訳が表示されない
   - ファイルの配置場所を確認
   - JSON形式が正しいか確認
   - 言語コードが正しいか確認

3. 型エラーが発生
   - 型定義ファイルを更新
   - 新しいパスに合わせて型を修正

## 移行後の運用
1. 新規ツール追加時は新しい構造に従って実装
2. 翻訳キーの命名規則を統一
3. カテゴリ共通の翻訳は積極的に活用
4. 定期的なバックアップを継続

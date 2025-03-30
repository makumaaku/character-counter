# 多言語対応の型定義自動生成ツール

このディレクトリには、JSONファイルからTypeScriptの型定義を自動生成するツールが含まれています。

## 型定義の自動生成

多言語JSONファイルからTypeScript型定義を自動生成するには、以下のnpmスクリプトを実行します：

```bash
npm run generate-types
```

このコマンドは `assets/locales` ディレクトリにあるJSONファイルから型定義を生成し、`src/lib/i18n/generated-types.ts` ファイルに出力します。

## 生成された型の使い方

自動生成された型定義は `types.ts` ファイルからエクスポートされているため、以下のようにインポートできます：

```typescript
import { WordGenWordGeneratorMessages } from '@/lib/i18n/types';
```

型の命名規則は以下の通りです：

- トップレベルのツール: `[ToolName]Messages`
  例: `NumberQuizMessages`
- カテゴリ内のツール: `[CategoryName][ToolName]Messages`
  例: `WordGenWordGeneratorMessages`
- カテゴリの共通メッセージ: `[CategoryName]CommonMessages`
  例: `WordGenCommonMessages`

すべての型名はアッパーキャメルケース（パスカルケース）の命名規則に従っています。ただし、プロパティ名はキャメルケースのままです。

## コンポーネントでの使用例

```tsx
// クライアントコンポーネントの例
'use client'

import { useMessages } from '@/hooks/useMessages';
import { WordGenWordGeneratorMessages } from '@/lib/i18n/types';

export default function SomeComponent() {
  // スクリプトIDを指定して型付きのメッセージを取得
  const messages = useMessages<WordGenWordGeneratorMessages>('word-generator-messages');
  
  if (!messages) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{messages.title}</h1>
      <p>{messages.description}</p>
    </div>
  );
}

// サーバーコンポーネントの例（レイアウトファイル）
export default async function Layout({ children, params }: Props) {
  const { lang } = params;
  
  // 型定義に合わせてメッセージを構築
  const messages = {
    title: await translate(lang, 'wordGen.wordGenerator.title'),
    description: await translate(lang, 'wordGen.wordGenerator.description')
    // ...他のメッセージを追加
  };
  
  return (
    <>
      <Script
        id="word-generator-messages"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(messages),
        }}
      />
      <main>{children}</main>
    </>
  );
}
```

## 型定義の手動更新が必要な場合

新しい多言語ファイルを追加した場合や、既存のファイルの構造を変更した場合は、型定義を再生成する必要があります：

```bash
npm run generate-types
```

## type-generator.tsの使い方

もし特定のディレクトリや出力先を指定して型定義を生成したい場合は、直接`type-generator.ts`を実行することもできます：

```bash
node --loader ts-node/esm src/lib/i18n/type-generator.ts <入力ディレクトリ> <ベース型名> <出力ファイル>
```

例：
```bash
node --loader ts-node/esm src/lib/i18n/type-generator.ts assets/locales/custom CustomMessages src/types/custom-messages.ts
```

## 自動生成の仕組み

1. `assets/locales/en`ディレクトリのJSONファイルを読み込み
2. 各JSONファイルの構造に基づいてTypeScript型定義を生成
3. 各カテゴリ（サブディレクトリ）ごとに型定義を生成
4. トップレベルのファイルとカテゴリを含む総合的な型定義を作成
5. 生成された型定義を指定されたファイルに書き出し

## 注意事項

- 型定義の自動生成には英語（en）のJSONファイルを使用します
- 生成された型定義ファイルは手動で編集しないでください
- JSONファイルの構造を変更した場合は、必ず型定義を再生成してください 
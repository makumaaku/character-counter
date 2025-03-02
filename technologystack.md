# 技術スタック

## コア技術
- TypeScript: ^5.0.0
- Node.js: ^20.0.0  
- **AIモデル: claude-3-7-sonnet-20250219 (Anthropic Messages API 2023-06-01) ← バージョン変更禁止**

## フロントエンド
- Next.js: ^15.1.6
- React: ^19.0.0
- React DOM: ^19.0.0
- Tailwind CSS: ^3.4.1
- @tailwindcss/typography: ^0.5.16
- @heroicons/react: ^2.2.0

## 3Dレンダリング
- Three.js: ^0.173.0
- @react-three/fiber: ^9.0.4
- @react-three/drei: ^10.0.0

## MDXサポート
- @mdx-js/react: ^3.1.0
- @mdx-js/loader: ^3.1.0
- next-mdx-remote: ^5.0.0
- gray-matter: ^4.0.3
- remark-gfm: ^4.0.1

## ユーティリティ
- axios: ^1.7.9
- cheerio: ^1.0.0
- qrcode.react: ^4.2.0

## 国際化
- @formatjs/intl-localematcher: ^0.6.0
- negotiator: ^1.0.0

## SEO
- next-sitemap: ^4.2.3

## 開発ツール
- ESLint: ^9.0.0
- eslint-config-next: ^15.1.6
- @eslint/eslintrc: ^3.0.0
- PostCSS: ^8.0.0

---

# API バージョン管理
## 重要な制約事項
- i18n関連処理は `src/lib/i18n/` で一元管理
- AI モデルのバージョンは厳密に管理
- これらのファイルは変更禁止（変更が必要な場合は承認が必要）：
  - client.ts  - i18nクライアント処理
  - server.ts  - i18nサーバー処理
  - types.ts   - 型定義の一元管理

## 実装規則
- AIモデルのバージョンは厳密に管理
- 型定義は必ず適切な types.ts を参照
- 国際化処理は src/lib/i18n 経由のみ許可
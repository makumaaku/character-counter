This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Browser ToolのMCP連携
```bash
npx -y @agentdeskai/browser-tools-mcp@1.2.0
```

## GithubのMCP連携
```bash
npx -y @modelcontextprotocol/server-github
```

## i18n翻訳管理ユーティリティ

このプロジェクトには多言語対応（i18n）の翻訳を管理するための便利なユーティリティが含まれています。

### 翻訳の検証

翻訳の欠落を検出するには以下のコマンドを実行します：

```
npm run i18n-validate
```

このコマンドは基準言語（英語）と比較して、他の言語で欠落している翻訳キーを検出します。

### 翻訳状況レポート

現在の翻訳状況の詳細レポートを確認するには：

```
npm run i18n-report
```

このコマンドは各言語の翻訳完成度、欠落カテゴリ、総合的な翻訳状況を表示します。

### 翻訳の自動補完

欠落している翻訳を一時的に自動補完するには：

```
npm run i18n-fix ja  # 日本語の翻訳を補完する例
```

このユーティリティは欠落している翻訳キーを英語版からコピーします。これは一時的な対処方法であり、実際の翻訳はあとで追加する必要があります。

### CI/CD連携

翻訳の検証はGitHub Actionsによって自動的に実行されます。翻訳ファイルを変更するPRやプッシュ時に検証が走り、問題があれば通知されます。
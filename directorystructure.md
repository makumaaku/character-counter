# ディレクトリ構成

以下のディレクトリ構造に従って実装を行ってください：

```
/
├── app/                          # Next.jsのアプリケーションディレクトリ
│   ├── [lang]/                   # 言語別ルーティング
│   │   ├── api/                  # APIエンドポイント
│   │   │   ├── i18n-tools/       # 国際化関連API
│   │   │   │   └── translations/ # 翻訳関連API
│   │   │   ├── pdf-tools/        # PDF関連API
│   │   │   │   └── heic-to-pdf/  # HEIC→PDF変換API
│   │   │   ├── seo-tools/        # SEO関連API
│   │   │   └── word-gen/         # 単語生成関連API
│   │   │       ├── name-generator/    # 名前生成API
│   │   │       ├── sentence-generator/ # 文章生成API
│   │   │       └── story-generator/    # ストーリー生成API
│   │   ├── character-counter/    # 文字カウントツール
│   │   ├── country-data/         # 国データツール
│   │   ├── number-quiz/          # 数字クイズツール
│   │   ├── pdf-tools/            # PDFツール
│   │   │   └── heic-to-pdf/      # HEIC→PDF変換ツール
│   │   ├── qr-generation/        # QRコード生成ツール
│   │   ├── roulette/             # ルーレットツール
│   │   ├── seo-tools/            # SEOツール
│   │   │   └── link-status-checker/ # リンクステータスチェッカー
│   │   └── word-gen/             # 単語生成ツール
│   │       ├── name-generator/   # 名前生成ツール
│   │       ├── sentence-generator/ # 文章生成ツール
│   │       └── story-generator/  # ストーリー生成ツール
│   ├── globals.css               # グローバルスタイル
│   ├── layout.tsx                # ルートレイアウト
│   ├── not-found.tsx             # 404ページ
│   └── page.tsx                  # ホームページ
├── src/                          # ソースコード
│   ├── components/               # 共通コンポーネント
│   ├── constants/                # 定数定義
│   └── lib/                      # ユーティリティ
│       ├── i18n/                 # 国際化関連
│       │   ├── client.ts         # クライアント側i18n処理
│       │   ├── server.ts         # サーバー側i18n処理
│       │   └── types.ts          # i18n型定義
│       ├── columns.ts            # カラム定義
│       └── metadata.ts           # メタデータ定義
├── assets/                       # アセットファイル
├── public/                       # 静的ファイル
├── .cursor/                      # Cursor設定
├── .git/                         # Gitリポジトリ
├── .next/                        # Next.jsビルド出力
├── node_modules/                 # 依存パッケージ
├── .gitignore                    # Git除外設定
├── .DS_Store                     # macOSシステムファイル
├── README.md                     # プロジェクト説明
├── column-guide.md               # カラムガイド
├── eslint.config.mjs             # ESLint設定
├── middleware.ts                 # Next.jsミドルウェア
├── next-env.d.ts                 # Next.js型定義
├── next-sitemap.config.cjs       # サイトマップ設定
├── next.config.mjs               # Next.js設定
├── next.config.ts                # Next.js TypeScript設定
├── package-lock.json             # 依存関係ロックファイル
├── package.json                  # プロジェクト設定
├── postcss.config.mjs            # PostCSS設定
├── tailwind.config.ts            # Tailwind CSS設定
└── tsconfig.json                 # TypeScript設定
```

### 配置ルール
- 言語別ルーティング → `app/[lang]/`
- ツール別ページ → `app/[lang]/[tool-name]/`
- APIエンドポイント → `app/[lang]/api/[category]/[tool-name]/`
- 共通コンポーネント → `src/components/`
- 共通処理 → `src/lib/`
- 国際化関連 → `src/lib/i18n/`
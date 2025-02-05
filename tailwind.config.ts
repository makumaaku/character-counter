import type { Config } from "tailwindcss";

import colors from 'tailwindcss/colors'; // import colors from tailwindcss/colors

export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#242438", // ダークグレー
        foreground: "#FFFFFF", // 白
        primary: "#A15EF7", // 紫
        secondary: "#3B3B54", // ダークブルーグレー
        gray: colors.gray, // デフォルトの gray スケールを保持
      },
    },
  },
  plugins: [],
} satisfies Config;

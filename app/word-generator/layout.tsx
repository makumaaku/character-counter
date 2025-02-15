import { Metadata } from "next";
import Script from "next/script";
import jsonLdData from "./metadata";

export const metadata: Metadata = {
  title: "Random Word Generator | Free Online Tool - Boring Tools",
  description: "Generate random words instantly from our curated list of English words. Perfect for creative writing, brainstorming, vocabulary building, and more. Free and easy to use!",
  keywords: "random word generator, word generator, random words, vocabulary tool, writing tool, brainstorming tool",
  openGraph: {
    title: "Random Word Generator | Free Online Tool - Boring Tools",
    description: "Generate random words instantly from our curated list of English words. Perfect for creative writing, brainstorming, vocabulary building, and more. Free and easy to use!",
    url: "https://boring-tool.com/word-generator",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      {children}
    </>
  );
} 
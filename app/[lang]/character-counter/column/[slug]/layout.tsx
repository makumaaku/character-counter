import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}

type JsonLdType = {
  "@context": "https://schema.org";
  "@type": string;
  headline: string;
  description: string;
  articleBody: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  inLanguage: string;
}

async function getColumn(slug: string, lang: string) {
  console.log(slug, lang)
  const columnsDirectory = path.join(process.cwd(), 'assets/mdx/character-counter');
  const filePath = path.join(columnsDirectory, `${slug}.mdx`);

  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    
    return {
      content,
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      publishedTime: data.publishedTime
    };
  } catch (error) {
    console.error('Error processing MDX:', error);
    notFound();
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang, slug } = await params;
  const { title, description, keywords, publishedTime } = await getColumn(slug, lang);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description || '',
    "articleBody": "",  // コンテンツは動的に生成されるため、ここでは空文字列を設定
    "url": `${SITE_CONFIG.baseURL}/${lang}/character-counter/column/${slug}`,
    "datePublished": publishedTime,
    "dateModified": publishedTime,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "url": SITE_CONFIG.baseURL
    },
    "inLanguage": lang
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: title,
      description: description || '',
      keywords: keywords || '',
      url: `${SITE_CONFIG.baseURL}/${lang}/character-counter/column/${slug}`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 
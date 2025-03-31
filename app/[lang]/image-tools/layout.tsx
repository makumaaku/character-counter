import { loadToolMessages, translate } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language, ImageToolsCommonMessages } from '@/lib/i18n/types';
import ImageToolsLayout from './components/ImageToolsLayout';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

type JsonLdType = {
  "@context": "https://schema.org";
  "@type": string;
  name: string;
  description: string;
  url: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
      width: number;
      height: number;
    };
  };
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  featureList: string[];
  isAccessibleForFree: boolean;
  browserRequirements: string;
  hasPart: {
    "@type": string;
    name: string;
    description: string;
    url: string;
  }[];
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;

  // image-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    jpgToPngTitle,
    jpgToPngDescription,
    pngToJpgTitle,
    pngToJpgDescription,
    heicToJpgTitle,
    heicToJpgDescription,
    heicToPngTitle,
    heicToPngDescription,
    heicToWebpTitle,
    heicToWebpDescription,
    jpgToWebpTitle,
    jpgToWebpDescription,
    pngToWebpTitle,
    pngToWebpDescription,
    svgToJpgTitle,
    svgToJpgDescription,
    svgToPngTitle,
    svgToPngDescription,
    svgToWebpTitle,
    svgToWebpDescription
  ] = await Promise.all([
    translate(lang, 'imageTools.meta.title'),
    translate(lang, 'imageTools.meta.description'),
    translate(lang, 'imageTools.meta.keywords'),
    translate(lang, 'imageTools.tools.jpgToPng.title'),
    translate(lang, 'imageTools.tools.jpgToPng.description'),
    translate(lang, 'imageTools.tools.pngToJpg.title'),
    translate(lang, 'imageTools.tools.pngToJpg.description'),
    translate(lang, 'imageTools.tools.heicToJpg.title'),
    translate(lang, 'imageTools.tools.heicToJpg.description'),
    translate(lang, 'imageTools.tools.heicToPng.title'),
    translate(lang, 'imageTools.tools.heicToPng.description'),
    translate(lang, 'imageTools.tools.heicToWebp.title'),
    translate(lang, 'imageTools.tools.heicToWebp.description'),
    translate(lang, 'imageTools.tools.jpgToWebp.title'),
    translate(lang, 'imageTools.tools.jpgToWebp.description'),
    translate(lang, 'imageTools.tools.pngToWebp.title'),
    translate(lang, 'imageTools.tools.pngToWebp.description'),
    translate(lang, 'imageTools.tools.svgToJpg.title'),
    translate(lang, 'imageTools.tools.svgToJpg.description'),
    translate(lang, 'imageTools.tools.svgToPng.title'),
    translate(lang, 'imageTools.tools.svgToPng.description'),
    translate(lang, 'imageTools.tools.svgToWebp.title'),
    translate(lang, 'imageTools.tools.svgToWebp.description')
  ]);

  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools`,
    "publisher": {
      "@type": "Organization",
      "name": commonMeta.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        "width": SITE_CONFIG.logo.width,
        "height": SITE_CONFIG.logo.height
      }
    },
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "JPG to PNG conversion",
      "PNG to JPG conversion",
      "HEIC to JPG conversion",
      "HEIC to PNG conversion",
      "HEIC to WebP conversion",
      "JPG to WebP conversion",
      "PNG to WebP conversion",
      "Free to use",
      "No registration required",
      "Fast processing",
      "Browser-based conversion"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": jpgToPngTitle,
        "description": jpgToPngDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/jpg-to-png`
      },
      {
        "@type": "WebApplication",
        "name": pngToJpgTitle,
        "description": pngToJpgDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/png-to-jpg`
      },
      {
        "@type": "WebApplication",
        "name": heicToJpgTitle,
        "description": heicToJpgDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-jpg`
      },
      {
        "@type": "WebApplication",
        "name": heicToPngTitle,
        "description": heicToPngDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-png`
      },
      {
        "@type": "WebApplication",
        "name": heicToWebpTitle,
        "description": heicToWebpDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/heic-to-webp`
      },
      {
        "@type": "WebApplication",
        "name": jpgToWebpTitle,
        "description": jpgToWebpDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/jpg-to-webp`
      },
      {
        "@type": "WebApplication",
        "name": pngToWebpTitle,
        "description": pngToWebpDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/png-to-webp`
      },
      {
        "@type": "WebApplication",
        "name": svgToJpgTitle,
        "description": svgToJpgDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/svg-to-jpg`
      },
      {
        "@type": "WebApplication",
        "name": svgToPngTitle,
        "description": svgToPngDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/svg-to-png`
      },
      {
        "@type": "WebApplication",
        "name": svgToWebpTitle,
        "description": svgToWebpDescription,
        "url": `${SITE_CONFIG.baseURL}/${lang}/image-tools/svg-to-webp`
      }
    ]
  };

  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/image-tools`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  
  // image-tools用の翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools');

  // クライアントコンポーネント用の翻訳を準備
  const [
    title, 
    description,
    jpgToPngTitle,
    pngToJpgTitle,
    heicToJpgTitle,
    heicToPngTitle,
    heicToWebpTitle,
    jpgToWebpTitle,
    pngToWebpTitle,
    svgToJpgTitle,
    svgToPngTitle,
    svgToWebpTitle
  ] = await Promise.all([
    translate(lang, 'imageTools.title'),
    translate(lang, 'imageTools.description'),
    translate(lang, 'imageTools.tools.jpgToPng.title'),
    translate(lang, 'imageTools.tools.pngToJpg.title'),
    translate(lang, 'imageTools.tools.heicToJpg.title'),
    translate(lang, 'imageTools.tools.heicToPng.title'),
    translate(lang, 'imageTools.tools.heicToWebp.title'),
    translate(lang, 'imageTools.tools.jpgToWebp.title'),
    translate(lang, 'imageTools.tools.pngToWebp.title'),
    translate(lang, 'imageTools.tools.svgToJpg.title'),
    translate(lang, 'imageTools.tools.svgToPng.title'),
    translate(lang, 'imageTools.tools.svgToWebp.title')
  ]);

  const messages: ImageToolsCommonMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    tools: {
      jpgToPng: {
        title: jpgToPngTitle,
        description: ""
      },
      pngToJpg: {
        title: pngToJpgTitle,
        description: ""
      },
      heicToJpg: {
        title: heicToJpgTitle,
        description: ""
      },
      heicToPng: {
        title: heicToPngTitle,
        description: ""
      },
      heicToWebp: {
        title: heicToWebpTitle,
        description: ""
      },
      jpgToWebp: {
        title: jpgToWebpTitle,
        description: ""
      },
      pngToWebp: {
        title: pngToWebpTitle,
        description: ""
      },
      svgToJpg: {
        title: svgToJpgTitle,
        description: ""
      },
      svgToPng: {
        title: svgToPngTitle,
        description: ""
      },
      svgToWebp: {
        title: svgToWebpTitle,
        description: ""
      }
    }
  };

  return (
    <ImageToolsLayout
      messages={messages}
      lang={lang}
    >
      {children}
    </ImageToolsLayout>
  );
} 
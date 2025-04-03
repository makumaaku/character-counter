import { translate, loadToolMessages, getLanguageFromParams } from '@/lib/i18n/server';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import PdfToolsLayout from './components/PdfToolsLayout';
import { Language } from '@/lib/i18n/types';

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

  // PDFツール用の翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools');

  // 並列で翻訳を取得
  const [
    title,
    description,
    keywords,
    pdfToJpgTitle,
    pdfToJpgDescription,
    jpgToPdfTitle,
    jpgToPdfDescription,
    webToPdfTitle,
    webToPdfDescription,
    pdfToWordTitle,
    pdfToWordDescription,
    pdfToPngTitle,
    pdfToPngDescription,
    pngToPdfTitle,
    pngToPdfDescription,
    svgToPdfTitle,
    svgToPdfDescription,
    pdfToEpubTitle,
    pdfToEpubDescription,
    heicToPdfTitle,
    heicToPdfDescription
  ] = await Promise.all([
    translate(lang, 'pdfTools.meta.title'),
    translate(lang, 'pdfTools.meta.description'),
    translate(lang, 'pdfTools.meta.keywords'),
    translate(lang, 'pdfTools.pdfToJpg.meta.title'),
    translate(lang, 'pdfTools.pdfToJpg.meta.description'),
    translate(lang, 'pdfTools.jpgToPdf.meta.title'),
    translate(lang, 'pdfTools.jpgToPdf.meta.description'),
    translate(lang, 'pdfTools.webToPdf.meta.title'),
    translate(lang, 'pdfTools.webToPdf.meta.description'),
    translate(lang, 'pdfTools.pdfToWord.meta.title'),
    translate(lang, 'pdfTools.pdfToWord.meta.description'),
    translate(lang, 'pdfTools.pdfToPng.meta.title'),
    translate(lang, 'pdfTools.pdfToPng.meta.description'),
    translate(lang, 'pdfTools.pngToPdf.meta.title'),
    translate(lang, 'pdfTools.pngToPdf.meta.description'),
    translate(lang, 'pdfTools.svgToPdf.meta.title'),
    translate(lang, 'pdfTools.svgToPdf.meta.description'),
    translate(lang, 'pdfTools.pdfToEpub.meta.title'),
    translate(lang, 'pdfTools.pdfToEpub.meta.description'),
    translate(lang, 'pdfTools.heicToPdf.meta.title'),
    translate(lang, 'pdfTools.heicToPdf.meta.description'),
  ]);

  // 共通のメタデータ情報を設定
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
    "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools`,
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
      "PDF to JPG conversion",
      "JPG to PDF conversion",
      "Web to PDF conversion",
      "PDF to Word conversion",
      "PDF to PNG conversion",
      "PNG to PDF conversion",
      "SVG to PDF conversion",
      "PDF to EPUB conversion",
      "HEIC to PDF conversion",
      "Free to use",
      "No registration required"
    ],
    "isAccessibleForFree": true,
    "browserRequirements": "Requires a modern web browser with JavaScript enabled",
    "hasPart": [
      {
        "@type": "WebApplication",
        "name": pdfToJpgTitle,
        "description": pdfToJpgDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/pdf-to-jpg`
      },
      {
        "@type": "WebApplication",
        "name": jpgToPdfTitle,
        "description": jpgToPdfDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/jpg-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": webToPdfTitle,
        "description": webToPdfDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/web-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": pdfToWordTitle,
        "description": pdfToWordDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/pdf-to-word`
      },
      {
        "@type": "WebApplication",
        "name": pdfToPngTitle,
        "description": pdfToPngDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/pdf-to-png`
      },
      {
        "@type": "WebApplication",
        "name": pngToPdfTitle,
        "description": pngToPdfDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/png-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": svgToPdfTitle,
        "description": svgToPdfDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/svg-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": pdfToEpubTitle,
        "description": pdfToEpubDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/pdf-to-epub`
      },
      {
        "@type": "WebApplication",
        "name": heicToPdfTitle,
        "description": heicToPdfDescription,
        "url": `${SITE_CONFIG.baseURL}/pdf-tools/heic-to-pdf`
      }
    ]
  };

  // 共通のメタデータを取得
  const metadata = await getCommonMetadata(
    lang,
    commonMeta,
    {
      title,
      description,
      keywords,
      url: `${SITE_CONFIG.baseURL}/${lang}/pdf-tools`,
    }
  );

  return {
    ...metadata,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Layout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // PDFツールのタイトルと各ツールのタイトルを並列で取得
  const [
    pdfToolsTitle,
    pdfToJpgTitle,
    jpgToPdfTitle,
    // webToPdfTitle,
    // pdfToWordTitle,
    pdfToPngTitle,
    pngToPdfTitle,
    svgToPdfTitle,
    pdfToEpubTitle,
    heicToPdfTitle
  ] = await Promise.all([
    translate(lang, 'pdfTools.title'),
    translate(lang, 'pdfTools.tools.pdfToJpg.title'),
    translate(lang, 'pdfTools.tools.jpgToPdf.title'),
    // translate(lang, 'pdfTools.tools.webToPdf.title'),
    // translate(lang, 'pdfTools.tools.pdfToWord.title'),
    translate(lang, 'pdfTools.tools.pdfToPng.title'),
    translate(lang, 'pdfTools.tools.pngToPdf.title'),
    translate(lang, 'pdfTools.tools.svgToPdf.title'),
    translate(lang, 'pdfTools.tools.pdfToEpub.title'),
    translate(lang, 'pdfTools.tools.heicToPdf.title')
  ]);
  
  // ナビゲーション項目の配列を作成
  const navigationItems = [
    {
      name: pdfToJpgTitle,
      path: `/pdf-tools/pdf-to-jpg`
    },
    {
      name: jpgToPdfTitle,
      path: `/pdf-tools/jpg-to-pdf`
    },
    // {
    //   name: webToPdfTitle,
    //   path: `/pdf-tools/web-to-pdf`
    // },
    // {
    //   name: pdfToWordTitle,
    //   path: `/pdf-tools/pdf-to-word`
    // },
    {
      name: pdfToPngTitle,
      path: `/pdf-tools/pdf-to-png`
    },
    {
      name: pngToPdfTitle,
      path: `/pdf-tools/png-to-pdf`
    },
    {
      name: svgToPdfTitle,
      path: `/pdf-tools/svg-to-pdf`
    },
    {
      name: pdfToEpubTitle,
      path: `/pdf-tools/pdf-to-epub`
    },
    {
      name: heicToPdfTitle,
      path: `/pdf-tools/heic-to-pdf`
    }
  ];
  
  return (
    <PdfToolsLayout
      navigationItems={navigationItems}
      title={pdfToolsTitle}
    >
      {children}
    </PdfToolsLayout>
  );
} 
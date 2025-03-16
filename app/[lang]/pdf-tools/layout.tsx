import { translate } from '@/lib/i18n/client';
import { SITE_CONFIG } from '@/constants/constants';
import { getCommonMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import PdfToolsLayout from './components/PdfToolsLayout';

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
  const t = (key: string) => translate(lang, key);

  const commonMeta = {
    siteName: t(SITE_CONFIG.siteName),
    publisher: t(SITE_CONFIG.publisher),
    logoAlt: t('common.meta.logoAlt'),
  };

  const jsonLd: JsonLdType = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('pdfTools.meta.title'),
    "description": t('pdfTools.meta.description'),
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
        "name": t('pdfToJpg.meta.title'),
        "description": t('pdfToJpg.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-jpg`
      },
      {
        "@type": "WebApplication",
        "name": t('jpgToPdf.meta.title'),
        "description": t('jpgToPdf.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/jpg-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": t('webToPdf.meta.title'),
        "description": t('webToPdf.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/web-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": t('pdfToWord.meta.title'),
        "description": t('pdfToWord.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-word`
      },
      {
        "@type": "WebApplication",
        "name": t('pdfToPng.meta.title'),
        "description": t('pdfToPng.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-png`
      },
      {
        "@type": "WebApplication",
        "name": t('pngToPdf.meta.title'),
        "description": t('pngToPdf.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/png-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": t('svgToPdf.meta.title'),
        "description": t('svgToPdf.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/svg-to-pdf`
      },
      {
        "@type": "WebApplication",
        "name": t('pdfToEpub.meta.title'),
        "description": t('pdfToEpub.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/pdf-to-epub`
      },
      {
        "@type": "WebApplication",
        "name": t('heicToPdf.meta.title'),
        "description": t('heicToPdf.meta.description'),
        "url": `${SITE_CONFIG.baseURL}/${lang}/pdf-tools/heic-to-pdf`
      }
    ]
  };

  const metadata = getCommonMetadata(
    lang,
    commonMeta,
    {
      title: t('pdfTools.meta.title'),
      description: t('pdfTools.meta.description'),
      keywords: t('pdfTools.meta.keywords'),
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

export default async function Layout({ children }: Props) {
  return (
    <PdfToolsLayout>
      {children}
    </PdfToolsLayout>
  );
} 
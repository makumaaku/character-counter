import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from '@/constants/constants';
import { translate } from '@/lib/i18n/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  props: Props,
): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang;
  const t = (key: string) => translate(lang, key);
 
  // 共通のメタデータを取得
  const commonMeta = {
    siteName: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.publisher,
    logoAlt: SITE_CONFIG.logoAlt,
  };

  // ページ固有のメタデータを取得
  const title = await t(`meta.title`);
  const description = await t(`meta.description`);
  const keywords = await t(`meta.keywords`);

  // JSON-LDの生成
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    description: description,
    url: SITE_CONFIG.baseURL,
    publisher: {
      '@type': 'Organization',
      name: commonMeta.publisher,
      url: SITE_CONFIG.baseURL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
        width: SITE_CONFIG.logo.width,
        height: SITE_CONFIG.logo.height
      }
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true
  };

  return {
    title,
    description,
    metadataBase: new URL(SITE_CONFIG.baseURL),
    openGraph: {
      title,
      description,
      url: SITE_CONFIG.baseURL,
      type: 'website',
      siteName: commonMeta.siteName,
      images: [
        {
          url: `${SITE_CONFIG.baseURL}${SITE_CONFIG.logo.url}`,
          width: SITE_CONFIG.logo.width,
          height: SITE_CONFIG.logo.height,
          alt: commonMeta.logoAlt,
        },
      ],
    },
    keywords,
    other: {
      'application/ld+json': JSON.stringify(jsonLd)
    },
    icons: {
      icon: [
        {
          url: SITE_CONFIG.icons.favicon,
          sizes: "any",
        },
        {
          url: SITE_CONFIG.icons.icon192,
          type: "image/png",
          sizes: "192x192",
        },
        {
          url: SITE_CONFIG.icons.icon512,
          type: "image/png",
          sizes: "512x512",
        },
      ],
      apple: [
        {
          url: SITE_CONFIG.icons.appleIcon,
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.lang} className="dark">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TTDR9MSV');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TTDR9MSV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
import { SITE_CONFIG } from '@/constants/constants';
import { Metadata } from 'next';

export const getCommonMetadata = (lang: string, commonMeta: {
  siteName: string;
  publisher: string;
  logoAlt: string;
}, pageMeta: {
  title: string;
  description: string;
  keywords: string;
  url: string;
}): Metadata => {
  return {
    metadataBase: new URL(SITE_CONFIG.baseURL),
    title: pageMeta.title,
    description: pageMeta.description,
    openGraph: {
      title: pageMeta.title,
      description: pageMeta.description,
      url: pageMeta.url,
      type: 'website',
      locale: lang,
      alternateLocale: [lang === 'en' ? 'ja' : 'en'],
      images: [{
        url: SITE_CONFIG.logo.url,
        width: SITE_CONFIG.logo.width,
        height: SITE_CONFIG.logo.height,
        alt: commonMeta.logoAlt
      }]
    },
    alternates: {
      canonical: pageMeta.url,
      languages: {
        'en': pageMeta.url.replace(`/${lang}/`, '/en/'),
        'ja': pageMeta.url.replace(`/${lang}/`, '/ja/'),
        'x-default': pageMeta.url.replace(`/${lang}/`, '/en/')
      }
    },
    keywords: pageMeta.keywords,
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
    }
  };
}; 
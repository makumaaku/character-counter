export const SITE_CONFIG = {
  baseURL: 'https://boring-tool.com',
  siteName: 'common.meta.siteName',
  publisher: 'common.meta.publisher',
  logoAlt: 'common.meta.logoAlt',
  logo: {
    url: '/boring_logo.png',
    width: 286,
    height: 286
  },
  icons: {
    favicon: '/favicon.ico',
    icon192: '/boring-icon-192.png',
    icon512: '/boring-icon-512.png',
    appleIcon: '/boring-icon-180.png'
  }
} as const;

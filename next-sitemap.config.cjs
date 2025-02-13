/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://boring-tool.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
} 
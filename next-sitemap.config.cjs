/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://boring-tool.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/_not-found'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  additionalPaths: async (config) => {
    const paths = [
      '',
      'character-counter',
      'character-counter/about-us',
      'character-counter/column',
      'character-counter/contact',
      'character-counter/faq',
      'character-counter/function',
      'character-counter/plan',
      'character-counter/privacy',
      'character-counter/usecase',
      'qr-generation',
      'word-gen',
      'word-gen/name-generator',
      'word-gen/password-generator',
      'word-gen/sentence-generator',
      'word-gen/story-generator',
      'word-gen/word-card-generator',
      'word-gen/word-generator',
    ];

    const result = [];

    for (const path of paths) {
      // Skip empty path as it's handled separately
      if (path === '') {
        result.push(
          {
            loc: `${config.siteUrl}/en`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.7,
            alternateRefs: [
              {
                href: `${config.siteUrl}/ja`,
                hreflang: 'ja',
              },
            ],
          },
          {
            loc: `${config.siteUrl}/ja`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.7,
            alternateRefs: [
              {
                href: `${config.siteUrl}/en`,
                hreflang: 'en',
              },
            ],
          }
        );
        continue;
      }

      // Add English version
      result.push({
        loc: `${config.siteUrl}/en/${path}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7,
        alternateRefs: [
          {
            href: `${config.siteUrl}/ja/${path}`,
            hreflang: 'ja',
          },
        ],
      });

      // Add Japanese version
      result.push({
        loc: `${config.siteUrl}/ja/${path}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7,
        alternateRefs: [
          {
            href: `${config.siteUrl}/en/${path}`,
            hreflang: 'en',
          },
        ],
      });
    }

    return result;
  },
}; 
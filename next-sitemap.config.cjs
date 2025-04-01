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
    /* eslint-disable-next-line @typescript-eslint/no-require-imports */
    const fs = require('fs');
    /* eslint-disable-next-line @typescript-eslint/no-require-imports */
    const path = require('path');

    const getDirectoryPaths = () => {
      const appDir = path.join(process.cwd(), 'app/[lang]');
      const paths = [];

      const walkDir = (currentPath, relativePath = '') => {
        const files = fs.readdirSync(currentPath);

        for (const file of files) {
          const filePath = path.join(currentPath, file);
          const stat = fs.statSync(filePath);

          if (file.startsWith('[') || file.startsWith('_') || file === 'api') {
            continue;
          }

          if (stat.isDirectory()) {
            const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
            if (!newRelativePath.endsWith('components')) {
              paths.push(newRelativePath);
              walkDir(filePath, newRelativePath);
            }
          }
        }
      };

      walkDir(appDir);
      return paths.filter(p => !p.includes('[lang]'));
    };

    const paths = getDirectoryPaths();
    const result = [];

    for (const path of paths) {
      
      // サポートしている言語の配列
      const languages = ['ja', 'en', 'es', 'ru', 'zh'];
      // 各言語ごとにパスを追加するよ〜
      for (const lang of languages) {
        result.push({
          loc: `${config.siteUrl}/${lang}/${path}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.7,
        });
      }
    }

    return result;
  },
};
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://classyclothes.coupons',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://classyclothes.coupons'}/api/sitemap`,
    ],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/admin/'] },
    ],
  },
  exclude: ['/api/*', '/admin/*'],
  generateIndexSitemap: true,
  outDir: 'public',
  transform: async (config, path) => {
    // Use different priority for different paths
    let priority = 0.7;
    let changefreq = 'monthly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/scam')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/shop') || path.includes('/products')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.includes('/verification') || path.includes('/report-form')) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};

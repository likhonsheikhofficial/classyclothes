import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://classyclothes.coupons';
  
  // Generate robots.txt content
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Block admin pages
Disallow: /admin/
Disallow: /api/

# Host
Host: ${baseUrl.replace(/^https?:\/\//, '')}
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=3600, s-maxage=3600'
    }
  });
}

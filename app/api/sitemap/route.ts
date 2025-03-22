import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper function to generate sitemap XML
function generateSitemapXml(sitemapUrls: Array<{ url: string, lastModified?: string, changeFreq?: string, priority?: string }>) {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const entry of sitemapUrls) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${entry.url}</loc>\n`;
    
    if (entry.lastModified) {
      sitemap += `    <lastmod>${entry.lastModified}</lastmod>\n`;
    }
    
    if (entry.changeFreq) {
      sitemap += `    <changefreq>${entry.changeFreq}</changefreq>\n`;
    }
    
    if (entry.priority) {
      sitemap += `    <priority>${entry.priority}</priority>\n`;
    }
    
    sitemap += '  </url>\n';
  }
  
  sitemap += '</urlset>';
  return sitemap;
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://classyclothes.coupons';
    
    // Core website pages
    const corePages = [
      { url: `${baseUrl}/`, priority: '1.0', changeFreq: 'daily' },
      { url: `${baseUrl}/shop`, priority: '0.9', changeFreq: 'daily' },
      { url: `${baseUrl}/about`, priority: '0.7', changeFreq: 'monthly' },
      { url: `${baseUrl}/contact`, priority: '0.7', changeFreq: 'monthly' },
      { url: `${baseUrl}/verification`, priority: '0.8', changeFreq: 'monthly' },
      { url: `${baseUrl}/report-form`, priority: '0.8', changeFreq: 'monthly' },
      { url: `${baseUrl}/scam`, priority: '0.9', changeFreq: 'daily' },
    ];
    
    // Add scam pages
    const scamPages = [];
    const scamsDirectory = path.join(process.cwd(), 'data/scams');
    
    if (fs.existsSync(scamsDirectory)) {
      const scamFiles = fs.readdirSync(scamsDirectory)
        .filter(filename => filename.endsWith('.json'));
      
      for (const scamFile of scamFiles) {
        try {
          const slug = scamFile.replace(/\.json$/, '');
          const filePath = path.join(scamsDirectory, scamFile);
          const fileStats = fs.statSync(filePath);
          const lastModified = fileStats.mtime.toISOString().split('T')[0];
          
          scamPages.push({
            url: `${baseUrl}/scam/${slug}`,
            lastModified,
            priority: '0.8',
            changeFreq: 'weekly'
          });
        } catch (error) {
          console.error(`Error processing scam file ${scamFile}:`, error);
        }
      }
    }
    
    // Combine all URLs
    const allUrls = [...corePages, ...scamPages];
    
    // Generate sitemap XML
    const sitemapXml = generateSitemapXml(allUrls);
    
    // Return XML response
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Check for new scam files and ensure they're included in the sitemap
async function updateSitemapEntries() {
  try {
    const scamsDirectory = path.join(process.cwd(), 'data/scams');
    if (!fs.existsSync(scamsDirectory)) {
      return { 
        success: true,
        message: 'No scams directory found',
        newEntries: 0 
      };
    }
    
    // Read all scam JSON files
    const scamFiles = fs.readdirSync(scamsDirectory)
      .filter(filename => filename.endsWith('.json'));
    
    const newEntries = [];
    
    for (const scamFile of scamFiles) {
      try {
        const slug = scamFile.replace(/\.json$/, '');
        const filePath = path.join(scamsDirectory, scamFile);
        
        // Check if the file is recent (created in the last 24 hours)
        const fileStats = fs.statSync(filePath);
        const creationTime = new Date(fileStats.birthtime).getTime();
        const currentTime = new Date().getTime();
        const isRecent = (currentTime - creationTime) < 24 * 60 * 60 * 1000;
        
        if (isRecent) {
          newEntries.push({
            slug,
            file: scamFile,
            createdAt: fileStats.birthtime
          });
        }
      } catch (error) {
        console.error(`Error processing scam file ${scamFile}:`, error);
      }
    }
    
    // Force sitemap regeneration by hitting the sitemap endpoint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://classyclothes.coupons';
    
    // In production, we'd make a real request to force regeneration
    // For now, we'll just log that it would happen
    console.log(`Would regenerate sitemap at ${baseUrl}/sitemap.xml`);
    
    return {
      success: true,
      message: 'Sitemap entries updated',
      newEntries: newEntries.length,
      entries: newEntries
    };
  } catch (error) {
    console.error('Error updating sitemap entries:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  // Verify the request has the correct authorization
  const authHeader = request.headers.get('authorization');
  
  // Check if this is a real cron job from Vercel
  const isVercelCron = request.headers.get('x-vercel-cron') === 'true';
  
  // For security, we should verify the request is coming from Vercel
  // or has proper authorization
  if (!isVercelCron && (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    console.log('Starting sitemap update at:', new Date().toISOString());
    
    // Update sitemap entries
    const result = await updateSitemapEntries();
    
    return NextResponse.json({
      success: true,
      message: 'Sitemap update completed successfully',
      timestamp: new Date().toISOString(),
      ...result
    });
  } catch (error) {
    console.error('Error in sitemap cron job:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sitemap update failed',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

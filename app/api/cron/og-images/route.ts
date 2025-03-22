import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Function to generate OpenGraph images for scam pages
async function generateOgImages() {
  // Directory paths
  const scamsDirectory = path.join(process.cwd(), 'data/scams');
  const ogImagesDir = path.join(process.cwd(), 'public/images/og');
  
  // Create OG images directory if it doesn't exist
  if (!fs.existsSync(ogImagesDir)) {
    fs.mkdirSync(ogImagesDir, { recursive: true });
  }
  
  if (!fs.existsSync(scamsDirectory)) {
    return { 
      success: true,
      message: 'No scams directory found',
      generatedImages: 0
    };
  }
  
  // Read all scam JSON files
  const scamFiles = fs.readdirSync(scamsDirectory)
    .filter(filename => filename.endsWith('.json'));
  
  // Track which images we generate
  const generatedImages = [];
  
  // Launch puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    for (const scamFile of scamFiles) {
      try {
        const slug = scamFile.replace(/\.json$/, '');
        const filePath = path.join(scamsDirectory, scamFile);
        const ogImagePath = path.join(ogImagesDir, `${slug}.png`);
        
        // Skip if OG image already exists
        if (fs.existsSync(ogImagePath)) {
          continue;
        }
        
        // Read scam data
        const scamData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Open a new page
        const page = await browser.newPage();
        
        // Set viewport size (OG image dimensions)
        await page.setViewport({ width: 1200, height: 630 });
        
        // Generate HTML content for the OG image
        const html = `
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f7f2ff;
                font-family: Arial, sans-serif;
                height: 100vh;
              }
              .container {
                width: 1160px;
                height: 590px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
              }
              .header {
                background-color: #dc2626;
                color: white;
                padding: 25px 30px;
                font-size: 32px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 15px;
              }
              .header-icon {
                width: 40px;
                height: 40px;
                background-color: white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .warning-triangle {
                width: 0;
                height: 0;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
                border-bottom: 24px solid #dc2626;
              }
              .content {
                padding: 30px;
                flex: 1;
                display: flex;
                flex-direction: row;
              }
              .left {
                flex: 2;
                padding-right: 30px;
              }
              .right {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f8f8f8;
                border-radius: 10px;
              }
              h1 {
                font-size: 42px;
                margin: 0 0 20px 0;
                color: #111827;
              }
              p {
                font-size: 24px;
                margin: 0 0 20px 0;
                color: #4b5563;
                line-height: 1.5;
              }
              .url {
                font-size: 20px;
                font-family: monospace;
                padding: 12px 20px;
                background-color: #fee2e2;
                color: #dc2626;
                border-radius: 6px;
                border-left: 4px solid #dc2626;
                margin-top: 20px;
              }
              .footer {
                padding: 15px 30px;
                background-color: #f8f8f8;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #e5e7eb;
              }
              .logo {
                font-size: 20px;
                font-weight: bold;
                color: #111827;
              }
              .date {
                font-size: 16px;
                color: #6b7280;
              }
              .shield {
                width: 100px;
                height: 100px;
                background-color: #f8f8f8;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .shield-inner {
                width: 80px;
                height: 80px;
                background-color: #dc2626;
                border-radius: 40px 40px 10px 10px;
                position: relative;
              }
              .shield-inner:after {
                content: "";
                position: absolute;
                width: 60px;
                height: 60px;
                top: 10px;
                left: 10px;
                background-color: white;
                border-radius: 30px 30px 5px 5px;
              }
              .shield-inner:before {
                content: "!";
                position: absolute;
                width: 100%;
                top: 15px;
                z-index: 1;
                text-align: center;
                font-size: 40px;
                font-weight: bold;
                color: #dc2626;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-icon">
                  <div class="warning-triangle"></div>
                </div>
                SCAM ALERT
              </div>
              <div class="content">
                <div class="left">
                  <h1>${scamData.name} - FAKE WEBSITE</h1>
                  <p>This is NOT the official Classy Clothes website. This is a scam website designed to steal your information.</p>
                  <div class="url">${scamData.url}</div>
                </div>
                <div class="right">
                  <div class="shield">
                    <div class="shield-inner"></div>
                  </div>
                </div>
              </div>
              <div class="footer">
                <div class="logo">ClassyClothes.coupons</div>
                <div class="date">Detected: ${new Date(scamData.detectedDate).toLocaleDateString()}</div>
              </div>
            </div>
          </body>
        </html>
        `;
        
        // Set content and render
        await page.setContent(html);
        
        // Take screenshot
        await page.screenshot({ path: ogImagePath });
        
        // Optimize with sharp
        await sharp(ogImagePath)
          .resize(1200, 630)
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(`${ogImagePath}.temp`);
        
        fs.renameSync(`${ogImagePath}.temp`, ogImagePath);
        
        // Close the page
        await page.close();
        
        generatedImages.push({
          slug,
          path: `/images/og/${slug}.png`
        });
      } catch (error) {
        console.error(`Error generating OG image for ${scamFile}:`, error);
      }
    }
  } finally {
    // Close the browser
    await browser.close();
  }
  
  return {
    success: true,
    generatedImages: generatedImages.length,
    images: generatedImages
  };
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
    console.log('Starting OG image generation at:', new Date().toISOString());
    
    // Generate OpenGraph images
    const result = await generateOgImages();
    
    return NextResponse.json({
      success: true,
      message: 'OG image generation completed successfully',
      timestamp: new Date().toISOString(),
      ...result
    });
  } catch (error) {
    console.error('Error in OG image generation:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'OG image generation failed',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

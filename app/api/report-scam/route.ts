import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { scanSite } from '@/lib/scam-scanner';

export const dynamic = 'force-dynamic';

// Function to sanitize a URL for use as a filename
function sanitizeUrlForFilename(url: string): string {
  try {
    // Extract the hostname from the URL
    const { hostname } = new URL(url);
    // Replace dots with hyphens and remove any non-alphanumeric characters
    return hostname.replace(/\./g, '-').replace(/[^a-z0-9-]/gi, '').toLowerCase();
  } catch (error) {
    // If the URL is invalid, just sanitize the string directly
    return url
      .replace(/^https?:\/\//, '')
      .replace(/\./g, '-')
      .replace(/[^a-z0-9-]/gi, '')
      .toLowerCase();
  }
}

// Save a reported URL to a pending reports file for later analysis
async function saveReportedUrl(reportData: any) {
  try {
    // Create reports directory if it doesn't exist
    const reportsDir = path.join(process.cwd(), 'data/reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    // Generate a unique filename based on the URL and timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const urlSlug = sanitizeUrlForFilename(reportData.scamUrl);
    const filename = `${urlSlug}-${timestamp}.json`;
    const filePath = path.join(reportsDir, filename);
    
    // Add metadata to the report
    const reportWithMetadata = {
      ...reportData,
      reportedAt: new Date().toISOString(),
      status: 'pending',
      id: `report-${urlSlug}-${Date.now()}`
    };
    
    // Write the report to a file
    fs.writeFileSync(filePath, JSON.stringify(reportWithMetadata, null, 2));
    
    return {
      success: true,
      reportId: reportWithMetadata.id,
      filename
    };
  } catch (error) {
    console.error('Error saving reported URL:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const reportData = await request.json();
    
    // Basic validation
    if (!reportData.scamUrl) {
      return NextResponse.json(
        { success: false, message: 'URL is required' },
        { status: 400 }
      );
    }
    
    // Save the report
    const saveResult = await saveReportedUrl(reportData);
    
    // Optionally, do a quick scan of the reported URL
    let scanResult = null;
    try {
      if (reportData.scamUrl.startsWith('http')) {
        scanResult = await scanSite(reportData.scamUrl, { quick: true });
      }
    } catch (scanError) {
      console.error('Error scanning reported URL:', scanError);
      // Don't fail the whole request if scanning fails
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your report. Our team will investigate this website.',
      reportId: saveResult.reportId,
      initialScan: scanResult
    });
  } catch (error) {
    console.error('Error processing scam report:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process your report. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

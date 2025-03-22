import { NextResponse } from 'next/server';
import { runScanner } from '@/lib/scam-scanner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  // Verify the request has the correct authorization
  // This is a simple check - in production, use a more secure method
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
    console.log('Starting scheduled scan at:', new Date().toISOString());
    
    // Run the scanner
    const results = await runScanner();
    
    return NextResponse.json({
      success: true,
      message: 'Scan completed successfully',
      timestamp: new Date().toISOString(),
      results
    });
  } catch (error) {
    console.error('Error in scan cron job:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Scan failed',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

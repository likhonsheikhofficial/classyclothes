import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define patterns for API routes that should be protected
const PROTECTED_API_PATTERNS = [
  '/api/cron/',
  '/api/admin/',
];

// A list of IP addresses that are allowed to access protected routes
// In production, this would be loaded from environment variables
const ALLOWED_IP_ADDRESSES = [
  '127.0.0.1',
  '::1', // localhost in IPv6
];

// Check if the request is to a protected API route
function isProtectedApiRoute(pathname: string): boolean {
  return PROTECTED_API_PATTERNS.some(pattern => pathname.startsWith(pattern));
}

// Check if the request has valid authentication (Bearer token)
function hasValidAuthentication(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  
  // In production, validate against env var CRON_SECRET_KEY
  const expectedToken = `Bearer ${process.env.CRON_SECRET_KEY || 'your-random-secret-key-here'}`;
  return authHeader === expectedToken;
}

// Check if the request is from Vercel's cron system
function isVercelCron(request: NextRequest): boolean {
  return request.headers.get('x-vercel-cron') === 'true';
}

// Check if the request IP is in the allowed list
function isAllowedIP(request: NextRequest): boolean {
  // In production, get the IP from request context
  // For simplicity in development, allow localhost
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected API route
  if (isProtectedApiRoute(pathname)) {
    // Allow access if it's a Vercel cron job
    if (isVercelCron(request)) {
      return NextResponse.next();
    }
    
    // Allow access if it has valid authentication
    if (hasValidAuthentication(request)) {
      return NextResponse.next();
    }
    
    // Allow access from specific IP addresses (for admin functions)
    if (isAllowedIP(request)) {
      return NextResponse.next();
    }
    
    // Block access for unauthorized requests
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Unauthorized access' 
      }),
      { 
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // For all other routes, proceed normally
  return NextResponse.next();
}

// Only apply this middleware to API routes
export const config = {
  matcher: '/api/:path*',
}

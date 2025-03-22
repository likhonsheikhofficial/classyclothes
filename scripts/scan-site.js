#!/usr/bin/env node

// CLI tool for scanning a specific site for scam detection
// Usage: node scan-site.js [url] [--verbose] [--screenshot] [--skip-sitemap]

const { scanSite, processSiteForScamDetection, captureScreenshot } = require('../lib/scam-scanner');
const URL = require('url').URL;

// Parse command line arguments
const args = process.argv.slice(2);
let url = null;
const options = {
  verbose: args.includes('--verbose'),
  screenshot: args.includes('--screenshot'),
  skipSitemap: args.includes('--skip-sitemap'),
};

// Find the URL parameter
for (const arg of args) {
  if (!arg.startsWith('--')) {
    try {
      // Validate URL
      new URL(arg);
      url = arg;
      break;
    } catch (e) {
      console.error(`Invalid URL: ${arg}`);
      process.exit(1);
    }
  }
}

if (!url) {
  console.error('Usage: node scan-site.js [url] [--verbose] [--screenshot] [--skip-sitemap]');
  process.exit(1);
}

console.log(`Starting scan of ${url}`);
console.log('Options:', options);
console.log('Current time:', new Date().toISOString());

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the scan
(async () => {
  try {
    console.log(`\n==== Scanning ${url} for potential scam indicators ====\n`);
    
    // First scan the site
    const scanResult = await scanSite(url, { verbose: options.verbose });
    console.log('\nScan Results:');
    console.log(JSON.stringify(scanResult, null, 2));
    
    // Take screenshots if requested
    if (options.screenshot) {
      console.log('\nCapturing screenshots...');
      const screenshotResult = await captureScreenshot(url);
      console.log(`Screenshot saved to: ${screenshotResult.path}`);
    }
    
    // Process for scam detection
    if (!options.skipSitemap) {
      console.log('\nProcessing site for scam detection...');
      const processResult = await processSiteForScamDetection(url);
      console.log('\nProcess Results:');
      console.log(JSON.stringify(processResult, null, 2));
    }
    
    console.log('\nScan completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('\nScan failed with error:', error);
    process.exit(1);
  }
})();

#!/usr/bin/env node

// This script runs the scam scanner and can be scheduled via cron
// Example cron: 0 0 * * * /path/to/node /path/to/run-scanner.js

const { runScanner } = require('../lib/scam-scanner');

console.log('Starting Classy Clothes scam scanner process...');
console.log('Current time:', new Date().toISOString());

// Set process to exit with error code on uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the scanner
runScanner()
  .then(() => {
    console.log('Scanner completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Scanner failed with error:', error);
    process.exit(1);
  });

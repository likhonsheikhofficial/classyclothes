# Classy Clothes Website Scanner Scripts

This directory contains utility scripts for scanning, detecting, and managing fake websites that impersonate Classy Clothes.

## Available Scripts

### 1. `run-scanner.js`

Runs a complete scan of potential scam websites based on configuration. This script is designed to be run on a schedule (e.g., via cron job).

```bash
node run-scanner.js
```

#### Recommended Scheduling

```
# Run once per day at midnight
0 0 * * * /path/to/node /path/to/classy-clothes-website-scanner/scripts/run-scanner.js >> /path/to/logs/scanner.log 2>&1
```

### 2. `scan-site.js`

A command-line tool for manually scanning a specific website for scam indicators.

```bash
node scan-site.js [url] [options]
```

#### Options:

- `--verbose`: Display detailed scanning information
- `--screenshot`: Capture screenshots of the site
- `--skip-sitemap`: Skip sitemap generation and updating

#### Examples:

```bash
# Basic scan of a suspicious website
node scan-site.js https://suspicious-site.com

# Detailed scan with screenshots
node scan-site.js https://suspicious-site.com --verbose --screenshot

# Quick scan without sitemap generation
node scan-site.js https://suspicious-site.com --skip-sitemap
```

## Implementation Details

The scripts leverage the functionality provided in the `lib/scam-scanner.js` module, which includes:

- Website content analysis
- Screenshot capture
- Scam detection based on various indicators
- Reporting and data generation

## Output

Scan results are saved to the `data/scams/` directory in JSON format, including:

- Basic website information
- Detection timestamp
- Evidence (screenshots, analyses)
- Warning details

Screenshots are saved to the `public/images/scam-evidence/` directory.

## Adding to Sitemap

When scans are completed, the scripts automatically update the website's sitemap to include the new scam alert pages, which helps with SEO and ensures users can find information about fake websites.

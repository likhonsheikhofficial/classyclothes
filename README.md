# Classy Clothes Website Scanner

A comprehensive system for detecting and alerting users about fake websites that impersonate the Classy Clothes brand.

## Overview

This project implements a robust set of tools and user-facing features designed to identify, document, and alert users about fraudulent websites that copy or mimic the official Classy Clothes website. It includes automated scanning, user reporting mechanisms, and comprehensive scam alerts that are fully integrated with the main site.

## Key Features

- **Automated Scam Detection**: Scans potential fake websites to detect common patterns of fraud
- **Dynamic Scam Alert Pages**: Automatically generates SEO-optimized pages for each detected scam website
- **Visual Evidence Collection**: Captures and displays screenshots of fake websites as evidence
- **User Reporting System**: Allows customers to report suspicious websites
- **Verification Tools**: Educates users on how to verify they're on the official site
- **Advanced SEO Integration**: Ensures scam alerts are properly indexed by search engines
- **Real-time Ticker Header**: Displays rotating warnings about known scam sites

## Project Structure

```
classy-clothes-website-scanner/
├── app/                      # Next.js application pages
│   ├── scam/                 # Scam detection pages
│   │   ├── [slug]/           # Dynamic page for each scam site
│   │   └── page.tsx          # Index of all scam sites
│   ├── verification/         # Website verification guide
│   └── report-form/          # Form for reporting scams
├── components/               # Reusable UI components  
│   ├── site-verification.tsx # Verification component
│   └── ticker-header.tsx     # Rotating scam alerts header
├── lib/                      # Core functionality modules
│   ├── scam-scanner.js       # Scam detection logic
│   ├── advanced-seo.js       # SEO schema generation
│   └── image-loader.js       # Image processing utilities
├── data/                     # Data storage
│   └── scams/                # JSON files for each scam site
├── public/                   # Static assets
│   └── images/
│       └── scam-evidence/    # Screenshots of fake websites
└── scripts/                  # Utility scripts
    ├── run-scanner.js        # Scheduled scanner script
    └── scan-site.js          # Manual scanning tool
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/classy-clothes-website-scanner.git
cd classy-clothes-website-scanner
```

2. Install dependencies:
```bash
npm install
```

3. Set up required environment variables:
```
NEXT_PUBLIC_BASE_URL=https://classyclothes.coupons
```

## Usage

### Development

Run the development server:
```bash
npm run dev
```

### Production

Build and start the production server:
```bash
npm run build
npm start
```

### Scanning Tools

Run the automated scanner:
```bash
node scripts/run-scanner.js
```

Scan a specific site:
```bash
node scripts/scan-site.js https://suspicious-site.com --verbose --screenshot
```

## How It Works

1. **Detection**: The system scans suspicious websites for common indicators of fraud, such as copied content, checkout systems, and specific text patterns.

2. **Documentation**: When a fake site is detected, screenshots are captured, and a detailed report is generated in JSON format.

3. **Publication**: A dedicated scam alert page is created for each fake site, containing evidence, warnings, and educational content.

4. **Notification**: The system updates the ticker header to display warnings about the most recently detected scams.

5. **SEO**: All scam pages are added to the sitemap and enhanced with structured data to improve search engine visibility.

## Contributing

We welcome contributions to improve the scam detection system. Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- Automated reporting to domain registrars and hosting providers
- Machine learning for better fraud detection
- API integration with law enforcement databases
- Browser extension for real-time protection
- Social media monitoring for scam ads

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or concerns, please contact:
- Email: security@classyclothes.coupons
- Website: https://classyclothes.coupons/contact

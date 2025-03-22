// Classy Clothes Advanced Scam Scanner
// This module handles scanning of fake websites, generating scam reports, and creating detection pages

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const sharp = require('sharp');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const mkdirAsync = promisify(fs.mkdir);
const existsAsync = promisify(fs.exists);

// Constants
const OFFICIAL_URL = 'classyclothes.coupons';
const SCAM_SITES = [
  {
    domain: 'classyclothes.com.bd',
    name: 'ClassyClothes.com.bd',
    sitemaps: [
      'https://classyclothes.com.bd/wp-sitemap.xml',
      'https://classyclothes.com.bd/wp-sitemap-post-post-1.xml',
      'https://classyclothes.com.bd/wp-sitemap-posts-page-1.xml',
      'https://classyclothes.com.bd/wp-sitemap-posts-blocks-.xml',
      'https://classyclothes.com.bd/wp-sitemap-posts-product-1.xml',
      'https://classyclothes.com.bd/wp-sitemap-posts-featured_item-1.xml',
      'https://classyclothes.com.bd/wp-sitemap-taxonomies-category-1.xml',
      'https://classyclothes.com.bd/wp-sitemap-taxonomies-product_cat-1.xml',
      'https://classyclothes.com.bd/wp-sitemap-taxonomies-featured_item_category-1.xml',
      'https://classyclothes.com.bd/wp-sitemap-users-1.xml'
    ]
  },
  {
    domain: 'classy-clothes-bd.com',
    name: 'Classy-Clothes-BD.com',
    sitemaps: [
      'https://classy-clothes-bd.com/sitemap.xml',
      'https://classy-clothes-bd.com/sitemap-post-1.xml',
      'https://classy-clothes-bd.com/sitemap-pages-1.xml',
      'https://classy-clothes-bd.com/sitemap-products-1.xml'
    ]
  }
];

// Data storage paths
const SCAM_DATA_DIR = path.join(process.cwd(), 'data', 'scams');
const EVIDENCE_DIR = path.join(process.cwd(), 'public', 'images', 'scam-evidence');
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const SCAM_SITEMAP_PATH = path.join(process.cwd(), 'public', 'scam-sitemap.xml');

/**
 * Create necessary directories if they don't exist
 */
async function ensureDirectories() {
  try {
    // Ensure scam data directory exists
    if (!await existsAsync(SCAM_DATA_DIR)) {
      await mkdirAsync(SCAM_DATA_DIR, { recursive: true });
      console.log(`Created directory: ${SCAM_DATA_DIR}`);
    }
    
    // Ensure evidence directory exists
    if (!await existsAsync(EVIDENCE_DIR)) {
      await mkdirAsync(EVIDENCE_DIR, { recursive: true });
      console.log(`Created directory: ${EVIDENCE_DIR}`);
    }
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

/**
 * Safely fetch a URL with error handling and retries
 * @param {string} url - URL to fetch
 * @param {number} retries - Number of retry attempts
 * @returns {Promise<Object|null>} - Response data or null on failure
 */
async function safeFetch(url, retries = 3) {
  let attempts = 0;
  
  while (attempts < retries) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'ClassyClothes-SecurityScanner/1.0',
          'Accept': 'text/html,application/xml,application/xhtml+xml,text/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 10000, // 10 second timeout
        validateStatus: (status) => status < 500 // Accept any status < 500
      });
      
      return response.data;
    } catch (error) {
      attempts++;
      console.warn(`Error fetching ${url} (Attempt ${attempts}/${retries}): ${error.message}`);
      
      if (attempts === retries) {
        return null;
      }
      
      // Exponential backoff with jitter
      const delay = Math.floor(Math.random() * 1000 + 2000 * Math.pow(2, attempts));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return null;
}

/**
 * Parse XML sitemap content
 * @param {string} xmlContent - XML sitemap content
 * @returns {Promise<Array>} - Array of URLs from sitemap
 */
async function parseSitemap(xmlContent) {
  if (!xmlContent) return [];
  
  try {
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlContent);
    
    // Handle sitemap index (contains links to other sitemaps)
    if (result.sitemapindex && result.sitemapindex.sitemap) {
      const sitemaps = Array.isArray(result.sitemapindex.sitemap) 
        ? result.sitemapindex.sitemap 
        : [result.sitemapindex.sitemap];
      
      const urls = [];
      for (const sitemap of sitemaps) {
        if (sitemap.loc) {
          urls.push(sitemap.loc);
        }
      }
      return urls;
    }
    
    // Handle regular sitemap with URLs
    if (result.urlset && result.urlset.url) {
      const urlEntries = Array.isArray(result.urlset.url) 
        ? result.urlset.url 
        : [result.urlset.url];
      
      return urlEntries
        .filter(entry => entry.loc)
        .map(entry => ({
          url: entry.loc,
          lastmod: entry.lastmod || null,
          changefreq: entry.changefreq || null,
          priority: entry.priority || null
        }));
    }
    
    return [];
  } catch (error) {
    console.error('Error parsing sitemap XML:', error);
    return [];
  }
}

/**
 * Take a screenshot of a webpage evidence
 * @param {string} url - URL to capture
 * @param {string} filename - Filename to save screenshot as
 * @returns {Promise<string|null>} - Path to saved screenshot or null on failure
 */
async function captureScreenshot(url, filename) {
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: { width: 1280, height: 800 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Allow time for any lazy-loaded content to appear
    await page.waitForTimeout(2000);
    
    const screenshotPath = path.join(EVIDENCE_DIR, filename);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    
    // Create a thumbnail version
    const thumbnailPath = path.join(EVIDENCE_DIR, `thumb-${filename}`);
    await sharp(screenshotPath)
      .resize(400, 300, { fit: 'inside' })
      .toFile(thumbnailPath);
    
    await browser.close();
    return { 
      full: `/images/scam-evidence/${filename}`,
      thumbnail: `/images/scam-evidence/thumb-${filename}`
    };
  } catch (error) {
    console.error(`Error capturing screenshot of ${url}:`, error);
    return null;
  }
}

/**
 * Analyze a webpage for scam indicators
 * @param {string} url - URL to analyze
 * @param {string} domain - Domain being analyzed
 * @returns {Promise<Object>} - Analysis results
 */
async function analyzeWebpage(url, domain) {
  try {
    const content = await safeFetch(url);
    if (!content) return null;
    
    const $ = cheerio.load(content);
    
    // Extract key information
    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    const keywords = $('meta[name="keywords"]').attr('content') || '';
    
    // Look for checkout patterns
    const hasCheckout = url.includes('/checkout') || 
                        $('form').text().toLowerCase().includes('checkout') || 
                        $('button').text().toLowerCase().includes('checkout');
    
    // Look for payment indicators
    const paymentPatterns = ['payment', 'pay', 'checkout', 'credit card', 'debit card', 'cash on delivery'];
    const hasPaymentSystem = paymentPatterns.some(pattern => 
      $('body').text().toLowerCase().includes(pattern)
    );
    
    // Check for Bengali text (likely targeting Bangladesh customers)
    const bengaliPattern = /[\u0980-\u09FF]/;
    const hasBengaliText = bengaliPattern.test($('body').text());
    
    // Check for product listings
    const hasProductListings = $('body').find('.product').length > 0 || 
                              $('body').find('[class*="product"]').length > 0;
    
    // Look for pricing information
    const hasPricing = $('body').text().includes('৳') || // Bengali Taka symbol
                       $('body').text().includes('BDT') ||
                       $('body').text().match(/[৳টাকা]\s*\d+/gi);
    
    // Check for copied content by comparing with signatures of our official site
    const hasCopiedContent = $('body').text().includes('Classy Clothes Official') ||
                            $('body').text().includes('classyclothes.coupons');
    
    return {
      url,
      title,
      description,
      indicators: {
        hasCheckout,
        hasPaymentSystem,
        hasBengaliText,
        hasProductListings,
        hasPricing,
        hasCopiedContent
      }
    };
  } catch (error) {
    console.error(`Error analyzing ${url}:`, error);
    return null;
  }
}

/**
 * Generate a slug from a domain name
 * @param {string} domain - Domain name
 * @returns {string} - Slug for file naming
 */
function generateSlug(domain) {
  return domain
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

/**
 * Process a scam site and gather evidence
 * @param {Object} scamSite - Scam site configuration object
 * @returns {Promise<Object>} - Processed scam data
 */
async function processScamSite(scamSite) {
  const { domain, name, sitemaps } = scamSite;
  console.log(`Processing scam site: ${domain}`);
  
  const slug = generateSlug(domain);
  const scamData = {
    url: `https://${domain}`,
    name,
    slug,
    description: `This website is a fraudulent copy of our official Classy Clothes website (${OFFICIAL_URL}). It attempts to impersonate our brand and steal customer information.`,
    detectedDate: new Date().toISOString(),
    evidence: {
      screenshots: [],
      analyses: [],
      links: []
    },
    warningDetails: [
      `This fake website (${domain}) impersonates our official Classy Clothes brand.`,
      `The website uses our product images and descriptions without permission.`,
      `The checkout process may collect your personal and financial information for fraudulent purposes.`,
      `The domain name is designed to look similar to our official domain but is NOT affiliated with us.`,
      `Our only official website is ${OFFICIAL_URL}.`
    ]
  };
  
  // Process each sitemap URL
  for (const sitemapUrl of sitemaps) {
    try {
      console.log(`Scanning sitemap: ${sitemapUrl}`);
      const sitemapContent = await safeFetch(sitemapUrl);
      
      if (!sitemapContent) {
        continue; // Skip if sitemap can't be fetched
      }
      
      // Extract URLs from sitemap
      const sitemapResult = await parseSitemap(sitemapContent);
      
      if (Array.isArray(sitemapResult) && sitemapResult.length > 0) {
        if (typeof sitemapResult[0] === 'string') {
          // Handle nested sitemaps
          for (const nestedSitemapUrl of sitemapResult.slice(0, 3)) { // Limit to 3 nested sitemaps
            const nestedContent = await safeFetch(nestedSitemapUrl);
            if (nestedContent) {
              const nestedUrls = await parseSitemap(nestedContent);
              await processUrlsFromSitemap(nestedUrls, domain, scamData);
            }
          }
        } else {
          // Process URLs from regular sitemap
          await processUrlsFromSitemap(sitemapResult, domain, scamData);
        }
      }
    } catch (error) {
      console.error(`Error processing sitemap ${sitemapUrl}:`, error);
    }
  }
  
  // Capture homepage screenshot
  try {
    const screenshotPaths = await captureScreenshot(
      `https://${domain}`, 
      `${slug}-homepage.jpg`
    );
    
    if (screenshotPaths) {
      scamData.evidence.screenshots.push({
        type: 'homepage',
        label: 'Homepage',
        path: screenshotPaths.full,
        thumbnail: screenshotPaths.thumbnail
      });
    }
  } catch (error) {
    console.error(`Error capturing homepage screenshot for ${domain}:`, error);
  }
  
  // Try to capture checkout page if it exists
  try {
    const checkoutUrl = `https://${domain}/checkout/`;
    const checkoutContent = await safeFetch(checkoutUrl);
    
    if (checkoutContent) {
      const screenshotPaths = await captureScreenshot(
        checkoutUrl, 
        `${slug}-checkout.jpg`
      );
      
      if (screenshotPaths) {
        scamData.evidence.screenshots.push({
          type: 'checkout',
          label: 'Checkout Page',
          path: screenshotPaths.full,
          thumbnail: screenshotPaths.thumbnail
        });
      }
    }
  } catch (error) {
    console.error(`Error capturing checkout screenshot for ${domain}:`, error);
  }
  
  // Save the scam data to JSON
  const filePath = path.join(SCAM_DATA_DIR, `${slug}.json`);
  await writeFileAsync(filePath, JSON.stringify(scamData, null, 2), 'utf8');
  
  return scamData;
}

/**
 * Process URLs from a sitemap
 * @param {Array} urls - Array of URL objects from sitemap
 * @param {string} domain - Domain being analyzed
 * @param {Object} scamData - Scam data object to update
 */
async function processUrlsFromSitemap(urls, domain, scamData) {
  // Limit to 5 URLs for performance
  const urlsToProcess = urls.slice(0, 5);
  
  for (const urlEntry of urlsToProcess) {
    const url = typeof urlEntry === 'string' ? urlEntry : urlEntry.url;
    
    // Only process URLs from the scam domain
    if (!url.includes(domain)) continue;
    
    // Analyze the page
    const analysis = await analyzeWebpage(url, domain);
    
    if (analysis) {
      scamData.evidence.analyses.push(analysis);
      
      // If it has product listings or checkout, capture screenshot
      if (analysis.indicators.hasProductListings || analysis.indicators.hasCheckout) {
        const urlSlug = url.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        const filename = `${scamData.slug}-${urlSlug.substring(0, 30)}.jpg`;
        
        const screenshotPaths = await captureScreenshot(url, filename);
        
        if (screenshotPaths) {
          scamData.evidence.screenshots.push({
            type: 'page',
            label: analysis.title || url,
            path: screenshotPaths.full,
            thumbnail: screenshotPaths.thumbnail,
            url
          });
        }
      }
      
      // Extract more specific warning details based on analysis
      if (analysis.indicators.hasCheckout) {
        scamData.warningDetails.push(
          'The site has a checkout system that could collect your payment details.'
        );
      }
      
      if (analysis.indicators.hasBengaliText) {
        scamData.warningDetails.push(
          'The site targets Bengali-speaking customers, primarily in Bangladesh.'
        );
      }
    }
  }
  
  // Remove duplicate warnings
  scamData.warningDetails = [...new Set(scamData.warningDetails)];
}

/**
 * Update sitemap to include scam alert pages
 */
async function updateSitemap() {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get list of all scam JSON files
    const files = await fs.promises.readdir(SCAM_DATA_DIR);
    const scamFiles = files.filter(file => file.endsWith('.json'));
    
    // Create scam-specific sitemap
    let scamSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${OFFICIAL_URL}/scam</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://${OFFICIAL_URL}/verification</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://${OFFICIAL_URL}/emergency-contacts</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://${OFFICIAL_URL}/report-form</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    
    // Add each scam page to sitemap
    for (const file of scamFiles) {
      const fileContent = await readFileAsync(path.join(SCAM_DATA_DIR, file), 'utf8');
      const scamData = JSON.parse(fileContent);
      
      scamSitemapContent += `
  <url>
    <loc>https://${OFFICIAL_URL}/scam/${scamData.slug || file.replace('.json', '')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
    
    scamSitemapContent += `
</urlset>`;
    
    // Write dedicated scam sitemap
    await writeFileAsync(SCAM_SITEMAP_PATH, scamSitemapContent, 'utf8');
    console.log(`Updated scam sitemap at ${SCAM_SITEMAP_PATH}`);
    
    // Check if main sitemap exists, and if so, ensure it references the scam sitemap
    if (await existsAsync(SITEMAP_PATH)) {
      let mainSitemap = await readFileAsync(SITEMAP_PATH, 'utf8');
      
      // If it's a sitemap index, make sure it includes our scam sitemap
      if (mainSitemap.includes('<sitemapindex')) {
        if (!mainSitemap.includes('scam-sitemap.xml')) {
          // Add our scam sitemap to the index
          mainSitemap = mainSitemap.replace('</sitemapindex>', `  <sitemap>
    <loc>https://${OFFICIAL_URL}/scam-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`);
          
          await writeFileAsync(SITEMAP_PATH, mainSitemap, 'utf8');
          console.log(`Updated main sitemap index at ${SITEMAP_PATH}`);
        }
      }
    }
  } catch (error) {
    console.error('Error updating sitemaps:', error);
  }
}

/**
 * Main scanner function
 */
async function runScanner() {
  try {
    console.log('Starting Classy Clothes Scam Scanner');
    
    // Ensure necessary directories exist
    await ensureDirectories();
    
    // Process each scam site
    for (const scamSite of SCAM_SITES) {
      await processScamSite(scamSite);
    }
    
    // Update sitemaps
    await updateSitemap();
    
    console.log('Scam scanning completed successfully');
  } catch (error) {
    console.error('Error running scam scanner:', error);
  }
}

module.exports = {
  runScanner,
  processScamSite,
  safeFetch,
  parseSitemap,
  updateSitemap,
  SCAM_DATA_DIR
};

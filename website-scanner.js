// ClassyClothes Website Scanner
// This script fetches and processes data from the ClassyClothes website and detects fake sites

const https = require('https');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// Base URL for the scam website
const SCAM_BASE_URL = 'classyclothes.com.bd';
// Our official website
const OFFICIAL_URL = 'classyclothes.coupons';

// List of sitemap URLs to scan
const SITEMAP_URLS = [
  `https://${SCAM_BASE_URL}/wp-sitemap.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-post-post-1.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-posts-page-1.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-posts-blocks-.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-posts-product-1.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-posts-featured_item-1.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-taxonomies-category-1.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-taxonomies-product_cat-1.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-taxonomies-featured_item_category-1.xml`,
  `https://${SCAM_BASE_URL}/wp-sitemap-users-1.xml`
];

// Function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Function to fetch and parse XML sitemaps
async function fetchSitemap(url) {
  try {
    console.log(`Fetching sitemap: ${url}`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data, { xmlMode: true });
    
    const urls = [];
    $('url').each((i, element) => {
      const loc = $(element).find('loc').text();
      const lastmod = $(element).find('lastmod').text();
      urls.push({ url: loc, lastModified: lastmod });
    });
    
    return urls;
  } catch (error) {
    console.error(`Error fetching sitemap ${url}: ${error.message}`);
    return [];
  }
}

// Function to analyze a single URL
async function analyzeUrl(url) {
  try {
    console.log(`Analyzing: ${url}`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract page details
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const pageType = determinePageType(url, $);
    
    // Extract images for evidence
    const images = [];
    $('img').each((i, element) => {
      const src = $(element).attr('src');
      const alt = $(element).attr('alt') || '';
      if (src && !src.includes('data:image')) {
        images.push({ src, alt });
      }
    });

    // Extract structured data
    const structuredData = [];
    $('script[type="application/ld+json"]').each((i, element) => {
      try {
        const data = JSON.parse($(element).html());
        structuredData.push(data);
      } catch (e) {
        console.error(`Error parsing JSON-LD data: ${e.message}`);
      }
    });
    
    // Extract meta tags
    const metaTags = [];
    $('meta').each((i, element) => {
      const name = $(element).attr('name') || $(element).attr('property') || '';
      const content = $(element).attr('content') || '';
      if (name && content) {
        metaTags.push({ name, content });
      }
    });
    
    // Extract Open Graph tags
    const ogTags = {};
    $('meta[property^="og:"]').each((i, element) => {
      const property = $(element).attr('property');
      const content = $(element).attr('content') || '';
      if (property && content) {
        ogTags[property] = content;
      }
    });
    
    return {
      url,
      title,
      metaDescription,
      pageType,
      images,
      structuredData,
      metaTags,
      ogTags,
      html: response.data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error analyzing ${url}: ${error.message}`);
    return {
      url,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Function to determine page type
function determinePageType(url, $) {
  if (url.includes('/product/')) {
    return 'product';
  } else if (url.includes('/category/') || url.includes('/product-category/')) {
    return 'category';
  } else if (url === `https://${SCAM_BASE_URL}/` || url === `https://${SCAM_BASE_URL}`) {
    return 'homepage';
  } else if (url.includes('/blog/') || url.includes('/post/')) {
    return 'blog';
  } else if (url.includes('/about') || url.includes('/about-us')) {
    return 'about';
  } else if (url.includes('/contact')) {
    return 'contact';
  } else if (url.includes('/checkout') || url.includes('/cart')) {
    return 'checkout';
  } else {
    return 'other';
  }
}

// Function to download image for evidence
async function downloadImage(imageUrl, destination) {
  try {
    if (!imageUrl.startsWith('http')) {
      imageUrl = `https://${SCAM_BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }
    
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const dir = path.dirname(destination);
    
    if (!fs.existsSync(dir)) {
      await mkdirAsync(dir, { recursive: true });
    }
    
    await writeFileAsync(destination, response.data);
    console.log(`Image downloaded from ${imageUrl} to ${destination}`);
    return true;
  } catch (error) {
    console.error(`Error downloading image from ${imageUrl}: ${error.message}`);
    return false;
  }
}

// Main function to run the scanner
async function scanWebsite() {
  console.log('🔍 Starting Enhanced ClassyClothes Website Scanner');
  console.log('--------------------------------------------------------');
  
  try {
    // 1. Fetch and process all sitemaps
    console.log('📊 Fetching sitemaps...');
    
    let allUrls = [];
    for (const sitemapUrl of SITEMAP_URLS) {
      try {
        const urls = await fetchSitemap(sitemapUrl);
        console.log(`Found ${urls.length} URLs in sitemap: ${sitemapUrl}`);
        allUrls = [...allUrls, ...urls];
      } catch (error) {
        console.error(`Error processing sitemap ${sitemapUrl}: ${error.message}`);
      }
    }
    
    console.log(`Total unique URLs found: ${allUrls.length}`);
    console.log('--------------------------------------------------------');
    
    // 2. Analyze URLs (limit to 50 for performance)
    const urlsToAnalyze = allUrls.slice(0, 50); // Limit to prevent overload
    console.log(`Analyzing ${urlsToAnalyze.length} URLs in detail...`);
    
    const results = [];
    const resultsDir = path.join(__dirname, 'public', 'scam-data');
    const imagesDir = path.join(__dirname, 'public', 'scam-images');
    
    // Create directories if they don't exist
    if (!fs.existsSync(resultsDir)) {
      await mkdirAsync(resultsDir, { recursive: true });
    }
    if (!fs.existsSync(imagesDir)) {
      await mkdirAsync(imagesDir, { recursive: true });
    }
    
    for (let i = 0; i < urlsToAnalyze.length; i++) {
      const { url } = urlsToAnalyze[i];
      const urlData = await analyzeUrl(url);
      
      if (!urlData.error) {
        // Download a few key images as evidence (max 3 per page)
        const imgDownloads = [];
        for (let j = 0; j < Math.min(3, urlData.images.length); j++) {
          const img = urlData.images[j];
          const imgFilename = `${i}_${j}_${path.basename(img.src)}`.replace(/[^a-zA-Z0-9._-]/g, '_');
          const imgPath = path.join(imagesDir, imgFilename);
          
          const success = await downloadImage(img.src, imgPath);
          if (success) {
            imgDownloads.push({
              original: img.src,
              local: `/scam-images/${imgFilename}`,
              alt: img.alt
            });
          }
        }
        
        urlData.downloadedImages = imgDownloads;
      }
      
      // Add a slug for URL-friendly page creation
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split('/').filter(Boolean);
      const slug = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'homepage';
      urlData.slug = slug.replace(/[^a-zA-Z0-9-]/g, '-');
      
      results.push(urlData);
      
      // Save each result to individual JSON file
      const resultFilename = path.join(resultsDir, `${urlData.slug}.json`);
      await writeFileAsync(resultFilename, JSON.stringify(urlData, null, 2));
      
      console.log(`Processed ${i + 1}/${urlsToAnalyze.length}: ${url} => ${urlData.slug}`);
    }
    
    // 3. Save all results to a single file for easy access
    const allResultsPath = path.join(resultsDir, 'all-results.json');
    await writeFileAsync(allResultsPath, JSON.stringify(results, null, 2));
    
    console.log('--------------------------------------------------------');
    console.log(`✅ Scan complete! Found and analyzed ${results.length} pages.`);
    console.log(`Results saved to: ${allResultsPath}`);
    console.log('--------------------------------------------------------');
    
    return {
      scannedUrls: urlsToAnalyze.length,
      detectedPages: results.length,
      pageTypes: results.reduce((acc, r) => {
        acc[r.pageType] = (acc[r.pageType] || 0) + 1;
        return acc;
      }, {}),
      resultsPath: allResultsPath
    };
  } catch (error) {
    console.error('❌ Error scanning website:', error);
    throw error;
  }
}

// Export the main function
module.exports = { scanWebsite, analyzeUrl, fetchSitemap };

// Run the scanner if called directly
if (require.main === module) {
  scanWebsite().catch(console.error);
}

import axios from "axios"
import { load } from "cheerio"
import fs from "fs"
import path from "path"
import { type ScamSite, siteConfig } from "./seo-config"
import { generateSlug } from "./utils"

// List of sitemap URLs to scan
const SITEMAP_URLS = [
  "/wp-sitemap.xml",
  "/wp-sitemap-post-post-1.xml",
  "/wp-sitemap-posts-page-1.xml",
  "/wp-sitemap-posts-product-1.xml",
  "/wp-sitemap-posts-featured_item-1.xml",
  "/wp-sitemap-taxonomies-category-1.xml",
  "/wp-sitemap-taxonomies-product_cat-1.xml",
  "/wp-sitemap-taxonomies-featured_item_category-1.xml",
  "/wp-sitemap-users-1.xml",
]

// Function to fetch and parse XML sitemap
async function fetchSitemap(url: string): Promise<string[]> {
  try {
    console.log(`Fetching sitemap from ${url}`)
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ClassyClothesBot/1.0; +https://classyclothes.coupons/bot)",
      },
      timeout: 10000,
    })
    const $ = load(response.data, { xmlMode: true })

    const urls: string[] = []

    // Handle both sitemap index and regular sitemaps
    if ($("sitemapindex").length > 0) {
      $("sitemap > loc").each((_, element) => {
        urls.push($(element).text())
      })
    } else {
      $("url > loc").each((_, element) => {
        urls.push($(element).text())
      })
    }

    console.log(`Found ${urls.length} URLs in sitemap ${url}`)
    return urls
  } catch (error) {
    console.error(`Error fetching sitemap from ${url}:`, error)
    return []
  }
}

// Function to check if a URL is from a known scam site
function isScamSite(url: string): boolean {
  return siteConfig.scamSites.some((site) => url.includes(new URL(site.url).hostname))
}

// Function to fetch and analyze a webpage
async function analyzeWebpage(url: string): Promise<{
  title: string
  description: string
  images: string[]
  content: string
  html: string
  structuredData: any[]
  metaTags: Record<string, string>
  links: string[]
  headers: Record<string, string>
}> {
  try {
    console.log(`Analyzing webpage ${url}`)
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ClassyClothesBot/1.0; +https://classyclothes.coupons/bot)",
      },
      timeout: 15000,
    })
    const $ = load(response.data)

    const title = $("title").text()
    const description = $('meta[name="description"]').attr("content") || ""

    // Extract images
    const images: string[] = []
    $("img").each((_, element) => {
      const src = $(element).attr("src")
      if (src) {
        // Convert relative URLs to absolute
        const absoluteSrc = new URL(src, url).href
        images.push(absoluteSrc)
      }
    })

    // Extract links
    const links: string[] = []
    $("a").each((_, element) => {
      const href = $(element).attr("href")
      if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
        // Convert relative URLs to absolute
        try {
          const absoluteHref = new URL(href, url).href
          links.push(absoluteHref)
        } catch (e) {
          // Invalid URL, skip
        }
      }
    })

    // Extract structured data
    const structuredData: any[] = []
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const data = JSON.parse($(element).html() || "{}")
        structuredData.push(data)
      } catch (e) {
        console.error(`Error parsing JSON-LD: ${e}`)
      }
    })

    // Extract meta tags
    const metaTags: Record<string, string> = {}
    $("meta").each((_, element) => {
      const name = $(element).attr("name") || $(element).attr("property")
      const content = $(element).attr("content")
      if (name && content) {
        metaTags[name] = content
      }
    })

    // Extract main content
    const content = $("body").text().replace(/\s+/g, " ").trim()

    // Get HTML
    const html = response.data

    // Get response headers
    const headers = response.headers as Record<string, string>

    return {
      title,
      description,
      images,
      content,
      html,
      structuredData,
      metaTags,
      links,
      headers,
    }
  } catch (error) {
    console.error(`Error analyzing webpage ${url}:`, error)
    return {
      title: "",
      description: "",
      images: [],
      content: "",
      html: "",
      structuredData: [],
      metaTags: {},
      links: [],
      headers: {},
    }
  }
}

// Function to compare content with our original site
async function detectCopiedContent(scamUrl: string): Promise<
  {
    type: string
    originalUrl: string
    fakeUrl: string
    description: string
    similarity?: number
    evidence?: string
  }[]
> {
  const copiedContent: {
    type: string
    originalUrl: string
    fakeUrl: string
    description: string
    similarity?: number
    evidence?: string
  }[] = []

  try {
    // Analyze the scam page
    const scamPageData = await analyzeWebpage(scamUrl)

    // Compare with our homepage
    const ourHomepage = await analyzeWebpage(siteConfig.url)

    // Check for title similarity
    if (scamPageData.title.includes(siteConfig.name) || ourHomepage.title.includes(scamPageData.title)) {
      copiedContent.push({
        type: "title",
        originalUrl: siteConfig.url,
        fakeUrl: scamUrl,
        description: `The fake site is using our brand name "${siteConfig.name}" in their page title.`,
        evidence: scamPageData.title,
      })
    }

    // Check for description similarity
    if (
      scamPageData.description &&
      ourHomepage.description &&
      (scamPageData.description.includes(ourHomepage.description) ||
        ourHomepage.description.includes(scamPageData.description))
    ) {
      copiedContent.push({
        type: "meta_description",
        originalUrl: siteConfig.url,
        fakeUrl: scamUrl,
        description: "The fake site is copying our meta description.",
        evidence: scamPageData.description,
      })
    }

    // Check for content similarity (this is a simple check, could be improved)
    const contentSimilarity = calculateSimilarity(scamPageData.content, ourHomepage.content)
    if (contentSimilarity > 0.4) {
      // If more than 40% similar
      copiedContent.push({
        type: "content",
        originalUrl: siteConfig.url,
        fakeUrl: scamUrl,
        description: `The fake site has ${Math.round(contentSimilarity * 100)}% similar content to our homepage.`,
        similarity: contentSimilarity,
      })
    }

    // Check for image similarity
    const imageOverlap = scamPageData.images.filter((img) =>
      ourHomepage.images.some(
        (ourImg) => img.includes(new URL(ourImg).pathname) || ourImg.includes(new URL(img).pathname),
      ),
    )

    if (imageOverlap.length > 0) {
      copiedContent.push({
        type: "images",
        originalUrl: siteConfig.url,
        fakeUrl: scamUrl,
        description: `The fake site is using ${imageOverlap.length} images from our website.`,
        evidence: imageOverlap.join(", "),
      })
    }

    // Check for structured data copying
    if (scamPageData.structuredData.length > 0 && ourHomepage.structuredData.length > 0) {
      const structuredDataSimilarity = calculateStructuredDataSimilarity(
        scamPageData.structuredData,
        ourHomepage.structuredData,
      )

      if (structuredDataSimilarity > 0.5) {
        copiedContent.push({
          type: "structured_data",
          originalUrl: siteConfig.url,
          fakeUrl: scamUrl,
          description: `The fake site has similar JSON-LD structured data to our website.`,
          similarity: structuredDataSimilarity,
        })
      }
    }

    return copiedContent
  } catch (error) {
    console.error(`Error detecting copied content for ${scamUrl}:`, error)
    return []
  }
}

// Function to calculate structured data similarity
function calculateStructuredDataSimilarity(data1: any[], data2: any[]): number {
  if (data1.length === 0 || data2.length === 0) return 0

  // Convert to strings for comparison
  const str1 = JSON.stringify(data1)
  const str2 = JSON.stringify(data2)

  return calculateSimilarity(str1, str2)
}

// Simple function to calculate text similarity (Jaccard similarity)
function calculateSimilarity(text1: string, text2: string): number {
  if (!text1 || !text2) return 0

  const words1 = new Set(text1.toLowerCase().split(/\s+/).filter(Boolean))
  const words2 = new Set(text2.toLowerCase().split(/\s+/).filter(Boolean))

  if (words1.size === 0 || words2.size === 0) return 0

  const intersection = new Set([...words1].filter((word) => words2.has(word)))
  const union = new Set([...words1, ...words2])

  return intersection.size / union.size
}

// Function to take a screenshot of a webpage
async function takeScreenshot(url: string, outputPath: string): Promise<string | null> {
  try {
    // This would typically use Puppeteer or a similar library
    // For this example, we'll just return a placeholder
    console.log(`Taking screenshot of ${url} and saving to ${outputPath}`)

    // Create the directory if it doesn't exist
    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // In a real implementation, you would use Puppeteer like this:
    /*
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: outputPath });
    await browser.close();
    */

    // For now, return a placeholder path
    const relativePath = path.relative(path.join(process.cwd(), "public"), outputPath)
    return "/" + relativePath.replace(/\\/g, "/")
  } catch (error) {
    console.error(`Error taking screenshot of ${url}:`, error)
    return null
  }
}

// Function to download an image
async function downloadImage(url: string, outputPath: string): Promise<string | null> {
  try {
    console.log(`Downloading image from ${url} to ${outputPath}`)

    // Create the directory if it doesn't exist
    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ClassyClothesBot/1.0; +https://classyclothes.coupons/bot)",
      },
    })

    const writer = fs.createWriteStream(outputPath)
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        const relativePath = path.relative(path.join(process.cwd(), "public"), outputPath)
        resolve("/" + relativePath.replace(/\\/g, "/"))
      })
      writer.on("error", reject)
    })
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error)
    return null
  }
}

// Main function to scan for scam sites
export async function scanForScamSites(): Promise<ScamSite[]> {
  const scamSites: ScamSite[] = []

  // Start with known scam sites from config
  for (const knownScam of siteConfig.scamSites) {
    try {
      console.log(`Scanning known scam site: ${knownScam.url}`)

      // Fetch all sitemaps from the known scam site
      let allScamUrls: string[] = []

      for (const sitemapPath of SITEMAP_URLS) {
        const scamSitemapUrl = `${knownScam.url}${sitemapPath}`
        const urls = await fetchSitemap(scamSitemapUrl)
        allScamUrls = [...allScamUrls, ...urls]
      }

      // Remove duplicates
      allScamUrls = [...new Set(allScamUrls)]

      console.log(`Found ${allScamUrls.length} unique URLs from all sitemaps`)

      // Analyze the homepage of the scam site
      const scamHomepage = await analyzeWebpage(knownScam.url)

      // Take a screenshot
      const screenshotDir = path.join(process.cwd(), "public", "images", "scam-sites")
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true })
      }

      const screenshotPath = path.join(screenshotDir, `${generateSlug(knownScam.url)}.jpg`)
      const screenshotUrl = await takeScreenshot(knownScam.url, screenshotPath)

      // Detect copied content
      const copiedContent = await detectCopiedContent(knownScam.url)

      // Download a sample of images for evidence
      const imageDir = path.join(process.cwd(), "public", "images", "scam-sites", "evidence")
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true })
      }

      const downloadedImages: string[] = []

      // Download up to 5 images
      for (let i = 0; i < Math.min(5, scamHomepage.images.length); i++) {
        const imageUrl = scamHomepage.images[i]
        const imageName = `${generateSlug(knownScam.url)}-image-${i}${path.extname(imageUrl) || ".jpg"}`
        const imagePath = path.join(imageDir, imageName)

        const downloadedUrl = await downloadImage(imageUrl, imagePath)
        if (downloadedUrl) {
          downloadedImages.push(downloadedUrl)
        }
      }

      // Add to scam sites list
      scamSites.push({
        url: knownScam.url,
        title: scamHomepage.title,
        description: knownScam.description,
        detectedDate: new Date().toISOString(),
        screenshots: screenshotUrl ? [screenshotUrl] : [],
        images: downloadedImages,
        copiedContent,
        metaTags: scamHomepage.metaTags,
        structuredData: scamHomepage.structuredData,
      })

      // Analyze a sample of pages from the scam site (limit to 20 for performance)
      const pagesToAnalyze = Math.min(20, allScamUrls.length)
      console.log(`Analyzing ${pagesToAnalyze} pages from the scam site`)

      for (let i = 0; i < pagesToAnalyze; i++) {
        const pageUrl = allScamUrls[i]
        console.log(`Analyzing page ${i + 1}/${pagesToAnalyze}: ${pageUrl}`)

        const copiedContent = await detectCopiedContent(pageUrl)

        if (copiedContent.length > 0) {
          // This page has copied content, add it to our list
          const pageData = await analyzeWebpage(pageUrl)

          const screenshotPath = path.join(screenshotDir, `${generateSlug(pageUrl)}.jpg`)
          const screenshotUrl = await takeScreenshot(pageUrl, screenshotPath)

          // Download a sample of images for evidence
          const downloadedImages: string[] = []

          // Download up to 3 images
          for (let j = 0; j < Math.min(3, pageData.images.length); j++) {
            const imageUrl = pageData.images[j]
            const imageName = `${generateSlug(pageUrl)}-image-${j}${path.extname(imageUrl) || ".jpg"}`
            const imagePath = path.join(imageDir, imageName)

            const downloadedUrl = await downloadImage(imageUrl, imagePath)
            if (downloadedUrl) {
              downloadedImages.push(downloadedUrl)
            }
          }

          // Extract page type from URL
          const pageType = getPageTypeFromUrl(pageUrl)

          scamSites.push({
            url: pageUrl,
            title: pageData.title,
            description: `This ${pageType} page on ${knownScam.url} is copying content from our website.`,
            detectedDate: new Date().toISOString(),
            screenshots: screenshotUrl ? [screenshotUrl] : [],
            images: downloadedImages,
            copiedContent,
            pageType,
            metaTags: pageData.metaTags,
            structuredData: pageData.structuredData,
          })
        }
      }
    } catch (error) {
      console.error(`Error scanning known scam site ${knownScam.url}:`, error)
    }
  }

  // Save the scam sites data to a JSON file
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  fs.writeFileSync(path.join(dataDir, "scam-sites.json"), JSON.stringify(scamSites, null, 2))

  // Generate scam pages
  await generateScamPages(scamSites)

  return scamSites
}

// Function to get page type from URL
function getPageTypeFromUrl(url: string): string {
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split("/").filter(Boolean)

  if (pathParts.length === 0) {
    return "homepage"
  }

  if (pathParts[0] === "product") {
    return "product"
  }

  if (pathParts[0] === "category") {
    return "category"
  }

  if (pathParts[0] === "tag") {
    return "tag"
  }

  if (pathParts[0] === "shop") {
    return "shop"
  }

  if (pathParts[0] === "blog" || pathParts[0] === "news") {
    return "blog"
  }

  if (pathParts[0] === "about" || pathParts[0] === "contact") {
    return "info"
  }

  return "page"
}

// Function to generate scam pages
async function generateScamPages(scamSites: ScamSite[]): Promise<void> {
  const scamPagesDir = path.join(process.cwd(), "pages", "scam")

  // Create the directory if it doesn't exist
  if (!fs.existsSync(scamPagesDir)) {
    fs.mkdirSync(scamPagesDir, { recursive: true })
  }

  // Create a dynamic page for each scam site
  for (const site of scamSites) {
    const slug = generateSlug(site.url)
    const pageContent = `
import { GetStaticProps } from 'next'
import { ScamSiteDetail } from '@/components/scam-site-detail'
import { SEO } from '@/components/seo'
import { JsonLd } from '@/lib/json-ld'
import { generateScamAlertSchema } from '@/lib/json-ld'
import { ScamSite } from '@/lib/seo-config'

export default function ScamSitePage({ scamSite }: { scamSite: ScamSite }) {
  return (
    <>
      <SEO
        title={\`Warning: \${scamSite.url} is a Fake Website\`}
        description={\`Warning: \${scamSite.url} is a fake website copying content from the official Classy Clothes website. Learn how to identify and avoid this scam.\`}
        ogType="article"
        noindex={false}
      />
      <JsonLd
        data={generateScamAlertSchema({
          url: scamSite.url,
          name: scamSite.title || 'Fake Classy Clothes Website',
          description: scamSite.description,
          detectedDate: scamSite.detectedDate || new Date().toISOString(),
        })}
      />
      <ScamSiteDetail scamSite={scamSite} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // In a real implementation, you would fetch this from your database or API
  const scamSite: ScamSite = ${JSON.stringify(site, null, 2)}
  
  return {
    props: {
      scamSite,
    },
    // Revalidate every day
    revalidate: 86400,
  }
}
`

    fs.writeFileSync(path.join(scamPagesDir, `${slug}.tsx`), pageContent)
  }

  // Create the dynamic [slug].tsx page for handling any scam site
  const dynamicPageContent = `
import { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import { ScamSiteDetail } from '@/components/scam-site-detail'
import { SEO } from '@/components/seo'
import { JsonLd } from '@/lib/json-ld'
import { generateScamAlertSchema } from '@/lib/json-ld'
import { ScamSite } from '@/lib/seo-config'
import { generateSlug } from '@/lib/utils'

export default function ScamSitePage({ scamSite }: { scamSite: ScamSite }) {
  if (!scamSite) {
    return <div>Scam site not found</div>
  }
  
  return (
    <>
      <SEO
        title={\`Warning: \${scamSite.url} is a Fake Website\`}
        description={\`Warning: \${scamSite.url} is a fake website copying content from the official Classy Clothes website. Learn how to identify and avoid this scam.\`}
        ogType="article"
        noindex={false}
      />
      <JsonLd
        data={generateScamAlertSchema({
          url: scamSite.url,
          name: scamSite.title || 'Fake Classy Clothes Website',
          description: scamSite.description,
          detectedDate: scamSite.detectedDate || new Date().toISOString(),
        })}
      />
      <ScamSiteDetail scamSite={scamSite} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string
    
    // Read the scam sites data
    const dataPath = path.join(process.cwd(), 'data', 'scam-sites.json')
    const scamSitesData = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as ScamSite[]
    
    // Find the scam site with the matching slug
    const scamSite = scamSitesData.find(site => generateSlug(site.url) === slug)
    
    if (!scamSite) {
      return {
        notFound: true,
      }
    }
    
    return {
      props: {
        scamSite,
      },
      // Revalidate every day
      revalidate: 86400,
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Read the scam sites data
    const dataPath = path.join(process.cwd(), 'data', 'scam-sites.json')
    const scamSitesData = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as ScamSite[]
    
    // Generate paths for each scam site
    const paths = scamSitesData.map(site => ({
      params: { slug: generateSlug(site.url) },
    }))
    
    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}
`

  fs.writeFileSync(path.join(scamPagesDir, "[slug].tsx"), dynamicPageContent)
}


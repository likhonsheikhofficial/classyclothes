import fs from "fs"
import path from "path"
import { globby } from "globby"
import prettier from "prettier"
import { siteConfig } from "./seo-config"
import { generateSlug } from "./utils"

export async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js")

  // Get all pages except for API routes, _* files, and scam pages (we'll add these separately)
  const pages = await globby([
    "pages/**/*.tsx",
    "pages/**/*.ts",
    "pages/**/*.js",
    "pages/**/*.jsx",
    "!pages/_*.tsx",
    "!pages/_*.ts",
    "!pages/_*.js",
    "!pages/_*.jsx",
    "!pages/api",
    "!pages/scam/[slug].tsx",
  ])

  // Get all scam pages
  const scamPages = await globby(["pages/scam/*.tsx", "pages/scam/*.ts", "pages/scam/*.js", "pages/scam/*.jsx"])

  // Get all product pages
  const productPages = await globby([
    "pages/product/*.tsx",
    "pages/product/*.ts",
    "pages/product/*.js",
    "pages/product/*.jsx",
  ])

  // Get all category pages
  const categoryPages = await globby([
    "pages/category/*.tsx",
    "pages/category/*.ts",
    "pages/category/*.js",
    "pages/category/*.jsx",
  ])

  // Create sitemap entries for regular pages
  const pageEntries = pages
    .map((page) => {
      const route = page
        .replace("pages", "")
        .replace(/\.(tsx|ts|js|jsx)$/, "")
        .replace(/\/index$/, "")

      // Skip scam pages as we'll handle them separately
      if (route.startsWith("/scam/")) return null

      // Determine priority and change frequency based on page type
      let priority = "0.7"
      let changefreq = "weekly"

      if (route === "" || route === "/") {
        priority = "1.0"
        changefreq = "daily"
      } else if (route.startsWith("/product/")) {
        priority = "0.8"
        changefreq = "daily"
      } else if (route.startsWith("/category/")) {
        priority = "0.8"
        changefreq = "weekly"
      } else if (route === "/shop" || route === "/categories") {
        priority = "0.9"
        changefreq = "daily"
      } else if (route === "/emergency-contacts" || route === "/government-services") {
        priority = "0.6"
        changefreq = "monthly"
      }

      return `
      <url>
        <loc>${siteConfig.url}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `
    })
    .filter(Boolean)

  // Create sitemap entries for scam pages
  const scamEntries = []

  // First, add the main scam index page
  scamEntries.push(`
    <url>
      <loc>${siteConfig.url}/scam</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.6</priority>
    </url>
  `)

  // Add emergency contacts and government services pages
  scamEntries.push(`
    <url>
      <loc>${siteConfig.url}/emergency-contacts</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `)

  scamEntries.push(`
    <url>
      <loc>${siteConfig.url}/government-services</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `)

  // Then add individual scam pages
  try {
    // Read the scam sites data if available
    const dataPath = path.join(process.cwd(), "data", "scam-sites.json")
    if (fs.existsSync(dataPath)) {
      const scamSitesData = JSON.parse(fs.readFileSync(dataPath, "utf8"))

      // Add an entry for each scam site
      scamSitesData.forEach((site) => {
        const slug = generateSlug(site.url)
        scamEntries.push(`
          <url>
            <loc>${siteConfig.url}/scam/${slug}</loc>
            <lastmod>${site.detectedDate || new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>
          </url>
        `)
      })
    }
  } catch (error) {
    console.error("Error reading scam sites data:", error)
  }

  // Also add static scam pages from the filesystem
  scamPages.forEach((page) => {
    // Skip the [slug].tsx dynamic page and index.tsx
    if (page.includes("[slug]") || page.includes("index.")) return

    const route = page.replace("pages", "").replace(/\.(tsx|ts|js|jsx)$/, "")

    scamEntries.push(`
      <url>
        <loc>${siteConfig.url}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    `)
  })

  // Combine all entries
  const allEntries = [...pageEntries, ...scamEntries]

  // Generate sitemap XML
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allEntries.join("")}
    </urlset>
  `

  // Format the XML
  const formattedSitemap = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  })

  // Write the sitemap to the public directory
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), formattedSitemap)

  // Generate robots.txt
  const robotsTxt = `
    User-agent: *
    Allow: /
    
    # Allow scam alert pages to be indexed
    Allow: /scam/
    
    # Disallow API routes from being indexed by search engines
    Disallow: /api/
    
    # Sitemap
    Sitemap: ${siteConfig.url}/sitemap.xml
    
    # Host
    Host: classyclothes.coupons
  `

  // Write robots.txt to the public directory
  fs.writeFileSync(path.join(process.cwd(), "public", "robots.txt"), robotsTxt.trim())

  console.log("Sitemap and robots.txt generated successfully!")
}


import { scanForScamSites } from "../lib/scam-scanner"
import { generateSitemap } from "../lib/sitemap-generator"

async function main() {
  console.log("Starting scam site scanner...")
  console.log("----------------------------------------")
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log("----------------------------------------")

  try {
    // Scan for scam sites
    const scamSites = await scanForScamSites()
    console.log(`Found ${scamSites.length} scam sites`)

    // Generate sitemap
    await generateSitemap()
    console.log("Sitemap generated successfully")

    console.log("----------------------------------------")
    console.log("Scan completed successfully")
    console.log("----------------------------------------")
  } catch (error) {
    console.error("Error scanning scam sites:", error)
    process.exit(1)
  }
}

main()


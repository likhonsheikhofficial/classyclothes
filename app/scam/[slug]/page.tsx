import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Shield, AlertTriangle, Check, ExternalLink, Calendar, Clock, Image as ImageIcon, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { JsonLd, generateScamAlertSchema } from "@/lib/json-ld"

interface ScamSiteDetails {
  url: string
  name: string
  slug: string
  description: string
  detectedDate: string
  evidence: {
    screenshots: string[]
    links: string[]
  }
  warningDetails: string[]
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const scamDetails = await getScamDetailsBySlug(params.slug)
    
    return {
      title: `Warning: ${scamDetails.name} is a FAKE Website | Classy Clothes`,
      description: `Warning: ${scamDetails.name} is a fake website impersonating Classy Clothes. Learn how to identify and avoid this scam site.`,
      openGraph: {
        title: `Warning: ${scamDetails.name} is a FAKE Website | Classy Clothes`,
        description: `Warning: ${scamDetails.name} is a fake website impersonating Classy Clothes. Learn how to identify and avoid this scam site.`,
        url: `https://classyclothes.coupons/scam/${params.slug}`,
        type: "website",
      },
    }
  } catch (error) {
    return {
      title: "Scam Website Warning | Classy Clothes",
      description: "Information about fake websites impersonating Classy Clothes.",
    }
  }
}

// Generate static params for build time
export async function generateStaticParams() {
  const scamsDirectory = path.join(process.cwd(), "data/scams")
  
  try {
    if (!fs.existsSync(scamsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(scamsDirectory)
    const jsonFiles = fileNames.filter(filename => filename.endsWith(".json"))
    
    return jsonFiles.map(filename => ({
      slug: filename.replace(/\.json$/, "")
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Get scam details by slug
async function getScamDetailsBySlug(slug: string): Promise<ScamSiteDetails> {
  try {
    const scamsDirectory = path.join(process.cwd(), "data/scams")
    const filePath = path.join(scamsDirectory, `${slug}.json`)
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Scam site with slug ${slug} not found`)
    }
    
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error loading scam details for ${slug}:`, error)
    throw error
  }
}

export default async function ScamPage({ params }: { params: { slug: string } }) {
  try {
    const scamDetails = await getScamDetailsBySlug(params.slug)
    const jsonLdData = generateScamAlertSchema({
      url: scamDetails.url,
      name: scamDetails.name,
      description: scamDetails.description,
      detectedDate: scamDetails.detectedDate,
      evidenceLinks: scamDetails.evidence.links,
      screenshots: scamDetails.evidence.screenshots.map(
        screenshot => `https://classyclothes.coupons/images/scam-evidence/${screenshot}`
      )
    })

    return (
      <div className="container px-4 py-8 max-w-5xl mx-auto">
        <JsonLd data={jsonLdData} />
        
        {/* Navigation */}
        <Link href="/scam" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to All Scam Websites
        </Link>
        
        {/* Alert Banner */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
            <div>
              <h1 className="text-2xl font-bold text-red-800">Warning: Fake Website Alert</h1>
              <p className="text-red-700 mt-1">
                <span className="font-bold">{scamDetails.url}</span> is a FAKE website impersonating the official Classy Clothes website.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About this Fake Website</h2>
              <p className="text-gray-700 mb-4">{scamDetails.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Detected on: {new Date(scamDetails.detectedDate).toLocaleDateString()}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Warning Signs:</h3>
                <ul className="space-y-3">
                  {scamDetails.warningDetails.map((warning, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Screenshots */}
            {scamDetails.evidence.screenshots.length > 0 && (
              <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Evidence Screenshots
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scamDetails.evidence.screenshots.map((screenshot, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 p-2 text-xs text-gray-600 font-medium">
                        Evidence Screenshot #{index + 1}
                      </div>
                      <div className="relative h-[250px] w-full">
                        <Image 
                          src={`/images/scam-evidence/${screenshot}`}
                          alt={`Screenshot of fake website ${scamDetails.name}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="bg-gray-50 p-2 text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Captured on {new Date(scamDetails.detectedDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evidence Links */}
            {scamDetails.evidence.links.length > 0 && (
              <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-gray-600" />
                  Additional Evidence
                </h2>
                <ul className="space-y-2">
                  {scamDetails.evidence.links.map((link, index) => (
                    <li key={index} className="flex items-center">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {/* Verification Box */}
            <div className="bg-green-50 border border-green-200 rounded-lg shadow-sm p-5 mb-6">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold text-green-800">Our Official Website</h2>
              </div>
              <div className="bg-white border border-green-100 rounded-md p-3 mb-4 flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium">classyclothes.coupons</span>
              </div>
              <p className="text-sm text-green-700 mb-4">
                Always check that you are on our official website before making any purchases or entering personal information.
              </p>
              <Link 
                href="/verification"
                className="inline-flex items-center w-full justify-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Shield className="h-4 w-4 mr-2" />
                How to Verify Our Website
              </Link>
            </div>

            {/* How to Stay Safe */}
            <div className="bg-white border rounded-lg shadow-sm p-5 mb-6">
              <h2 className="text-lg font-semibold mb-4">How to Stay Safe Online</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                  <span className="text-sm text-gray-700">Always check the URL in your browser's address bar</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                  <span className="text-sm text-gray-700">Look for HTTPS and a padlock icon in the address bar</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                  <span className="text-sm text-gray-700">Be cautious of websites with unusually low prices</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                  <span className="text-sm text-gray-700">Check for poor grammar, spelling, or unprofessional design</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                  <span className="text-sm text-gray-700">Verify contact information and customer service options</span>
                </li>
              </ul>
            </div>

            {/* Report Button */}
            <div className="bg-white border rounded-lg shadow-sm p-5 mb-6">
              <h2 className="text-lg font-semibold mb-4">Report Suspicious Websites</h2>
              <p className="text-sm text-gray-700 mb-4">
                If you encounter another fake website impersonating Classy Clothes, please report it to us immediately.
              </p>
              <Link 
                href="/emergency-contacts"
                className="inline-flex items-center w-full justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Report a Fake Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
}

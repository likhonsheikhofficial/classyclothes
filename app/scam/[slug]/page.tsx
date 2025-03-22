import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Shield, AlertTriangle, ExternalLink, Calendar, ArrowLeft, Globe, Image as ImageIcon } from "lucide-react"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { SiteVerification } from "@/components/site-verification"
import { JsonLd } from "@/lib/json-ld"
import { generateScamAlertSchema } from "@/lib/advanced-seo"

interface ScamSiteDetails {
  url: string
  name: string
  slug: string
  description: string
  detectedDate: string
  evidence: {
    screenshots: Array<{
      type: string
      label: string
      path: string
      thumbnail: string
      url?: string
    }>
    analyses: Array<{
      url: string
      title: string
      description: string
      indicators: {
        hasCheckout: boolean
        hasPaymentSystem: boolean
        hasBengaliText: boolean
        hasProductListings: boolean
        hasPricing: boolean
        hasCopiedContent: boolean
      }
    }>
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
        images: scamDetails.evidence.screenshots && scamDetails.evidence.screenshots.length > 0
          ? [{ url: `https://classyclothes.coupons${scamDetails.evidence.screenshots[0].path}` }]
          : undefined
      },
    }
  } catch (error) {
    return {
      title: "Scam Alert | Classy Clothes",
      description: "Warning about fake websites impersonating Classy Clothes.",
    }
  }
}

// Generate static params for build time
export async function generateStaticParams() {
  try {
    const scamsDirectory = path.join(process.cwd(), "data/scams")
    
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
    const filePath = path.join(process.cwd(), "data/scams", `${slug}.json`)
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Scam with slug ${slug} not found`)
    }
    
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)
    
    return {
      ...data,
      slug: slug
    }
  } catch (error) {
    console.error(`Error fetching scam details for ${slug}:`, error)
    throw error
  }
}

export default async function ScamPage({ params }: { params: { slug: string } }) {
  try {
    const scamDetails = await getScamDetailsBySlug(params.slug)
    const detectedDate = new Date(scamDetails.detectedDate).toLocaleDateString()
    
    return (
      <div className="container px-4 py-8 max-w-5xl mx-auto">
        <Link href="/scam" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Scam Alerts
        </Link>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
            <div>
              <h1 className="text-2xl font-bold text-red-800 mb-1">{scamDetails.name} - FAKE WEBSITE</h1>
              <p className="text-red-700">
                This is NOT the official Classy Clothes website. This is a scam website designed to steal your information.
              </p>
            </div>
          </div>
        </div>
        
        <SiteVerification />
        
        <JsonLd>
          {generateScamAlertSchema(scamDetails.url.replace(/^https?:\/\//, ''))}
        </JsonLd>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">About This Fake Website</h2>
              
              <div className="flex items-center mb-4 text-gray-700">
                <Globe className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <div className="font-medium">Fake Website URL:</div>
                  <div className="text-red-600 font-mono text-sm break-all">{scamDetails.url}</div>
                </div>
              </div>
              
              <div className="flex items-center mb-6 text-gray-700">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <div className="font-medium">Detected:</div>
                  <div>{detectedDate}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Description:</h3>
                <p className="text-gray-700">{scamDetails.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Warning Signs:</h3>
                <ul className="space-y-2">
                  {scamDetails.warningDetails.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Screenshot Evidence */}
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-gray-500" />
                Visual Evidence
              </h2>
              
              {scamDetails.evidence.screenshots && scamDetails.evidence.screenshots.length > 0 ? (
                <div className="space-y-6">
                  {scamDetails.evidence.screenshots.map((screenshot, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <h3 className="font-medium">{screenshot.label || `Screenshot ${index + 1}`}</h3>
                        {screenshot.url && (
                          <div className="text-xs text-gray-500 mt-1">
                            URL: {screenshot.url}
                          </div>
                        )}
                      </div>
                      <div className="relative aspect-video bg-gray-100">
                        <Image
                          src={screenshot.path}
                          alt={`Screenshot of ${scamDetails.name}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No screenshots available.</p>
              )}
            </div>
            
            {/* Technical Analysis */}
            {scamDetails.evidence.analyses && scamDetails.evidence.analyses.length > 0 && (
              <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Technical Analysis</h2>
                
                <div className="space-y-4">
                  {scamDetails.evidence.analyses.map((analysis, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium mb-2">{analysis.title || analysis.url}</h3>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="text-xs bg-red-50 text-red-700 rounded px-2 py-1 flex items-center">
                          {analysis.indicators.hasCheckout ? (
                            <span className="rounded-full bg-red-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-red-700" />
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-gray-400" />
                            </span>
                          )}
                          Checkout System
                        </div>
                        
                        <div className="text-xs bg-red-50 text-red-700 rounded px-2 py-1 flex items-center">
                          {analysis.indicators.hasPaymentSystem ? (
                            <span className="rounded-full bg-red-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-red-700" />
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-gray-400" />
                            </span>
                          )}
                          Payment System
                        </div>
                        
                        <div className="text-xs bg-red-50 text-red-700 rounded px-2 py-1 flex items-center">
                          {analysis.indicators.hasBengaliText ? (
                            <span className="rounded-full bg-red-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-red-700" />
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-gray-400" />
                            </span>
                          )}
                          Bengali Text
                        </div>
                        
                        <div className="text-xs bg-red-50 text-red-700 rounded px-2 py-1 flex items-center">
                          {analysis.indicators.hasCopiedContent ? (
                            <span className="rounded-full bg-red-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-red-700" />
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-200 p-0.5 mr-1">
                              <AlertTriangle className="h-3 w-3 text-gray-400" />
                            </span>
                          )}
                          Copied Content
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <div className="font-medium mb-1">Page URL:</div>
                        <div className="break-all">{analysis.url}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Stay Protected</h2>
              <p className="text-gray-700 mb-6">
                Please remember that our only official website is <strong>classyclothes.coupons</strong>. 
                Always verify you are on the correct website before making any purchases.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-4">
                <div className="flex">
                  <Shield className="h-6 w-6 text-green-600 mr-2" />
                  <div>
                    <h3 className="font-semibold text-green-800">Our Official Website</h3>
                    <Link 
                      href="/"
                      className="text-green-700 underline"
                    >
                      classyclothes.coupons
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-3 text-blue-800">Verify Our Website</h2>
              <p className="text-blue-700 text-sm mb-4">
                Always ensure you're on our official website before sharing any personal or payment information.
              </p>
              <Link 
                href="/verification"
                className="inline-flex items-center w-full justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Shield className="h-4 w-4 mr-2" />
                How to Verify
              </Link>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="font-semibold mb-3 text-red-800">Report Another Fake Site</h2>
              <p className="text-red-700 text-sm mb-4">
                Found another website impersonating Classy Clothes? Report it immediately to help protect others.
              </p>
              <Link 
                href="/report-form"
                className="inline-flex items-center w-full justify-center py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report a Scam
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

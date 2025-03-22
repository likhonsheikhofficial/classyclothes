import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Shield, AlertTriangle, ExternalLink, Calendar, Globe, Clock } from "lucide-react"
import fs from "fs"
import path from "path"
import { JsonLd, generateScamIndexSchema } from "@/lib/json-ld"
import { SiteVerification } from "@/components/site-verification"

export const metadata: Metadata = {
  title: "Scam Alert: List of Fake Websites | Classy Clothes",
  description: "List of fake websites impersonating Classy Clothes. Learn how to identify and avoid scam websites that copy our content.",
  openGraph: {
    title: "Scam Alert: List of Fake Websites | Classy Clothes",
    description: "List of fake websites impersonating Classy Clothes. Learn how to identify and avoid scam websites that copy our content.",
    url: "https://classyclothes.coupons/scam",
    type: "website",
  },
}

interface ScamSite {
  url: string
  name: string
  slug: string
  description: string
  detectedDate: string
  evidence: {
    screenshots: string[]
    links: string[]
  }
}

async function getScamSites(): Promise<ScamSite[]> {
  try {
    const scamsDirectory = path.join(process.cwd(), "data/scams")
    
    if (!fs.existsSync(scamsDirectory)) {
      return []
    }
    
    const fileNames = fs.readdirSync(scamsDirectory)
    const jsonFiles = fileNames.filter(filename => filename.endsWith(".json"))
    
    const allScamSites = jsonFiles.map(filename => {
      const filePath = path.join(scamsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const data = JSON.parse(fileContents)
      
      return {
        ...data,
        slug: filename.replace(/\.json$/, "")
      }
    })
    
    // Sort by detected date, newest first
    return allScamSites.sort((a, b) => 
      new Date(b.detectedDate).getTime() - new Date(a.detectedDate).getTime()
    )
  } catch (error) {
    console.error("Error fetching scam sites:", error)
    return []
  }
}

export default async function ScamIndexPage() {
  const scamSites = await getScamSites()
  const jsonLdData = generateScamIndexSchema(scamSites.map(site => ({
    url: site.url,
    name: site.name,
    description: site.description,
    detectedDate: site.detectedDate
  })))

  return (
    <div className="container px-4 py-8 max-w-5xl mx-auto">
      <JsonLd data={jsonLdData} />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Scam Alert: Fake Websites</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Below is a list of websites that are impersonating Classy Clothes. These websites are not affiliated with us 
          and may put your personal information at risk.
        </p>
      </div>
      
      {/* Verification Banner */}
      <SiteVerification />
      
      <div className="mt-12 flex flex-col sm:flex-row items-start gap-8">
        <div className="w-full sm:w-2/3">
          <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              List of Known Fake Websites
            </h2>
            
            {scamSites.length > 0 ? (
              <div className="divide-y">
                {scamSites.map((site, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-red-800">{site.name}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Detected: {new Date(site.detectedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{site.description}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="inline-flex items-center text-sm bg-red-100 text-red-800 px-3 py-1 rounded">
                        <Globe className="h-3 w-3 mr-1" />
                        {site.url}
                      </div>
                      <Link
                        href={`/scam/${site.slug}`}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        View details
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500">No fake websites have been identified yet.</p>
              </div>
            )}
          </div>
          
          {/* Latest Updates */}
          <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>
            <div className="space-y-4">
              {scamSites.slice(0, 3).map((site, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{site.name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(site.detectedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      This fake site has been reported and added to our database.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full sm:w-1/3">
          {/* How to Identify */}
          <div className="bg-white border rounded-lg shadow-sm p-5 mb-6">
            <h2 className="text-lg font-semibold mb-4">How to Identify Fake Websites</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span className="text-sm text-gray-700">Check the URL - we only use classyclothes.coupons</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span className="text-sm text-gray-700">Look for low quality images and poor design</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span className="text-sm text-gray-700">Be suspicious of unusually low prices</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span className="text-sm text-gray-700">Watch for unprofessional grammar and spelling</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                href="/verification"
                className="inline-flex items-center w-full justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Shield className="h-4 w-4 mr-2" />
                Learn How to Stay Safe
              </Link>
            </div>
          </div>
          
          {/* Report Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm p-5 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-red-800">Report a Fake Website</h2>
            <p className="text-sm text-red-700 mb-4">
              Found a website impersonating Classy Clothes that's not on our list? Let us know immediately.
            </p>
            <Link 
              href="/emergency-contacts"
              className="inline-flex items-center w-full justify-center py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Report Suspicious Website
            </Link>
          </div>
          
          {/* Official Verification */}
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-sm p-5">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-green-800">Our Official Website</h2>
            </div>
            <div className="bg-white border border-green-100 rounded-md p-3 mb-4 flex items-center">
              <Globe className="h-4 w-4 text-green-600 mr-2" />
              <span className="font-medium">classyclothes.coupons</span>
            </div>
            <p className="text-sm text-green-700">
              Remember, our only official domain is classyclothes.coupons. We do not use any other domains for our business.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { AlertTriangle, Shield, Search, ExternalLink, Calendar, Globe, ChevronRight } from 'lucide-react'
import { SiteVerification } from '@/components/site-verification'
import { JsonLd } from '@/lib/json-ld'
import { generateScamAlertSchema } from '@/lib/advanced-seo'

// Static metadata for SEO
export const metadata: Metadata = {
  title: 'Scam Alert: Fake Websites Impersonating Classy Clothes',
  description: 'Official list of websites falsely claiming to be Classy Clothes. Learn how to identify fake websites and protect yourself from scams.',
  keywords: ['scam alert', 'fake website', 'classyclothes scam', 'fashion scam', 'counterfeit website', 'website verification'],
  openGraph: {
    title: 'Scam Alert: Fake Websites Impersonating Classy Clothes',
    description: 'Official list of websites falsely claiming to be Classy Clothes. Learn how to identify fake websites and protect yourself from scams.',
    url: 'https://classyclothes.coupons/scam',
    type: 'website'
  }
}

// Function to load all scam data
async function getScamData() {
  const scamDir = path.join(process.cwd(), 'data', 'scams')
  
  try {
    // Create directory if it doesn't exist yet
    if (!fs.existsSync(scamDir)) {
      fs.mkdirSync(scamDir, { recursive: true })
      return []
    }
    
    const files = fs.readdirSync(scamDir)
    const scamFiles = files.filter(file => file.endsWith('.json'))
    
    const scamData = scamFiles.map(file => {
      const filePath = path.join(scamDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContent)
    })
    
    // Sort by detected date (newest first)
    return scamData.sort((a, b) => {
      const dateA = new Date(a.detectedDate || 0)
      const dateB = new Date(b.detectedDate || 0)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error loading scam data:', error)
    return []
  }
}

export default async function ScamIndexPage() {
  const scamSites = await getScamData()
  
  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Scam Alert: Fake Websites</h1>
        <p className="text-gray-600 mb-8">
          Official list of websites falsely claiming to be Classy Clothes. Learn how to identify fake websites and protect yourself from scams.
        </p>
        
        <SiteVerification />
        
        <JsonLd>
          {generateScamAlertSchema()}
        </JsonLd>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Link 
          href="/verification" 
          className="bg-amber-50 border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Shield className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-amber-800">How to Verify Our Website</h2>
              <p className="text-amber-700 mb-3 text-sm">
                Learn how to verify you're on our official website and identify fake sites.
              </p>
              <div className="flex items-center text-amber-600 text-sm font-medium">
                Read More <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </Link>
        
        <Link 
          href="/emergency-contacts" 
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-800">Emergency Contacts</h2>
              <p className="text-blue-700 mb-3 text-sm">
                Contact our security team immediately if you've found or interacted with a fake site.
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                View Contacts <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </Link>
        
        <Link 
          href="/report-form" 
          className="bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Search className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-green-800">Report a Suspicious Site</h2>
              <p className="text-green-700 mb-3 text-sm">
                Submit information about a website you believe is impersonating Classy Clothes.
              </p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                Submit Report <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-800 flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2" />
          Known Fake Websites
        </h2>
        <p className="text-red-700 mb-6">
          The following websites are <strong>NOT</strong> affiliated with Classy Clothes. These sites are attempting to impersonate our brand.
          Click on any site for detailed information about how to identify it as fake.
        </p>
        
        {scamSites.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <p className="text-gray-500">No scam sites have been detected yet. Check back later for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scamSites.map((site) => (
              <Link
                key={site.slug}
                href={`/scam/${site.slug}`}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  {site.evidence?.screenshots?.length > 0 && (
                    <div className="h-40 relative bg-gray-100">
                      <Image
                        src={site.evidence.screenshots[0].thumbnail || site.evidence.screenshots[0].path}
                        alt={`Screenshot of ${site.name}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 text-xs font-bold">
                        FAKE SITE
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-red-700">{site.name}</h3>
                    
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4 mr-1 text-gray-400" />
                      {site.url}
                    </div>
                    
                    <div className="flex items-center mb-3 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      Detected: {new Date(site.detectedDate).toLocaleDateString()}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {site.description}
                    </p>
                    
                    <div className="flex items-center mt-auto text-blue-600 text-sm font-medium">
                      View Details <ExternalLink className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">How to Identify Fake Websites</h2>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-red-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-sm font-bold text-red-700">1</span>
            </div>
            <span className="text-gray-700">
              <strong>Check the URL:</strong> Our only official website is <strong>classyclothes.coupons</strong>. 
              Any other domain claiming to be Classy Clothes is unauthorized.
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-red-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-sm font-bold text-red-700">2</span>
            </div>
            <span className="text-gray-700">
              <strong>Look for our verification badge:</strong> Our official site displays a verified badge next to our logo.
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-red-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-sm font-bold text-red-700">3</span>
            </div>
            <span className="text-gray-700">
              <strong>Unrealistic discounts:</strong> Fake sites often offer extremely low prices that seem too good to be true.
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-red-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-sm font-bold text-red-700">4</span>
            </div>
            <span className="text-gray-700">
              <strong>Contact information:</strong> Verify contact details match our official information. Fake sites often have non-functional contact methods.
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-red-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-sm font-bold text-red-700">5</span>
            </div>
            <span className="text-gray-700">
              <strong>Professional quality:</strong> Check for poor grammar, spelling errors, and low-quality images, which are common in fake sites.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

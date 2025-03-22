import type { GetStaticProps } from "next"
import Link from "next/link"
import fs from "fs"
import path from "path"
import { AlertTriangle, ExternalLink, Calendar, Search, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { generateScamIndexSchema } from "@/lib/json-ld"
import type { ScamSite } from "@/lib/seo-config"
import { formatDate, generateSlug, getDomainFromUrl } from "@/lib/utils"

export default function ScamSitesPage({ scamSites }: { scamSites: ScamSite[] }) {
  return (
    <>
      <SEO
        title="Scam Alert: Fake Websites Detected"
        description="Warning: We have detected fake websites copying content from the official Classy Clothes website. Learn how to identify and avoid these scams."
        ogType="article"
      />
      <JsonLd
        data={generateScamIndexSchema(
          scamSites.map((site) => ({
            url: site.url,
            name: site.title || getDomainFromUrl(site.url),
            description: site.description,
          })),
        )}
      />

      <div className="container mx-auto py-8 space-y-8">
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertTriangle className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Scam Alert: Fake Websites Detected</h1>
        </div>

        <div className="prose max-w-none">
          <p>
            We have detected several fake websites that are copying content from our official website. These websites
            may attempt to steal your personal information or defraud you. Please be cautious and only use our official
            website at{" "}
            <Link href="https://classyclothes.coupons" className="font-bold">
              classyclothes.coupons
            </Link>
            .
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full shrink-0">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">Official Website Verification</h2>
              <p className="text-green-700 mb-4">
                Always verify you are on our official website by checking the URL in your browser's address bar.
              </p>
              <div className="flex items-center p-3 bg-white border border-green-200 rounded-md">
                <div className="flex items-center text-green-800 font-medium">
                  <span className="mr-2">🔒</span>
                  <span>https://</span>
                  <span className="font-bold">classyclothes.coupons</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Detected Fake Websites</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search scam sites..." className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scamSites.map((site, index) => (
            <Card key={index} className="border-red-200">
              <CardHeader className="bg-red-50 border-b border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-red-800">{site.title || getDomainFromUrl(site.url)}</CardTitle>
                    <CardDescription className="text-red-700">{site.url}</CardDescription>
                  </div>
                  <Badge variant="destructive" className="ml-2">
                    Fake Website
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-4">{site.description}</p>

                {site.detectedDate && (
                  <p className="text-sm text-gray-500 mb-4 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Detected on {formatDate(site.detectedDate)}
                  </p>
                )}

                {site.copiedContent && site.copiedContent.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Evidence:</h4>
                    <div className="flex flex-wrap gap-2">
                      {site.copiedContent.map((content, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {content.type === "title" && "Copied Title"}
                          {content.type === "meta_description" && "Copied Meta Description"}
                          {content.type === "content" && "Copied Content"}
                          {content.type === "images" && "Copied Images"}
                          {content.type === "structured_data" && "Copied Structured Data"}
                          {!["title", "meta_description", "content", "images", "structured_data"].includes(
                            content.type,
                          ) && content.type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0 flex justify-end">
                <Button asChild variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Link href={`/scam/${generateSlug(site.url)}`}>
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {scamSites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No scam sites have been detected yet.</p>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-amber-800 mb-4">How to Protect Yourself</h2>

          <ul className="space-y-3 text-amber-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Always check that you are on our official website: <strong>classyclothes.coupons</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Look for security indicators like the padlock icon in your browser</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be cautious with your personal and financial information</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>If you're unsure, contact us directly at our official email or phone number</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Report any suspicious websites to us at <strong>copyright@classyclothes.coupons</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Read the scam sites data
    const dataPath = path.join(process.cwd(), "data", "scam-sites.json")

    let scamSites: ScamSite[] = []

    if (fs.existsSync(dataPath)) {
      scamSites = JSON.parse(fs.readFileSync(dataPath, "utf8"))
    }

    return {
      props: {
        scamSites,
      },
      // Revalidate every day
      revalidate: 86400,
    }
  } catch (error) {
    console.error("Error in getStaticProps:", error)
    return {
      props: {
        scamSites: [],
      },
      revalidate: 86400,
    }
  }
}


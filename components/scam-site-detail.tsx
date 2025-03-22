import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, ExternalLink, Shield, Calendar, Copy, ImageIcon, Code, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ScamSite } from "@/lib/seo-config"
import { formatDate, getDomainFromUrl, truncate } from "@/lib/utils"

export function ScamSiteDetail({ scamSite }: { scamSite: ScamSite }) {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-2 text-red-600 mb-4">
        <AlertTriangle className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Scam Alert: Fake Website Detected</h1>
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardHeader className="bg-red-100 border-b border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-red-800">{scamSite.title || getDomainFromUrl(scamSite.url)}</CardTitle>
              <CardDescription className="text-red-700">{scamSite.url}</CardDescription>
            </div>
            <Badge variant="destructive" className="ml-2">
              Fake Website
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-red-800">Warning</h3>
                <p className="text-red-700">{scamSite.description}</p>
                {scamSite.detectedDate && (
                  <p className="text-sm text-red-600 mt-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Detected on {formatDate(scamSite.detectedDate)}
                  </p>
                )}
                {scamSite.pageType && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Page type: {scamSite.pageType}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Official Website</h3>
                <p className="text-green-700">
                  The official website for Classy Clothes is{" "}
                  <Link href="https://classyclothes.coupons" className="font-bold underline">
                    classyclothes.coupons
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="evidence">
        <TabsList>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="protect">How to Protect Yourself</TabsTrigger>
        </TabsList>

        <TabsContent value="evidence" className="space-y-6 pt-4">
          <h2 className="text-xl font-semibold">Evidence of Content Copying</h2>

          {scamSite.copiedContent && scamSite.copiedContent.length > 0 ? (
            <div className="space-y-4">
              {scamSite.copiedContent.map((item, index) => (
                <Card key={index} className="border-amber-200">
                  <CardHeader className="bg-amber-50 border-b border-amber-100">
                    <CardTitle className="text-base font-medium text-amber-800">
                      {item.type === "title" && "Copied Title"}
                      {item.type === "meta_description" && "Copied Meta Description"}
                      {item.type === "content" && "Copied Content"}
                      {item.type === "images" && "Copied Images"}
                      {item.type === "structured_data" && "Copied Structured Data"}
                      {!["title", "meta_description", "content", "images", "structured_data"].includes(item.type) &&
                        item.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700">{item.description}</p>

                    {item.evidence && (
                      <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md overflow-auto">
                        <p className="text-sm font-mono whitespace-pre-wrap">{item.evidence}</p>
                      </div>
                    )}

                    {item.similarity !== undefined && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-amber-600 h-2.5 rounded-full"
                            style={{ width: `${Math.round(item.similarity * 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Similarity: {Math.round(item.similarity * 100)}%</p>
                      </div>
                    )}

                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 p-3 bg-green-50 border border-green-100 rounded-md">
                        <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                          <Shield className="h-4 w-4 mr-1" />
                          Original Content
                        </h4>
                        <p className="text-sm text-green-700">{item.originalUrl}</p>
                      </div>
                      <div className="flex-1 p-3 bg-red-50 border border-red-100 rounded-md">
                        <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center">
                          <Copy className="h-4 w-4 mr-1" />
                          Copied Content
                        </h4>
                        <p className="text-sm text-red-700">{item.fakeUrl}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              This website has been identified as a scam site that copies content from our official website.
            </p>
          )}
        </TabsContent>

        <TabsContent value="screenshots" className="space-y-6 pt-4">
          <h2 className="text-xl font-semibold">Visual Evidence</h2>

          <div className="grid grid-cols-1 gap-8">
            {/* Screenshots */}
            {scamSite.screenshots && scamSite.screenshots.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-amber-600" />
                  Screenshots
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scamSite.screenshots.map((screenshot, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 p-2 border-b">
                        <p className="text-sm font-medium">Screenshot of {getDomainFromUrl(scamSite.url)}</p>
                      </div>
                      <div className="relative aspect-video">
                        <Image
                          src={screenshot || "/placeholder.svg"}
                          alt={`Screenshot of ${scamSite.url}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 bg-red-50">
                        <p className="text-sm text-red-700">
                          This is a screenshot of the fake website. Do not visit this site.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Images */}
            {scamSite.images && scamSite.images.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-amber-600" />
                  Copied Images
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {scamSite.images.map((image, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Image from ${scamSite.url}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 bg-gray-50 text-xs">
                        <p className="truncate">Image {index + 1} from fake site</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!scamSite.screenshots || scamSite.screenshots.length === 0) &&
              (!scamSite.images || scamSite.images.length === 0) && (
                <p className="text-gray-600">No visual evidence available.</p>
              )}
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6 pt-4">
          <h2 className="text-xl font-semibold">Technical Details</h2>

          <div className="space-y-6">
            {/* Meta Tags */}
            <Accordion type="single" collapsible>
              <AccordionItem value="meta-tags">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-amber-600" />
                    Meta Tags
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {scamSite.metaTags && Object.keys(scamSite.metaTags).length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-50 p-3 border-b">
                        <p className="font-medium">Meta tags from {getDomainFromUrl(scamSite.url)}</p>
                      </div>
                      <div className="p-4 max-h-96 overflow-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left">Name/Property</th>
                              <th className="px-4 py-2 text-left">Content</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {Object.entries(scamSite.metaTags).map(([name, content], index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="px-4 py-2 font-mono">{name}</td>
                                <td className="px-4 py-2">{truncate(content, 100)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">No meta tag information available.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Structured Data */}
            <Accordion type="single" collapsible>
              <AccordionItem value="structured-data">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-amber-600" />
                    Structured Data
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {scamSite.structuredData && scamSite.structuredData.length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-50 p-3 border-b">
                        <p className="font-medium">JSON-LD from {getDomainFromUrl(scamSite.url)}</p>
                      </div>
                      <div className="p-4 max-h-96 overflow-auto">
                        <pre className="text-xs font-mono whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                          {JSON.stringify(scamSite.structuredData, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">No structured data information available.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="protect" className="space-y-6 pt-4">
          <h2 className="text-xl font-semibold">How to Protect Yourself</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Always Check the URL</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Always verify that you are on the official Classy Clothes website by checking the URL in your
                  browser's address bar. The official website is <strong>classyclothes.coupons</strong>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Look for Security Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Look for security indicators like the padlock icon in your browser and verify that the website has a
                  valid SSL certificate.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Be Cautious with Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Never provide personal or financial information on websites you're not sure about. If you're unsure,
                  contact us directly at our official email or phone number.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Report Scam Websites</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  If you come across a website that you believe is impersonating Classy Clothes, please report it to us
                  at <strong>copyright@classyclothes.coupons</strong>.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="https://classyclothes.coupons">
            Visit the Official Classy Clothes Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}


import type { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export default function GovernmentServicesPage() {
  return (
    <>
      <SEO
        title="Government Services in Bangladesh"
        description="Access digital government services in Bangladesh including MyGov, a2i, and other important government portals."
        ogType="article"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Government Services in Bangladesh",
          description:
            "Access digital government services in Bangladesh including MyGov, a2i, and other important government portals.",
        }}
      />

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Government Services in Bangladesh</h1>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6 mb-8">
          <p className="mb-6 text-gray-700">
            Bangladesh has made significant progress in digitizing government services. Here are some important
            government portals and services available online.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">National Portals</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Image
                      src="/images/govt.webp"
                      alt="Government of Bangladesh"
                      width={40}
                      height={40}
                      className="mr-2"
                    />
                    Bangladesh National Portal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Official portal of the Government of Bangladesh with information about all government services.
                  </p>
                  <a
                    href="https://bangladesh.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    Visit Portal <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Image src="/images/download (14).png" alt="MyGov" width={100} height={40} className="mr-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    One-stop service portal for citizens to access various government services online.
                  </p>
                  <a
                    href="https://mygov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    Visit Portal <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Digital Innovation Partners</h2>

              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Image src="/images/a2i-logo-set.png" alt="a2i" width={150} height={40} className="mr-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Aspire to Innovate (a2i) is the flagship program of the Digital Bangladesh agenda, working to ensure
                    easy, affordable and reliable access to quality public services.
                  </p>
                  <a
                    href="https://a2i.gov.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Important Government Logos</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 flex flex-col items-center">
                  <Image
                    src="/images/R (2).jpg"
                    alt="Government of Bangladesh"
                    width={150}
                    height={150}
                    className="mb-2"
                  />
                  <p className="text-sm text-center">Government of Bangladesh</p>
                </div>

                <div className="border rounded-lg p-4 flex flex-col items-center">
                  <Image
                    src="/images/logo (4).png"
                    alt="Ministry of Information"
                    width={150}
                    height={150}
                    className="mb-2"
                  />
                  <p className="text-sm text-center">Ministry of Information</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-800">Digital Bangladesh</h2>
            <p className="text-blue-700">
              Digital Bangladesh is the government's vision to develop human resources prepared for the 21st century,
              connect citizens, and bring services to citizens' doorsteps.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}


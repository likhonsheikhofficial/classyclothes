import type { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"

export default function EmergencyContactsPage() {
  return (
    <>
      <SEO
        title="Emergency Contacts in Bangladesh"
        description="Important emergency contact numbers in Bangladesh including police, fire service, ambulance, and other helplines."
        ogType="article"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Emergency Contacts in Bangladesh",
          description:
            "Important emergency contact numbers in Bangladesh including police, fire service, ambulance, and other helplines.",
        }}
      />

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Emergency Contacts in Bangladesh</h1>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6 mb-8">
          <p className="mb-6 text-gray-700">
            These are important emergency contact numbers in Bangladesh. Save these numbers on your phone for quick
            access during emergencies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-red-800">National Emergency Services</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="bg-red-100 rounded-full p-2 mr-3">
                    <span className="text-red-600 text-xl font-bold">999</span>
                  </div>
                  <span>National Emergency Service</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                    <span className="text-purple-600 text-xl font-bold">333</span>
                  </div>
                  <span>Government Information & Services</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <span className="text-blue-600 text-xl font-bold">106</span>
                  </div>
                  <span>Anti-Corruption Hotline</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-orange-800">Special Helplines</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="bg-orange-100 rounded-full p-2 mr-3">
                    <span className="text-orange-600 text-xl font-bold">109</span>
                  </div>
                  <span>Women & Child Helpline</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <span className="text-blue-600 text-xl font-bold">1098</span>
                  </div>
                  <span>Child Helpline</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <span className="text-green-600 text-xl font-bold">16575</span>
                  </div>
                  <span>Health Helpline</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <Image
              src="/images/call_center.jpg"
              alt="Emergency Contact Numbers"
              width={800}
              height={600}
              className="rounded-lg mx-auto"
            />
          </div>

          <div className="mb-6">
            <Image
              src="/images/hotline_v.2_bn.png"
              alt="All Emergency Hotlines"
              width={800}
              height={1200}
              className="rounded-lg mx-auto"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-800">Important Note</h2>
            <p className="text-blue-700">
              These emergency services are available 24/7. In case of emergency, please remain calm and provide clear
              information about your location and the nature of the emergency.
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


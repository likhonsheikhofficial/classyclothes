import Link from "next/link"
import { Metadata } from "next"
import { AlertTriangle, Mail, Phone, MessageSquare, FileText, ArrowLeft, Shield } from "lucide-react"
import { SiteVerification } from "@/components/site-verification"

export const metadata: Metadata = {
  title: "Emergency Contacts | Report Scams | Classy Clothes",
  description: "Report suspicious websites, scams, or copyright violations related to Classy Clothes. Contact our security team for immediate assistance.",
  openGraph: {
    title: "Emergency Contacts | Report Scams | Classy Clothes",
    description: "Report suspicious websites, scams, or copyright violations related to Classy Clothes. Contact our security team for immediate assistance.",
    url: "https://classyclothes.coupons/emergency-contacts",
    type: "website",
  },
}

export default function EmergencyContactsPage() {
  return (
    <div className="container px-4 py-8 max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Homepage
      </Link>
      
      <h1 className="text-3xl font-bold mb-2">Emergency Contacts</h1>
      <p className="text-gray-600 mb-8">
        Report suspicious websites, scams, or copyright violations. Our team will investigate promptly.
      </p>

      <SiteVerification />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-red-800">Report Scam Websites</h2>
                <p className="text-red-700 mt-1">
                  If you've found a website impersonating Classy Clothes, please report it immediately using one of the methods below.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Contact Methods</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    For fastest response, email our security team directly:
                  </p>
                  <a 
                    href="mailto:security@classyclothes.coupons" 
                    className="inline-block bg-blue-50 border border-blue-200 rounded-md px-3 py-2 text-blue-700 font-medium hover:bg-blue-100 transition-colors"
                  >
                    security@classyclothes.coupons
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    For urgent issues during business hours (9AM-6PM, Bangladesh Time):
                  </p>
                  <a 
                    href="tel:+8801712345678" 
                    className="inline-block bg-green-50 border border-green-200 rounded-md px-3 py-2 text-green-700 font-medium hover:bg-green-100 transition-colors"
                  >
                    +880 17 1234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Online Form</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Submit detailed information about the scam website using our secure form:
                  </p>
                  <Link 
                    href="/report-form" 
                    className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Submit Report
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">What Information to Include</h2>
            <p className="text-sm text-gray-700 mb-4">
              When reporting a suspicious website, please include as much of the following information as possible:
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">1</span>
                </div>
                <span className="text-sm text-gray-700">The complete URL of the suspicious website</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">2</span>
                </div>
                <span className="text-sm text-gray-700">Screenshots of the website (if possible)</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">3</span>
                </div>
                <span className="text-sm text-gray-700">Date and time you discovered the website</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">4</span>
                </div>
                <span className="text-sm text-gray-700">Any interaction you had with the website</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">5</span>
                </div>
                <span className="text-sm text-gray-700">How you found or were directed to the website</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-800">
              <Shield className="h-5 w-5 mr-2" />
              Copyright Claims
            </h2>
            <p className="text-sm text-amber-700 mb-4">
              If you need to file a formal copyright claim against a website using our content without permission, please contact:
            </p>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Legal Department</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Send formal copyright notices to:
                </p>
                <a 
                  href="mailto:copyright@classyclothes.coupons" 
                  className="inline-block bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-amber-700 font-medium hover:bg-amber-100 transition-colors"
                >
                  copyright@classyclothes.coupons
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Stay Informed</h2>
        <p className="text-sm text-blue-700 mb-4">
          We maintain an updated list of known fake websites impersonating Classy Clothes. Check our scam alert page for the latest information.
        </p>
        <Link 
          href="/scam" 
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Scam Alerts
          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
        </Link>
      </div>
    </div>
  )
}

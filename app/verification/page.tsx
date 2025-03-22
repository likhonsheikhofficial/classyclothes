import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Shield, AlertTriangle, CheckCircle, Lock, ExternalLink, Search, CreditCard, Globe, Mail } from "lucide-react"
import { SiteVerification } from "@/components/site-verification"
import { JsonLd, generateSiteVerificationSchema } from "@/lib/json-ld"

export const metadata: Metadata = {
  title: "Official Website Verification | Classy Clothes",
  description: "Learn how to verify that you are on the official Classy Clothes website and how to identify fake or scam websites.",
  openGraph: {
    title: "Official Website Verification | Classy Clothes",
    description: "Learn how to verify that you are on the official Classy Clothes website and how to identify fake or scam websites.",
    url: "https://classyclothes.coupons/verification",
    type: "website",
  },
}

export default function VerificationPage() {
  return (
    <div className="container px-4 py-8 max-w-5xl mx-auto">
      <JsonLd data={generateSiteVerificationSchema()} />
      
      <h1 className="text-3xl font-bold text-center mb-2">Official Website Verification</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Learn how to verify that you are on the official Classy Clothes website and how to identify fake or scam websites.
      </p>

      {/* Verification Banner */}
      <SiteVerification />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-800">
            <Shield className="h-5 w-5 mr-2" />
            How to Verify Our Official Website
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-green-800">1</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Check the URL in your browser</h3>
                <p className="text-sm text-gray-600">
                  Our official website URL is <span className="font-bold text-green-800">classyclothes.coupons</span>. 
                  Always ensure you're on this domain before entering any personal information.
                </p>
                <div className="mt-2 p-2 bg-gray-50 border rounded-md text-sm flex items-center">
                  <Lock className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-gray-400">https://</span>
                  <span className="font-bold">classyclothes.coupons</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-green-800">2</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Look for the verification badge</h3>
                <p className="text-sm text-gray-600">
                  Our official website displays a verified badge next to our logo. This badge confirms that you're on the authentic Classy Clothes website.
                </p>
                <div className="mt-2 p-2 bg-gray-50 border rounded-md text-sm flex items-center">
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    OFFICIAL
                  </div>
                  <span className="ml-2 text-gray-500">← Look for this badge next to our logo</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-green-800">3</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Check for secure connection</h3>
                <p className="text-sm text-gray-600">
                  Our website always uses HTTPS (secure connection). Most browsers display a padlock icon in the address bar.
                </p>
                <div className="mt-2 p-2 bg-gray-50 border rounded-md text-sm flex items-center">
                  <Lock className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-gray-500">Look for this padlock icon in your browser's address bar</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-green-800">4</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Our emails always end with @classyclothes.coupons</h3>
                <p className="text-sm text-gray-600">
                  Legitimate emails from us will always come from addresses ending with @classyclothes.coupons, such as support@classyclothes.coupons or orders@classyclothes.coupons.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            How to Identify Fake Websites
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-red-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-red-800">1</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Suspicious domain names</h3>
                <p className="text-sm text-gray-600">
                  Watch out for similar but different domain names like <span className="font-bold text-red-700">classyclothes.com.bd</span>, 
                  <span className="font-bold text-red-700"> classyclothes-bd.com</span>, or 
                  <span className="font-bold text-red-700"> classyclothesbd.com</span>.
                </p>
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md text-sm">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                    <span className="font-bold text-red-700">classyclothes.com.bd</span>
                    <span className="ml-2 text-red-600 text-xs">FAKE WEBSITE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-red-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-red-800">2</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Poor quality content or design</h3>
                <p className="text-sm text-gray-600">
                  Fake websites often have spelling mistakes, poor quality images, or unprofessional design. 
                  They may use our content but present it in a lower quality format.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-red-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-red-800">3</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Suspicious payment methods</h3>
                <p className="text-sm text-gray-600">
                  Be cautious if a website claiming to be Classy Clothes asks for payment through unusual methods like 
                  direct bank transfers, gift cards, or cryptocurrencies.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-red-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-red-800">4</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Contact information</h3>
                <p className="text-sm text-gray-600">
                  Check the contact information. Our official emails end with @classyclothes.coupons. 
                  Be suspicious of generic email providers like gmail.com or yahoo.com.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link 
                href="/scam"
                className="inline-flex items-center py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                View Known Scam Websites
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-5 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Report Suspicious Websites</h2>
        <p className="text-sm text-blue-700 mb-4">
          If you encounter a website that you suspect is impersonating Classy Clothes, please report it to us immediately. 
          Your reports help us protect our customers and take action against fake websites.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/emergency-contacts"
            className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Report Suspicious Activity
          </Link>
          <Link 
            href="mailto:security@classyclothes.coupons"
            className="inline-flex items-center py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Our Security Team
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-3">Our Security Commitments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="font-medium mb-1">Secure Shopping</h3>
            <p className="text-sm text-gray-600">
              All transactions are processed with bank-grade security and encryption.
            </p>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="font-medium mb-1">Safe Payments</h3>
            <p className="text-sm text-gray-600">
              We use secure payment gateways to protect your financial information.
            </p>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="font-medium mb-1">Privacy Protection</h3>
            <p className="text-sm text-gray-600">
              Your personal data is protected in accordance with privacy regulations.
            </p>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="font-medium mb-1">Single Domain</h3>
            <p className="text-sm text-gray-600">
              We operate only on classyclothes.coupons. No other domains are authentic.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

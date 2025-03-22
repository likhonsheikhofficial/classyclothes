import Link from "next/link"
import Image from "next/image"
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SiteVerification() {
  return (
    <Card className="border-2 border-amber-500 bg-amber-50 shadow-md">
      <CardHeader className="bg-amber-100 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-amber-700" />
          <CardTitle className="text-amber-900">Official Website Verification</CardTitle>
          <div className="ml-2 flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            <CheckCircle className="h-3 w-3 mr-1" />
            VERIFIED
          </div>
        </div>
        <CardDescription className="text-amber-800">
          Verify you are on the official Classy Clothes website
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Official Website Verification */}
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800 flex items-center">
                Official Website Verified
                <span className="inline-flex ml-2 items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  AUTHENTIC
                </span>
              </h3>
              <p className="text-sm text-green-700 mt-1">
                You are currently on <span className="font-bold">classyclothes.coupons</span>, the only official website for Classy Clothes.
              </p>
              <div className="flex items-center mt-2 text-xs text-green-600">
                <Calendar className="h-3 w-3 mr-1" />
                Last verification: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Fake Website Warning */}
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-red-800 flex items-center">
                Fake Website Alert
                <span className="inline-flex ml-2 items-center bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  WARNING
                </span>
              </h3>
              <p className="text-sm text-red-700 mt-1">
                <strong>classyclothes.com.bd</strong> is a FAKE website that copies our content from Facebook and other social media platforms without permission.
              </p>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                <Link 
                  href="/scam"
                  className="inline-flex items-center text-xs bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition-colors"
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  View Scam Details
                </Link>
                <Link
                  href="/emergency-contacts"
                  className="inline-flex items-center text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Report Scam Sites
                </Link>
              </div>
            </div>
          </div>

          {/* URL Verification */}
          <div className="mt-5 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">How to verify our website:</h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p className="flex items-start">
                <span className="inline-block bg-blue-100 text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                Check the URL in your browser address bar - it should be <strong>classyclothes.coupons</strong>
              </p>
              <p className="flex items-start">
                <span className="inline-block bg-blue-100 text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                Look for the verification badge next to our logo
              </p>
              <p className="flex items-start">
                <span className="inline-block bg-blue-100 text-blue-800 font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                Our official emails always end with <strong>@classyclothes.coupons</strong>
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-600 border-t border-amber-200 pt-4 mt-4">
            <p>
              For copyright concerns, please contact:{" "}
              <Link
                href="mailto:copyright@classyclothes.coupons"
                className="font-medium text-amber-700 hover:underline"
              >
                copyright@classyclothes.coupons
              </Link>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

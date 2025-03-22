"use client"

import Link from "next/link"
import { AlertTriangle, Shield, ExternalLink, Check, Clock } from "lucide-react"

export function FooterWarning() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {/* Warning About Fake Website */}
      <div className="flex flex-col gap-2 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h3 className="font-semibold text-red-800">Warning: Fake Website Alert</h3>
        </div>
        <p className="text-sm text-red-700">
          <span className="font-bold">classyclothes.com.bd</span> is a FAKE website that copies our content without permission. 
          They have no association with the official Classy Clothes brand.
        </p>
        <div className="flex gap-3 mt-2">
          <Link
            href="/scam"
            className="inline-flex items-center text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            View Scam Details
          </Link>
          <Link
            href="/report-scam"
            className="inline-flex items-center text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Report Scam
          </Link>
        </div>
      </div>

      {/* Official Website Verification */}
      <div className="flex flex-col gap-2 p-4 bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-800">You Are On Our Official Website</h3>
          <div className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            <Check className="inline h-3 w-3 mr-1" />
            VERIFIED
          </div>
        </div>
        <p className="text-sm text-green-700">
          The only official website for Classy Clothes is <span className="font-bold">classyclothes.coupons</span>. 
          Always check the URL before entering any personal information.
        </p>
        <div className="flex items-center text-xs text-green-600 mt-1">
          <Clock className="h-3 w-3 mr-1" />
          Last verified: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

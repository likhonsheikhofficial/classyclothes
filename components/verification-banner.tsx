"use client"

import { AlertTriangle, Shield, ExternalLink, Check, LockIcon, CreditCard, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function VerificationBanner() {
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 mb-6 shadow-md">
      <div className="flex flex-col space-y-4">
        {/* Official Website Section */}
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full shrink-0">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-green-800">Official Website Verification</h2>
              <span className="ml-2 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                <Check className="h-3 w-3 mr-1" />
                VERIFIED
              </span>
            </div>
            <p className="text-green-700">
              You are on our official website. The official URL for Classy Clothes is{" "}
              <span className="font-bold">classyclothes.coupons</span>
            </p>
            <div className="flex items-center p-3 mt-2 bg-white border border-green-200 rounded-md">
              <div className="flex items-center text-green-800 font-medium">
                <LockIcon className="h-4 w-4 text-green-600 mr-2" />
                <span className="mr-1">https://</span>
                <span className="font-bold">classyclothes.coupons</span>
              </div>
            </div>

            {/* Security Information */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center bg-white p-2 rounded border border-green-100">
                <LockIcon className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-xs text-green-800">Secure Connection</span>
              </div>
              <div className="flex items-center bg-white p-2 rounded border border-green-100">
                <CreditCard className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-xs text-green-800">Safe Payment</span>
              </div>
              <div className="flex items-center bg-white p-2 rounded border border-green-100">
                <Calendar className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-xs text-green-800">Last Verified: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fake Website Warning */}
        <div className="flex items-start gap-3 bg-red-50 p-3 rounded-md border border-red-200">
          <div className="bg-red-100 p-2 rounded-full shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-red-800">Beware of Fake Websites</h2>
              <span className="ml-2 inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                WARNING
              </span>
            </div>
            <p className="text-red-700">
              <span className="font-bold">https://classyclothes.com.bd/</span> is a FAKE website stealing our content
              and potentially putting your personal information at risk.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/scam"
                className="inline-flex items-center py-1 px-3 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                View Scam Details
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link
                href="/emergency-contacts"
                className="inline-flex items-center py-1 px-3 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              >
                Report Scam
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Safe Checkout Information for Checkout Pages */}
        <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
          <h3 className="font-medium text-blue-800 flex items-center">
            <LockIcon className="h-4 w-4 mr-2" />
            Safe Checkout Information
          </h3>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-2 rounded border border-blue-100 flex items-center">
              <Check className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs text-blue-800">Secure Payment</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-100 flex items-center">
              <Check className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs text-blue-800">Data Protection</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-100 flex items-center">
              <Check className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs text-blue-800">Encrypted Connection</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-100 flex items-center">
              <Check className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs text-blue-800">Verified Merchant</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 border-t border-amber-200 pt-2 mt-2">
          For copyright concerns, please contact:{" "}
          <Link href="mailto:copyright@classyclothes.coupons" className="font-medium text-amber-700 hover:underline">
            copyright@classyclothes.coupons
          </Link>
        </div>
      </div>
    </div>
  )
}

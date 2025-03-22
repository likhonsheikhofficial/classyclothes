import React, { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import Link from "next/link"

export function TickerHeader() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-red-600 text-white py-2 px-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 animate-pulse">
            <AlertTriangle className="h-5 w-5" />
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="font-medium text-center mx-4 text-sm md:text-base">
            <span className="inline-block whitespace-nowrap">
              Warning: <strong>classyclothes.com.bd</strong> is a FAKE website!
            </span>
            <span className="hidden md:inline-block mx-2">|</span>
            <span className="inline-block whitespace-nowrap">
              Our official website is <Link href="/" className="underline font-bold hover:text-yellow-200">classyclothes.coupons</Link>
            </span>
            <span className="hidden md:inline-block mx-2">|</span>
            <span className="inline-block whitespace-nowrap">
              Contact <Link href="mailto:copyright@classyclothes.coupons" className="underline hover:text-yellow-200">copyright@classyclothes.coupons</Link> for copyright concerns
            </span>
          </div>
          <div className="flex items-center space-x-2 animate-pulse">
            <AlertTriangle className="h-5 w-5" />
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-200"
        aria-label="Close warning"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import { AlertTriangle, X, ExternalLink } from "lucide-react"
import Link from "next/link"

const KNOWN_SCAM_SITES = [
  "classyclothes.com.bd",
  "classy-clothes-bd.com",
  "classycl.com.bd",
  "yclothes.com.bd"
]

export function TickerHeader() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentScamIndex, setCurrentScamIndex] = useState(0)

  // Rotate through scam sites every 5 seconds
  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setCurrentScamIndex((prevIndex) => (prevIndex + 1) % KNOWN_SCAM_SITES.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="sticky top-0 z-50 bg-red-600 text-white py-2 px-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 animate-pulse">
            <AlertTriangle className="h-5 w-5" />
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="font-medium text-center mx-4 text-sm md:text-base">
            <span className="inline-block whitespace-nowrap">
              <strong>WARNING:</strong> <strong className="text-yellow-200">{KNOWN_SCAM_SITES[currentScamIndex]}</strong> is a FAKE website!
            </span>
            <span className="hidden md:inline-block mx-2">|</span>
            <span className="inline-block whitespace-nowrap">
              Our official website is <Link href="/" className="underline font-bold hover:text-yellow-200">classyclothes.coupons</Link>
            </span>
            <span className="hidden md:inline-block mx-2">|</span>
            <span className="inline-block whitespace-nowrap">
              <Link href="/scam" className="font-bold px-2 py-0.5 bg-white text-red-600 rounded hover:bg-yellow-200 transition-colors">
                View Scam Alerts <ExternalLink className="inline h-3 w-3" />
              </Link>
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

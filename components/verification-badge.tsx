"use client"

import { CheckCircle, Lock, Info } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function VerificationBadge({ size = "default" }: { size?: "small" | "default" | "large" }) {
  // Size classes mapping
  const sizeClasses = {
    small: {
      container: "px-1.5 py-0.5 text-[10px]",
      icon: "h-2.5 w-2.5 mr-0.5",
    },
    default: {
      container: "px-2 py-1 text-xs",
      icon: "h-3 w-3 mr-1",
    },
    large: {
      container: "px-3 py-1.5 text-sm",
      icon: "h-4 w-4 mr-1.5",
    },
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center ${sizeClasses[size].container} bg-green-100 text-green-800 font-medium rounded-full hover:bg-green-200 transition-colors cursor-help`}>
            <CheckCircle className={sizeClasses[size].icon} />
            OFFICIAL
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-white max-w-xs p-3 shadow-lg border border-green-100">
          <div className="space-y-2">
            <div className="font-semibold text-green-800 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Verified Official Website
            </div>
            <p className="text-xs text-gray-600">
              You are on <span className="font-medium text-green-800">classyclothes.coupons</span>, the only official website for Classy Clothes.
            </p>
            <div className="flex items-center text-xs text-gray-600 mt-1 pt-1 border-t border-green-100">
              <Lock className="h-3 w-3 mr-1 text-green-600" />
              Secure connection with valid HTTPS certificate
            </div>
            <Link
              href="/verification"
              className="inline-flex items-center text-xs text-green-700 hover:text-green-800 hover:underline"
            >
              <Info className="h-3 w-3 mr-1" />
              Learn more about website verification
            </Link>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Use this component in layouts.tsx or anywhere else next to the logo
// Example: <VerificationBadge />
// For different sizes: <VerificationBadge size="small" /> or <VerificationBadge size="large" />

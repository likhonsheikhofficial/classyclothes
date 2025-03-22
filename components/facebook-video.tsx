"use client"

import { useEffect, useRef } from "react"

interface FacebookVideoProps {
  videoUrl: string
  width?: number | string
  height?: number | string
  showText?: boolean
  autoplay?: boolean
}

export function FacebookVideo({
  videoUrl,
  width = "100%",
  height = 400,
  showText = false,
  autoplay = false,
}: FacebookVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      if (window.FB) return

      const script = document.createElement("script")
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      document.body.appendChild(script)

      window.fbAsyncInit = () => {
        FB.init({
          xfbml: true,
          version: "v18.0",
        })
      }
    }

    loadFacebookSDK()

    // Parse XFBML when SDK is loaded
    const parseXFBML = () => {
      if (window.FB && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current)
      }
    }

    const checkFB = setInterval(() => {
      if (window.FB) {
        parseXFBML()
        clearInterval(checkFB)
      }
    }, 100)

    return () => {
      clearInterval(checkFB)
    }
  }, [videoUrl])

  return (
    <div ref={containerRef} className="facebook-video-container">
      <div
        className="fb-video"
        data-href={videoUrl}
        data-width={width}
        data-height={height}
        data-show-text={showText}
        data-autoplay={autoplay}
      ></div>
    </div>
  )
}

// Add Facebook SDK types
declare global {
  interface Window {
    FB: {
      init: (options: any) => void
      XFBML: {
        parse: (element?: HTMLElement) => void
      }
    }
    fbAsyncInit: () => void
  }
}


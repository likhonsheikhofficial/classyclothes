"use client"

import { useEffect } from "react"
import { protectAllImages } from "@/lib/image-utils"

export function CopyrightProtection() {
  useEffect(() => {
    // Apply copyright protection to all images
    protectAllImages()

    // Add global copyright notice to console
    console.log(
      "%c ⚠️ COPYRIGHT NOTICE ⚠️ ",
      "background: #ff0000; color: white; font-size: 14px; font-weight: bold; padding: 5px;",
    )
    console.log(
      "%c All content and images on this website are protected by copyright@classyclothes.coupons",
      "font-size: 12px; padding: 5px;",
    )

    // Add meta tag for copyright
    const metaTag = document.createElement("meta")
    metaTag.name = "copyright"
    metaTag.content = "copyright@classyclothes.coupons"
    document.head.appendChild(metaTag)

    // Disable page source viewing shortcut
    document.addEventListener("keydown", (e) => {
      // Disable Ctrl+U (view source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault()
        alert("This website is protected by copyright@classyclothes.coupons")
        return false
      }
    })

    // Disable right-click on images
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "IMG") {
        e.preventDefault()
        alert(
          "This image is protected by copyright. Please contact copyright@classyclothes.coupons for usage permissions.",
        )
        return false
      }
    }

    // Disable drag on images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "IMG") {
        e.preventDefault()
      }
    }

    // Add watermark to images
    const images = document.querySelectorAll("img:not([data-no-watermark])")
    images.forEach((img) => {
      img.setAttribute("data-copyright", "copyright@classyclothes.coupons")
    })

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("dragstart", handleDragStart)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("dragstart", handleDragStart)
    }
  }, [])

  return null // This component doesn't render anything visible
}


"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { fallbackImages } from "@/lib/image-loader"

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function SafeImage({ src, alt, fallbackSrc, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc || fallbackImages[fallbackImages.length - 1])
      }}
      data-copyright="copyright@classyclothes.coupons"
    />
  )
}


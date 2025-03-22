/**
 * Utility for loading images from GitHub repository
 * All images are protected by copyright@classyclothes.coupons
 */

const GITHUB_BASE_URL = "https://raw.githubusercontent.com/likhonsheikhofficial/classyclothes/main/images"

// Common image sizes used throughout the site
export const IMAGE_SIZES = {
  thumbnail: "100x100",
  small: "248x440",
  medium: "450x800",
  large: "768x1364",
  xlarge: "865x1536",
}

/**
 * Get image URL from GitHub repository
 * @param imageName - Name of the image file
 * @param size - Optional size suffix (e.g., "248x440")
 * @returns Full URL to the image
 */
export function getGitHubImageUrl(imageName: string, size?: string): string {
  try {
    // If size is provided, try to get the sized version
    if (size) {
      const baseName = imageName.split(".")[0]
      const ext = imageName.split(".").pop() || "jpg"
      return `${GITHUB_BASE_URL}/${baseName}-${size}.${ext}`
    }

    // Otherwise return the original image
    return `${GITHUB_BASE_URL}/${imageName}`
  } catch (error) {
    console.error("Error generating GitHub image URL:", error)
    // Return a placeholder if there's an error
    return "/placeholder.svg"
  }
}

/**
 * Get a list of recent product images
 * @returns Array of image URLs
 */
export function getRecentProductImages(): string[] {
  // Recent product images from the repository
  return [
    getGitHubImageUrl("467487263_918889590408658_1150310118387208790_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("467488347_1734392890458718_185837046434998015_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("467786115_1135630718284799_6543724306834702804_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("467791724_966660355356728_3501449552570314092_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("467822363_606812165174257_2181833683946634689_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("470050750_1635405710397861_546795963727033231_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("470051725_2284144615292130_6214991531007715872_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("470056718_1812125596278749_2631955118084934088_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("471236914_1742510653261097_1995995051732780072_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("471751254_1098995331963766_3299364578726151105_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("471922340_1577636339539260_5805563369956890671_n.jpg", IMAGE_SIZES.medium),
    getGitHubImageUrl("471957414_493418373325490_3473925390198994231_n.jpg", IMAGE_SIZES.medium),
  ]
}

/**
 * Get fallback images in case GitHub images fail to load
 * @returns Array of fallback image URLs
 */
export const fallbackImages = [
  "/images/products/tie-dye-green.jpg",
  "/images/products/velvet-purple.jpg",
  "/images/products/light-blue.jpg",
  "/images/products/maroon-embroidered.jpg",
  "/images/products/velvet-black.jpg",
  "/images/products/pink-embroidered.jpg",
  "/placeholder.svg?height=400&width=300",
]

/**
 * Get a local product image by index or fallback to placeholder
 * @param index - Index of the product image to get
 * @returns URL to the product image
 */
export function getLocalProductImage(index: number): string {
  if (index >= 0 && index < fallbackImages.length) {
    return fallbackImages[index]
  }
  return fallbackImages[fallbackImages.length - 1]
}


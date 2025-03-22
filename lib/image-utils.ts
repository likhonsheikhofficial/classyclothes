/**
 * Utility functions for handling images from GitHub repository
 * All images are protected by copyright@classyclothes.coupons
 */

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/likhonsheikhofficial/classyclothes/main/images"

/**
 * Get the URL for an image from the GitHub repository
 * @param imageName - The name of the image file
 * @returns The full URL to the image
 */
export function getGitHubImageUrl(imageName: string): string {
  return `${GITHUB_RAW_URL}/${imageName}`
}

/**
 * Get a list of predefined images from the repository
 * These images are protected by copyright@classyclothes.coupons
 */
export const githubImages = {
  // Pakistani dresses
  pakistani1: getGitHubImageUrl("pakistani-dress-1.jpg"),
  pakistani2: getGitHubImageUrl("pakistani-dress-2.jpg"),

  // Embroidery dresses
  embroidery1: getGitHubImageUrl("embroidery-dress-1.jpg"),
  embroidery2: getGitHubImageUrl("embroidery-dress-2.jpg"),

  // Karchupi dresses
  karchupi1: getGitHubImageUrl("karchupi-dress-1.jpg"),
  karchupi2: getGitHubImageUrl("karchupi-dress-2.jpg"),

  // Three piece sets
  threePiece1: getGitHubImageUrl("three-piece-1.jpg"),
  threePiece2: getGitHubImageUrl("three-piece-2.jpg"),

  // Tie dye dresses
  tieDye1: getGitHubImageUrl("tie-dye-1.jpg"),
  tieDye2: getGitHubImageUrl("tie-dye-2.jpg"),

  // Fallback to our provided images if GitHub images are not available
  fallback1:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/470051725_2284144615292130_6214991531007715872_n-248x441.jpg-iNmaX3twNdijCe5YxqqIlFsNc2LQVl.jpeg",
  fallback2:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/471922340_1577636339539260_5805563369956890671_n-248x440.jpg-HFgPGgm81dHVbY7HvbsBRNhZqKrH8s.jpeg",
  fallback3:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/470050750_1635405710397861_546795963727033231_n-450x800.jpg-eUwBNNwjSxWuKaSziGQQXQtJsF5c7u.jpeg",
  fallback4:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472698261_1625610081687444_6782496733444178873_n-450x800.jpg-n8DoYZvuRv6EEOLN3Sk09925KwbSV9.jpeg",
  fallback5:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472735814_2891904920969299_1067800926369599801_n-510x906.jpg-fLGHN3mu9kFa6ewKleUMK4r7btURm1.jpeg",
  fallback6:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472737328_1275086713522504_8842839363374572252_n.jpg-qtAWJd5fLgoqibTyjZ62xQ7JVkz86y.jpeg",
  fallback7:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/471751254_1098995331963766_3299364578726151105_n-510x906.jpg-UoPVSEYUxn7Au7eb730cXcZow9muXz.jpeg",
  fallback8:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472651392_951126490450657_8495947352288517701_n-768x1364.jpg-1ZUlfUoPMlCQCSV2RWZy0RbKhLzi3A.jpeg",
  fallback9:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/470056718_1812125596278749_2631955118084934088_n-865x1536.jpg-o4gia0ewtKGsYiyhw75v3pIe1lBvv8.jpeg",
}

/**
 * Copyright protection for images
 * All images are protected by copyright@classyclothes.coupons
 */
export function addCopyrightProtection(imageElement: HTMLImageElement): void {
  // Add copyright information to the image
  imageElement.setAttribute("data-copyright", "copyright@classyclothes.coupons")

  // Disable right-click on images
  imageElement.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    alert("This image is protected by copyright@classyclothes.coupons")
    return false
  })
}

/**
 * Apply copyright protection to all images on the page
 */
export function protectAllImages(): void {
  if (typeof window !== "undefined") {
    // Wait for DOM to be fully loaded
    window.addEventListener("DOMContentLoaded", () => {
      const images = document.querySelectorAll("img")
      images.forEach((img) => {
        addCopyrightProtection(img)
      })

      // Also protect against drag and drop
      document.addEventListener("dragstart", (e) => {
        if (e.target instanceof HTMLImageElement) {
          e.preventDefault()
          alert("This image is protected by copyright@classyclothes.coupons")
          return false
        }
      })
    })
  }
}


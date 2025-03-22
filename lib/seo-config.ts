export const siteConfig = {
  name: "Classy Clothes",
  url: "https://classyclothes.coupons",
  ogImage: "https://classyclothes.coupons/images/og-banner.jpg",
  description:
    "Premium fashion boutique offering exclusive Pakistani dresses, Karchupi dresses, and more elegant clothing options.",
  keywords: [
    "fashion",
    "Pakistani dress",
    "Karchupi dress",
    "Anarkali dress",
    "premium clothing",
    "Bangladesh fashion",
  ],
  twitter: {
    handle: "@classyclothes",
    site: "@classyclothes",
    cardType: "summary_large_image",
  },
  facebook: {
    appId: "", // Add your Facebook App ID if available
  },
  scamSites: [
    {
      url: "https://classyclothes.com.bd",
      description: "This is a FAKE website copying our content from Facebook and social handles without permission.",
    },
  ],
  contactEmail: "copyright@classyclothes.coupons",
  phoneNumber: "+8880708-797172",
  businessHours: "09:00AM-11:00PM",
  address: {
    street: "Mirpur 12",
    city: "Dhaka",
    region: "Dhaka",
    postalCode: "",
    country: "Bangladesh",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/classyclothesbd",
    instagram: "https://www.instagram.com/classyclothes",
    youtube: "https://www.youtube.com/classyclothes",
  },
  foundingDate: "2020-01-01",
}

export type ScamSite = {
  url: string
  title?: string
  description: string
  detectedDate?: string
  screenshots?: string[]
  images?: string[]
  copiedContent?: {
    type: string
    originalUrl: string
    fakeUrl: string
    description: string
    similarity?: number
    evidence?: string
  }[]
  pageType?: string
  metaTags?: Record<string, string>
  structuredData?: any[]
}


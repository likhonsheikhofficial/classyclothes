import { siteConfig } from "./seo-config"

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-dark.png`,
    sameAs: [siteConfig.socialLinks.facebook, siteConfig.socialLinks.instagram, siteConfig.socialLinks.youtube],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phoneNumber,
        contactType: "customer service",
        email: siteConfig.contactEmail,
        availableLanguage: ["English", "Bengali"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    foundingDate: siteConfig.foundingDate,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "OfficialWebsite",
        value: siteConfig.url,
        description: "This is the official website of Classy Clothes"
      },
      {
        "@type": "PropertyValue",
        name: "VerificationStatus",
        value: "Verified"
      }
    ],
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "isOfficialWebsite",
        value: "true",
      },
      {
        "@type": "PropertyValue",
        name: "securityProtocol",
        value: "HTTPS",
      },
    ],
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteConfig.name,
    image: `${siteConfig.url}/images/logo-dark.png`,
    "@id": `${siteConfig.url}/#clothingstore`,
    url: siteConfig.url,
    telephone: siteConfig.phoneNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.8103,
      longitude: 90.4125,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "23:00",
    },
    priceRange: "৳৳",
  }
}

export function generateProductSchema(product: {
  id: string
  name: string
  description: string
  price: number
  currency?: string
  image: string
  url: string
  availability: "InStock" | "OutOfStock"
  brand?: string
  sku?: string
  category?: string
  reviewCount?: number
  reviewRating?: number
}) {
  const { id, name, description, price, currency = "BDT", image, url, availability, brand, sku, category, reviewCount, reviewRating } = product

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku: sku || id,
    mpn: id,
    brand: brand
      ? {
          "@type": "Brand",
          name: brand,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price,
      availability: `https://schema.org/${availability}`,
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    ...(category && {
      category,
    }),
    ...(reviewCount &&
      reviewRating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: reviewRating,
          reviewCount,
        },
      }),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateScamAlertSchema(scamSite: {
  url: string
  name: string
  description: string
  detectedDate: string
  evidenceLinks?: string[]
  screenshots?: string[]
}) {
  const { url, name, description, detectedDate, evidenceLinks = [], screenshots = [] } = scamSite

  return {
    "@context": "https://schema.org",
    "@type": "WarningMessage",
    name: `Scam Alert: ${name}`,
    description: description,
    about: {
      "@type": "WebSite",
      url: url,
      name: name,
    },
    datePublished: detectedDate,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/scam/${url.replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/\./g, "-")}`,
    contentLocation: siteConfig.url,
    creativeWorkStatus: "Warning",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "warningType",
        value: "ScamWebsite"
      },
      {
        "@type": "PropertyValue",
        name: "officialWebsite",
        value: siteConfig.url
      },
      {
        "@type": "PropertyValue",
        name: "evidenceCount",
        value: evidenceLinks.length + screenshots.length
      }
    ],
    ...(evidenceLinks.length > 0 && {
      citation: evidenceLinks.map(link => ({
        "@type": "CreativeWork",
        url: link
      }))
    }),
    ...(screenshots.length > 0 && {
      image: screenshots.map(screenshot => ({
        "@type": "ImageObject",
        url: screenshot,
        contentUrl: screenshot,
        caption: `Screenshot evidence of scam website ${name}`
      }))
    })
  }
}

export function generateScamIndexSchema(scamSites: { url: string; name: string; description: string; detectedDate?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "List of Fake/Scam Websites Impersonating Classy Clothes",
    description: "A comprehensive list of fake websites that are impersonating Classy Clothes and copying our content without permission.",
    itemListOrder: "Unordered",
    numberOfItems: scamSites.length,
    itemListElement: scamSites.map((site, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WarningMessage",
        name: `Scam Alert: ${site.name}`,
        description: site.description,
        url: `${siteConfig.url}/scam/${site.url.replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/\./g, "-")}`,
        datePublished: site.detectedDate || new Date().toISOString(),
      },
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/scam`
    }
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  const { title, description, url, image, datePublished, dateModified = datePublished, author = siteConfig.name } = article

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo-dark.png`,
      },
    },
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished,
    dateModified,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "publishedOnOfficialWebsite",
        value: "true"
      }
    ]
  }
}

export function generateSiteVerificationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} - Official Website`,
    url: siteConfig.url,
    alternateName: "Classy Clothes Official Site",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "verificationStatus",
        value: "Verified Official"
      },
      {
        "@type": "PropertyValue",
        name: "securityProtocol",
        value: "HTTPS/TLS"
      },
      {
        "@type": "PropertyValue",
        name: "contentSecurityPolicy",
        value: "Strict"
      },
      {
        "@type": "PropertyValue",
        name: "fakeWebsiteWarning",
        value: "classyclothes.com.bd is a FAKE website copying our content without permission."
      }
    ]
  }
}

export function JsonLd({ data }: { data: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

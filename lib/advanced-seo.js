// Advanced SEO functionality for Classy Clothes
// Provides enhanced JSON-LD schemas and SEO features

const OFFICIAL_DOMAIN = 'classyclothes.coupons';

/**
 * Generates a comprehensive WebSite schema with verification information
 * @returns {Object} JSON-LD schema object
 */
function generateEnhancedWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `https://${OFFICIAL_DOMAIN}/#website`,
    'url': `https://${OFFICIAL_DOMAIN}`,
    'name': 'Classy Clothes - Official Designer Clothing Store',
    'description': 'The official online store for Classy Clothes designer fashion. Shop our authentic premium collection of clothes and accessories.',
    'publisher': {
      '@type': 'Organization',
      '@id': `https://${OFFICIAL_DOMAIN}/#organization`,
      'name': 'Classy Clothes',
      'logo': {
        '@type': 'ImageObject',
        '@id': `https://${OFFICIAL_DOMAIN}/#logo`,
        'url': `https://${OFFICIAL_DOMAIN}/images/logo.png`,
        'width': 180,
        'height': 60
      }
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `https://${OFFICIAL_DOMAIN}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    'alternateName': [
      'ClassyClothes',
      'Classy Clothes Official',
      'Classy Clothes Authentic'
    ],
    'sameAs': [
      'https://facebook.com/classyclothesofficial',
      'https://instagram.com/classyclothes_official',
      'https://twitter.com/classyclothes'
    ]
  };
}

/**
 * Generates enhanced Organization schema with verification details
 * @returns {Object} JSON-LD schema object
 */
function generateEnhancedOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `https://${OFFICIAL_DOMAIN}/#organization`,
    'url': `https://${OFFICIAL_DOMAIN}`,
    'name': 'Classy Clothes',
    'alternateName': 'Classy Clothes Official',
    'logo': {
      '@type': 'ImageObject',
      '@id': `https://${OFFICIAL_DOMAIN}/#logo`,
      'url': `https://${OFFICIAL_DOMAIN}/images/logo.png`,
      'width': 180,
      'height': 60
    },
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+8801712345678',
        'contactType': 'customer service',
        'areaServed': 'BD',
        'availableLanguage': ['English', 'Bengali']
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+8801712345679',
        'contactType': 'sales',
        'areaServed': 'BD',
        'availableLanguage': ['English', 'Bengali']
      },
      {
        '@type': 'ContactPoint',
        'email': 'security@classyclothes.coupons',
        'contactType': 'security issues',
        'areaServed': 'Worldwide'
      }
    ],
    'sameAs': [
      'https://facebook.com/classyclothesofficial',
      'https://instagram.com/classyclothes_official',
      'https://twitter.com/classyclothes'
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Fashion Avenue',
      'addressLocality': 'Dhaka',
      'addressRegion': 'Dhaka',
      'postalCode': '1212',
      'addressCountry': 'BD'
    }
  };
}

/**
 * Generates Local Business schema
 * @returns {Object} JSON-LD schema object
 */
function generateEnhancedLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `https://${OFFICIAL_DOMAIN}/#store`,
    'name': 'Classy Clothes Official Store',
    'image': `https://${OFFICIAL_DOMAIN}/images/storefront.jpg`,
    'logo': `https://${OFFICIAL_DOMAIN}/images/logo.png`,
    'telephone': '+8801712345678',
    'email': 'contact@classyclothes.coupons',
    'url': `https://${OFFICIAL_DOMAIN}`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Fashion Avenue',
      'addressLocality': 'Dhaka',
      'addressRegion': 'Dhaka',
      'postalCode': '1212',
      'addressCountry': 'BD'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '23.8103',
      'longitude': '90.4125'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        'opens': '10:00',
        'closes': '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '11:00',
        'closes': '18:00'
      }
    ],
    'priceRange': '৳৳-৳৳৳',
    'paymentAccepted': 'Cash, Credit Card, bKash, Nagad',
    'currenciesAccepted': 'BDT'
  };
}

/**
 * Generate BreadcrumbList schema
 * @param {Array} items - Array of breadcrumb items
 * @returns {Object} JSON-LD schema object
 */
function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Generates enhanced product schema
 * @param {Object} product - Product information
 * @returns {Object} JSON-LD schema object
 */
function generateEnhancedProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://${OFFICIAL_DOMAIN}/product/${product.slug}#product`,
    'name': product.name,
    'image': product.images.map(img => `https://${OFFICIAL_DOMAIN}${img}`),
    'description': product.description,
    'sku': product.sku,
    'mpn': product.mpn || product.sku,
    'brand': {
      '@type': 'Brand',
      'name': product.brand || 'Classy Clothes'
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://${OFFICIAL_DOMAIN}/product/${product.slug}`,
      'priceCurrency': 'BDT',
      'price': product.price,
      'priceValidUntil': product.priceValidUntil || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Classy Clothes Official Store',
        '@id': `https://${OFFICIAL_DOMAIN}/#organization`
      }
    },
    'aggregateRating': product.rating ? {
      '@type': 'AggregateRating',
      'ratingValue': product.rating.value,
      'ratingCount': product.rating.count
    } : undefined,
    'review': product.reviews ? product.reviews.map(review => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.rating
      },
      'author': {
        '@type': 'Person',
        'name': review.author
      },
      'reviewBody': review.content
    })) : undefined
  };
}

/**
 * Generates enhanced FAQPage schema
 * @param {Array} faqs - Array of FAQ objects with question and answer
 * @returns {Object} JSON-LD schema object
 */
function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Generates ScamAlert schema (custom extension)
 * @param {string} scamDomain - Domain of the scam site
 * @returns {Object} JSON-LD schema object
 */
function generateScamAlertSchema(scamDomain) {
  return {
    '@context': 'https://schema.org',
    '@type': ['SpecialAnnouncement', 'Warning'],
    'name': `Scam Alert: Fake website at ${scamDomain}`,
    'text': `Warning: ${scamDomain} is a fraudulent website impersonating our official site. Our only official website is ${OFFICIAL_DOMAIN}.`,
    'datePosted': new Date().toISOString().split('T')[0],
    'expires': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    'category': 'https://www.wikidata.org/wiki/Q328468',
    'announcementLocation': {
      '@type': 'WebSite',
      'name': 'Classy Clothes Official Website',
      'url': `https://${OFFICIAL_DOMAIN}`
    },
    'spatialCoverage': {
      '@type': 'Country',
      'name': 'Bangladesh'
    }
  };
}

/**
 * Generates verification information schema
 * @returns {Object} JSON-LD schema object
 */
function generateVerificationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://${OFFICIAL_DOMAIN}/verification#webpage`,
    'url': `https://${OFFICIAL_DOMAIN}/verification`,
    'name': 'Verify the Authentic Classy Clothes Website',
    'description': 'Learn how to verify you are on the official Classy Clothes website and protect yourself from scams and counterfeit sites.',
    'isPartOf': {
      '@id': `https://${OFFICIAL_DOMAIN}/#website`
    },
    'mainContentOfPage': {
      '@type': 'WebPageElement',
      'potentialAction': {
        '@type': 'ReadAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `https://${OFFICIAL_DOMAIN}/verification`
        }
      }
    },
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['article', '.verification-info']
    }
  };
}

module.exports = {
  generateEnhancedWebsiteSchema,
  generateEnhancedOrganizationSchema,
  generateEnhancedLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateEnhancedProductSchema,
  generateFAQSchema,
  generateScamAlertSchema,
  generateVerificationSchema
};

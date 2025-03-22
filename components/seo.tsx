import Head from 'next/head'
import { siteConfig } from '@/lib/seo-config'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  keywords?: string[]
  ogType?: 'website' | 'article' | 'product'
  children?: React.ReactNode
}

export function SEO({
  title,
  description = siteConfig.description,
  canonical,
  ogImage = siteConfig.ogImage,
  noindex = false,
  keywords = siteConfig.keywords,
  ogType = 'website',
  children,
}: SEOProps) {
  const siteTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:url" content={canonical || siteConfig.url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={siteConfig.twitter.cardType} />
      <meta name="twitter:site" content={siteConfig.twitter.site} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Facebook */}
      {siteConfig.facebook.appId && (
        <meta property="fb:app_id" content={siteConfig.facebook.appId} />
      )}
      
      {/* Additional tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="copyright" content={`Copyright ${new Date().getFullYear()} ${siteConfig.name}`} />
      <meta name="author" content={siteConfig.name} />
      <meta name="owner" content={siteConfig.name} />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Verification */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      <meta name="p:domain_verify" content="YOUR_PINTEREST_VERIFICATION_CODE" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.manifest" />
      
      {/* Additional custom tags */}
      {children}
    </Head>
  )
}


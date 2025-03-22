import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { ProfessionalFooter } from "@/components/professional-footer"
import { TickerHeader } from "@/components/ticker-header"
import { CopyrightProtection } from "@/components/copyright-protection"
import { JsonLd } from "@/lib/json-ld"
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/lib/json-ld"
import { siteConfig } from "@/lib/seo-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og-banner.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og-banner.jpg`],
    creator: siteConfig.twitter.handle,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.manifest",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    yahoo: "YOUR_YAHOO_VERIFICATION_CODE",
    other: {
      "official-website": siteConfig.url,
    },
  },
  other: {
    "X-Frame-Options": "deny",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebSiteSchema()} />
        <JsonLd data={generateLocalBusinessSchema()} />

        <ThemeProvider attribute="class" defaultTheme="light">
          <TickerHeader />
          <Header />
          <main className="min-h-screen">{children}</main>
          <ProfessionalFooter />
          <CopyrightProtection />
        </ThemeProvider>
      </body>
    </html>
  )
}


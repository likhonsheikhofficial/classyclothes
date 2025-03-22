import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, Clock, MapPin, ChevronRight } from "lucide-react"
import { siteConfig } from "@/lib/seo-config"

export function ProfessionalFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About Us */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-dark.png"
                alt="Classy Clothes"
                width={180}
                height={60}
                className="h-12 w-auto brightness-0 invert"
                fallbackSrc="/placeholder.svg?height=60&width=180"
              />
            </Link>
            <p className="mb-6 text-gray-400">
              Clothing serves many purposes. It can serve as protection from the elements, rough surfaces, sharp stones,
              rash-causing plants. Classy Clothes offers premium fashion with exclusive Pakistani dresses, Karchupi
              dresses, and more elegant clothing options.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-amber-400 shrink-0 mt-1" />
                <span className="text-gray-400">Mirpur 12, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-amber-400 shrink-0" />
                <span className="text-gray-400">{siteConfig.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-amber-400 shrink-0" />
                <span className="text-gray-400">{siteConfig.contactEmail}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-amber-400 shrink-0" />
                <span className="text-gray-400">{siteConfig.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/scam" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Scam Alert
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-returns"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Refund & Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/emergency-contacts"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/government-services"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Government Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Browse Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Browse</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/all-products"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/category/anarkali-dress"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Anarkali Dress
                </Link>
              </li>
              <li>
                <Link
                  href="/category/chikenkari"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Chikenkari
                </Link>
              </li>
              <li>
                <Link
                  href="/category/digital-print"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Digital Print
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dupatta-dress"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Dupatta Dress
                </Link>
              </li>
              <li>
                <Link
                  href="/category/four-piece"
                  className="text-gray-400 hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Four Piece
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center mt-2"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  View All Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Government Logos */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-white text-sm font-medium mb-3">Government Services</h4>
              <div className="bg-white p-2 rounded">
                <Image
                  src="/images/np-logo-set.png"
                  alt="Government of Bangladesh"
                  width={250}
                  height={40}
                  className="h-auto"
                />
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-3">Payment Methods</h4>
              <div className="flex items-center space-x-3">
                <div className="bg-pink-600 text-white p-1 rounded w-16 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold">bKash</span>
                </div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold text-black">COD</span>
                </div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold text-black">Atlos</span>
                </div>
              </div>
              <p className="text-xs mt-2 text-gray-400">bKash: 01325408283 (Merchant)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="container text-center text-sm">
          <p>&copy; {new Date().getFullYear()} copyright@classyclothes.coupons. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">
            All content and images on this website are protected by copyright law.
          </p>
          <p className="mt-2 text-xs">
            <Link href="https://classyclothes.coupons/" className="text-amber-400 hover:underline">
              https://classyclothes.coupons/
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}


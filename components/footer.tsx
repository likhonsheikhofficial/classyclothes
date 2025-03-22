import Link from "next/link"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { SafeImage } from "@/components/safe-image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <SafeImage
                src="/images/logo-dark.png"
                alt="Classy Clothes"
                width={180}
                height={60}
                className="h-12 w-auto brightness-0 invert"
                fallbackSrc="/placeholder.svg?height=60&width=180"
              />
            </Link>
            <p className="mb-6">
              Discover the latest fashion trends with our premium collection of clothing. Quality fabrics, stylish
              designs, and affordable prices.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/watch/classyclothesbd/"
                target="_blank"
                className="text-gray-300 hover:text-amber-400"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-amber-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-amber-400">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-amber-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-400">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-amber-400">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-amber-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund_returns" className="hover:text-amber-400">
                  Refund & Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-amber-400">
                  Shipping Information
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-amber-400 shrink-0 mt-1" />
                <span>Mirpur 12, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-amber-400 shrink-0" />
                <span>01732-757843</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-amber-400 shrink-0" />
                <span>classyclothes99@gmail.com</span>
              </li>
              <li className="mt-6">
                <h4 className="font-medium mb-2">Payment Methods</h4>
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
                <p className="text-xs mt-2">bKash: 01325408283 (Merchant)</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

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


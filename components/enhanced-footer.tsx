import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, Clock } from "lucide-react"
import { siteConfig } from "@/lib/seo-config"

export function EnhancedFooter() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-600 text-sm">
              Classy Clothes is a premium fashion boutique offering exclusive Pakistani dresses, Karchupi dresses, and
              more elegant clothing options.
            </p>
            <div className="flex items-center space-x-2">
              <Link href={siteConfig.socialLinks.facebook} className="text-gray-600 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.socialLinks.instagram} className="text-gray-600 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.socialLinks.youtube} className="text-gray-600 hover:text-red-600">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-primary">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/scam" className="text-gray-600 hover:text-primary">
                  Scam Alert
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-600">{siteConfig.phoneNumber}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-600">{siteConfig.contactEmail}</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-600">{siteConfig.businessHours}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Government Services</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/emergency-contacts" className="text-gray-600 hover:text-primary text-sm">
                Emergency Contacts
              </Link>
              <Link href="/government-services" className="text-gray-600 hover:text-primary text-sm">
                Government Services
              </Link>
              <div className="mt-2">
                <Image
                  src="/images/np-logo-set.png"
                  alt="Government of Bangladesh"
                  width={200}
                  height={30}
                  className="h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-500">
                Official website: <span className="font-semibold">classyclothes.coupons</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-artwork"></div>
    </footer>
  )
}


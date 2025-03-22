"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Heart, Menu, X, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { SafeImage } from "@/components/safe-image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const isMobile = useMobile()

  // Categories from our scanner
  const categories = [
    { name: "Anarkali Dress", href: "/category/anarkali-dress" },
    { name: "Chikenkari", href: "/category/chikenkari" },
    { name: "Dupatta Dress", href: "/category/dupatta-dress" },
    { name: "Karchupi Dress", href: "/category/karchupi-dress" },
    { name: "Kurti Dress", href: "/category/kurti-dress" },
    { name: "Pakistani Dress", href: "/category/pakistani-dress" },
    { name: "Velvet", href: "/category/velvet" },
    { name: "Tye Dye", href: "/category/tye-dye" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-amber-100 py-2 text-xs md:text-sm">
        <div className="container flex justify-between items-center">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>+8880708-797172</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>classyclothes99@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>09:00AM-11:00PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mx-auto md:mx-0">
            <Link
              href="https://www.facebook.com/watch/classyclothesbd/"
              target="_blank"
              className="hover:text-amber-700"
            >
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-amber-700">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-amber-700">
              <span className="sr-only">YouTube</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={cn("py-4 transition-all duration-300 bg-white", isScrolled && "shadow-md sticky top-0 z-50")}>
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <SafeImage
              src="/images/logo-dark.png"
              alt="Classy Clothes"
              width={180}
              height={60}
              className="h-12 w-auto"
              fallbackSrc="/placeholder.svg?height=60&width=180"
            />
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex relative max-w-md w-full mx-4">
            <Input
              type="search"
              placeholder="Search for products..."
              className="pr-10 border-amber-200 focus-visible:ring-amber-400"
            />
            <Button size="icon" variant="ghost" className="absolute right-0 top-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          {/* Navigation - desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/wishlist" className="flex items-center">
              <Heart className="h-5 w-5 mr-1" />
              <span className="sr-only">Wishlist</span>
            </Link>
            <Link href="/account" className="flex items-center">
              <User className="h-5 w-5 mr-1" />
              <span className="sr-only">Account</span>
            </Link>
            <Link href="/cart" className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">৳0.00</span>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="flex items-center space-x-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/cart" className="flex items-center">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b">
                    <Link href="/" className="flex items-center">
                      <SafeImage
                        src="/images/logo-dark.png"
                        alt="Classy Clothes"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                        fallbackSrc="/placeholder.svg?height=40&width=120"
                      />
                    </Link>
                  </div>
                  <nav className="flex flex-col space-y-4 py-6">
                    <Link href="/" className="text-lg font-medium hover:text-amber-700">
                      Home
                    </Link>
                    <Link href="/shop" className="text-lg font-medium hover:text-amber-700">
                      Shop
                    </Link>
                    <div className="py-2">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Categories</p>
                      <div className="space-y-2 pl-2">
                        {categories.map((category, index) => (
                          <Link key={index} href={category.href} className="block text-sm hover:text-amber-700">
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <Link href="/about" className="text-lg font-medium hover:text-amber-700">
                      About
                    </Link>
                    <Link href="/contact" className="text-lg font-medium hover:text-amber-700">
                      Contact
                    </Link>
                  </nav>
                  <div className="mt-auto border-t py-4">
                    <div className="flex flex-col space-y-2">
                      <Link href="/account" className="flex items-center hover:text-amber-700">
                        <User className="h-4 w-4 mr-2" />
                        <span>My Account</span>
                      </Link>
                      <Link href="/wishlist" className="flex items-center hover:text-amber-700">
                        <Heart className="h-4 w-4 mr-2" />
                        <span>Wishlist</span>
                      </Link>
                      <div className="flex items-center hover:text-amber-700">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>+8880708-797172</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="container py-3 md:hidden">
          <div className="relative">
            <Input type="search" placeholder="Search for products..." className="pr-10" autoFocus />
            <Button size="icon" variant="ghost" className="absolute right-0 top-0" onClick={() => setSearchOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}

      {/* Navigation - desktop */}
      <nav className="border-y border-gray-200 bg-white hidden md:block">
        <div className="container">
          <ul className="flex items-center justify-center space-x-8">
            <li>
              <Link href="/" className="block py-4 font-medium hover:text-amber-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="block py-4 font-medium hover:text-amber-700">
                Shop
              </Link>
            </li>
            <li className="relative group">
              <Link href="/categories" className="block py-4 font-medium hover:text-amber-700 flex items-center">
                Categories
              </Link>
              <div className="absolute left-0 top-full bg-white shadow-lg rounded-b-md p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link href={category.href} className="block hover:text-amber-700">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href="/all-products" className="block py-4 font-medium hover:text-amber-700">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-4 font-medium hover:text-amber-700">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-4 font-medium hover:text-amber-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}


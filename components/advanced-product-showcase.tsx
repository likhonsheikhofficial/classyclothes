"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Heart, Eye, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { githubImages } from "@/lib/image-utils"

interface ProductSpec {
  label: string
  value: string
}

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  rating: number
  reviewCount: number
  status: "instock" | "out-of-stock" | "coming-soon"
  badge?: string
  description: string
  specs?: ProductSpec[]
  colors?: string[]
  sizes?: string[]
  material?: string
  style?: string
  featured?: boolean
}

export function AdvancedProductShowcase() {
  const [activeTab, setActiveTab] = useState("premium")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Try to load images from GitHub, fallback to our provided images
  const premiumProducts: Product[] = [
    {
      id: 101,
      name: "Luxury Green Embroidered 4 Piece Set",
      price: 1590,
      originalPrice: 1890,
      discount: 16,
      images: [
        githubImages.fallback6 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472737328_1275086713522504_8842839363374572252_n.jpg-qtAWJd5fLgoqibTyjZ62xQ7JVkz86y.jpeg",
        githubImages.fallback7 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/471751254_1098995331963766_3299364578726151105_n-510x906.jpg-UoPVSEYUxn7Au7eb730cXcZow9muXz.jpeg",
        githubImages.fallback8 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472651392_951126490450657_8495947352288517701_n-768x1364.jpg-1ZUlfUoPMlCQCSV2RWZy0RbKhLzi3A.jpeg",
      ],
      rating: 4.9,
      reviewCount: 28,
      status: "instock",
      badge: "Bestseller",
      description:
        "Elegant 4-piece soft georgette set with intricate embroidery. Features a beautiful lime green color with gold detailing.",
      specs: [
        { label: "Collection", value: "ARISH4" },
        { label: "Pieces", value: "4 PIECES" },
        { label: "Material", value: "SOFT GEORGETTE" },
        { label: "Body Size", value: "58+" },
        { label: "Length", value: "44" },
      ],
      material: "Soft Georgette",
      style: "Pakistani",
      featured: true,
    },
    {
      id: 102,
      name: "Royal Maroon Embroidered Dress",
      price: 1750,
      originalPrice: 2050,
      discount: 15,
      images: [
        githubImages.fallback3 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/470050750_1635405710397861_546795963727033231_n-450x800.jpg-eUwBNNwjSxWuKaSziGQQXQtJsF5c7u.jpeg",
        githubImages.fallback4 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472698261_1625610081687444_6782496733444178873_n-450x800.jpg-n8DoYZvuRv6EEOLN3Sk09925KwbSV9.jpeg",
      ],
      rating: 4.8,
      reviewCount: 22,
      status: "instock",
      badge: "Premium",
      description:
        "Luxurious maroon dress with intricate gold embroidery. Perfect for special occasions and celebrations.",
      specs: [
        { label: "Material", value: "Premium Velvet" },
        { label: "Style", value: "Party Wear" },
        { label: "Embroidery", value: "Gold Thread Work" },
      ],
      material: "Premium Velvet",
      style: "Party Wear",
      featured: true,
    },
    {
      id: 103,
      name: "Navy Blue & Green Tie Dye Dress",
      price: 1690,
      originalPrice: 1990,
      discount: 15,
      images: [
        githubImages.fallback1 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/470051725_2284144615292130_6214991531007715872_n-248x441.jpg-iNmaX3twNdijCe5YxqqIlFsNc2LQVl.jpeg",
        githubImages.fallback5 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472735814_2891904920969299_1067800926369599801_n-510x906.jpg-fLGHN3mu9kFa6ewKleUMK4r7btURm1.jpeg",
      ],
      rating: 4.7,
      reviewCount: 19,
      status: "instock",
      badge: "New Arrival",
      description:
        "Stylish navy blue and green tie-dye dress with elegant design. Perfect for casual and semi-formal occasions.",
      specs: [
        { label: "Material", value: "Premium Cotton" },
        { label: "Style", value: "Tie Dye" },
        { label: "Pattern", value: "Contemporary" },
      ],
      material: "Premium Cotton",
      style: "Casual",
      featured: true,
    },
    {
      id: 104,
      name: "Pink Bahar Embroidered Dress",
      price: 1650,
      originalPrice: 1950,
      discount: 15,
      images: [
        githubImages.fallback2 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/471922340_1577636339539260_5805563369956890671_n-248x440.jpg-HFgPGgm81dHVbY7HvbsBRNhZqKrH8s.jpeg",
        githubImages.fallback9 ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/470056718_1812125596278749_2631955118084934088_n-865x1536.jpg-o4gia0ewtKGsYiyhw75v3pIe1lBvv8.jpeg",
      ],
      rating: 4.6,
      reviewCount: 16,
      status: "instock",
      badge: "Limited",
      description:
        "Beautiful pink embroidered dress with intricate detailing. Perfect for festive occasions and celebrations.",
      specs: [
        { label: "Collection", value: "BAHAR" },
        { label: "Inner", value: "Included" },
        { label: "Material", value: "Mixed" },
        { label: "Body Size", value: "46" },
      ],
      material: "Mixed Fabric",
      style: "Pakistani",
      featured: true,
    },
  ]

  const featuredProducts = premiumProducts.filter((product) => product.featured)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1))
  }

  // Add copyright notice to console
  useEffect(() => {
    console.log(
      "%c ⚠️ PRODUCT IMAGES COPYRIGHT NOTICE ⚠️ ",
      "background: #ff0000; color: white; font-size: 14px; font-weight: bold; padding: 5px;",
    )
    console.log(
      "%c All product images are protected by copyright@classyclothes.coupons",
      "font-size: 12px; padding: 5px;",
    )
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-playfair mb-4">Premium Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive premium collection featuring handcrafted designs, luxurious fabrics, and exquisite
            embroidery
          </p>
        </div>

        {/* Featured Product Slider */}
        <div className="relative mb-16 overflow-hidden rounded-xl shadow-lg">
          <div className="aspect-[16/9] md:aspect-[21/9] relative">
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product, index) => (
                <div key={index} className="min-w-full h-full relative">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                    data-copyright="copyright@classyclothes.coupons"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                    <div className="container">
                      <div className="max-w-lg text-white space-y-5 p-6">
                        {product.badge && (
                          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">{product.badge}</Badge>
                        )}
                        <h3 className="text-3xl md:text-4xl font-bold font-playfair">{product.name}</h3>
                        <div className="flex items-center">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm">
                            {product.rating} ({product.reviewCount} reviews)
                          </span>
                        </div>
                        <p className="text-lg opacity-90">{product.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">৳{product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-lg line-through opacity-70">
                              ৳{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          {product.discount && (
                            <Badge variant="outline" className="text-white border-amber-400">
                              {product.discount}% OFF
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-4 pt-2">
                          <Button size="lg" className="bg-white text-black hover:bg-amber-100">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Add to Cart
                          </Button>
                          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentSlide(index)}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Categories Tabs */}
        <Tabs defaultValue="premium" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-amber-50">
              <TabsTrigger value="premium" className="px-6">
                Premium Collection
              </TabsTrigger>
              <TabsTrigger value="new" className="px-6">
                New Arrivals
              </TabsTrigger>
              <TabsTrigger value="bestsellers" className="px-6">
                Bestsellers
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="premium" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative">
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 z-10 bg-amber-500 hover:bg-amber-600 text-white">
                        {product.badge}
                      </Badge>
                    )}
                    <div className="aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={533}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                        }}
                        data-copyright="copyright@classyclothes.coupons"
                      />
                    </div>
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="rounded-full h-9 w-9">
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Add to wishlist</span>
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full h-9 w-9">
                        <Eye className="h-5 w-5" />
                        <span className="sr-only">Quick view</span>
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full h-9 w-9">
                        <Info className="h-5 w-5" />
                        <span className="sr-only">Product info</span>
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <h3 className="font-medium line-clamp-2 h-12 mb-1">
                      <Link href={`/product/${product.id}`} className="hover:text-amber-700">
                        {product.name}
                      </Link>
                    </h3>
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-bold">৳{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {product.specs && (
                      <div className="space-y-1 mb-4">
                        {product.specs.slice(0, 3).map((spec, index) => (
                          <div key={index} className="flex items-center text-xs">
                            <span className="font-medium w-20">{spec.label}:</span>
                            <span className="text-muted-foreground">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 mt-2">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                View All Premium Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-8">
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">New arrivals coming soon!</p>
            </div>
          </TabsContent>

          <TabsContent value="bestsellers" className="space-y-8">
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Bestsellers coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Product Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-amber-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-700"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-muted-foreground">
              Our products are crafted with the finest materials and attention to detail for exceptional quality.
            </p>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-700"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Handcrafted Designs</h3>
            <p className="text-muted-foreground">
              Each piece is meticulously handcrafted by skilled artisans to create unique and beautiful designs.
            </p>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-700"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-muted-foreground">
              We prioritize your satisfaction with exceptional customer service and high-quality products.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


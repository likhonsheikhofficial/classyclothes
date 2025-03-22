import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { FeaturedCollection } from "@/components/featured-collection"
import { Newsletter } from "@/components/newsletter"
import { Testimonials } from "@/components/testimonials"
import { HeroSlider } from "@/components/hero-slider"
import { AdvancedProductShowcase } from "@/components/advanced-product-showcase"
import { FacebookVideoShowcase } from "@/components/facebook-video-showcase"
import { getLocalProductImage } from "@/lib/image-loader"
import { SiteVerification } from "@/components/site-verification"
import { VerificationBanner } from "@/components/verification-banner"
import { GovernmentLogos } from "@/components/government-logos"

export default function Home() {
  // Product data with local images
  const featuredProducts = [
    {
      id: 1,
      name: "Exclusive embroidery pakistani pattern dress",
      price: 1690,
      image: getLocalProductImage(3),
      rating: 4.8,
      reviewCount: 24,
      status: "instock",
      badge: "Featured",
    },
    {
      id: 2,
      name: "Exclusive heavy karchupi dress",
      price: 1750,
      image: getLocalProductImage(5),
      rating: 4.7,
      reviewCount: 18,
      status: "instock",
    },
    {
      id: 3,
      name: "Exclusive embroidery dress",
      price: 1650,
      image: getLocalProductImage(2),
      rating: 4.5,
      reviewCount: 12,
      status: "instock",
      badge: "New",
    },
    {
      id: 4,
      name: "Exclusive Pakistani dress",
      price: 2090,
      image: getLocalProductImage(0),
      rating: 4.9,
      reviewCount: 32,
      status: "instock",
    },
  ]

  const trendingProducts = [
    {
      id: 5,
      name: "Luxury Shiny Chiffon Materials with Real NC Stone Work",
      price: 2250,
      image: getLocalProductImage(4),
      rating: 4.6,
      reviewCount: 15,
      status: "instock",
      badge: "Trending",
    },
    {
      id: 6,
      name: "Gorgeous Three Piece Dress",
      price: 1950,
      image: getLocalProductImage(1),
      rating: 4.4,
      reviewCount: 9,
      status: "instock",
    },
    {
      id: 7,
      name: "Exclusive Three Piece Dress",
      price: 1850,
      image: getLocalProductImage(3),
      rating: 4.3,
      reviewCount: 7,
      status: "instock",
    },
    {
      id: 8,
      name: "Gorgeous Party Stone Dress",
      price: 1790,
      image: getLocalProductImage(5),
      rating: 4.7,
      reviewCount: 21,
      status: "instock",
      badge: "Sale",
    },
  ]

  // Category data with local images
  const categories = [
    {
      name: "Anarkali Dress",
      count: 5,
      image: getLocalProductImage(2),
    },
    {
      name: "Chikenkari",
      count: 8,
      image: getLocalProductImage(3),
    },
    {
      name: "Dupatta Dress",
      count: 12,
      image: getLocalProductImage(5),
    },
    {
      name: "Karchupi Dress",
      count: 15,
      image: getLocalProductImage(0),
    },
    {
      name: "Kurti Dress",
      count: 10,
      image: getLocalProductImage(1),
    },
    {
      name: "Pakistani Dress",
      count: 20,
      image: getLocalProductImage(4),
    },
  ]

  // Collections based on product types with local images
  const collections = [
    {
      title: "Eid Collection",
      description: "Celebrate in style with our exclusive Eid collection",
      image: getLocalProductImage(3),
      link: "/collections/eid",
    },
    {
      title: "Stone Work Collection",
      description: "Elegant stone work dresses for special occasions",
      image: getLocalProductImage(0),
      link: "/collections/stone-work",
    },
    {
      title: "Three Piece Collection",
      description: "Complete your look with our three piece ensembles",
      image: getLocalProductImage(4),
      link: "/collections/three-piece",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <VerificationBanner />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Main content area */}
          <div className="space-y-6">
            <section className="max-w-4xl mx-auto">
              <SiteVerification />
            </section>

            {/* Rest of your homepage content */}
            {/* Hero Slider */}
            <HeroSlider />

            {/* Advanced Product Showcase */}
            <AdvancedProductShowcase />

            {/* Facebook Video Showcase */}
            <FacebookVideoShowcase />

            {/* Categories Section */}
            <section className="py-16">
              <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                  <div>
                    <h2 className="text-3xl font-bold font-playfair">Shop by Category</h2>
                    <p className="text-muted-foreground mt-2">Browse our collection by category</p>
                  </div>
                  <Link
                    href="/categories"
                    className="flex items-center text-amber-700 hover:text-amber-800 mt-4 md:mt-0"
                  >
                    View All Categories
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map((category, index) => (
                    <CategoryCard
                      key={index}
                      name={category.name}
                      image={category.image}
                      count={category.count}
                      href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
              <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                  <div>
                    <h2 className="text-3xl font-bold font-playfair">Featured Products</h2>
                    <p className="text-muted-foreground mt-2">Handpicked products for you</p>
                  </div>
                  <Link href="/shop" className="flex items-center text-amber-700 hover:text-amber-800 mt-4 md:mt-0">
                    View All Products
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      href={`/product/${product.id}`}
                      badge={product.badge}
                      status={product.status}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Collections Section */}
            <section className="py-16">
              <div className="container">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold font-playfair">Our Collections</h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Discover our specially curated collections for every occasion
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {collections.map((collection, index) => (
                    <FeaturedCollection
                      key={index}
                      title={collection.title}
                      description={collection.description}
                      image={collection.image}
                      href={collection.link}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Trending Products */}
            <section className="py-16 bg-amber-50">
              <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                  <div>
                    <h2 className="text-3xl font-bold font-playfair">Trending Now</h2>
                    <p className="text-muted-foreground mt-2">Our most popular products this season</p>
                  </div>
                  <Link href="/trending" className="flex items-center text-amber-700 hover:text-amber-800 mt-4 md:mt-0">
                    View All Trending
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {trendingProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      href={`/product/${product.id}`}
                      badge={product.badge}
                      status={product.status}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* Newsletter */}
            <Newsletter />
          </div>
        </div>

        <div className="md:col-span-1">
          {/* Sidebar */}
          <div className="space-y-6">
            <GovernmentLogos />
            {/* Other sidebar widgets */}
          </div>
        </div>
      </div>
    </div>
  )
}


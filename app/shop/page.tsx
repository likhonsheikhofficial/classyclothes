import type { Metadata } from "next"
import Link from "next/link"
import { ChevronDown, Grid3X3, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCard } from "@/components/product-card"

export const metadata: Metadata = {
  title: "Shop | Classy Clothes",
  description: "Browse our collection of premium clothing items",
}

export default function ShopPage() {
  // Product data from our scanner with real images
  const products = [
    {
      id: 1,
      name: "Exclusive embroidery pakistani pattern dress",
      price: 1690,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-1.jpg",
      rating: 4.8,
      reviewCount: 24,
      status: "instock",
      badge: "Featured",
    },
    {
      id: 2,
      name: "Exclusive heavy karchupi dress",
      price: 1750,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-1.jpg",
      rating: 4.7,
      reviewCount: 18,
      status: "instock",
    },
    {
      id: 3,
      name: "Exclusive embroidery dress",
      price: 1650,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-1.jpg",
      rating: 4.5,
      reviewCount: 12,
      status: "instock",
      badge: "New",
    },
    {
      id: 4,
      name: "Exclusive Pakistani dress",
      price: 2090,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/4-1.jpg",
      rating: 4.9,
      reviewCount: 32,
      status: "instock",
    },
    {
      id: 5,
      name: "Luxury Shiny Chiffon Materials with Real NC Stone Work",
      price: 2250,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/d50.jpg",
      rating: 4.6,
      reviewCount: 15,
      status: "instock",
      badge: "Trending",
    },
    {
      id: 6,
      name: "Gorgeous Three Piece Dress",
      price: 1950,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/Golapi.jpg",
      rating: 4.4,
      reviewCount: 9,
      status: "instock",
    },
    {
      id: 7,
      name: "Exclusive Three Piece Dress",
      price: 1850,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/Mint.jpg",
      rating: 4.3,
      reviewCount: 7,
      status: "instock",
    },
    {
      id: 8,
      name: "Gorgeous Party Stone Dress",
      price: 1790,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/sg50.jpg",
      rating: 4.7,
      reviewCount: 21,
      status: "instock",
      badge: "Sale",
    },
    {
      id: 9,
      name: "Exclusive embroidery chiffon dress",
      price: 2250,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-2.jpg",
      rating: 4.2,
      reviewCount: 8,
      status: "out-of-stock",
    },
    {
      id: 10,
      name: "Exclusive Pakistani pattern dress",
      price: 2150,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-2.jpg",
      rating: 4.6,
      reviewCount: 14,
      status: "instock",
    },
    {
      id: 11,
      name: "Exclusive light jorget ari work dress",
      price: 1590,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-2.jpg",
      rating: 4.4,
      reviewCount: 11,
      status: "instock",
    },
    {
      id: 12,
      name: "Gharara",
      price: 2450,
      image: "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/Gharara.jpg",
      rating: 4.8,
      reviewCount: 19,
      status: "instock",
      badge: "New",
    },
  ]

  // Category data from our scanner
  const categories = [
    { name: "Anarkali Dress", count: 5 },
    { name: "Chikenkari", count: 8 },
    { name: "Dupatta Dress", count: 12 },
    { name: "Karchupi Dress", count: 15 },
    { name: "Kurti Dress", count: 10 },
    { name: "Pakistani Dress", count: 20 },
    { name: "Velvet", count: 7 },
    { name: "Tye Dye", count: 6 },
    { name: "Stone Dress", count: 4 },
    { name: "Three Piece", count: 9 },
  ]

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Shop</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4">Filter Products</h3>

              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`category-${index}`} />
                          <label
                            htmlFor={`category-${index}`}
                            className="text-sm flex items-center justify-between w-full"
                          >
                            <span>{category.name}</span>
                            <span className="text-muted-foreground">({category.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Input type="number" placeholder="Min" className="w-full" />
                        <span>-</span>
                        <Input type="number" placeholder="Max" className="w-full" />
                      </div>
                      <Button className="w-full">Apply</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="availability">
                  <AccordionTrigger>Availability</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="in-stock" />
                        <label htmlFor="in-stock" className="text-sm">
                          In Stock
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="out-of-stock" />
                        <label htmlFor="out-of-stock" className="text-sm">
                          Out of Stock
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Shop header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Shop</h1>
              <p className="text-muted-foreground">Showing {products.length} products</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Select defaultValue="latest">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-none">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronDown className="h-4 w-4 rotate-90" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronDown className="h-4 w-4 -rotate-90" />
                <span className="sr-only">Next page</span>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}


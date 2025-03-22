import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Star, Truck, RefreshCw, Shield, Minus, Plus, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"

export const metadata: Metadata = {
  title: "Product Details | Classy Clothes",
  description: "View detailed information about our products",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  // This would normally come from a database or API
  const products = [
    {
      id: "1",
      name: "Exclusive embroidery pakistani pattern dress",
      price: 1690,
      originalPrice: 1990,
      discount: 15,
      description:
        "This beautiful Pakistani pattern dress features intricate embroidery work on premium quality fabric. Perfect for special occasions and festive celebrations.",
      images: [
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-1.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-2.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-3.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-5.jpg",
      ],
      rating: 4.8,
      reviewCount: 24,
      status: "instock",
      sku: "CC-PKD-001",
      categories: ["Pakistani Dress", "Embroidery"],
      tags: ["Exclusive", "Premium", "Festive"],
      features: [
        "Premium quality fabric",
        "Intricate embroidery work",
        "Comfortable fit",
        "Elegant design",
        "Perfect for special occasions",
      ],
      specifications: {
        Material: "Cotton Blend",
        Style: "Pakistani",
        Occasion: "Festive, Party, Casual",
        Sleeve: "Full Sleeve",
        Neck: "Round Neck",
        Pattern: "Embroidered",
        Wash: "Hand Wash",
      },
    },
    {
      id: "2",
      name: "Exclusive heavy karchupi dress",
      price: 1750,
      originalPrice: 2050,
      discount: 15,
      description:
        "This exquisite karchupi dress features detailed handwork on premium fabric. The intricate karchupi embroidery makes it perfect for special occasions.",
      images: [
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-1.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-2.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-3.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-4.jpg",
      ],
      rating: 4.7,
      reviewCount: 18,
      status: "instock",
      sku: "CC-KAR-002",
      categories: ["Karchupi Dress", "Embroidery"],
      tags: ["Exclusive", "Premium", "Festive"],
      features: [
        "Premium quality fabric",
        "Detailed karchupi work",
        "Comfortable fit",
        "Elegant design",
        "Perfect for special occasions",
      ],
      specifications: {
        Material: "Georgette",
        Style: "Traditional",
        Occasion: "Festive, Party, Wedding",
        Sleeve: "Full Sleeve",
        Neck: "Round Neck",
        Pattern: "Karchupi Embroidered",
        Wash: "Dry Clean Only",
      },
    },
    {
      id: "3",
      name: "Exclusive embroidery dress",
      price: 1650,
      originalPrice: 1950,
      discount: 15,
      description:
        "This elegant embroidery dress features beautiful needlework on high-quality fabric. The detailed embroidery makes it a perfect choice for special events.",
      images: [
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-1.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-2.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-3.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-4.jpg",
      ],
      rating: 4.5,
      reviewCount: 12,
      status: "instock",
      sku: "CC-EMB-003",
      categories: ["Embroidery", "Party Wear"],
      tags: ["Exclusive", "Premium", "Elegant"],
      features: [
        "Premium quality fabric",
        "Detailed embroidery work",
        "Comfortable fit",
        "Elegant design",
        "Perfect for special occasions",
      ],
      specifications: {
        Material: "Chiffon",
        Style: "Modern",
        Occasion: "Party, Casual, Evening",
        Sleeve: "Three-Quarter Sleeve",
        Neck: "V-Neck",
        Pattern: "Embroidered",
        Wash: "Hand Wash",
      },
    },
    {
      id: "4",
      name: "Exclusive Pakistani dress",
      price: 2090,
      originalPrice: 2490,
      discount: 16,
      description:
        "This premium Pakistani dress features luxurious fabric and exquisite craftsmanship. The traditional Pakistani design makes it perfect for festive occasions.",
      images: [
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/4-1.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-6.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-5.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-4.jpg",
      ],
      rating: 4.9,
      reviewCount: 32,
      status: "instock",
      sku: "CC-PKD-004",
      categories: ["Pakistani Dress", "Premium"],
      tags: ["Exclusive", "Luxury", "Festive"],
      features: [
        "Luxury quality fabric",
        "Traditional Pakistani design",
        "Comfortable fit",
        "Elegant craftsmanship",
        "Perfect for festive occasions",
      ],
      specifications: {
        Material: "Silk Blend",
        Style: "Pakistani",
        Occasion: "Festive, Wedding, Party",
        Sleeve: "Full Sleeve",
        Neck: "Round Neck",
        Pattern: "Traditional",
        Wash: "Dry Clean Only",
      },
    },
    {
      id: "5",
      name: "Luxury Shiny Chiffon Materials with Real NC Stone Work",
      price: 2250,
      originalPrice: 2650,
      discount: 15,
      description:
        "This luxury dress features real NC stone work on premium shiny chiffon material. The exquisite stone detailing makes it perfect for special occasions.",
      images: [
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/d50.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/1-5.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/2-4.jpg",
        "https://classyclothes.com.bd/wp-content/uploads/2023/12/Attachment/3-3.jpg",
      ],
      rating: 4.6,
      reviewCount: 15,
      status: "instock",
      sku: "CC-STN-005",
      categories: ["Stone Dress", "Luxury"],
      tags: ["Premium", "Stone Work", "Party Wear"],
      features: [
        "Premium shiny chiffon material",
        "Real NC stone work",
        "Comfortable fit",
        "Luxury design",
        "Perfect for special occasions",
      ],
      specifications: {
        Material: "Shiny Chiffon",
        Style: "Luxury",
        Occasion: "Party, Wedding, Evening",
        Sleeve: "Full Sleeve",
        Neck: "Round Neck",
        Pattern: "Stone Work",
        Wash: "Dry Clean Only",
      },
    },
  ]

  const product = products.find((p) => p.id === params.id) || products[0]

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== params.id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images[0],
      rating: p.rating,
      reviewCount: p.reviewCount,
      status: p.status,
    }))

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="text-muted-foreground hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={800}
              className="w-full h-auto"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-2xl font-bold">৳{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
                <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  {product.discount}% Off
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center">
              <span className="w-24 text-sm font-medium">SKU:</span>
              <span className="text-sm text-muted-foreground">{product.sku}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm font-medium">Categories:</span>
              <div className="flex flex-wrap gap-1">
                {product.categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {category}
                    {index < product.categories.length - 1 ? ", " : ""}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm font-medium">Tags:</span>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {tag}
                    {index < product.tags.length - 1 ? ", " : ""}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">1</span>
                <Button variant="ghost" size="icon" className="rounded-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700">Add to Cart</Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Truck className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">On all orders over ৳2000</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <RefreshCw className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-medium">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-medium">Secure Payments</h4>
                <p className="text-sm text-muted-foreground">Protected by bKash</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-600 py-3 px-6"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-600 py-3 px-6"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-600 py-3 px-6"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="space-y-4">
              <p>{product.description}</p>
              <h3 className="text-lg font-medium mt-4">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium">{key}</td>
                      <td className="py-3 px-4">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Based on {product.reviewCount} reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-4">
                {/* Sample reviews */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Fatima Ahmed</h4>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < 5 ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">
                    The quality of this dress is exceptional. The embroidery work is beautiful and the fabric is
                    comfortable. Highly recommend!
                  </p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Nusrat Rahman</h4>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < 4 ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">
                    I ordered this for a wedding and received so many compliments! The fit was perfect and the design is
                    elegant.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              reviewCount={product.reviewCount}
              href={`/product/${product.id}`}
              status={product.status}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


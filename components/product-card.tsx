import Link from "next/link"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SafeImage } from "@/components/safe-image"

interface ProductCardProps {
  name: string
  price: number
  image: string
  rating: number
  reviewCount: number
  href: string
  badge?: string
  status?: string
}

export function ProductCard({ name, price, image, rating, reviewCount, href, badge, status }: ProductCardProps) {
  return (
    <div className="group relative">
      {badge && (
        <Badge className="absolute top-2 left-2 z-10 bg-amber-500 hover:bg-amber-600 text-white">{badge}</Badge>
      )}
      {status === "out-of-stock" && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-md">
          <Badge className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1">Out of Stock</Badge>
        </div>
      )}
      <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-md bg-gray-100">
        <Link href={href}>
          <SafeImage
            src={image}
            alt={name}
            width={300}
            height={400}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            fallbackSrc="/placeholder.svg?height=400&width=300"
          />
        </Link>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick view</span>
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">
              {rating} ({reviewCount})
            </span>
          </div>
        </div>
        <h3 className="text-sm font-medium line-clamp-2 h-10">
          <Link href={href}>{name}</Link>
        </h3>
        <p className="font-medium">৳{price.toLocaleString()}</p>
        <Button className="w-full bg-amber-600 hover:bg-amber-700" disabled={status === "out-of-stock"}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {status === "out-of-stock" ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}


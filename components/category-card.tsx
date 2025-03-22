import Link from "next/link"
import { SafeImage } from "@/components/safe-image"

interface CategoryCardProps {
  name: string
  image: string
  count: number
  href: string
}

export function CategoryCard({ name, image, count, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-square w-full">
          <SafeImage
            src={image}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            fallbackSrc="/placeholder.svg?height=300&width=300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="text-white">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-white/80">{count} products</p>
          </div>
        </div>
      </div>
    </Link>
  )
}


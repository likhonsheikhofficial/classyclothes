import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SafeImage } from "@/components/safe-image"

interface FeaturedCollectionProps {
  title: string
  description: string
  image: string
  href: string
}

export function FeaturedCollection({ title, description, image, href }: FeaturedCollectionProps) {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <SafeImage
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        fallbackSrc="/placeholder.svg?height=400&width=300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
        <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <Button asChild className="w-fit bg-white text-black hover:bg-amber-100">
          <Link href={href}>Shop Collection</Link>
        </Button>
      </div>
    </div>
  )
}


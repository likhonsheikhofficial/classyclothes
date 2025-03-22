"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SafeImage } from "@/components/safe-image"
import { getLocalProductImage } from "@/lib/image-loader"

const slides = [
  {
    image: "/images/banner.jpg",
    title: "Exclusive Pakistani Collection",
    subtitle: "Discover our premium Pakistani-inspired designs",
    cta: "Shop Now",
    link: "/collections/pakistani",
  },
  {
    image: getLocalProductImage(1),
    title: "Eid Special Collection",
    subtitle: "Celebrate in style with our festive collection",
    cta: "Explore Collection",
    link: "/collections/eid",
  },
  {
    image: getLocalProductImage(4),
    title: "Stone Work Elegance",
    subtitle: "Handcrafted stone work for special occasions",
    cta: "View Collection",
    link: "/collections/stone-work",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full h-full">
            <SafeImage
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              fallbackSrc="/placeholder.svg?height=800&width=1200"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="container">
                <div className="max-w-lg text-white space-y-5">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white">New Collection</Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair">{slide.title}</h1>
                  <p className="text-lg opacity-90">{slide.subtitle}</p>
                  <Button size="lg" className="bg-white text-black hover:bg-amber-100">
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  )
}


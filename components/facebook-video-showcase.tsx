"use client"

import { useState } from "react"
import { FacebookVideo } from "@/components/facebook-video"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const FACEBOOK_VIDEOS = [
  "https://www.facebook.com/watch/?v=965527155770343",
  "https://www.facebook.com/watch/?v=965525782437147",
  "https://www.facebook.com/watch/?v=965528372436888",
]

export function FacebookVideoShowcase() {
  const [currentVideo, setCurrentVideo] = useState(0)

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev === FACEBOOK_VIDEOS.length - 1 ? 0 : prev + 1))
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev === 0 ? FACEBOOK_VIDEOS.length - 1 : prev - 1))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-playfair">Our Latest Collections</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Watch our latest fashion videos showcasing our newest designs and collections
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <FacebookVideo
              videoUrl={FACEBOOK_VIDEOS[currentVideo]}
              width="100%"
              height="100%"
              showText={false}
              autoplay={false}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
            onClick={prevVideo}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous video</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
            onClick={nextVideo}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next video</span>
          </Button>

          <div className="flex justify-center mt-4 space-x-2">
            {FACEBOOK_VIDEOS.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${currentVideo === index ? "bg-amber-600" : "bg-gray-300"}`}
                onClick={() => setCurrentVideo(index)}
              >
                <span className="sr-only">Video {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <a href="https://www.facebook.com/watch/classyclothesbd/" target="_blank" rel="noopener noreferrer">
              View More Videos
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}


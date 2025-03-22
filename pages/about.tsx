import type { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/seo-config"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, MapPin, Phone, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about Classy Clothes, a premium fashion boutique offering exclusive Pakistani dresses, Karchupi dresses, and more elegant clothing options."
        ogType="website"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Classy Clothes",
          description:
            "Learn more about Classy Clothes, a premium fashion boutique offering exclusive Pakistani dresses, Karchupi dresses, and more elegant clothing options.",
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/images/logo-dark.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/about`,
          },
        }}
      />

      <div className="container mx-auto py-12">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-12">
          <Image
            src="/images/about-hero.jpg"
            alt="About Classy Clothes"
            fill
            className="object-cover"
            priority
            fallbackSrc="/placeholder.svg?height=400&width=1200"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="container">
              <div className="max-w-lg text-white p-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                <p className="text-lg opacity-90">
                  Discover the story behind Classy Clothes and our commitment to quality and style
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4">
              <p>
                Classy Clothes was founded with a passion for bringing premium quality fashion to Bangladesh. Our
                journey began in 2020 when we recognized the growing demand for high-quality Pakistani and traditional
                Bangladeshi clothing that combines elegance with comfort.
              </p>
              <p>
                What started as a small boutique has grown into a trusted name in the fashion industry, known for our
                exclusive collections of Pakistani dresses, Karchupi dresses, and other elegant clothing options.
              </p>
              <p>
                We take pride in our commitment to quality, craftsmanship, and customer satisfaction. Each piece in our
                collection is carefully selected to ensure that our customers receive only the best.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/images/about-story.jpg"
              alt="Our Story"
              fill
              className="object-cover"
              fallbackSrc="/placeholder.svg?height=400&width=600"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p className="text-gray-600">
                    We are committed to providing the highest quality clothing. Each item is carefully inspected to
                    ensure it meets our standards before reaching our customers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
                  <p className="text-gray-600">
                    Our customers are at the heart of everything we do. We strive to provide exceptional service and a
                    shopping experience that exceeds expectations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                  <p className="text-gray-600">
                    We take pride in offering authentic designs that reflect the rich cultural heritage of Pakistani and
                    Bangladeshi fashion while incorporating modern trends.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  We source the finest fabrics and materials to ensure our clothing is not only beautiful but also
                  comfortable and durable.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Exclusive Designs</h3>
                <p className="text-gray-600">
                  Our collections feature unique designs that you won't find elsewhere, allowing you to stand out with
                  your personal style.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Affordable Luxury</h3>
                <p className="text-gray-600">
                  We believe that luxury fashion should be accessible. Our pricing is competitive without compromising
                  on quality.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Excellent Customer Service</h3>
                <p className="text-gray-600">
                  Our dedicated team is always ready to assist you with any questions or concerns, ensuring a smooth
                  shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Our Location</h3>
                  <p className="text-gray-600">Mirpur 12, Dhaka, Bangladesh</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <p className="text-gray-600">{siteConfig.phoneNumber}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-gray-600">{siteConfig.contactEmail}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-amber-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Our Collection?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Discover our exclusive range of Pakistani dresses, Karchupi dresses, and more. Experience the perfect blend
            of tradition and contemporary fashion.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}


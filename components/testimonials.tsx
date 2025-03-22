import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      text: "The quality of the Kurti I received was exceptional. The fabric is comfortable and the design is exactly as shown in the pictures. Will definitely shop again!",
      name: "Fatima Ahmed",
      location: "Dhaka",
      rating: 5,
    },
    {
      text: "I ordered a Pakistani dress for a wedding and received so many compliments! The embroidery work is beautiful and the fit was perfect. Highly recommend!",
      name: "Nusrat Rahman",
      location: "Chittagong",
      rating: 5,
    },
    {
      text: "Fast delivery and excellent customer service! The Chikenkari dress I ordered had a small issue, but the team was quick to resolve it. Very satisfied with my purchase.",
      name: "Tasneem Khan",
      location: "Sylhet",
      rating: 5,
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-playfair">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Don't just take our word for it, hear what our customers have to say about our products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>
                <p className="mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


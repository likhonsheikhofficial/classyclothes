import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-16 bg-amber-100">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Stay updated with our latest collections, exclusive offers, and fashion tips
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1" required />
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  )
}


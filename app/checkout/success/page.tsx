import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="border-t border-b py-4 my-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">#CC-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium">৳1,730.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            A confirmation email has been sent to your email address. You can track your order status in your account.
          </p>

          <div className="space-y-2">
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link href="/account/orders">Track Order</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


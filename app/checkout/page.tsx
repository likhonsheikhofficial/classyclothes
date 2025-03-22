import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"

export const metadata: Metadata = {
  title: "Checkout | Classy Clothes",
  description: "Complete your purchase at Classy Clothes",
}

export default function CheckoutPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <a href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/cart" className="text-muted-foreground hover:text-foreground">
          Cart
        </a>
        <span className="mx-2">/</span>
        <span>Checkout</span>
      </div>

      {/* Checkout Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center">1</div>
          <span className="ml-2 font-medium">Shopping Cart</span>
        </div>
        <div className="w-16 h-1 bg-amber-600 mx-2"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center">2</div>
          <span className="ml-2 font-medium">Checkout details</span>
        </div>
        <div className="w-16 h-1 bg-gray-300 mx-2"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">3</div>
          <span className="ml-2 text-gray-600">Order Complete</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SafeImage } from "@/components/safe-image"
import { getLocalProductImage } from "@/lib/image-loader"

// Product color options
const COLOR_OPTIONS = [
  { id: "light-pink", name: "Light Pink", hex: "#FFB6C1", imageIndex: 5 },
  { id: "mint-green", name: "Mint Green", hex: "#98FB98", imageIndex: 0 },
  { id: "sky-blue", name: "Sky Blue", hex: "#87CEEB", imageIndex: 2 },
  { id: "maroon", name: "Maroon", hex: "#800000", imageIndex: 3 },
  { id: "black", name: "Black", hex: "#000000", imageIndex: 4 },
]

export function OrderSummary() {
  const [selectedColor, setSelectedColor] = useState("light-pink")
  const [shippingMethod, setShippingMethod] = useState("inside-dhaka")

  // Calculate totals
  const productPrice = 1650.0
  const shippingCost = shippingMethod === "inside-dhaka" ? 80.0 : 150.0
  const totalPrice = productPrice + shippingCost

  // Get product image based on selected color
  const getProductImage = () => {
    const colorOption = COLOR_OPTIONS.find((c) => c.id === selectedColor)
    return getLocalProductImage(colorOption?.imageIndex || 0)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold mb-4">Your order</h2>

      {/* Product details */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative w-20 h-20 border rounded-md overflow-hidden">
            <SafeImage
              src={getProductImage()}
              alt="Exclusive ghararah dress"
              fill
              className="object-cover"
              fallbackSrc="/placeholder.svg?height=80&width=80"
            />
          </div>
          <div>
            <h3 className="font-medium">
              Exclusive ghararah dress - {COLOR_OPTIONS.find((c) => c.id === selectedColor)?.name}
            </h3>
            <p className="text-amber-600 font-bold">৳{productPrice.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Quantity: 1</p>
          </div>
        </div>

        {/* Color selection */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            সম্মানিত গ্রাহক, প্রোডাক্টের Color নির্বাচন করে Add to Cart অথবা Buy Now তে ক্লিক করুন
          </p>
          <div className="flex space-x-2 mt-2">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.id}
                type="button"
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.id ? "border-amber-600" : "border-gray-200"
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.id)}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="border-t border-b py-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳{productPrice.toFixed(2)}</span>
        </div>

        {/* Shipping options */}
        <div>
          <span className="block mb-2">Shipping</span>
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <RadioGroupItem value="inside-dhaka" id="inside-dhaka" />
                <Label htmlFor="inside-dhaka" className="ml-2">
                  Inside Dhaka(Metro)
                </Label>
              </div>
              <span>৳80.00</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <RadioGroupItem value="outside-dhaka" id="outside-dhaka" />
                <Label htmlFor="outside-dhaka" className="ml-2">
                  Outside Dhaka
                </Label>
              </div>
              <span>৳150.00</span>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg py-4">
        <span>Total</span>
        <span>৳{totalPrice.toFixed(2)}</span>
      </div>

      {/* Add to cart button */}
      <Button
        className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-4"
        onClick={() => {
          // This would normally update the cart and redirect
          window.location.href = "/cart"
        }}
      >
        Add to Cart
      </Button>

      {/* Buy now button */}
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
        onClick={() => {
          // This would normally update the cart and redirect to checkout
          window.location.href = "/checkout"
        }}
      >
        Buy Now
      </Button>

      <p className="text-xs text-center mt-4 text-muted-foreground">
        All products are protected by copyright@classyclothes.coupons
      </p>
    </div>
  )
}


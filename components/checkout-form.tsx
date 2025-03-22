"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

// Atlos payment integration
declare global {
  interface Window {
    atlos: {
      Pay: (options: {
        merchantId: string
        orderId: string
        orderAmount: number
      }) => void
    }
  }
}

export function CheckoutForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    shipToDifferentAddress: false,
    shippingAddress: "",
    orderNotes: "",
    paymentMethod: "cod", // Default to Cash on Delivery
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!formData.fullName || !formData.phone || !formData.address) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Handle different payment methods
      switch (formData.paymentMethod) {
        case "atlos":
          // Load Atlos script if not already loaded
          if (!document.getElementById("atlos-script")) {
            const script = document.createElement("script")
            script.id = "atlos-script"
            script.src = "https://atlos.io/packages/app/atlos.js"
            script.async = true
            script.onload = () => {
              // Initialize Atlos payment
              if (window.atlos) {
                window.atlos.Pay({
                  merchantId: "U07EBIF48Y",
                  orderId: `ORDER-${Date.now()}`,
                  orderAmount: 1730.0, // This would normally come from your cart/order state
                })
              }
            }
            document.body.appendChild(script)
          } else if (window.atlos) {
            // If script is already loaded, just call the Pay method
            window.atlos.Pay({
              merchantId: "U07EBIF48Y",
              orderId: `ORDER-${Date.now()}`,
              orderAmount: 1730.0,
            })
          }
          break

        case "bkash":
          // For bKash, show confirmation and redirect to success page
          toast({
            title: "bKash Payment",
            description: "Please complete your payment by sending ৳1,730.00 to 01325408283 (Merchant)",
          })

          // In a real app, you would wait for payment confirmation
          setTimeout(() => {
            window.location.href = "/checkout/success?payment=bkash"
          }, 3000)
          break

        case "cod":
        default:
          // For COD, proceed with order submission
          setTimeout(() => {
            toast({
              title: "Order Placed",
              description: "Your order has been placed successfully!",
            })
            // Redirect to order confirmation page
            window.location.href = "/checkout/success"
          }, 1500)
          break
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Billing details</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-base">
              Your Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-base">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Your Phone Number"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-base">
              Your Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Please Enter Your Valid Address"
              className="mt-1"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="shipToDifferentAddress"
              name="shipToDifferentAddress"
              checked={formData.shipToDifferentAddress}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, shipToDifferentAddress: checked === true }))
              }
            />
            <Label htmlFor="shipToDifferentAddress" className="text-base font-normal">
              Ship to a different address?
            </Label>
          </div>

          {formData.shipToDifferentAddress && (
            <div>
              <Label htmlFor="shippingAddress" className="text-base">
                Shipping Address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                placeholder="Enter Your Shipping Address"
                className="mt-1"
                required={formData.shipToDifferentAddress}
              />
            </div>
          )}

          <div>
            <Label htmlFor="orderNotes" className="text-base">
              Order notes (optional)
            </Label>
            <Textarea
              id="orderNotes"
              name="orderNotes"
              value={formData.orderNotes}
              onChange={handleInputChange}
              placeholder="Notes about your order, e.g. special notes for delivery."
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>

        <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange} className="space-y-4">
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex items-center">
              <span className="ml-2">Cash on delivery</span>
            </Label>
            <p className="text-sm text-muted-foreground ml-6">Pay with cash upon delivery.</p>
          </div>

          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="bkash" id="bkash" />
            <Label htmlFor="bkash" className="flex items-center">
              <div className="bg-pink-600 text-white px-2 py-1 rounded text-sm font-bold ml-2">bKash</div>
              <span className="ml-2">Pay with bKash</span>
            </Label>
            <p className="text-sm text-muted-foreground ml-6">Send money to: 01325408283 (Merchant)</p>
          </div>

          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="atlos" id="atlos" />
            <Label htmlFor="atlos" className="flex items-center">
              <span className="ml-2">Pay with Atlos</span>
            </Label>
            <p className="text-sm text-muted-foreground ml-6">Pay securely using Atlos payment gateway.</p>
          </div>
        </RadioGroup>

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Place order"}
          </Button>
          <p className="text-xs text-center mt-2 text-muted-foreground">
            By placing your order, you agree to our Terms and Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </form>
  )
}


"use client"

import type React from "react"

import type { GetStaticProps } from "next"
import { useState } from "react"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/seo-config"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle, Clock, AlertCircle, Phone, Mail } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [trackingResult, setTrackingResult] = useState<null | {
    status: "processing" | "shipped" | "delivered" | "cancelled" | "not-found"
    orderNumber: string
    orderDate: string
    estimatedDelivery?: string
    trackingNumber?: string
    statusHistory?: {
      status: string
      date: string
      description: string
    }[]
  }>(null)

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsTracking(true)

    // Simulate API call
    setTimeout(() => {
      // This is just a mock response for demonstration
      // In a real application, you would fetch this data from your backend
      if (orderNumber && phoneNumber) {
        setTrackingResult({
          status: "shipped",
          orderNumber: orderNumber,
          orderDate: "2023-11-15",
          estimatedDelivery: "2023-11-18",
          trackingNumber: "TRK" + Math.floor(1000000 + Math.random() * 9000000),
          statusHistory: [
            {
              status: "Order Placed",
              date: "2023-11-15 14:30",
              description: "Your order has been placed successfully",
            },
            {
              status: "Payment Confirmed",
              date: "2023-11-15 15:45",
              description: "Payment has been confirmed",
            },
            {
              status: "Processing",
              date: "2023-11-16 09:20",
              description: "Your order is being processed",
            },
            {
              status: "Shipped",
              date: "2023-11-16 16:10",
              description: "Your order has been shipped",
            },
          ],
        })
      } else {
        setTrackingResult({
          status: "not-found",
          orderNumber: orderNumber,
          orderDate: "",
        })
      }
      setIsTracking(false)
    }, 1500)
  }

  return (
    <>
      <SEO
        title="Track Your Order"
        description="Track the status of your order from Classy Clothes."
        ogType="website"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Track Your Order",
          description: "Track the status of your order from Classy Clothes.",
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
            "@id": `${siteConfig.url}/track-order`,
          },
        }}
      />

      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
          <p className="text-gray-600 mb-8 text-center">
            Enter your order number and phone number to track the status of your order.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>
                Please enter the order number and phone number you used during checkout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Order Number
                  </label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="e.g., CC-123456"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="e.g., 01XXXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isTracking}>
                  {isTracking ? "Tracking..." : "Track Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {trackingResult && (
            <div className="mt-8">
              {trackingResult.status === "not-found" ? (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Order Not Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-600">
                      We couldn't find an order with the provided information. Please check your order number and phone
                      number and try again.
                    </p>
                    <p className="text-red-600 mt-2">
                      If you continue to experience issues, please contact our customer service at{" "}
                      {siteConfig.contactEmail} or {siteConfig.phoneNumber}.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                    <CardDescription>
                      Order #{trackingResult.orderNumber} placed on{" "}
                      {new Date(trackingResult.orderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        {trackingResult.status === "processing" && (
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <Package className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                        {trackingResult.status === "shipped" && (
                          <div className="bg-amber-100 p-2 rounded-full mr-3">
                            <Truck className="h-6 w-6 text-amber-600" />
                          </div>
                        )}
                        {trackingResult.status === "delivered" && (
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                        )}
                        {trackingResult.status === "cancelled" && (
                          <div className="bg-red-100 p-2 rounded-full mr-3">
                            <AlertCircle className="h-6 w-6 text-red-600" />
                          </div>
                        )}

                        <div>
                          <h3 className="font-bold text-lg">
                            {trackingResult.status === "processing" && "Processing"}
                            {trackingResult.status === "shipped" && "Shipped"}
                            {trackingResult.status === "delivered" && "Delivered"}
                            {trackingResult.status === "cancelled" && "Cancelled"}
                          </h3>
                          <p className="text-gray-600">
                            {trackingResult.status === "processing" && "Your order is being processed"}
                            {trackingResult.status === "shipped" && "Your order is on the way"}
                            {trackingResult.status === "delivered" && "Your order has been delivered"}
                            {trackingResult.status === "cancelled" && "Your order has been cancelled"}
                          </p>
                        </div>
                      </div>

                      {trackingResult.trackingNumber && (
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                          <p className="text-sm text-gray-600">Tracking Number</p>
                          <p className="font-medium">{trackingResult.trackingNumber}</p>
                        </div>
                      )}

                      {trackingResult.estimatedDelivery &&
                        trackingResult.status !== "delivered" &&
                        trackingResult.status !== "cancelled" && (
                          <div className="flex items-center text-gray-600 mb-4">
                            <Clock className="h-5 w-5 mr-2" />
                            <span>
                              Estimated delivery:{" "}
                              {new Date(trackingResult.estimatedDelivery).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                    </div>

                    {trackingResult.statusHistory && (
                      <div>
                        <h3 className="font-medium mb-4">Order History</h3>
                        <div className="space-y-4">
                          {trackingResult.statusHistory.map((history, index) => (
                            <div key={index} className="flex">
                              <div className="mr-4 relative">
                                <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                                {index < trackingResult.statusHistory!.length - 1 && (
                                  <div className="absolute top-3 bottom-0 left-1.5 -ml-px w-0.5 bg-gray-200 h-full"></div>
                                )}
                              </div>
                              <div className="pb-4">
                                <p className="font-medium">{history.status}</p>
                                <p className="text-sm text-gray-600">{history.date}</p>
                                <p className="text-sm text-gray-600">{history.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order or need assistance with tracking, please contact our customer
              service team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{siteConfig.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{siteConfig.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>
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


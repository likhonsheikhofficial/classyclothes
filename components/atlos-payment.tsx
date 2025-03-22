"use client"

import { useEffect } from "react"

interface AtlosPaymentProps {
  merchantId: string
  orderId: string
  orderAmount: number
}

export function AtlosPayment({ merchantId, orderId, orderAmount }: AtlosPaymentProps) {
  useEffect(() => {
    // Load Atlos script
    const loadAtlosScript = () => {
      if (!document.getElementById("atlos-script")) {
        const script = document.createElement("script")
        script.id = "atlos-script"
        script.src = "https://atlos.io/packages/app/atlos.js"
        script.async = true
        script.onload = initializeAtlos
        document.body.appendChild(script)
      } else {
        initializeAtlos()
      }
    }

    // Initialize Atlos payment
    const initializeAtlos = () => {
      if (window.atlos) {
        window.atlos.Pay({
          merchantId,
          orderId,
          orderAmount,
        })
      }
    }

    // Load script
    loadAtlosScript()

    // Cleanup
    return () => {
      const script = document.getElementById("atlos-script")
      if (script) {
        script.removeEventListener("load", initializeAtlos)
      }
    }
  }, [merchantId, orderId, orderAmount])

  return null
}


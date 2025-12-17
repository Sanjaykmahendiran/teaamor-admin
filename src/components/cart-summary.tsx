"use client"

import { useState } from "react"

export function CartSummary() {
  const [subtotal] = useState(10.48)
  const [] = useState(1.7)
  const [total] = useState(12.18)

  return (
    <div className="mt-6 space-y-2">
      <div className="flex justify-between text-gray-500">
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-medium text-green-700">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  )
}

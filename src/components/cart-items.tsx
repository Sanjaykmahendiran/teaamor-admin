"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Minus, Plus } from "lucide-react"

const initialItems = [
  {
    id: 1,
    name: "Dragon Prawn",
    price: 10.48,
    rating: 4.8,
    reviews: 125,
    time: "16 min",
    image: "/images/dragon-prawn.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Chicken Noodles",
    price: 10.48,
    rating: 4.8,
    reviews: 125,
    time: "16 min",
    image: "/images/chicken-noodles.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Sizzling Brownie",
    price: 10.48,
    rating: 4.8,
    reviews: 125,
    time: "16 min",
    image: "/images/sizzling-brownie.png",
    quantity: 1,
  },
]

export function CartItems() {
  const [items, setItems] = useState(initialItems)

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center bg-gray-50 rounded-lg p-3">
          <div className="w-16 h-16 relative rounded-md overflow-hidden mr-3">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-green-800">{item.name}</h3>
            <div className="flex items-center text-xs text-yellow-500">
              <Star className="fill-yellow-500 stroke-yellow-500 h-3 w-3 mr-1" />
              <span>{item.rating}</span>
              <span className="text-gray-400 ml-1">({item.reviews})</span>
              <span className="text-gray-400 ml-2">• {item.time}</span>
            </div>
            <div className="mt-1 font-medium">${item.price.toFixed(2)}</div>
          </div>
          <div className="flex items-center">
            <button
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
              onClick={() => updateQuantity(item.id, -1)}
            >
              <Minus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="mx-2 w-4 text-center">{item.quantity}</span>
            <button
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
              onClick={() => updateQuantity(item.id, 1)}
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

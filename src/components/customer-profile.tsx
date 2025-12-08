"use client"

import { ArrowLeft, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("order-history")

  return (
    <div className="max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button className="mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Customer ID #1</h1>
      </div>

      {/* Profile Section */}
      <div className="p-4 flex flex-col items-center">
        <div className="relative w-20 h-20 mb-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-28%20171954-r3Gs8iIEzWjnmT9IX9jLg59Q4iNAxE.png"
            alt="Profile picture"
            className="rounded-full object-cover"
            fill
          />
        </div>
        <h2 className="text-lg font-medium">basti bach</h2>
        <span className="text-blue-500 text-sm">Block Customer</span>

        {/* Contact Info */}
        <div className="w-full flex justify-center gap-6 mt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-2">
              <Phone size={16} className="text-white" />
            </div>
            <span className="text-sm">+14333322221</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <Mail size={16} className="text-white" />
            </div>
            <span className="text-sm">bastidkang@gmail.com</span>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-4 text-center mt-6">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">123</span>
            <span className="text-gray-500 text-xs">Orders</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">5</span>
            <span className="text-gray-500 text-xs">Cancel</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">$1635.01</span>
            <span className="text-gray-500 text-xs">Refund</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">$16540.84</span>
            <span className="text-gray-500 text-xs">Total</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 mt-4">
        <button
          className={`py-3 text-center font-medium ${activeTab === "order-history" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setActiveTab("order-history")}
        >
          Order History
        </button>
        <button
          className={`py-3 text-center font-medium ${activeTab === "addresses" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setActiveTab("addresses")}
        >
          Addresses
        </button>
      </div>

      {/* Order History */}
      {activeTab === "order-history" && (
        <div className="p-4">
          <OrderItem number="19554" date="Mon, April 21, 2025 7:14 AM" amount="255.20" status="delivered" />
          <OrderItem number="19512" date="Thu, April 10, 2025 6:55 PM" amount="186.50" status="delivered" />
          <OrderItem number="19415" date="Wed, March 26, 2025 9:41 PM" amount="217.30" status="delivered" />
          <OrderItem number="19410" date="Tue, March 25, 2025 6:51 AM" amount="239.84" status="ready-for-pickup" />
          <OrderItem number="19388" date="Fri, March 21, 2025 8:13 AM" amount="155.15" status="delivered" />
          <OrderItem number="19305" date="Tue, March 4, 2025 8:20 PM" amount="50.70" status="delivered" />
          <OrderItem number="19298" date="Tue, March 4, 2025 7:21 PM" amount="50.70" status="delivered" />
          <OrderItem number="19297" date="Tue, March 4, 2025 7:05 PM" amount="50.70" status="delivered" />
          <OrderItem number="19290" date="Tue, March 4, 2025 7:05 AM" amount="151.30" status="delivered" />
        </div>
      )}

      {/* Addresses Tab (empty for now) */}
      {activeTab === "addresses" && (
        <div className="p-4">
          <p className="text-center text-gray-500">Address information would appear here</p>
        </div>
      )}
    </div>
  )
}

type OrderItemProps = {
  number: string
  date: string
  amount: string
  status: "delivered" | "ready-for-pickup"
}

function OrderItem({ number, date, amount, status }: OrderItemProps) {
  return (
    <div className="border-b py-3 flex justify-between items-start">
      <div>
        <p className="font-medium">Order #{number}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-medium">${amount}</span>
        {status === "delivered" ? (
          <span className="text-xs px-3 py-1 bg-green-500 text-white rounded-full">delivered</span>
        ) : (
          <span className="text-xs px-3 py-1 bg-yellow-500 text-white rounded-full">ready for pickup</span>
        )}
      </div>
    </div>
  )
}

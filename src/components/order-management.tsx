"use client"

import Link from "next/link"
import { useState } from "react"
import { Printer, X } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import ImagF from "@/app/assets/posfood/caramel_src.png"

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("processing")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Sample order data
  const orderData = [
    {
      id: "19530",
      items: 1,
      customer: "kh kh",
      timeAgo: "Yesterday",
      type: "Pickup",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    {
      id: "19524",
      items: 1,
      customer: "Aydin Ametxan",
      timeAgo: "Yesterday",
      type: "Delivery",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    {
      id: "19496",
      items: 3,
      customer: "Indian Curry House",
      timeAgo: "1 week ago",
      type: "Delivery",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    {
      id: "19491",
      items: 1,
      customer: "Jonathan Casanova",
      timeAgo: "1 week ago",
      type: "Delivery",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    {
      id: "19481",
      items: 1,
      customer: "Walk-in Customer",
      timeAgo: "1 week ago",
      type: "Pickup",
      status: "Accepted",
      paymentStatus: "Paid",
    },
    {
      id: "19449",
      items: 1,
      customer: "Aydin Ametxan",
      timeAgo: "2 weeks ago",
      type: "Delivery",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    {
      id: "19401",
      items: 2,
      customer: "Nirmal Ram",
      timeAgo: "3 weeks ago",
      type: "Delivery",
      status: "Accepted",
      paymentStatus: "Paid",
    },
    {
      id: "19395",
      items: 2,
      customer: "Trt 6",
      timeAgo: "3 weeks ago",
      type: "Delivery",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    {
      id: "19379",
      items: 1,
      customer: "yousef yousef",
      timeAgo: "4 weeks ago",
      type: "Pickup",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    // Additional orders
    {
      id: "19356",
      items: 1,
      customer: "Aydin Ametxan",
      timeAgo: "4 weeks ago",
      type: "Delivery",
      status: "Accepted",
      paymentStatus: "Unpaid",
    },
    {
      id: "19121",
      items: 2,
      customer: "Blasy Vava",
      timeAgo: "2 months ago",
      type: "Delivery",
      status: "Ready",
      paymentStatus: "Paid",
    },
    {
      id: "19112",
      items: 2,
      customer: "dedewd wqdewdew",
      timeAgo: "2 months ago",
      type: "Delivery",
      status: "New",
      paymentStatus: "Unpaid",
    },
  ]

  // Calculate counts for each tab
  const counts = {
    new: orderData.filter((order) => order.status === "New").length,
    processing: orderData.filter((order) => order.status === "Accepted").length,
    ready: orderData.filter((order) => order.status === "Ready").length,
    completed: orderData.filter((order) => order.status === "Completed").length,
    all: orderData.length,
  }

  // Filter orders based on active tab
  const getFilteredOrders = () => {
    switch (activeTab) {
      case "new":
        return orderData.filter((order) => order.status === "New")
      case "processing":
        return orderData.filter((order) => order.status === "Accepted")
      case "ready":
        return orderData.filter((order) => order.status === "Ready")
      case "completed":
        return orderData.filter((order) => order.status === "Completed")
      case "scheduled":
        return orderData.filter((order) => order.status === "Scheduled")
      case "all":
        return orderData
      default:
        return orderData
    }
  }

  // Handle order selection
  const handleOrderClick = (orderId: string) => {
    setSelectedOrder(orderId)
  }

  // Close order details
  const closeOrderDetails = () => {
    setSelectedOrder(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
        {/* Header */}  
        <Header />
      {/* Main Content */}
      <main className="flex-1">
        <div className="overflow-x-auto p-3">
          <div className="flex border-b gap-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab("new")}
              className={`flex-shrink-0 px-4 py-1 text-sm font-medium relative ${
                activeTab === "new" ? "bg-orange-500 text-white rounded-3xl" : ""
              }`}
            >
              New Orders
              {counts.new > 0 && (
                <span
                  className={`absolute bottom-6 right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                    activeTab === "new" ? "bg-green-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {counts.new}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("processing")}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative ${
                activeTab === "processing" ? "bg-orange-500 text-white rounded-full" : ""
              }`}
            >
              Orders Processing
              {counts.processing > 0 && (
                <span
                  className={`absolute bottom-6 right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                    activeTab === "processing" ? "bg-green-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {counts.processing}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("ready")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium relative ${
                activeTab === "ready" ? "bg-orange-500 text-white rounded-full" : ""
              }`}
            >
              Orders Ready
              {counts.ready > 0 && (
                <span
                  className={`absolute bottom-6 right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                    activeTab === "ready" ? "bg-green-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {counts.ready}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium relative ${
                activeTab === "completed" ? "bg-orange-500 text-white rounded-full" : ""
              }`}
            >
              Completed
              {counts.completed > 0 && (
                <span
                  className={`absolute bottom-6 right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                    activeTab === "completed" ? "bg-green-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {counts.completed}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium relative ${
                activeTab === "all" ? "bg-orange-500 text-white rounded-full" : ""
              }`}
            >
              All Orders
              {counts.all > 0 && (
                <span
                  className={`absolute bottom-6 right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                    activeTab === "all" ? "bg-green-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {counts.all}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4 p-4">
          {getFilteredOrders().map((order) => (
            <div
              key={order.id}
              className="border rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleOrderClick(order.id)}
            >
              <div className="flex justify-between items-center p-3 border-b">
                <div>
                  <p className="text-sm font-medium">Order #{order.id}</p>
                  <p className="text-xs text-gray-500">
                    {order.items} items for {order.customer}
                  </p>
                  <p className="text-xs text-gray-400">{order.timeAgo}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      order.type === "Pickup" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.type}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50">
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800">{order.status}</span>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    order.paymentStatus === "Paid" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          ))}

          {getFilteredOrders().length === 0 && (
            <div className="text-center py-8 text-gray-500">No orders found in this category</div>
          )}
        </div>
      </main>
      <Footer/>

      {selectedOrder && (
  <div
    className="fixed inset-0 bg-[#0000004f] bg-opacity-50 z-50 flex items-end justify-center"
    onClick={closeOrderDetails}
  >
    <div
      className="bg-white w-full max-w-md rounded-t-xl overflow-hidden transform transition-all duration-300 ease-in-out animate-slide-up"
      onClick={(e) => e.stopPropagation()}
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b bg-gray-50">
        <div className="font-medium text-[15px]">
          Order #<span className="text-orange-500">{selectedOrder}</span>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/orderdetails" className="text-sm text-blue-600">View full order details</Link>
          <Printer className="w-5 h-5 text-gray-500" />
          <X className="w-5 h-5 text-gray-500 cursor-pointer" onClick={closeOrderDetails} />
        </div>
      </div>

      {/* Item Details */}
      <div className="p-4">
        <div className="flex gap-3 items-center mb-4 bg-orange-50 rounded-lg p-3">
          <div className="w-14 h-14 rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src={ImagF} // update with actual image path
              alt="Hot Caramel Sundae"
              width={60}
              height={60}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="font-medium text-[15px]">Hot Caramel Sundae</div>
            <div className="text-sm text-gray-500">1 x $32.00</div>
          </div>
          <div className="font-medium text-[15px]">$32.00</div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 border-t">
          <div className="font-medium text-[15px]">Total</div>
          <div className="font-medium text-[15px]">$32.00</div>
        </div>
      </div>

      {/* Action Button */}
      <Link href="/">
        <button className="w-[90%] mx-auto mb-4 py-3 bg-[#ff734d] rounded-md text-white text-[16px] font-medium block">
          Ready for pickup
        </button>
      </Link>
    </div>
  </div>
)}

    </div>
  )
}

export default OrderManagement

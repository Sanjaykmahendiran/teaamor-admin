"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Printer } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import ImagF from "@/app/assets/starbucks/teamor-logo.png"

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("processing")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  
  // Touch handling state
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)
  
  // Ref for tab container to scroll automatically
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  // Define tab order for swipe logic
  const tabs = ["new", "processing", "ready", "completed", "all"]

  // Sample order data with diverse statuses to test all tabs
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
      id: "19121",
      items: 2,
      customer: "Blasy Vava",
      timeAgo: "2 months ago",
      type: "Delivery",
      status: "Ready",
      paymentStatus: "Paid",
    },
    {
      id: "19395",
      items: 2,
      customer: "Trt 6",
      timeAgo: "3 weeks ago",
      type: "Delivery",
      status: "Completed",
      paymentStatus: "Paid",
    },
    {
      id: "19112",
      items: 2,
      customer: "New Customer",
      timeAgo: "1 hour ago",
      type: "Delivery",
      status: "New",
      paymentStatus: "Unpaid",
    },
  ]

  // Calculate counts
  const counts = {
    new: orderData.filter((order) => order.status === "New").length,
    processing: orderData.filter((order) => order.status === "Accepted").length,
    ready: orderData.filter((order) => order.status === "Ready").length,
    completed: orderData.filter((order) => order.status === "Completed").length,
    all: orderData.length,
  }

  // Filter orders
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
      case "all":
        return orderData
      default:
        return orderData
    }
  }

  // Handle order selection (Accordion)
  const handleOrderClick = (orderId: string) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null)
    } else {
      setSelectedOrder(orderId)
    }
  }

  // --- Swipe Logic ---
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null
    touchStart.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return
    const distance = touchStart.current - touchEnd.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    const currentIndex = tabs.indexOf(activeTab)

    if (isLeftSwipe) {
      // Move to next tab (e.g., New -> Processing)
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1])
      }
    }

    if (isRightSwipe) {
      // Move to previous tab
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1])
      }
    }
  }

  // --- Auto Scroll Tab Bar ---
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector<HTMLButtonElement>(`button[data-state="active"]`)
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [activeTab])

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <Header />
      <main className="flex-1 flex flex-col">
        
        {/* Tabs Section */}
        <div className="overflow-x-auto p-3 bg-white sticky top-0 z-10 border-b border-gray-100">
          <div 
            ref={tabsContainerRef}
            className="flex gap-3 min-w-max no-scrollbar"
          >
            {/* New Orders Tab */}
            <button
              onClick={() => setActiveTab("new")}
              data-state={activeTab === "new" ? "active" : "inactive"}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative rounded-full transition-colors duration-200 ${
                activeTab === "new" ? "bg-[#917c3d] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              New Orders
              {counts.new > 0 && (
                <span className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white ${
                    activeTab === "new" ? "bg-white text-[#917c3d]" : "bg-green-500 text-white"
                }`}>
                  {counts.new}
                </span>
              )}
            </button>

            {/* Processing Tab */}
            <button
              onClick={() => setActiveTab("processing")}
              data-state={activeTab === "processing" ? "active" : "inactive"}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative rounded-full transition-colors duration-200 ${
                activeTab === "processing" ? "bg-[#917c3d] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Processing
              {counts.processing > 0 && (
                <span className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white ${
                    activeTab === "processing" ? "bg-white text-[#917c3d]" : "bg-green-500 text-white"
                }`}>
                  {counts.processing}
                </span>
              )}
            </button>

            {/* Ready Tab */}
            <button
              onClick={() => setActiveTab("ready")}
              data-state={activeTab === "ready" ? "active" : "inactive"}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative rounded-full transition-colors duration-200 ${
                activeTab === "ready" ? "bg-[#917c3d] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Orders Ready
              {counts.ready > 0 && (
                <span className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white ${
                    activeTab === "ready" ? "bg-white text-[#917c3d]" : "bg-green-500 text-white"
                }`}>
                  {counts.ready}
                </span>
              )}
            </button>

            {/* Completed Tab */}
            <button
              onClick={() => setActiveTab("completed")}
              data-state={activeTab === "completed" ? "active" : "inactive"}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative rounded-full transition-colors duration-200 ${
                activeTab === "completed" ? "bg-[#917c3d] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Completed
              {counts.completed > 0 && (
                <span className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white ${
                    activeTab === "completed" ? "bg-white text-[#917c3d]" : "bg-green-500 text-white"
                }`}>
                  {counts.completed}
                </span>
              )}
            </button>

            {/* All Orders Tab */}
            <button
              onClick={() => setActiveTab("all")}
              data-state={activeTab === "all" ? "active" : "inactive"}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative rounded-full transition-colors duration-200 ${
                activeTab === "all" ? "bg-[#917c3d] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Orders
              {counts.all > 0 && (
                <span className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white ${
                    activeTab === "all" ? "bg-white text-[#917c3d]" : "bg-gray-500 text-white"
                }`}>
                  {counts.all}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Swipeable Orders List Area */}
        <div 
          className="space-y-4 p-4 flex-1 touch-pan-y" 
          onTouchStart={onTouchStart} 
          onTouchMove={onTouchMove} 
          onTouchEnd={onTouchEnd}
        >
          {getFilteredOrders().map((order) => {
            const isExpanded = selectedOrder === order.id

            return (
              <div
                key={order.id}
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  isExpanded ? "border-[#917c3d] shadow-md ring-1 ring-[#917c3d]/20" : "border-gray-200"
                }`}
              >
                {/* Clickable Header Card */}
                <div
                  className="cursor-pointer bg-white"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <div className="flex justify-between items-center p-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium">Order #{order.id}</p>
                      <p className="text-xs text-gray-500">
                        {order.items} items for {order.customer}
                      </p>
                      <p className="text-xs text-gray-400">{order.timeAgo}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                          order.type === "Pickup"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {order.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        order.status === 'New' ? 'bg-red-100 text-red-700' :
                        order.status === 'Accepted' ? 'bg-orange-100 text-orange-700' :
                        order.status === 'Ready' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* SLIDE DOWN CONTENT (Accordion) */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden bg-gray-50">
                    <div className="p-4 border-t border-gray-100">
                      
                      {/* Sub Header */}
                      <div className="flex justify-end gap-3 items-center mb-4">
                        <Link href="/orderdetails" className="text-xs font-medium text-[#917c3d] hover:underline">
                          Full Details
                        </Link>
                        <Printer className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </div>

                      {/* Item Details */}
                      <div className="flex gap-3 items-center mb-3 bg-white border border-gray-100 rounded-lg p-2 shadow-sm">
                        <div className="w-12 h-12 rounded-md overflow-hidden flex items-center justify-center bg-gray-100 flex-shrink-0">
                          <Image
                            src={ImagF}
                            alt="tea-amor"
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">Hot Caramel Sundae</div>
                          <div className="text-xs text-gray-500">1 x $32.00</div>
                        </div>
                        <div className="font-medium text-sm">$32.00</div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center py-2 border-t border-dashed border-gray-200 mb-3">
                        <div className="font-medium text-sm text-gray-600">Total Bill</div>
                        <div className="font-bold text-sm">$32.00</div>
                      </div>

                      {/* Action Button */}
                      <Link href="/">
                        <button className="w-full py-2.5 bg-[#917c3d] active:bg-[#7a6833] transition-colors rounded-lg text-white text-sm font-semibold shadow-sm">
                          {order.status === 'Ready' ? 'Mark Completed' : 'Ready for pickup'}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {getFilteredOrders().length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <p className="text-sm">No orders in this category.</p>
              <p className="text-xs mt-1">Swipe left or right to check other tabs.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default OrderManagement
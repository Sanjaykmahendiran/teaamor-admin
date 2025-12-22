"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Printer, Check, Trash2 } from "lucide-react" // Added Check icon
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import ImagF from "@/assets/starbucks/teamor-logo.png"

const OrderMenu = () => {
  const [activeTab, setActiveTab] = useState("processing")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  
  // Track which card is currently swiped open
  const [swipedOrderId, setSwipedOrderId] = useState<string | null>(null)

  // Touch handling refs
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)
  
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  // INITIAL DATA (Moved to State so we can update it)
  const [orders, setOrders] = useState([
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
  ])

  // Calculate counts dynamically based on current state
  const counts = {
    new: orders.filter((order) => order.status === "New").length,
    processing: orders.filter((order) => order.status === "Accepted").length,
    ready: orders.filter((order) => order.status === "Ready").length,
    completed: orders.filter((order) => order.status === "Completed").length,
    all: orders.length,
  }

  // Filter orders
  const getFilteredOrders = () => {
    switch (activeTab) {
      case "new": return orders.filter((order) => order.status === "New")
      case "processing": return orders.filter((order) => order.status === "Accepted")
      case "ready": return orders.filter((order) => order.status === "Ready")
      case "completed": return orders.filter((order) => order.status === "Completed")
      case "all": return orders
      default: return orders
    }
  }

  // --- ACTIONS ---

  const handleMarkAsCompleted = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation() // Prevent clicking the card accordion
    
    // 1. Update Order Status
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: "Completed" } : order
      )
    )

    // 2. Reset Swipe
    setSwipedOrderId(null)

    // 3. Redirect to Completed Tab
    setActiveTab("completed")
    
    // 4. Optionally open the accordion of that order in the new tab
    setSelectedOrder(orderId)
  }

  // --- SWIPE LOGIC PER CARD ---
  const onCardTouchStart = (e: React.TouchEvent, orderId: string) => {
    touchEnd.current = null
    touchStart.current = e.targetTouches[0].clientX
  }

  const onCardTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX
  }

  const onCardTouchEnd = (orderId: string) => {
    if (!touchStart.current || !touchEnd.current) return
    
    const distance = touchStart.current - touchEnd.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      // Swipe Left -> Open Action
      setSwipedOrderId(orderId)
    } 
    
    if (isRightSwipe) {
      // Swipe Right -> Close Action
      if (swipedOrderId === orderId) {
        setSwipedOrderId(null)
      }
    }
  }

  // Auto Scroll Tab Bar
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
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Tabs Section */}
        <div className="overflow-x-auto scrollbar-hide p-3 bg-white sticky top-0 z-20 border-b border-gray-100">
          <div 
            ref={tabsContainerRef}
            className="flex gap-3 min-w-max"
          >
             {/* Map through tabs keys to render buttons cleanly */}
             {["new", "processing", "ready", "completed", "all"].map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => {
                    setActiveTab(tabKey)
                    setSwipedOrderId(null) // Close any open swipes when changing tabs
                  }}
                  data-state={activeTab === tabKey ? "active" : "inactive"}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative rounded-full transition-colors duration-200 ${
                    activeTab === tabKey ? "bg-[#D4AF37] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                  {counts[tabKey as keyof typeof counts] > 0 && (
                    <span className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white ${
                        activeTab === tabKey ? "bg-white text-[#D4AF37]" : "bg-green-500 text-white"
                    }`}>
                      {counts[tabKey as keyof typeof counts]}
                    </span>
                  )}
                </button>
             ))}
          </div>
        </div>

        {/* Orders List Area */}
        <div className="space-y-4 p-4 flex-1 overflow-y-auto scrollbar-hide pb-20">
          {getFilteredOrders().map((order) => {
            const isExpanded = selectedOrder === order.id
            const isSwiped = swipedOrderId === order.id

            return (
              <div key={order.id} className="relative overflow-hidden rounded-lg">
                
                {/* 1. BACKGROUND ACTION LAYER (Visible when swiped) */}
                <div className="absolute inset-y-0 right-0 w-24 bg-green-600 flex items-center justify-center rounded-r-lg z-0">
                   <button 
                     onClick={(e) => handleMarkAsCompleted(e, order.id)}
                     className="flex flex-col items-center justify-center text-white w-full h-full"
                   >
                     <div className="bg-white/20 p-2 rounded-full mb-1">
                        <Check className="w-6 h-6 text-white stroke-[3]" />
                     </div>
                     <span className="text-[10px] font-bold">Complete</span>
                   </button>
                </div>

                {/* 2. FOREGROUND CARD LAYER (Slides Left) */}
                <div
                  onTouchStart={(e) => onCardTouchStart(e, order.id)}
                  onTouchMove={onCardTouchMove}
                  onTouchEnd={() => onCardTouchEnd(order.id)}
                  className={`relative z-10 bg-white border transition-transform duration-300 ease-out ${
                    isSwiped ? "-translate-x-24" : "translate-x-0"
                  } ${
                    isExpanded ? "border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/20" : "border-gray-200"
                  } rounded-lg`}
                >
                  {/* Clickable Header Card */}
                  <div
                    className="cursor-pointer bg-white"
                    onClick={() => {
                        // If swiped open, click closes it. If not, click opens accordion
                        if (isSwiped) setSwipedOrderId(null)
                        else setSelectedOrder(isExpanded ? null : order.id)
                    }}
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
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-b-lg">
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
                          <Link href="/orderdetails" className="text-xs font-medium text-[#D4AF37] hover:underline">
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
                          <button className="w-full py-2.5 bg-[#D4AF37] active:bg-[#7a6833] transition-colors rounded-lg text-white text-sm font-semibold shadow-sm">
                            {order.status === 'Ready' ? 'Mark Completed' : 'Ready for pickup'}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div> 
                {/* End of Foreground Card */}

              </div>
            )
          })}

          {getFilteredOrders().length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <p className="text-sm">No orders in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default OrderMenu
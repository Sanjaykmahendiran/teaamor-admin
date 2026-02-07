"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Printer, Check, Trash2, DollarSign } from "lucide-react" // Added Check and DollarSign icons
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import ImagF from "@/assets/starbucks/teamor-logo.png"
import { api } from "@/lib/api-service"

// Helper for time ago
function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;
  return date.toLocaleDateString();
}

const OrderMenu = () => {
  const [activeTab, setActiveTab] = useState("new")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Track which card is currently swiped open
  const [swipedOrderId, setSwipedOrderId] = useState<string | null>(null)

  // Touch handling refs
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)

  const tabsContainerRef = useRef<HTMLDivElement>(null)

  // INITIAL DATA (Moved to State so we can update it)
  // INITIAL DATA (Moved to State so we can update it)
  const [orders, setOrders] = useState<any[]>([]) // Initial empty, fetched via API

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.orders.list();
        if (data && Array.isArray(data)) {
          // Map API data to UI model
          const mappedOrders = data.map((o: any) => ({
            id: o.id || o.order_id,
            items: o.items ? (Array.isArray(o.items) ? o.items.length : o.items) : 0, // Assume items is array or count
            customer: o.customer_name || o.customer || "Unknown",
            timeAgo: o.created_at ? getTimeAgo(o.created_at) : "Recently",
            type: o.order_type || o.type || "Pickup", // Pickup/Delivery
            status: o.status || "New", // New, Accepted, Ready, Completed
            paymentStatus: o.payment_status || o.paymentStatus || "Unpaid"
          }));
          setOrders(mappedOrders);
        }
      } catch (e) {
        console.error("Failed to fetch orders", e);
      }
    };
    fetchOrders();
  }, []);

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

  const handleMarkAsCompleted = async (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation() // Prevent clicking the card accordion

    // Find the current order to get its status
    const currentOrder = orders.find(order => order.id === orderId)
    if (!currentOrder) return

    // Determine next status and tab based on current status
    let nextStatus: string
    let nextTab: string

    switch (currentOrder.status) {
      case "New":
        nextStatus = "Accepted"
        nextTab = "processing"
        break
      case "Accepted":
        nextStatus = "Ready"
        nextTab = "ready"
        break
      case "Ready":
        nextStatus = "Completed"
        nextTab = "completed"
        break
      default:
        // If already completed or unknown status, stay as is
        nextStatus = currentOrder.status
        nextTab = activeTab
    }

    // 1. Update Order Status
    try {
      await api.orders.updateStatus(orderId, nextStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: nextStatus as any } : order
        )
      )
    } catch (err) {
      console.error("Failed to update status", err);
      // Optionally revert or show error
    }

    // 2. Reset Swipe
    setSwipedOrderId(null)

    // 3. Redirect to Next Tab
    setActiveTab(nextTab)

    // 4. Optionally open the accordion of that order in the new tab
    setSelectedOrder(orderId)
  }

  // Handle Mark as Paid
  const handleMarkAsPaid = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation() // Prevent clicking the card accordion

    // Update payment status to Paid
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, paymentStatus: "Paid" } : order
      )
    )

    // Reset Swipe
    setSwipedOrderId(null)
  }

  // Get the action label based on order status
  const getActionLabel = (status: string, paymentStatus: string) => {
    // For completed orders that are unpaid, show "Mark as Paid"
    if (status === "Completed" && paymentStatus === "Unpaid") {
      return "Mark Paid"
    }

    switch (status) {
      case "New":
        return "Accept"
      case "Accepted":
        return "Ready"
      case "Ready":
        return "Complete"
      default:
        return "Complete"
    }
  }

  // Get the action handler based on order status and payment status
  const getActionHandler = (orderId: string, status: string, paymentStatus: string) => {
    // For completed orders that are unpaid, use mark as paid handler
    if (status === "Completed" && paymentStatus === "Unpaid") {
      return (e: React.MouseEvent) => handleMarkAsPaid(e, orderId)
    }
    // Otherwise use the mark as completed handler
    return (e: React.MouseEvent) => handleMarkAsCompleted(e, orderId)
  }

  // Get the action icon based on order status and payment status
  const getActionIcon = (status: string, paymentStatus: string) => {
    // For completed orders that are unpaid, show dollar sign
    if (status === "Completed" && paymentStatus === "Unpaid") {
      return <DollarSign className="w-6 h-6 text-white stroke-[3]" />
    }
    // Otherwise show check icon
    return <Check className="w-6 h-6 text-white stroke-[3]" />
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
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
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
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium relative rounded-full transition-colors duration-200 ${activeTab === tabKey ? "bg-primary text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                {counts[tabKey as keyof typeof counts] > 0 && (
                  <span className={`absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white ${activeTab === tabKey ? "bg-[#D4AF37] text-white" : "bg-primary text-white"
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
                <div className={`absolute inset-y-0 right-0 w-24 flex items-center justify-center rounded-r-lg z-0 ${order.status === "Completed" && order.paymentStatus === "Unpaid"
                  ? "bg-primary"
                  : "bg-green-600"
                  }`}>
                  <button
                    onClick={getActionHandler(order.id, order.status, order.paymentStatus)}
                    className="flex flex-col items-center justify-center text-white w-full h-full"
                  >
                    <div className="bg-white/20 p-2 rounded-full mb-1">
                      {getActionIcon(order.status, order.paymentStatus)}
                    </div>
                    <span className="text-[10px] font-bold">{getActionLabel(order.status, order.paymentStatus)}</span>
                  </button>
                </div>

                {/* 2. FOREGROUND CARD LAYER (Slides Left) */}
                <div
                  onTouchStart={(e) => onCardTouchStart(e, order.id)}
                  onTouchMove={onCardTouchMove}
                  onTouchEnd={() => onCardTouchEnd(order.id)}
                  className={`relative z-10 bg-white border transition-transform duration-300 ease-out ${isSwiped ? "-translate-x-24" : "translate-x-0"
                    } ${isExpanded ? "border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/20" : "border-gray-200"
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
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${order.type === "Pickup"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                            }`}
                        >
                          {order.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-b-lg">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.status === 'New' ? 'bg-red-100 text-red-700' :
                        order.status === 'Accepted' ? 'bg-orange-100 text-orange-700' :
                          order.status === 'Ready' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {order.status}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.paymentStatus === "Paid"
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
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
                        {order.status === 'Completed' && order.paymentStatus === 'Unpaid' ? (
                          <button
                            onClick={(e) => handleMarkAsPaid(e, order.id)}
                            className="w-full py-2.5 bg-primary  transition-colors rounded-lg text-white text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
                          >
                            <DollarSign className="w-4 h-4" />
                            Mark as Paid
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleMarkAsCompleted(e, order.id)}
                            className="w-full py-2.5 bg-[#D4AF37] active:bg-[#7a6833] transition-colors rounded-lg text-white text-sm font-semibold shadow-sm"
                          >
                            {order.status === 'New' ? 'Accept Order' :
                              order.status === 'Accepted' ? 'Mark as Ready' :
                                order.status === 'Ready' ? 'Mark Completed' :
                                  'Completed'}
                          </button>
                        )}
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
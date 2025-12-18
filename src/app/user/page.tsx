"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, CheckCircle, Truck, Package } from "lucide-react"
import { useRouter } from "next/navigation"

import { ProfilePanel } from "@/components/profile-panel"
import { OrdersPanel } from "@/components/orders-panel"
import { OrderDetailsPanel } from "@/components/order-details-panel"
import { HelpPanel } from "@/components/help-panel"
import { FaqPanel } from "@/components/faq-panel"
import { PoliciesPanel } from "@/components/policies-panel"
import { SupportFormPanel } from "@/components/support-form-panel"
import { MainPanel } from "@/components/main-panel"

import avtar from "@/app/assets/starbucks/gvm01.jpg"
import { logout } from "@/lib/auth"

const user = {
  name: "Rajesh Kumar",
  storeName: "Kumar General Store",
  email: "rajesh@kumarstore.com",
  avatar: avtar.src,
}

export type ActivePanel =
  | "main"
  | "profile"
  | "orders"
  | "order-details"
  | "help"
  | "faq"
  | "policies"
  | "support-form"

export interface Order {
  id: string
  date: string
  status: string
  amount: string
  items: string
  deliveryAddress: string
  estimatedDelivery: string
  trackingNumber: string
  products: Array<{
    name: string
    quantity: number
    price: string
    image: string
  }>
}

export default function Settings() {
  const router = useRouter()

  const [activePanel, setActivePanel] = useState<ActivePanel>("main")
  const [isEditing, setIsEditing] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const [formData, setFormData] = useState({
    name: user.name,
    storeName: user.storeName,
    email: user.email,
    phone: "+91 9876543210",
    address: "456 Market Street, Delhi 110001",
  })

  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const recentOrders: Order[] = [
    {
      id: "ORD001",
      date: "2024-01-15",
      status: "Delivered",
      amount: "₹2,340",
      items: "12 items",
      deliveryAddress: "456 Market Street, Delhi 110001",
      estimatedDelivery: "2024-01-18",
      trackingNumber: "TRK123456789",
      products: [],
    },
    {
      id: "ORD002",
      date: "2024-01-12",
      status: "In Transit",
      amount: "₹1,890",
      items: "8 items",
      deliveryAddress: "456 Market Street, Delhi 110001",
      estimatedDelivery: "2024-01-16",
      trackingNumber: "TRK987654321",
      products: [],
    },
  ]

  const handleBack = () => {
    if (activePanel === "main") {
      router.back()
    } else if (activePanel === "order-details") {
      setActivePanel("orders")
      setSelectedOrder(null)
    } else if (
      activePanel === "faq" ||
      activePanel === "policies" ||
      activePanel === "support-form"
    ) {
      setActivePanel("help")
    } else {
      setActivePanel("main")
      setIsEditing(false)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Profile saved:", formData)
  }

  const handleLogout = () => {
    logout()
    console.log("User logged out.")
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setActivePanel("order-details")
  }

  const handleSupportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Your query has been submitted!")
    setSupportForm({ name: "", email: "", subject: "", message: "" })
    setActivePanel("help")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "In Transit":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-white" />
      case "In Transit":
        return <Truck className="h-4 w-4 text-white" />
      default:
        return <Package className="h-4 w-4 text-white" />
    }
  }

  const renderContent = () => {
    switch (activePanel) {
      case "profile":
        return (
          <ProfilePanel
            user={user}
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
        )
      case "orders":
        return (
          <OrdersPanel
            recentOrders={recentOrders}
            handleOrderClick={handleOrderClick}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        )
      case "order-details":
        return selectedOrder ? (
          <OrderDetailsPanel
            selectedOrder={selectedOrder}
            getStatusColor={getStatusColor}
          />
        ) : null
      case "help":
        return <HelpPanel setActivePanel={setActivePanel} />
      case "faq":
        return <FaqPanel />
      case "policies":
        return <PoliciesPanel />
      case "support-form":
        return (
          <SupportFormPanel
            supportForm={supportForm}
            setSupportForm={setSupportForm}
            handleSupportSubmit={handleSupportSubmit}
          />
        )
      default:
        return (
          <MainPanel
            user={user}
            setActivePanel={setActivePanel}
            handleLogout={handleLogout}
          />
        )
    }
  }

  const getTitle = () => {
    switch (activePanel) {
      case "profile":
        return "Your Profile"
      case "orders":
        return "Your Orders"
      case "order-details":
        return selectedOrder ? `Order ${selectedOrder.id}` : "Order Details"
      case "help":
        return "Help & Support"
      case "faq":
        return "FAQs"
      case "policies":
        return "Policies"
      case "support-form":
        return "Submit a Query"
      default:
        return "Settings"
    }
  }

  return (
    <div className="min-h-screen pb-2">
      {/* 🔒 Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {getTitle()}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8 mt-4">{renderContent()}</div>
    </div>
  )
}

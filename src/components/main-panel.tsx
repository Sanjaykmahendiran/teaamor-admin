"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Package,
  HelpCircle,
  LogOut,
  FileText,
  Headphones,
  Edit,
  Save,
  X,
} from "lucide-react"

import type { ActivePanel } from "@/app/user/page"

interface MainPanelProps {
  user: {
    name: string
    storeName: string
    email: string
    avatar: string
  }
  setActivePanel: (panel: ActivePanel) => void
  handleLogout: () => void
}

export function MainPanel({
  user,
  setActivePanel,
  handleLogout,
}: MainPanelProps) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    storeName: user.storeName,
    email: user.email,
    phone: "",
    address: "",
  })

  const handleSave = () => {
    // TODO: Save profile details (API call)
    setIsEditing(false)
  }

  const onLogout = () => {
    handleLogout()      // clear auth / storage
    router.push("/")    // 👈 redirects to page.tsx
  }

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt="Profile"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600">{user.storeName}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        {!isEditing ? (
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-primary"
          >
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-primary"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {[
            { id: "full-name", label: "Full Name", key: "name" },
            { id: "store-name", label: "Store Name", key: "storeName" },
            { id: "email", label: "Email", key: "email" },
            { id: "phone", label: "Phone", key: "phone" },
            { id: "address", label: "Address", key: "address" },
          ].map(({ id, label, key }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>

              {isEditing ? (
                <Input
                  id={id}
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [key]: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="text-gray-900">
                  {formData[key as keyof typeof formData]}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="p-4 bg-white shadow-md rounded-lg cursor-pointer flex flex-col items-center justify-center aspect-square"
          onClick={() => setActivePanel("orders")}
        >
          <Package className="h-8 w-8 text-purple-600 mb-2" />
          <span className="text-base font-medium text-gray-800">
            Orders
          </span>
        </div>

        <div
          className="p-4 bg-white shadow-md rounded-lg cursor-pointer flex flex-col items-center justify-center aspect-square"
          onClick={() => setActivePanel("help")}
        >
          <HelpCircle className="h-8 w-8 text-green-600 mb-2" />
          <span className="text-base font-medium text-gray-800">
            Help
          </span>
        </div>

        <div
          className="p-4 bg-white shadow-md rounded-lg cursor-pointer flex flex-col items-center justify-center aspect-square"
          onClick={() => setActivePanel("policies")}
        >
          <FileText className="h-8 w-8 text-blue-600 mb-2" />
          <span className="text-base font-medium text-gray-800">
            Policies
          </span>
        </div>

        <div
          className="p-4 bg-white shadow-md rounded-lg cursor-pointer flex flex-col items-center justify-center aspect-square"
          onClick={() => setActivePanel("support-form")}
        >
          <Headphones className="h-8 w-8 text-yellow-600 mb-2" />
          <span className="text-base font-medium text-gray-800">
            Support
          </span>
        </div>
      </div>

      {/* Logout */}
      <div className="pt-6 mb-[-10]">
        <Button
          variant="destructive"
          className="w-full h-12 bg-red-500 hover:bg-red-600"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

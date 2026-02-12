"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, User, Lock, Store, Save, Eye, EyeOff, LogOut, Mail, Phone, MapPin, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { logout, getUser } from "@/lib/auth"
import { api } from "@/lib/api-service"
import { Loader2 } from "lucide-react"

import logo from "@/assets/starbucks/tea-amor-logo.png"

interface StoreSetupData {
  storeName: string
  storeAddress: string
  phone: string
  email: string
  gstNumber: string
  openingTime: string
  closingTime: string
}

export default function ProfilePage() {
  const router = useRouter()
  const user = getUser()

  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [storeData, setStoreData] = useState<StoreSetupData>({
    storeName: "",
    storeAddress: "",
    phone: "",
    email: "",
    gstNumber: "",
    openingTime: "09:00",
    closingTime: "22:00",
  })

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) {
        setIsLoading(false)
        return
      }

      try {
        const data = await api.users.get("1"); // Using 1 as fallback for testing, user.id for real
        if (data) {
          setStoreData(prev => ({
            ...prev,
            storeName: data.username || user.name || "",
            email: data.email || user.email || "",
            phone: data.mobileno || user.mobile || "",
            // Add other fields if available in API
          }))
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleSaveStoreData = async () => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      await api.users.update("1", {
        username: storeData.storeName,
        email: storeData.email,
        mobileno: storeData.phone,
        // Add other fields
      })
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading && !isEditing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Profile & Store Setup</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your tea shop settings
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8 mt-6 max-w-4xl mx-auto">
        {/* Admin Profile Card */}
        <Card className="shadow-md mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Admin Profile
              </CardTitle>
              <CardDescription className="mt-2">
                Your account information
              </CardDescription>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <p className="text-gray-900 py-2">admin@teaamor.com</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="text-gray-900 py-2">Tea Shop Admin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Setup Card */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Store className="h-6 w-6 text-primary" />
                Store Configuration
              </CardTitle>
              <CardDescription className="mt-2">
                Manage your tea shop information and settings
              </CardDescription>
            </div>

          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Store Name *
                </label>
                {isEditing ? (
                  <Input
                    id="storeName"
                    value={storeData.storeName}
                    onChange={(e) =>
                      setStoreData({ ...storeData, storeName: e.target.value })
                    }
                    placeholder="Enter store name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{storeData.storeName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={storeData.phone}
                    onChange={(e) =>
                      setStoreData({ ...storeData, phone: e.target.value })
                    }
                    placeholder="+91 9876543210"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{storeData.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={storeData.email}
                    onChange={(e) =>
                      setStoreData({ ...storeData, email: e.target.value })
                    }
                    placeholder="store@example.com"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{storeData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">
                  GST Number
                </label>
                {isEditing ? (
                  <Input
                    id="gstNumber"
                    value={storeData.gstNumber}
                    onChange={(e) =>
                      setStoreData({ ...storeData, gstNumber: e.target.value })
                    }
                    placeholder="29ABCDE1234F1Z5"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{storeData.gstNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Store Address *
              </label>
              {isEditing ? (
                <Input
                  id="storeAddress"
                  value={storeData.storeAddress}
                  onChange={(e) =>
                    setStoreData({ ...storeData, storeAddress: e.target.value })
                  }
                  placeholder="Enter complete store address"
                />
              ) : (
                <p className="text-gray-900 py-2">{storeData.storeAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-2">
                <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Opening Time
                </label>
                {isEditing ? (
                  <Input
                    id="openingTime"
                    type="time"
                    value={storeData.openingTime}
                    onChange={(e) =>
                      setStoreData({ ...storeData, openingTime: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900 py-2">{storeData.openingTime}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Closing Time
                </label>
                {isEditing ? (
                  <Input
                    id="closingTime"
                    type="time"
                    value={storeData.closingTime}
                    onChange={(e) =>
                      setStoreData({ ...storeData, closingTime: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900 py-2">{storeData.closingTime}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveStoreData}
                    className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 border-red-600 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

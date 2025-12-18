"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Save, X } from "lucide-react"
import type React from "react"

interface ProfilePanelProps {
  user: {
    name: string
    storeName: string
    email: string
    avatar: string
  }
  formData: {
    name: string
    storeName: string
    email: string
    phone: string
    address: string
  }
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string
      storeName: string
      email: string
      phone: string
      address: string
    }>
  >
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
  handleSave: () => void
}

export function ProfilePanel({ user, formData, setFormData, isEditing, setIsEditing, handleSave }: ProfilePanelProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
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
            <h3 className="text-lg font-semibold">{formData.name}</h3>
            <p className="text-sm text-gray-600">{formData.storeName}</p>
          </div>
        </div>
        {!isEditing ? (
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            {isEditing ? (
              <Input
                id="full-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <p className="text-gray-900">{formData.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="store-name" className="block text-sm font-medium text-gray-700 mb-1">
              Store Name
            </label>
            {isEditing ? (
              <Input
                id="store-name"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              />
            ) : (
              <p className="text-gray-900">{formData.storeName}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {isEditing ? (
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            ) : (
              <p className="text-gray-900">{formData.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            ) : (
              <p className="text-gray-900">{formData.phone}</p>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            {isEditing ? (
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            ) : (
              <p className="text-gray-900">{formData.address}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


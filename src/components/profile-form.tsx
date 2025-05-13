"use client"

import { useState } from "react"
import { User, Mail, Coffee } from "lucide-react"
import Link from "next/link"

export function ProfileForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [foodType, setFoodType] = useState("")

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 py-3 bg-gray-50 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          className="w-full pl-10 py-3 bg-gray-50 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Coffee className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 py-3 bg-gray-50 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none"
          placeholder="Enter Food Type"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        />
      </div>

      <div className="pt-6">
        <Link href="/dashboard">
          <button className="w-full py-3 bg-green-800 rounded-lg text-white font-medium">Submit</button>
        </Link>
      </div>
    </div>
  )
}

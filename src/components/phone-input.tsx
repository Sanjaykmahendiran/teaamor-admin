"use client"

import { useState } from "react"
import { Phone } from "lucide-react"

// Define the interface so TypeScript knows about the prop
interface PhoneInputProps {
  onChange?: (value: string) => void;
}

export function PhoneInput({ onChange }: PhoneInputProps) {
  const [phone, setPhone] = useState("")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const formattedValue = e.target.value.replace(/\D/g, "")

    // Update if length is within limit
    if (formattedValue.length <= 10) {
      setPhone(formattedValue)
      
      // Send the data back to the parent (LoginPage)
      if (onChange) {
        onChange(formattedValue)
      }
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Phone className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="tel"
        className="w-full pl-10 py-3 bg-gray-50 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none"
        placeholder="Enter your phone"
        value={phone}
        onChange={handlePhoneChange}
        maxLength={10}
      />
    </div>
  )
}
"use client"

import { useState } from "react"
import { Lock } from "lucide-react" // Changed from Phone to Lock for better UX

// 1. Define the interface for props
interface OtpInputProps {
  onChange?: (value: string) => void;
}

export function OtpInput({ onChange }: OtpInputProps) {
  const [otp, setOtp] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // 2. Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(newValue) && newValue.length <= 6) {
      setOtp(newValue)
      
      // 3. Send value back to the parent page
      if (onChange) {
        onChange(newValue)
      }
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="tel" // triggers numeric keypad on mobile
        className="w-full pl-10 py-3 bg-gray-50 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleChange}
        maxLength={6}
      />
    </div>
  )
}
"use client"

import { useState } from "react"
import { Phone } from "lucide-react"

export function OtpInput() {
  const [otp, setOtp] = useState("")

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Phone className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full pl-10 py-3 bg-gray-50 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
    </div>
  )
}

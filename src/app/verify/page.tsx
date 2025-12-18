"use client"

import { useState, useEffect } from "react" // Added useEffect and useCallback
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { OtpInput } from "@/components/otp-input"
import Imgl from "@/app/assets/starbucks/tea-logo.png"
import Imgp from "@/app/assets/starbucks/tea-shop01.png"

// Define the required length of your OTP
const OTP_LENGTH = 4 // Adjust this number to 6 if your OTP is 6 digits long

export default function VerifyPage() {
  const router = useRouter()
  const [otpValue, setOtpValue] = useState<string>("")
  const [resendMessage, setResendMessage] = useState<string>("OTP has been sent to your number.") // New state for OTP message

  // Handler for Resend Button: Reloads page and updates message
  const handleResend = () => {
    // 1. Reloads the current page
    window.location.reload()
    // 2. You can also update a message here (though reload makes this redundant until next render)
    setResendMessage("A new OTP has been sent.")
  }

  // Effect to check and navigate when the OTP is complete
  useEffect(() => {
    if (otpValue.length === OTP_LENGTH) {
      // 3. Perform final verification logic here (e.g., API call)
      
      // For demonstration, we simulate success and navigate
      console.log("OTP Complete. Navigating to home.")
      router.push("/dashboard")
    }
  }, [otpValue, router])

  return (
    <div className="relative h-screen w-full mx-auto overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={Imgp} 
          alt="Starbucks interior" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Back Button */}
      <Link 
        href="/login" 
        className="absolute top-6 left-6 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-all active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Logo */}
        <div className="mt-12 flex flex-col items-center">
          <Image 
            src={Imgl} 
            alt="Starbucks" 
            width={80} 
            height={80} 
            className="mb-2" 
          />
          <h2 className="text-white text-lg font-semibold tracking-wider">TEA AMOR</h2>
        </div>

        {/* Welcome Text */}
        <div className="mt-8 text-center">
          <h1 className="text-white text-3xl font-bold">Welcome Back</h1>
          <p className="text-white/80 mt-1">Hello, sign in to continue</p>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Verification Form */}
        <div className="w-full px-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg">
            
            {/* Display the OTP message at the top */}
            <p className="text-sm font-medium text-gray-600 text-center mb-4">
              {resendMessage}
            </p>
            
            <OtpInput onChange={setOtpValue} />

            <div className="mt-4 px-2 flex justify-between items-center">
                <p className="text-sm text-gray-500">Didn&apos;t receive code?</p>
                <button 
                  onClick={handleResend}
                  className="text-#D4AF37 text-sm font-medium hover:text-orange-600 active:scale-95 transition-transform"
                >
                  Resend Now
                </button>
            </div>
            
            {/* Removed the Submit Button as per the request */}
            
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { setUser } from "@/lib/auth"

import PhoneIllustration from "@/app/assets/starbucks/phone-pic.png"

export default function LoginPage() {
  const router = useRouter()

  /* ---------------- STATES ---------------- */
  const [isSplashLoading, setIsSplashLoading] = useState(true)

  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtpField, setShowOtpField] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const mobileInputRef = useRef<HTMLInputElement>(null)

  /* ---------------- SPLASH LOADING ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  /* ---------------- HANDLERS ---------------- */
  const handleSendOtp = () => {
    if (name.trim() && mobile.length === 10) {
      setShowOtpField(true)
    }
  }

  const handleVerifyOTP = () => {
    if (otp.length !== 6) return

    setIsVerifying(true)

    setTimeout(() => {
      setUser({
        id: crypto.randomUUID(),
        name,
        mobile,
        role: "retailer",
      })

      router.push("/dashboard")
    }, 1500)
  }

  /* ---------------- SPLASH SCREEN ---------------- */
  if (isSplashLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#2c375d] to-[#2c375d]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-sm tracking-wide">Loading...</p>
        </div>
      </div>
    )
  }

  /* ---------------- LOGIN SCREEN ---------------- */
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#2c375d] to-[#2c375d]">
      {/* Background Illustration */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20"
        style={{ backgroundImage: `url(${PhoneIllustration.src})` }}
      />

      {/* Welcome Text */}
      <div className="text-center text-white pt-20">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <h2 className="text-3xl font-bold -mt-1">Back</h2>
      </div>

      {/* Bottom Form */}
      <div className="fixed bottom-0 w-full bg-white rounded-t-3xl px-6 py-8">
        <h3 className="text-xl font-semibold mb-4">Sign in</h3>

        <div className="space-y-5">
          {/* NAME FIELD */}
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* MOBILE FIELD */}
          <Input
            ref={mobileInputRef}
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />

          {/* SEND OTP */}
          {name && mobile.length === 10 && !showOtpField && (
            <button
              onClick={handleSendOtp}
              className="text-primary font-semibold text-sm"
            >
              Send OTP
            </button>
          )}

          {/* OTP FIELD */}
          {showOtpField && (
            <>
              <Input
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="tracking-widest text-center"
              />

              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isVerifying}
                className="w-full"
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
              </Button>
            </>
          )}

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="font-medium underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

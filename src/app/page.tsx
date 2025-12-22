"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { setUser } from "@/lib/auth"

import PhoneIllustration from "@/assets/starbucks/phone-pic.png"
import logo from "@/assets/starbucks/tea-amor-logo.png"

export default function LoginPage() {
  const router = useRouter()

  /* ---------------- STATES ---------------- */
  const [isSplashLoading, setIsSplashLoading] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /* ---------------- SPLASH LOADING ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  /* ---------------- HANDLERS ---------------- */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setUser({
        id: crypto.randomUUID(),
        name: email.split("@")[0], // Use email prefix as name
        mobile: "",
        role: "retailer",
      })

      router.push("/home")
    }, 1500)
  }

  /* ---------------- SPLASH SCREEN ---------------- */
  if (isSplashLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <img 
            src={logo.src} 
            alt="Tea Amor Logo" 
            className="w-48 h-48 object-contain animate-zoom"
          />
        </div>
      </div>
    )
  }

  /* ---------------- LOGIN SCREEN ---------------- */
  return (
    <div className="fixed inset-0 bg-[#2c375d]">
      {/* Background Illustration */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-80"
        style={{ backgroundImage: `url(${PhoneIllustration.src})` }}
      />

      {/* Welcome Text */}
      <div className="text-center text-white pt-20">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <h2 className="text-3xl font-bold -mt-1">Back</h2>
      </div>

      {/* Bottom Form */}
      <div className="fixed bottom-0 w-full bg-white rounded-t-3xl px-6 py-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Sign in</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL FIELD */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 pl-11 text-base border-2 focus-visible:border-primary transition-colors"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 pl-11 pr-11 text-base border-2 focus-visible:border-primary transition-colors"
                required
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={!email.trim() || !password.trim() || isLoading}
            className="w-full h-12 mt-2 text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}

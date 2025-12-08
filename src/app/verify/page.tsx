import Image from "next/image"
import Link from "next/link"
import { OtpInput } from "@/components/otp-input"
import Imgl from "@/app/assets/starbucks/Qwiky Logo.png"
import Imgp from "@/app/assets/starbucks/img-2.jpg"

export default function VerifyPage() {
  return (
    <div className="relative h-screen w-full mx-auto overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={Imgp} alt="Starbucks interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Logo */}
        <div className="mt-12 flex flex-col items-center">
          <Image src={Imgl} alt="Starbucks" width={80} height={80} className="mb-2" />
          <h2 className="text-white text-lg font-semibold tracking-wider">QWIKY</h2>
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
            <OtpInput />

            <div className="mt-2 px-2">
              <button className="text-orange-500 text-sm font-medium">Resend Now</button>
            </div>

            <Link href="/dashboard">
              <button className="w-full mt-4 py-3 bg-[#ff734d] rounded-full text-white font-medium">Submit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

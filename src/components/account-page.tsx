import type React from "react"
import Image from "next/image"
import { Bell, Menu, User, CreditCard, MapPin, Truck, BellRing, Star, Gift, LogOut, ChevronRight } from "lucide-react"
import Img from "@/assets/onboarding/1.png"
import Footer from "@/components/footer"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzM0QjkiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTQtMTRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMTQgMTRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtLTE0IDE0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00bS0xNC0xNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0xNCAxNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTQtMTRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMCAxNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30 -z-10" />

      <header className="flex justify-between items-center p-4">
  {/* Left section with My Account */}
  <h1 className="text-3xl font-bold text-[#D4AF37]">My Account</h1>

  {/* Right section with Bell, Menu, and Profile */}
  <div className="flex items-center gap-4">
    <Bell className="text-[#D4AF37] w-6 h-6" />
    <Menu className="text-[#D4AF37] w-6 h-6" />
    <Image
      src={Img}
      alt="Profile"
      width={40}
      height={40}
      className="rounded-full object-cover"
    />
  </div>
</header>


      {/* Profile Section */}
      <div className="flex items-center gap-4 px-6 py-4">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-3xl font-bold">
          S
        </div>
        <div>
          <h2 className="text-2xl font-bold">Saranraj</h2>
          <p className="text-gray-500">+91 7200592312</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-4 space-y-6">
        <MenuItem icon={<User className="w-6 h-6 text-gray-500" />} label="Account information" />
        <MenuItem icon={<CreditCard className="w-6 h-6 text-gray-500" />} label="Payment methods" />
        <MenuItem icon={<MapPin className="w-6 h-6 text-gray-500" />} label="Delivery locations" />
        <MenuItem icon={<Truck className="w-6 h-6 text-gray-500" />} label="Order tracking" />
        <MenuItem icon={<BellRing className="w-6 h-6 text-gray-500" />} label="Notification" />
        <MenuItem icon={<Star className="w-6 h-6 text-gray-500" />} label="Rate" />
        <MenuItem icon={<Gift className="w-6 h-6 text-gray-500" />} label="Refer & Earn" />
        <MenuItem icon={<LogOut className="w-6 h-6 text-gray-500" />} label="Log out" />
      </div>

      {/* Share App Button */}
      <div className="px-6 py-8">
        <button className="w-full py-4 bg-[#D4AF37] text-white rounded-full text-xl font-semibold">Share App</button>
      </div>
      <Footer/>
    </div>
  )
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-gray-500 text-lg">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  )
}

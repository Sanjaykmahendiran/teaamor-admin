import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CartPage() {
  return (
    <div className="relative h-screen w-full max-w-sm mx-auto bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-green-800">Cart</h1>
        </div>
        <div className="w-10 h-10 rounded-lg bg-green-800 flex items-center justify-center">
          <Image src="/images/starbucks-logo-white.png" alt="Starbucks" width={24} height={24} />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto p-4">
        <CartItems />
        <CartSummary />
      </div>

      {/* Checkout Button */}
      <div className="p-4 border-t">
        <Link href="/checkout">
          <button className="w-full py-3 bg-green-800 rounded-lg text-white font-medium">Checkout</button>
        </Link>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPath="/cart" />
    </div>
  )
}

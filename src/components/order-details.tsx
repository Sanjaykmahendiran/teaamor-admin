"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal, Printer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ImagC from "@/assets/posfood/caramel_src.png"

export default function OrderDetails() {
  const router = useRouter()

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col relative">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-50 bg-white border-b p-4 flex items-center">
        <button className="mr-2" onClick={() => router.push("/ordermenu")}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold flex-1">Order Details</h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Order Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold">Order ID</p>
              <p className="text-gray-700">#19570</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2">
                <Printer className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 bg-#D4AF37 rounded-full">
                <MoreHorizontal className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">Paid by Bank Transfer</p>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">delivered</span>
          </div>
          <p className="text-gray-700">Place on Wed, April 23, 2025 11:34 AM</p>
          <p className="text-gray-700">Delivery Date/Time: 2025-04-23</p>
          <p className="text-gray-700">Include utensils: No</p>
          <p className="text-gray-700">Payment status: paid</p>
        </div>

        {/* Timeline */}
        <div className="border-t">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Timeline</p>
              <p className="text-gray-700">Order Complete</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Payment History */}
        <div className="border-t">
          <div className="p-4 flex items-center justify-between">
            <p className="font-medium">Payment history</p>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Customer */}
        <div className="border-t">
          <div className="p-4 flex items-center justify-between">
            <p className="font-medium">Customer</p>
            <ChevronRight className="h-5 w-5 text-gray-400 rotate-90" />
          </div>
        </div>

        {/* Loyalty Points */}
        <div className="border-t">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Loyalty Points</p>
              <p className="text-blue-600 text-sm">This order will earns 4 points!</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 rotate-90" />
          </div>
        </div>

        {/* Delivery Info */}
        <div className="border-t">
          <div className="p-4 flex items-center justify-between">
            <p className="font-medium">Delivery information</p>
            <ChevronRight className="h-5 w-5 text-gray-400 rotate-90" />
          </div>
        </div>

        {/* Driver */}
        <div className="border-t">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Driver</p>
              <p className="text-amber-600">driver turbo</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 rotate-90" />
          </div>
        </div>

        {/* Order Details */}
        <div className="border-t pt-4">
          <p className="px-4 font-medium">Order Details</p>
          <div className="p-4 flex items-start">
            <div className="w-12 h-12 mr-3 relative">
              <Image
                src={ImagC}
                alt="Hot Fudge Sundae"
                width={65}
                height={65}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p><span className="font-medium">1 x</span> Hot Fudge Sundae</p>
                <p className="font-medium">$40.00</p>
              </div>
              <p className="text-gray-500">$40.00</p>
              <p className="text-gray-500">Desserts & Drinks</p>
              <p className="text-gray-500 italic">If sold out</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t pt-4 pb-8">
          <p className="px-4 font-medium">Summary</p>
          <div className="px-4 mt-2 space-y-2">
            <div className="flex justify-between">
              <p>Sub total (1 items)</p>
              <p className="font-medium">$40.00</p>
            </div>
            <div className="flex justify-between">
              <p>Service fee</p>
              <p className="font-medium">$2.00</p>
            </div>
            <div className="flex justify-between">
              <p>Small order fee</p>
              <p className="font-medium">$10.00</p>
            </div>
            <div className="flex justify-between">
              <p>tva10 10%</p>
              <p className="font-medium">$4.20</p>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t">
              <p className="font-medium">Total</p>
              <p className="font-medium">$56.20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ready for pickup Button - Fixed Bottom */}
      <div className="sticky bottom-0 w-full bg-white border-t p-4">
        <Link href="/ordermenu">
        <button className="w-full bg-#D4AF37 text-white py-3 rounded-md text-center text-xl font-medium">
          Ready for pickup
        </button>
        </Link>
      </div>
    </div>
  )
}

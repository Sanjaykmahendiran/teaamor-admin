import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PaymentPage() {
  return (
    <div className="relative h-screen w-full max-w-sm mx-auto bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Link href="/cart" className="mr-4">
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-green-800">Payment</h1>
        </div>
        <div className="w-10 h-10 rounded-lg bg-green-800 flex items-center justify-center">
          <Image src="/images/starbucks-logo-white.png" alt="Starbucks" width={24} height={24} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <h2 className="text-lg font-bold text-green-800 mb-3">Order Summary</h2>

        {/* Total Amount */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <Image src="/images/total-icon.png" alt="Total" width={24} height={24} />
            </div>
            <div>
              <div className="font-medium">Total Amount</div>
              <div className="text-gray-600">Rs.5000</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        <h2 className="text-lg font-bold text-green-800 mb-3">Payment method</h2>

        {/* Payment Method */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center mr-3">
              <Image src="/images/mastercard.png" alt="MasterCard" width={32} height={24} />
            </div>
            <div>
              <div className="font-medium">MasterCard</div>
              <div className="text-gray-600">******6872</div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        {/* Price Breakdown */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-gray-500">
            <span>Item total:</span>
            <span>$10.48</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Delivery charge:</span>
            <span>$1.00</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax:</span>
            <span>$0.70</span>
          </div>
          <div className="flex justify-between font-medium text-green-800 pt-2">
            <span>Total:</span>
            <span>$12.18</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <button className="w-full py-3 bg-gray-200 rounded-lg text-green-800 font-medium flex items-center justify-center">
          <span className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 4V20M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Add Voucher
        </button>
        <Link href="/order-confirmation">
          <button className="w-full py-3 bg-green-800 rounded-lg text-white font-medium">Pay Now</button>
        </Link>
      </div>
    </div>
  )
}

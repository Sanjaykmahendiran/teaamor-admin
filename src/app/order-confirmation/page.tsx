import Image from "next/image"
import Link from "next/link"

export default function OrderConfirmationPage() {
  return (
    <div className="relative h-screen w-full max-w-sm mx-auto bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Illustration */}
        <div className="relative w-64 h-64 mb-8">
          <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
          <Image
            src="/images/order-confirmation.png"
            alt="Order Confirmation"
            width={250}
            height={250}
            className="relative z-10"
          />
        </div>

        {/* Confirmation Text */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Thanks for your Order!</h1>
          <p className="text-lg font-medium text-gray-800">Cooking in Progress!</p>
        </div>

        {/* Arrival Time */}
        <div className="mt-6 text-xl font-bold text-gray-800">Arriving in 16 Mins :)</div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <Link href="/dashboard">
          <button className="w-full py-3 bg-green-800 rounded-lg text-white font-medium">Order Next!</button>
        </Link>
        <Link href="/bill">
          <button className="w-full py-3 bg-green-800 rounded-lg text-white font-medium">Bill Please!</button>
        </Link>
      </div>
    </div>
  )
}

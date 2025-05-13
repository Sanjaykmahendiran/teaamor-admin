import { Bell, Search, Home, ShoppingBag, Menu, User, MoreHorizontal, BarChart3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FinancialMetricsSlider from "@/components/financial-metrics-slider"
import Imga from "@/app/assets/profile/profile.jpg"
import Imgb from "@/app/assets/profile/profile1.png"
import Img from "@/app/assets/profile/profile.jpg"
import Imgq from "@/app/assets/profile/profile1.png"
import Imgq2 from "@/app/assets/profile/profile.jpg"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <div className="h-5 w-5 bg-orange-500 rounded-full opacity-70"></div>
            <div className="h-5 w-5 bg-orange-400 rounded-full -ml-2"></div>
          </div>
          <span className="font-medium">Online</span>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-gray-600" />
          <Search className="h-5 w-5 text-gray-600" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Earnings Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
          <p className="text-sm text-gray-500">Your sales, cash in and referral earnings</p>
          <div className="mt-2">
            <p className="text-3xl font-bold text-orange-500">$37518.96</p>
          </div>

          {/* Stats Cards */}
          <FinancialMetricsSlider />
        </div>

        {/* Last Orders Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Last Orders</h2>
          <p className="text-sm text-gray-500">Quick management of the last 5 orders</p>

          {/* Order Status Pills */}
          <div className="flex gap-2 mt-3 mb-4">
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs">
                2
              </div>
              <span className="text-xs">Processing</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 bg-emerald-400 rounded-full flex items-center justify-center text-white text-xs">
                1
              </div>
              <span className="text-xs">Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs">
                2
              </div>
              <span className="text-xs">Completed</span>
            </div>
          </div>

          {/* Order List */}
          <div className="space-y-4">
            {/* Order #19644 */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #19644</p>
                  <p className="text-xs text-gray-500">1 items for ken ken</p>
                  <p className="text-xs text-gray-500">11 hours ago</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Delivery</span>
                  <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">Accepted</span>
                  <span className="text-xs text-gray-500">Unpaid</span>
                </div>
              </div>
            </div>

            {/* Order #19643 */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #19643</p>
                  <p className="text-xs text-gray-500">1 items for Walk-in Customer</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Dine-in</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Complete</span>
                  <span className="text-xs text-gray-500">Paid</span>
                </div>
              </div>
            </div>

            {/* Order #19641 */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #19641</p>
                  <p className="text-xs text-gray-500">1 items for Walk-in Customer</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Dine-in</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Complete</span>
                  <span className="text-xs text-gray-500">Paid</span>
                </div>
              </div>
            </div>

            {/* Order #19639 */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #19639</p>
                  <p className="text-xs text-gray-500">1 items for Aydin Ametsxan</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Delivery</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Complete</span>
                  <span className="text-xs text-gray-500">Paid</span>
                </div>
              </div>
            </div>

            {/* Order #19638 */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #19638</p>
                  <p className="text-xs text-gray-500">1 items for Aydin Ametsxan</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Delivery</span>
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Delivery Failed</span>
                  <span className="text-xs text-gray-500">Unpaid</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-purple-200 p-3 rounded-lg">
            <p className="text-xs text-purple-800">Total Orders</p>
            <p className="font-bold text-purple-800">$2102.00</p>
          </div>
          <div className="bg-red-200 p-3 rounded-lg">
            <p className="text-xs text-red-800">Total Cancel</p>
            <p className="font-bold text-red-800">$55.00</p>
          </div>
          <div className="bg-blue-200 p-3 rounded-lg">
            <p className="text-xs text-blue-800">Total refund</p>
            <p className="font-bold text-blue-800">$34957.30</p>
          </div>
        </div>

        {/* Top Customers Section */}

        <h2 className="text-xl font-bold text-gray-800">Top Customers</h2>
        <p className="text-sm text-gray-500">Your top customer consumer</p>
        <div className="mb-6 bg-white p-4 shadow-sm">
          <div className="mt-3 space-y-3">
            {/* Customer 1 */}
            <div className="flex items-center border-b pb-3">
              <div className="w-12 h-12 relative mr-3">
                <Image
                  src={Img}
                  alt="basti bach"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">basti bach</p>
                <p className="text-xs text-gray-500">125 orders</p>
                <p className="text-xs text-gray-500">Member since Sat, January 29, 2022 11:10 AM</p>
              </div>
            </div>

            {/* Customer 2 */}
            <div className="flex items-center border-b pb-3">
              <div className="w-12 h-12 relative mr-3">
                <Image
                  src={Imga}
                  alt="Aydin Amctxan"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">Aydin Amctxan</p>
                <p className="text-xs text-gray-500">118 orders</p>
                <p className="text-xs text-gray-500">Member since Thu, June 6, 2024 9:43 PM</p>
              </div>
            </div>

            {/* Customer 3 */}
            <div className="flex items-center border-b pb-3">
              <div className="w-12 h-12 relative mr-3">
                <Image
                  src={Imgb}
                  alt="John Doe"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-gray-500">64 orders</p>
                <p className="text-xs text-gray-500">Member since Mon, July 22, 2024 3:30 AM</p>
              </div>
            </div>

            {/* Customer 4 */}
            <div className="flex items-center border-b pb-3">
              <div className="w-12 h-12 relative mr-3">
                <Image
                  src={Imgq}
                  alt="basti bach"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">basti bach</p>
                <p className="text-xs text-gray-500">28 orders</p>
                <p className="text-xs text-gray-500">Member since Tue, February 13, 2024 8:15 AM</p>
              </div>
            </div>

            {/* Customer 5 */}
            <div className="flex items-center">
              <div className="w-12 h-12 relative mr-3">
                <Image
                  src={Imgq2}
                  alt="Ahmet Topacik"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">Ahmet Topacik</p>
                <p className="text-xs text-gray-500">24 orders</p>
                <p className="text-xs text-gray-500">Member since Wed, February 5, 2025 5:11 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Overview Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-800">Sales overview</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>

          <div className="h-64 mt-4">
            <div className="flex h-full items-end">
              <div className="flex-1 flex flex-col justify-end items-center">
                <div className="w-8 bg-blue-200 rounded-t" style={{ height: "5%" }}></div>
                <p className="text-xs mt-1">May</p>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center">
                <div className="w-8 bg-blue-400 rounded-t" style={{ height: "20%" }}></div>
                <p className="text-xs mt-1">Apr</p>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: "80%" }}></div>
                <p className="text-xs mt-1">Mar</p>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: "60%" }}></div>
                <p className="text-xs mt-1">Feb</p>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center">
                <div className="w-8 bg-blue-400 rounded-t" style={{ height: "30%" }}></div>
                <p className="text-xs mt-1">Jan</p>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center">
                <div className="w-8 bg-blue-400 rounded-t" style={{ height: "25%" }}></div>
                <p className="text-xs mt-1">Dec</p>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center">
                <div className="w-8 bg-blue-300 rounded-t" style={{ height: "15%" }}></div>
                <p className="text-xs mt-1">Nov</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 mt-2">
            <div className="text-xs text-gray-500 text-center">0.0000</div>
            <div className="text-xs text-gray-500 text-center">20000.0000</div>
            <div className="text-xs text-gray-500 text-center">40000.0000</div>
            <div className="text-xs text-gray-500 text-center">60000.0000</div>
            <div className="text-xs text-gray-500 text-center">80000.0000</div>
            <div className="col-span-2"></div>
          </div>
        </div>

        {/* Review Overview Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Overview of Review</h2>
          <p className="text-sm text-gray-500">This month you got 1 New Reviews</p>

          <div className="mt-4 space-y-2">
            {/* 5 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">5 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "83%" }}></div>
              </div>
              <span className="text-sm">83%</span>
            </div>

            {/* 4 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">4 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "10%" }}></div>
              </div>
              <span className="text-sm">10%</span>
            </div>

            {/* 0 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">0 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <span className="text-sm">0%</span>
            </div>

            {/* 0 Star (repeated) */}
            <div className="flex items-center">
              <span className="w-12 text-sm">0 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <span className="text-sm">0%</span>
            </div>

            {/* 1 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">1 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "8%" }}></div>
              </div>
              <span className="text-sm">8%</span>
            </div>
          </div>

          <button className="w-full mt-4 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg transition-colors">
            View All
          </button>
        </div>

      </main>

      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 bg-white border-t py-2">
        <div className="flex justify-around items-center">
          <Link href="#" className="flex flex-col items-center">
            <Home className="h-5 w-5 text-orange-500" />
            <span className="text-xs text-orange-500">Home</span>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <ShoppingBag className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Orders</span>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <Menu className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Menu</span>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Account</span>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Others</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}

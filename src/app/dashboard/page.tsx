'use client'

import Link from "next/link"
import Image from "next/image"
import FinancialMetricsSlider from "@/components/financial-metrics-slider"
import TotalOrderSlider from "@/components/total-order-slider"
import Header from "@/components/header"
import SalesOverview from "@/components/SalesOverview"
import Imga from "@/assets/profile/profile.jpg"
import Imgb from "@/assets/profile/profile1.png"
import Img from "@/assets/profile/profile.jpg"
import Imgq from "@/assets/profile/profile1.png"
import Imgq2 from "@/assets/profile/profile.jpg"
import Footer from "@/components/footer"
import { api } from "@/lib/api-service"

import { useState, useEffect } from "react"
import { TrendingUp, Coffee, Clock, Package } from "lucide-react"

export default function Dashboard() {
  const [selectedStatusTab, setSelectedStatusTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await api.dashboard();
        setData(result);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Use API data or fallbacks
  const orders = data?.recentOrders || []; // Expecting dashboard to return 'recentOrders'
  const totalEarnings = data?.totalEarnings || "₹0.00";

  const todayStats = data?.todayStats || {
    orders: 0,
    revenue: 0,
    avgOrderValue: 0,
    peakHour: "N/A"
  };

  const salesMetrics = data?.salesMetrics; // For slider
  const salesChartData = data?.salesChartData; // For chart
  const popularItems = data?.popularItems || [];
  const revenueByCategory = data?.revenueByCategory || [];

  // Calculate order counts from the *fetched* orders (or maybe API provides counts?)
  // If API provides counts, use them. If not, calculate from `orders` list if it's full list.
  // Dashboard usually provides summary. "Last Orders" implies a subset.
  // I'll assume `orders` is just the list shown. 
  // But the pill counts (All: X, Processing: Y) might come separately?
  // I'll calculate from the list I have, but relying on backend for counts is better.
  // For now, I'll calculate from the visual list I have + maybe an "all" count from API?
  // Let's stick to calculating from the `orders` array we have for now, assuming it contains the relevant set.

  const orderCounts = {
    all: orders.length,
    processing: orders.filter((o: any) => o.status === "processing").length,
    ready: orders.filter((o: any) => o.status === "ready").length,
    completed: orders.filter((o: any) => o.status === "completed").length,
  };

  // Filter orders based on selected tab
  const filteredOrders = selectedStatusTab === "all"
    ? orders
    : orders.filter((order: any) => order.status === selectedStatusTab);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }

  return (

    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />


      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {/* Earnings Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <p className="text-sm text-slate-600">Your sales, cash in and referral earnings</p>
          </div>
          <div className="bg-gradient-to-br from-[#2c375d] to-[#1a2440] p-6 rounded-2xl shadow-lg mb-6">
            <p className="text-sm text-slate-300 mb-1">Total Earnings</p>
            <p className="text-4xl md:text-5xl font-bold text-[#D4AF37]">{totalEarnings}</p>
          </div>

          {/* Stats Cards */}
          <FinancialMetricsSlider metrics={salesMetrics} />
        </div>

        {/* Today's Summary Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-primary">Today's Summary</h2>
            <p className="text-sm text-slate-600">Quick overview of today's performance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500">Today's Orders</p>
                <Package className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{todayStats.orders}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from yesterday
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500">Today's Revenue</p>
                <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
              </div>
              <p className="text-2xl font-bold text-[#D4AF37]">₹{todayStats.revenue}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% from yesterday
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500">Avg. Order Value</p>
                <Coffee className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">₹{todayStats.avgOrderValue}</p>
              <p className="text-xs text-slate-400 mt-1">Per order</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500">Peak Hour</p>
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{todayStats.peakHour}</p>
              <p className="text-xs text-slate-400 mt-1">Most busy time</p>
            </div>
          </div>
        </div>

        {/* Last Orders Section */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">Last Orders</h2>
            <p className="text-sm text-slate-600">Quick management of the last 5 orders</p>
          </div>

          {/* Order Status Pills */}
          <div className="flex gap-3 mb-6 overflow-x-auto py-2 px-2 scrollbar-hide">
            {[
              { key: "all", label: "All", count: orderCounts.all },
              { key: "processing", label: "Processing", count: orderCounts.processing },
              { key: "ready", label: "Ready", count: orderCounts.ready },
              { key: "completed", label: "Completed", count: orderCounts.completed },
            ].map(({ key, label, count }) => {
              const isActive = selectedStatusTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedStatusTab(key)}
                  className={`relative flex items-center justify-center px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap ${isActive
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                >
                  {/* Badge */}
                  <div
                    className={`absolute -top-2 -right-2 text-black text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md ${isActive ? "bg-white text-black" : "bg-[#D4AF37] text-white"
                      }`}
                  >
                    {count}
                  </div>
                  <span className="text-sm font-semibold">{label}</span>
                </button>
              );
            })}
          </div>


          {/* Order List */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order: any, index: number) => {
                const getStatusBadge = () => {
                  switch (order.status) {
                    case "processing":
                      return (
                        <span className="text-xs font-medium bg-amber-500/20 text-amber-700 px-3 py-1.5 rounded-full border border-amber-300/30">
                          Processing
                        </span>
                      );
                    case "ready":
                      return (
                        <span className="text-xs font-medium bg-blue-500/20 text-blue-700 px-3 py-1.5 rounded-full border border-blue-300/30">
                          Ready
                        </span>
                      );
                    case "completed":
                      return (
                        <span className="text-xs font-medium bg-emerald-500 text-white px-3 py-1.5 rounded-full shadow-sm">
                          Complete
                        </span>
                      );
                    default:
                      return null;
                  }
                };

                const getPaymentBadge = () => {
                  if (order.paymentStatus === "Paid") {
                    return (
                      <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                        Paid
                      </span>
                    );
                  } else {
                    return (
                      <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-3 py-1 rounded-full">
                        Unpaid
                      </span>
                    );
                  }
                };

                return (
                  <div
                    key={order.id}
                    className={`p-5 ${index < filteredOrders.length - 1 ? "border-b border-slate-100" : ""} hover:bg-amber-50/30 transition-colors cursor-pointer`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold text-primary text-base">Order #{order.id}</p>
                        </div>
                        <div className="space-y-1 mb-2">
                          <p className="text-sm font-medium text-slate-800">{order.items}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <p className="text-xs text-slate-400">🕐 {order.time}</p>
                          <p className="text-sm font-semibold text-primary">{order.amount}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        {getStatusBadge()}
                        {getPaymentBadge()}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <p className="text-slate-500 text-sm">No orders found for this status</p>
              </div>
            )}
          </div>
        </div>

        {/* Popular Items Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-primary">Popular Items</h2>
            <p className="text-sm text-slate-600">Best selling items this week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {/* Item 1 */}
              <div className="p-4 hover:bg-amber-50/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                      <span className="text-lg">1</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">Signature Tea</p>
                      <p className="text-xs text-slate-500">Milk Tea • ₹25.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">342</p>
                    <p className="text-xs text-slate-500">sold</p>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-4 hover:bg-amber-50/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                      <span className="text-lg">2</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">Ginger Tea</p>
                      <p className="text-xs text-slate-500">Milk Tea • ₹20.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">298</p>
                    <p className="text-xs text-slate-500">sold</p>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-4 hover:bg-amber-50/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <span className="text-lg">3</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">Classic Tea</p>
                      <p className="text-xs text-slate-500">Milk Tea • ₹15.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">275</p>
                    <p className="text-xs text-slate-500">sold</p>
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="p-4 hover:bg-amber-50/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                      <span className="text-lg">4</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">Elachi Tea</p>
                      <p className="text-xs text-slate-500">Milk Tea • ₹20.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">256</p>
                    <p className="text-xs text-slate-500">sold</p>
                  </div>
                </div>
              </div>

              {/* Item 5 */}
              <div className="p-4 hover:bg-amber-50/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                      <span className="text-lg">5</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">Manjal Milagu Milk</p>
                      <p className="text-xs text-slate-500">Hot Milk • ₹25.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">189</p>
                    <p className="text-xs text-slate-500">sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by Category Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-primary">Revenue by Category</h2>
            <p className="text-sm text-slate-600">Sales breakdown by product categories</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <div className="space-y-4">
              {/* Milk Tea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🍵</span>
                    <p className="font-semibold text-slate-900">Milk Tea</p>
                  </div>
                  <p className="font-bold text-primary">₹12,450</p>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "45%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">45% of total revenue</p>
              </div>

              {/* Hot Milk */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥛</span>
                    <p className="font-semibold text-slate-900">Hot Milk</p>
                  </div>
                  <p className="font-bold text-primary">₹6,280</p>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "23%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">23% of total revenue</p>
              </div>

              {/* Coffee */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">☕</span>
                    <p className="font-semibold text-slate-900">Coffee</p>
                  </div>
                  <p className="font-bold text-primary">₹4,920</p>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "18%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">18% of total revenue</p>
              </div>

              {/* Quick Bites */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🍗</span>
                    <p className="font-semibold text-slate-900">Quick Bites</p>
                  </div>
                  <p className="font-bold text-primary">₹2,680</p>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "10%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">10% of total revenue</p>
              </div>

              {/* Cold Shakes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥤</span>
                    <p className="font-semibold text-slate-900">Cold Shakes</p>
                  </div>
                  <p className="font-bold text-primary">₹1,188</p>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "4%" }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">4% of total revenue</p>
              </div>
            </div>
          </div>
        </div>



        {/* Sales Overview Section */}
        <div className="flex justify-between items-center mb-3">
        </div>
        <SalesOverview chartData={salesChartData} />


        {/* Review Overview Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Overview of Review</h2>
          <p className="text-sm text-gray-500">This month you got 1 New Reviews</p>

          <div className="mt-4 space-y-2">
            {/* 5 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">5 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "83%" }}></div>
              </div>
              <span className="text-sm">83%</span>
            </div>

            {/* 4 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">4 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "10%" }}></div>
              </div>
              <span className="text-sm">10%</span>
            </div>

            {/* 0 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">0 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "0%" }}></div>
              </div>
              <span className="text-sm">0%</span>
            </div>

            {/* 0 Star (repeated) */}
            <div className="flex items-center">
              <span className="w-12 text-sm">0 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "0%" }}></div>
              </div>
              <span className="text-sm">0%</span>
            </div>

            {/* 1 Star */}
            <div className="flex items-center">
              <span className="w-12 text-sm">1 Star</span>
              <div className="flex-1 mx-2 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "8%" }}></div>
              </div>
              <span className="text-sm">8%</span>
            </div>
          </div>

          <Link href="/customer-reviews" className="flex items-center justify-center text-blue-500 mt-4">
            <button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors">
              View All
            </button>
          </Link>
        </div>

      </main>
      <Footer />

    </div>
  )
}
